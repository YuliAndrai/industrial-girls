
/**
 * @file apps/web/src/lib/pipelines/spotify-track-pipeline.ts
 * @description Layer 3: Domain / Pipelines - Spotify Track Identification and Embed Generation Pipeline.
 * Encapsulates pure business logic for parsing, validating Spotify identifiers and building secure embed URLs.
 */

/**
 * Regular expression validating standard 22-character Base62 Spotify IDs.
 * Spotify IDs consist exclusively of alphanumeric characters [a-zA-Z0-9] of length 22.
 */
const SPOTIFY_ID_REGEX = /^[a-zA-Z0-9]{22}$/;

/**
 * Regular expression extracting track ID from canonical Spotify URIs ('spotify:track:ID').
 */
const SPOTIFY_URI_REGEX = /^spotify:track:([a-zA-Z0-9]{22})$/;

/**
 * Regular expression extracting track ID from Spotify web URLs.
 * Matches standard URLs with optional regional prefixes, query params and trailing slashes.
 */
const SPOTIFY_URL_REGEX = /^(?:https?:\/\/)?open\.spotify\.com(?:\/[a-zA-Z]{2}(?:-[a-zA-Z]{2})?)?\/track\/([a-zA-Z0-9]{22})(?:[/?#]|$)/;

/**
 * Spotify track pipeline execution context contract.
 */
export interface SpotifyPipelineContext {
  /** Raw track identifier, URI, or URL provided */
  rawInput: string;
  /** Timestamp when pipeline executed */
  timestamp: number;
}

/**
 * Spotify track pipeline execution result contract.
 */
export interface SpotifyPipelineResult {
  /** Whether the pipeline successfully resolved and validated a track */
  success: boolean;
  /** Extracted 22-character canonical Spotify Track ID */
  trackId?: string;
  /** Generated Spotify embed iframe URL */
  embedUrl?: string;
  /** Error message if pipeline failed */
  error?: string;
}

/**
 * Options for constructing Spotify embed iframe URLs.
 */
export interface SpotifyEmbedOptions {
  /** Visual theme override ('0' for dark, '1' for light) */
  theme?: "0" | "1";
}

/**
 * Validates whether a given string is a valid 22-character Base62 Spotify Track ID.
 *
 * @param {string} id - The string candidate to validate.
 * @returns {boolean} True if the string matches the canonical 22-character Spotify ID pattern.
 */
export function validateSpotifyId(id: string): boolean {
  // Step 1: Invariant check - guard against null, undefined, or non-string candidate
  if (!id || typeof id !== "string") {
    return false;
  }

  // Step 2: Validate exact 22-character Base62 alphanumeric format
  return SPOTIFY_ID_REGEX.test(id.trim());
}

/**
 * Parses and extracts a 22-character Spotify Track ID from a raw URL, Spotify URI, or plain ID.
 *
 * @param {string} input - The input string (web URL, spotify URI, or plain ID).
 * @returns {string | null} The extracted 22-character Track ID, or null if invalid.
 */
export function parseSpotifyTrackId(input: string): string | null {
  // Step 1: Invariant check - reject non-strings and empty input
  if (!input || typeof input !== "string") {
    return null;
  }

  const trimmed = input.trim();

  // Step 2: Fast path - verify if input is already a direct valid 22-character ID
  if (SPOTIFY_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  // Step 3: Check canonical Spotify URI format (spotify:track:...)
  const uriMatch = trimmed.match(SPOTIFY_URI_REGEX);
  if (uriMatch && uriMatch[1]) {
    return uriMatch[1];
  }

  // Step 4: Check Spotify web URL format with optional query params and regional subpaths
  const urlMatch = trimmed.match(SPOTIFY_URL_REGEX);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  // Step 5: If no pattern matches, safely return null
  return null;
}

/**
 * Builds a sanitized, secure Spotify embed iframe URL for a verified track ID.
 *
 * @param {string} trackId - Verified 22-character Spotify Track ID.
 * @param {SpotifyEmbedOptions} [options] - Embed configuration options.
 * @returns {string} Fully qualified embed URL.
 * @throws {Error} If trackId is invalid or malformed.
 */
export function buildSpotifyEmbedUrl(trackId: string, options?: SpotifyEmbedOptions): string {
  // Step 1: Extract or validate the track ID
  const sanitizedId = parseSpotifyTrackId(trackId);

  // Step 2: Invariant enforcement - reject invalid IDs with explicit descriptive error
  if (!sanitizedId || !validateSpotifyId(sanitizedId)) {
    throw new Error(`Invalid Spotify Track ID: "${trackId}". Expected 22-character Base62 string.`);
  }

  // Step 3: Determine theme parameter (default '0' for brutalist dark aesthetic)
  const theme = options?.theme ?? "0";

  // Step 4: Construct sanitized URL using official generator parameters
  return `https://open.spotify.com/embed/track/${sanitizedId}?utm_source=generator&theme=${theme}`;
}

/**
 * Executes the complete Spotify track parsing, validation, and embed generation pipeline.
 *
 * @param {string} rawInput - The raw URL, URI, or ID candidate.
 * @param {SpotifyEmbedOptions} [options] - Embed configuration options.
 * @returns {SpotifyPipelineResult} The structured pipeline execution result.
 */
export function executeSpotifyTrackPipeline(
  rawInput: string,
  options?: SpotifyEmbedOptions
): SpotifyPipelineResult {
  // Step 1: Parse and extract candidate ID from raw input
  const trackId = parseSpotifyTrackId(rawInput);

  // Step 2: Guard against unresolvable or invalid inputs
  if (!trackId || !validateSpotifyId(trackId)) {
    return {
      success: false,
      error: `Unable to resolve a valid Spotify Track ID from input: "${rawInput}"`,
    };
  }

  try {
    // Step 3: Build sanitized embed iframe URL
    const embedUrl = buildSpotifyEmbedUrl(trackId, options);

    // Step 4: Return successful pipeline result
    return {
      success: true,
      trackId,
      embedUrl,
    };
  } catch (err: unknown) {
    // Step 5: Gracefully handle unexpected construction errors
    const message = err instanceof Error ? err.message : "Unknown pipeline error";
    return {
      success: false,
      error: message,
    };
  }
}
