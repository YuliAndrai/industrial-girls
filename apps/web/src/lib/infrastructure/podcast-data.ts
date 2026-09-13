/**
 * @file apps/web/src/lib/infrastructure/podcast-data.ts
 * @description Layer 4: Infrastructure - Official Industrial Girls Podcast Series Catalog (IG MIX 001 - 004).
 *
 * ARCHITECTURAL LAYER SPECIFICATION:
 * - Layer: Layer 4 (Infrastructure & Data Persistence)
 * - Responsibility: Static catalog dataset for official podcast episodes, cover images,
 *   SoundCloud streaming links (primary priority), and YouTube videostream links.
 * - Invariant: Pure data contracts and immutable collections. Zero upward dependencies on UI or React hooks.
 * - Invariant: Clean HTTPS string URLs without markdown wrappers or formatting artifacts.
 * - Consumer: Consumed by Layer 1 Presentation (MusicaView) and verified by Layer 4 TDD test suites.
 */

/**
 * Entity contract representing an official Industrial Girls Podcast episode.
 */
export interface PodcastEpisode {
  /** Unique podcast episode identifier (e.g., 'ig-mix-004') */
  id: string;
  /** Three-digit formatted series number (e.g., '004', '003') */
  seriesNumber: string;
  /** Guest selector / artist name */
  artist: string;
  /** Full official episode title */
  title: string;
  /** Local cover image path in public directory */
  coverImage: string;
  /** Official SoundCloud streaming URL */
  soundcloudUrl: string;
  /** Official YouTube video stream URL */
  youtubeUrl: string;
}

// Step 1: Define immutable podcast episodes catalog (IG MIX 004 down to IG MIX 001 descending)
/**
 * Immutable catalog containing the 4 official Industrial Girls Podcast episodes,
 * sorted chronologically descending from the latest release (Mix 004) to the debut (Mix 001).
 */
export const PODCASTS_CATALOG: readonly PodcastEpisode[] = [
  {
    id: "ig-mix-004",
    seriesNumber: "004",
    artist: "MMELL",
    title: "MMELL - INDUSTRIAL GIRLS MIX 004",
    coverImage: "/images/podcasts/mix-004.jpg",
    soundcloudUrl: "https://soundcloud.com/industrial_girls/mmell-industrial-girls-mix-004",
    youtubeUrl: "https://www.youtube.com/watch?v=JMhSTzArGs4",
  },
  {
    id: "ig-mix-003",
    seriesNumber: "003",
    artist: "TECHSIA",
    title: "TECHSIA - INDUSTRIAL GIRLS MIX 003",
    coverImage: "/images/podcasts/mix-003.jpg",
    soundcloudUrl: "https://soundcloud.com/industrial_girls/techsia-industrial-girls-mix",
    youtubeUrl: "https://www.youtube.com/watch?v=sYw5NP2YRlo",
  },
  {
    id: "ig-mix-002",
    seriesNumber: "002",
    artist: "DJ HOTMAIL",
    title: "DJ HOTMAIL - INDUSTRIAL GIRLS MIX 002",
    coverImage: "/images/podcasts/mix-002.jpg",
    soundcloudUrl: "https://soundcloud.com/industrial_girls/dj-hotmail-industrial-girls-mix-002",
    youtubeUrl: "https://www.youtube.com/watch?v=WgiQESZ_R0c",
  },
  {
    id: "ig-mix-001",
    seriesNumber: "001",
    artist: "ANNIE",
    title: "ANNIE - INDUSTRIAL GIRLS MIX 001",
    coverImage: "/images/podcasts/mix-001.jpg",
    soundcloudUrl: "https://soundcloud.com/industrial_girls/annie-industrial-girls-mix-001",
    youtubeUrl: "https://www.youtube.com/watch?v=eGicUSgE7bg",
  },
] as const;

// Step 2: Implement catalog accessor functions
/**
 * Retrieves the complete collection of podcast episodes in descending chronological order (004 to 001).
 *
 * @returns {readonly PodcastEpisode[]} Immutable array of podcast episodes.
 */
export function getPodcastsCatalog(): readonly PodcastEpisode[] {
  // Step 1: Return immutable dataset reference
  return PODCASTS_CATALOG;
}

/**
 * Retrieves a single podcast episode by series number (e.g., '004', '4') or ID (e.g., 'ig-mix-004').
 *
 * @param {string} query - Identifier or series number to search.
 * @returns {PodcastEpisode | undefined} The matched episode or undefined if not found.
 */
export function getPodcastBySeries(query: string): PodcastEpisode | undefined {
  // Step 1: Normalize query string
  const normalized = query.trim().toLowerCase().replace(/[\s-_]/g, "");

  // Step 2: Match against catalog items
  return PODCASTS_CATALOG.find((episode) => {
    const epId = episode.id.toLowerCase().replace(/[\s-_]/g, "");
    const epSeries = episode.seriesNumber.toLowerCase().replace(/[\s-_]/g, "");
    return (
      epId === normalized ||
      epSeries === normalized ||
      epSeries.replace(/^0+/, "") === normalized.replace(/^0+/, "") ||
      epId.replace(/^igmix/, "") === normalized.replace(/^igmix/, "")
    );
  });
}
