/**
 * @file apps/web/src/lib/infrastructure/music-data.ts
 * @description Layer 4: Infrastructure - Music Releases Catalog & Spotify Streaming Registry.
 *
 * ARCHITECTURAL LAYER SPECIFICATION:
 * - Layer: Layer 4 (Infrastructure & Data Persistence)
 * - Responsibility: Static catalog datasets for official VA compilation releases, cover images,
 *   official Spotify search streaming endpoints, and tracklists.
 * - Invariant: Pure data contracts and immutable collections. Zero upward dependencies on UI or hooks.
 * - Invariant: Clean string URLs without markdown wrappers or formatting artifacts.
 * - Consumer: Consumed by Layer 1 Presentation (MusicaView) and verified by Layer 4 TDD test suites.
 */

import {
  getPodcasts,
  getDemoDropSpecs,
  PodcastEpisode,
  DemoDropSpecifications,
  PODCASTS_CATALOG,
  DEMO_DROP_SPECS,
} from "./music-catalog";

/**
 * Metadata for a single track within an official compilation release.
 */
export interface TrackItem {
  /** Sequential track position on release (e.g., '01', '02', '03') */
  position: string;
  /** Name of the producing artist */
  artist: string;
  /** Official track title */
  title: string;
  /** Track duration in MM:SS format (optional) */
  duration?: string;
}

/**
 * Entity contract representing an official Various Artists (VA) compilation release.
 */
export interface ReleaseItem {
  /** Unique release identifier (e.g., 'va-005') */
  id: string;
  /** Canonical catalog code (e.g., 'VA 005', 'VA 004') */
  catalogCode: string;
  /** Official release title */
  title: string;
  /** Year or exact date of release */
  releaseDate: string;
  /** Release cover art path in public directory */
  coverImage: string;
  /** Official Spotify search endpoint URL */
  spotifyUrl: string;
  /** Curated tracklist items */
  tracks: TrackItem[];
}

// Step 1: Define the immutable dataset of official VA compilation releases (VA 005 to VA 001 descending)
/**
 * Immutable catalog containing the 5 official Industrial Girls Various Artists compilations,
 * sorted chronologically descending from the latest release (VA 005) to the debut (VA 001).
 */
export const RELEASES_CATALOG: readonly ReleaseItem[] = [
  {
    id: "va-005",
    catalogCode: "VA 005",
    title: "MANIFIESTO SONORO",
    releaseDate: "2026",
    coverImage: "/images/releases/va-005.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20005",
    tracks: [
      { position: "01", artist: "PAULA TEMPLE", title: "Gegen Attack", duration: "06:40" },
      { position: "02", artist: "VTSS", title: "Tunnel Acceleration", duration: "05:47" },
      { position: "03", artist: "REBEKAH", title: "Iron Flesh", duration: "06:15" },
      { position: "04", artist: "DISTORTA", title: "Sombra Rave", duration: "06:05" },
    ],
  },
  {
    id: "va-004",
    catalogCode: "VA 004",
    title: "VÓRTICE INDUSTRIAL",
    releaseDate: "2025",
    coverImage: "/images/releases/va-004.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20004",
    tracks: [
      { position: "01", artist: "CASSIE RAPTOR", title: "Láser Sangriento", duration: "05:50" },
      { position: "02", artist: "ANETHA", title: "Orbiting Fury", duration: "06:18" },
      { position: "03", artist: "SPFDJ", title: "Intoxicated Rhythm", duration: "05:42" },
      { position: "04", artist: "VANE", title: "Frecuencia Cero", duration: "05:58" },
    ],
  },
  {
    id: "va-003",
    catalogCode: "VA 003",
    title: "CADENAS & SILICIO",
    releaseDate: "2025",
    coverImage: "/images/releases/va-003.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20003",
    tracks: [
      { position: "01", artist: "PARFAIT", title: "Sensory Overdrive", duration: "06:02" },
      { position: "02", artist: "LADY MARU", title: "Roma Hardcore", duration: "05:39" },
      { position: "03", artist: "SOMNIAC ONE", title: "Percussive Warfare", duration: "06:33" },
      { position: "04", artist: "HEX99", title: "Corte de Energía", duration: "05:15" },
    ],
  },
  {
    id: "va-002",
    catalogCode: "VA 002",
    title: "DISTORSIÓN SISTÉMICA",
    releaseDate: "2025",
    coverImage: "/images/releases/va-002.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20002",
    tracks: [
      { position: "01", artist: "CLARA CUVÉ", title: "Neuro-Transmission", duration: "05:55" },
      { position: "02", artist: "ØTTA", title: "Furia Nocturna", duration: "06:20" },
      { position: "03", artist: "WALLIS", title: "Analog Brutalism", duration: "05:44" },
      { position: "04", artist: "DISTORTA", title: "Válvulas Calientes", duration: "06:10" },
    ],
  },
  {
    id: "va-001",
    catalogCode: "VA 001",
    title: "SUBTERRÁNEA CORP VOL. 1",
    releaseDate: "2024",
    coverImage: "/images/releases/va-001.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20001",
    tracks: [
      { position: "01", artist: "DISTORTA", title: "Resonancia Tóxica", duration: "05:48" },
      { position: "02", artist: "VANE", title: "Invasión Neón", duration: "06:12" },
      { position: "03", artist: "HEX99", title: "Ritual en el Sótano", duration: "05:30" },
      { position: "04", artist: "CARAVEL", title: "Black Steel", duration: "06:05" },
    ],
  },
];

// Step 2: Implement catalog retrieval accessors
/**
 * Retrieves the complete catalog of official Various Artists releases in descending chronological order.
 *
 * @returns {readonly ReleaseItem[]} Immutable array of release entities.
 */
export function getReleasesCatalog(): readonly ReleaseItem[] {
  // Step 1: Return immutable dataset reference
  return RELEASES_CATALOG;
}

/**
 * Retrieves a single release item by matching its catalog code (e.g., 'VA 005') or ID (e.g., 'va-005').
 *
 * @param {string} query - Identifier or catalog code string to match.
 * @returns {ReleaseItem | undefined} The matched release entity or undefined if not found.
 */
export function getReleaseByCode(query: string): ReleaseItem | undefined {
  // Step 1: Normalize query for case-insensitive matching
  const normalized = query.trim().toLowerCase();

  // Step 2: Search catalog items
  return RELEASES_CATALOG.find(
    (release) =>
      release.id.toLowerCase() === normalized ||
      release.catalogCode.toLowerCase() === normalized
  );
}

// Step 3: Re-export adjacent music domain resources for high cohesion
export {
  getPodcasts,
  getDemoDropSpecs,
  PODCASTS_CATALOG,
  DEMO_DROP_SPECS,
};
export type { PodcastEpisode, DemoDropSpecifications };
