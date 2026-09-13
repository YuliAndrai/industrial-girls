
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
 * Regular expression extracting album ID from canonical Spotify URIs ('spotify:album:ID').
 */
const SPOTIFY_ALBUM_URI_REGEX = /^spotify:album:([a-zA-Z0-9]{22})$/;

/**
 * Regular expression extracting album ID from Spotify web URLs.
 */
const SPOTIFY_ALBUM_URL_REGEX = /^(?:https?:\/\/)?open\.spotify\.com(?:\/[a-zA-Z]{2}(?:-[a-zA-Z]{2})?)?\/album\/([a-zA-Z0-9]{22})(?:[/?#]|$)/;

/**
 * Supported Spotify embeddable resource types.
 */
export type SpotifyResourceType = "track" | "album";

/**
 * Parsed Spotify resource metadata.
 */
export interface SpotifyParsedResource {
  /** Canonical 22-character Spotify ID */
  id: string;
  /** Resource type ('track' or 'album') */
  type: SpotifyResourceType;
}

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
  /** Explicit resource type override ('track' or 'album') */
  type?: SpotifyResourceType;
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
 * Parses and extracts a Spotify resource (ID and type) from a raw URL, URI, or plain ID.
 *
 * @param {string} input - The input string (web URL, spotify URI, or plain ID).
 * @returns {SpotifyParsedResource | null} The parsed resource metadata or null if invalid.
 */
export function parseSpotifyResource(input: string): SpotifyParsedResource | null {
  // Step 1: Invariant check - reject non-strings and empty input
  if (!input || typeof input !== "string") {
    return null;
  }

  const trimmed = input.trim();

  // Step 2: Direct 22-character Base62 ID (defaults to track)
  if (SPOTIFY_ID_REGEX.test(trimmed)) {
    return { id: trimmed, type: "track" };
  }

  // Step 3: Check Spotify Track URI format (spotify:track:...)
  const trackUriMatch = trimmed.match(SPOTIFY_URI_REGEX);
  if (trackUriMatch && trackUriMatch[1]) {
    return { id: trackUriMatch[1], type: "track" };
  }

  // Step 4: Check Spotify Track web URL format
  const trackUrlMatch = trimmed.match(SPOTIFY_URL_REGEX);
  if (trackUrlMatch && trackUrlMatch[1]) {
    return { id: trackUrlMatch[1], type: "track" };
  }

  // Step 5: Check Spotify Album URI format (spotify:album:...)
  const albumUriMatch = trimmed.match(SPOTIFY_ALBUM_URI_REGEX);
  if (albumUriMatch && albumUriMatch[1]) {
    return { id: albumUriMatch[1], type: "album" };
  }

  // Step 6: Check Spotify Album web URL format
  const albumUrlMatch = trimmed.match(SPOTIFY_ALBUM_URL_REGEX);
  if (albumUrlMatch && albumUrlMatch[1]) {
    return { id: albumUrlMatch[1], type: "album" };
  }

  // Step 7: No recognized Spotify pattern
  return null;
}

/**
 * Parses and extracts a 22-character Spotify Track ID from a raw URL, Spotify URI, or plain ID.
 *
 * @param {string} input - The input string (web URL, spotify URI, or plain ID).
 * @returns {string | null} The extracted 22-character Track ID, or null if invalid.
 */
export function parseSpotifyTrackId(input: string): string | null {
  // Step 1: Delegate to universal resource parser and return ID only if resource is a track
  const parsed = parseSpotifyResource(input);
  if (!parsed || parsed.type !== "track") {
    return null;
  }
  return parsed.id;
}

/**
 * Builds a sanitized, secure Spotify embed iframe URL for a verified track or album.
 *
 * @param {string} trackOrResource - Verified 22-character Spotify ID, URI, or URL.
 * @param {SpotifyEmbedOptions} [options] - Embed configuration options.
 * @returns {string} Fully qualified embed URL.
 * @throws {Error} If identifier is invalid or malformed.
 */
export function buildSpotifyEmbedUrl(trackOrResource: string, options?: SpotifyEmbedOptions): string {
  // Step 1: Parse resource to extract clean ID and resource type
  const parsed = parseSpotifyResource(trackOrResource);
  const sanitizedId = parsed?.id ?? trackOrResource?.trim();

  // Step 2: Invariant enforcement - reject invalid IDs with explicit descriptive error
  if (!sanitizedId || !validateSpotifyId(sanitizedId)) {
    throw new Error(`Invalid Spotify Track ID: "${trackOrResource}". Expected 22-character Base62 string.`);
  }

  // Step 3: Determine resource type and theme parameter
  const resourceType = options?.type ?? parsed?.type ?? "track";
  const theme = options?.theme ?? "0";

  // Step 4: Construct sanitized URL using official generator parameters
  return `https://open.spotify.com/embed/${resourceType}/${sanitizedId}?utm_source=generator&theme=${theme}`;
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
