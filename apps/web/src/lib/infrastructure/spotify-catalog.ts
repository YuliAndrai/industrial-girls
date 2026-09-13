/**
 * @file apps/web/src/lib/infrastructure/spotify-catalog.ts
 * @description Layer 4: Infrastructure - Static Verified Spotify Catalog.
 * Curated datasets mapping Industrial Girls official compilations and roster tracks to verified Spotify Track IDs.
 */

/**
 * Spotify track item entity contract.
 */
export interface SpotifyTrackItem {
  /** Unique track identifier within the catalog */
  id: string;
  /** Title of the track */
  title: string;
  /** Primary artist name */
  artist: string;
  /** Official 22-character Spotify Track ID */
  spotifyTrackId: string;
  /** Parent release catalog code (e.g. 'VA 001', 'VA 002') */
  releaseCatalogCode: string;
  /** Track duration formatted as MM:SS */
  duration: string;
  /** Optional Spotify resource type override ('track' or 'album') */
  type?: "track" | "album";
}

/**
 * Initial curated catalog of official Industrial Girls tracks on Spotify.
 * Mapped to official label releases (VA 001 to VA 005) with valid 22-character Spotify Track IDs.
 */
export const SPOTIFY_FEATURED_TRACKS: readonly SpotifyTrackItem[] = [
  {
    id: "spotify-va001-01",
    title: "Trip In The City",
    artist: "ANDHRAY",
    spotifyTrackId: "2wy4ZpkMSeDphIjfEeZ98d",
    releaseCatalogCode: "VA 001",
    duration: "06:24",
  },
  {
    id: "spotify-va001-02",
    title: "Broken Ego",
    artist: "BB Deng",
    spotifyTrackId: "2EQopxt5nX5VcGE59fUSUN",
    releaseCatalogCode: "VA 001",
    duration: "06:12",
  },
  {
    id: "spotify-va002-01",
    title: "8Dayswait",
    artist: "ØTTA",
    spotifyTrackId: "5kSiFutXGcgIp05d6ZFvIY",
    releaseCatalogCode: "VA 002",
    duration: "06:05",
  },
  {
    id: "spotify-va002-02",
    title: "Feline Blink",
    artist: "DEBBIE IT, ANDHRAY",
    spotifyTrackId: "6A5CFrLWOu4CS4GE8paXU5",
    releaseCatalogCode: "VA 002",
    duration: "05:40",
  },
  {
    id: "spotify-va003-01",
    title: "FKN RYTHM",
    artist: "ANDHRAY",
    spotifyTrackId: "6pffPRPNH7BF67Qub1ED67",
    releaseCatalogCode: "VA 003",
    duration: "05:30",
  },
  {
    id: "spotify-va004-01",
    title: "RED RIBBON",
    artist: "AYAKO MORI",
    spotifyTrackId: "2qFqOsh2Z0HeasyC7bv4jY",
    releaseCatalogCode: "VA 004",
    duration: "06:20",
  },
  {
    id: "spotify-va004-02",
    title: "RAVE IN PEACE",
    artist: "Isabelle Beaucamp, LADY MARU",
    spotifyTrackId: "1T8zWfYg7Ynj3aVIFpAMNg",
    releaseCatalogCode: "VA 004",
    duration: "05:50",
  },
  {
    id: "spotify-va005-01",
    title: "SENSUAL",
    artist: "ANDHRAY",
    spotifyTrackId: "5A7hfrGS41sSRTv6iQItQ6",
    releaseCatalogCode: "VA 005",
    duration: "05:15",
  },
] as const;

/**
 * Retrieves the complete list of featured Spotify tracks.
 *
 * @returns {readonly SpotifyTrackItem[]} Immutable list of featured tracks.
 */
export function getSpotifyFeaturedTracks(): readonly SpotifyTrackItem[] {
  // Step 1: Return immutable shallow copy of curated catalog
  return [...SPOTIFY_FEATURED_TRACKS];
}

/**
 * Retrieves the default initial featured Spotify track.
 *
 * @returns {SpotifyTrackItem} The default track entity.
 * @throws {Error} If the catalog is empty.
 */
export function getDefaultSpotifyTrack(): SpotifyTrackItem {
  // Step 1: Check invariant that catalog is not empty
  if (SPOTIFY_FEATURED_TRACKS.length === 0) {
    throw new Error("Violation: Spotify catalog is empty. Cannot determine default track.");
  }

  // Step 2: Return first curated track as canonical default
  return SPOTIFY_FEATURED_TRACKS[0];
}

/**
 * Finds a featured Spotify track by its unique catalog ID.
 *
 * @param {string} id - The track catalog identifier.
 * @returns {SpotifyTrackItem | undefined} The matching track entity or undefined.
 */
export function getSpotifyTrackById(id: string): SpotifyTrackItem | undefined {
  // Step 1: Invariant check - guard against non-string query
  if (!id || typeof id !== "string") {
    return undefined;
  }

  // Step 2: Find exact track match in static catalog
  return SPOTIFY_FEATURED_TRACKS.find((track) => track.id === id.trim());
}

/**
 * Finds a featured Spotify track by its parent release catalog code (e.g. 'VA 001', 'VA 005', 'IGVA005').
 *
 * @param {string} code - The release catalog identifier or code.
 * @returns {SpotifyTrackItem | undefined} The matching track entity or undefined.
 */
export function getSpotifyTrackByReleaseCode(code: string): SpotifyTrackItem | undefined {
  // Step 1: Invariant check - guard against non-string code
  if (!code || typeof code !== "string") {
    return undefined;
  }

  // Step 2: Normalize alphanumeric representation for robust cross-matching
  const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!normalized) {
    return undefined;
  }

  // Step 3: Match against catalog release codes
  return SPOTIFY_FEATURED_TRACKS.find((track) => {
    const trackCodeNormalized = track.releaseCatalogCode.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return normalized.includes(trackCodeNormalized) || trackCodeNormalized.includes(normalized);
  });
}

