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
  /** Name of the producing artist */
  artist: string;
  /** Official track title */
  title: string;
  /** Direct Spotify search or track URL */
  spotifyUrl: string;
  /** Sequential track position on release (e.g., '01', '02', '03') (optional) */
  position?: string;
  /** Track duration in MM:SS format (optional) */
  duration?: string;
}

/**
 * Entity contract representing an official Various Artists (VA) compilation release.
 */
export interface ReleaseItem {
  /** Unique release identifier (e.g., 'va-005') */
  id: string;
  /** Canonical catalog number (e.g., 'VA 005', 'VA 004') */
  catalogNumber: string;
  /** Official release title */
  title: string;
  /** Official release year (e.g., '2026') */
  year: string;
  /** Release cover art path in public directory */
  coverImage: string;
  /** Official Spotify search endpoint URL */
  spotifyUrl: string;
  /** Curated tracklist items */
  tracklist: readonly TrackItem[];
  /** Backward-compatible alias for catalogNumber */
  catalogCode?: string;
  /** Backward-compatible alias for year */
  releaseDate?: string;
  /** Backward-compatible alias for tracklist */
  tracks?: readonly TrackItem[];
}

// Step 1: Define the immutable dataset of official VA compilation releases (VA 005 to VA 001 descending)
/**
 * Immutable catalog containing the 5 official Industrial Girls Various Artists compilations,
 * sorted chronologically descending from the latest release (VA 005) to the debut (VA 001).
 */
export const RELEASES_CATALOG: readonly ReleaseItem[] = [
  {
    id: "igva-005",
    catalogNumber: "IGVA005",
    title: "INDUSTRIAL GIRLS VA 005",
    year: "2024",
    coverImage: "/images/releases/va-005.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20005",
    tracklist: [
      {
        artist: "ÆTERIS",
        title: "Psycho Moves",
        spotifyUrl: "https://open.spotify.com/search/%C3%86TERIS%20Psycho%20Moves",
      },
      {
        artist: "Lady Maru",
        title: "Imagination",
        spotifyUrl: "https://open.spotify.com/search/Lady%20Maru%20Imagination",
      },
      {
        artist: "Andhray",
        title: "Memento",
        spotifyUrl: "https://open.spotify.com/search/Andhray%20Memento",
      },
      {
        artist: "Debbiee",
        title: "Distorto",
        spotifyUrl: "https://open.spotify.com/search/Debbiee%20Distorto",
      },
      {
        artist: "Lea Node",
        title: "Altares Secretos",
        spotifyUrl: "https://open.spotify.com/search/Lea%20Node%20Altares%20Secretos",
      },
      {
        artist: "Kamra",
        title: "Ravers",
        spotifyUrl: "https://open.spotify.com/search/Kamra%20Ravers",
      },
      {
        artist: "Masicaya",
        title: "High Industrial",
        spotifyUrl: "https://open.spotify.com/search/Masicaya%20High%20Industrial",
      },
    ],
  },
  {
    id: "igva-004",
    catalogNumber: "IGVA004",
    title: "INDUSTRIAL GIRLS VA 004",
    year: "2023",
    coverImage: "/images/releases/va-004.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20004",
    tracklist: [
      {
        artist: "Ayako Mori",
        title: "Red Ribbon",
        spotifyUrl: "https://open.spotify.com/search/Ayako%20Mori%20Red%20Ribbon",
      },
      {
        artist: "Lady Maru",
        title: "Order and Anarchy",
        spotifyUrl: "https://open.spotify.com/search/Lady%20Maru%20Order%20and%20Anarchy",
      },
      {
        artist: "Isabelle Beaucamp",
        title: "Rave in Peace",
        spotifyUrl: "https://open.spotify.com/search/Isabelle%20Beaucamp%20Rave%20in%20Peace",
      },
      {
        artist: "Bietka AKA Acid Zombeat & Mind Haze",
        title: "Ghost Planes",
        spotifyUrl: "https://open.spotify.com/search/Bietka%20Ghost%20Planes",
      },
      {
        artist: "Lea Node",
        title: "I Decide To Dance",
        spotifyUrl: "https://open.spotify.com/search/Lea%20Node%20I%20Decide%20To%20Dance",
      },
      {
        artist: "Masicaya",
        title: "Bass Lad",
        spotifyUrl: "https://open.spotify.com/search/Masicaya%20Bass%20Lad",
      },
      {
        artist: "Kamra",
        title: "Du Hast Re Edit",
        spotifyUrl: "https://open.spotify.com/search/Kamra%20Du%20Hast%20Re%20Edit",
      },
      {
        artist: "Hidalgo",
        title: "Wolf",
        spotifyUrl: "https://open.spotify.com/search/Hidalgo%20Wolf",
      },
    ],
  },
  {
    id: "igva-003",
    catalogNumber: "IGVA003",
    title: "INDUSTRIAL GIRLS VA 003",
    year: "2023",
    coverImage: "/images/releases/va-003.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20003",
    tracklist: [
      {
        artist: "Jean Terechkova",
        title: "Stucked Melody",
        spotifyUrl: "https://open.spotify.com/search/Jean%20Terechkova%20Stucked%20Melody",
      },
      {
        artist: "Lady Maru",
        title: "Hardcore Summer",
        spotifyUrl: "https://open.spotify.com/search/Lady%20Maru%20Hardcore%20Summer",
      },
      {
        artist: "Daniela Fuzz",
        title: "Vandals",
        spotifyUrl: "https://open.spotify.com/search/Daniela%20Fuzz%20Vandals",
      },
      {
        artist: "Kimmy",
        title: "Agonía",
        spotifyUrl: "https://open.spotify.com/search/Kimmy%20Agon%C3%ADa",
      },
      {
        artist: "Andhray",
        title: "Girl From The Dark",
        spotifyUrl: "https://open.spotify.com/search/Andhray%20Girl%20From%20The%20Dark",
      },
      {
        artist: "Sunny K",
        title: "Our Light In Space",
        spotifyUrl: "https://open.spotify.com/search/Sunny%20K%20Our%20Light%20In%20Space",
      },
      {
        artist: "Anjylyk",
        title: "Relative Freedom",
        spotifyUrl: "https://open.spotify.com/search/Anjylyk%20Relative%20Freedom",
      },
      {
        artist: "Kamra",
        title: "Rebirth",
        spotifyUrl: "https://open.spotify.com/search/Kamra%20Rebirth",
      },
      {
        artist: "Masicaya",
        title: "Jump Corrosive",
        spotifyUrl: "https://open.spotify.com/search/Masicaya%20Jump%20Corrosive",
      },
    ],
  },
  {
    id: "igva-002",
    catalogNumber: "IGVA002",
    title: "INDUSTRIAL GIRLS VA 002",
    year: "2022",
    coverImage: "/images/releases/va-002.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20002",
    tracklist: [
      {
        artist: "Daniela Fuzz",
        title: "Bangover",
        spotifyUrl: "https://open.spotify.com/search/Daniela%20Fuzz%20Bangover",
      },
      {
        artist: "Debbie & Andhray",
        title: "Feline Blink",
        spotifyUrl: "https://open.spotify.com/search/Debbie%20Andhray%20Feline%20Blink",
      },
      {
        artist: "Zaphy",
        title: "Don't Be Afraid",
        spotifyUrl: "https://open.spotify.com/search/Zaphy%20Don't%20Be%20Afraid",
      },
      {
        artist: "Paula Vélez",
        title: "Spektra",
        spotifyUrl: "https://open.spotify.com/search/Paula%20V%C3%A9lez%20Spektra",
      },
      {
        artist: "Sunny K & Masicaya",
        title: "Kidding",
        spotifyUrl: "https://open.spotify.com/search/Sunny%20K%20Masicaya%20Kidding",
      },
      {
        artist: "Celeste Betancur",
        title: "Hyperion",
        spotifyUrl: "https://open.spotify.com/search/Celeste%20Betancur%20Hyperion",
      },
    ],
  },
  {
    id: "igva-001",
    catalogNumber: "IGVA001",
    title: "INDUSTRIAL GIRLS VA 001",
    year: "2021",
    coverImage: "/images/releases/va-001.jpg",
    spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20001",
    tracklist: [
      {
        artist: "Juliana Yamasaki",
        title: "Sensor",
        spotifyUrl: "https://open.spotify.com/search/Juliana%20Yamasaki%20Sensor",
      },
      {
        artist: "Caravel",
        title: "Wounded Pride",
        spotifyUrl: "https://open.spotify.com/search/Caravel%20Wounded%20Pride",
      },
      {
        artist: "BB Deng",
        title: "Broken Ego",
        spotifyUrl: "https://open.spotify.com/search/BB%20Deng%20Broken%20Ego",
      },
      {
        artist: "Camila Villegas",
        title: "Sticky",
        spotifyUrl: "https://open.spotify.com/search/Camila%20Villegas%20Sticky",
      },
      {
        artist: "Andhray",
        title: "Trip In The City",
        spotifyUrl: "https://open.spotify.com/search/Andhray%20Trip%20In%20The%20City",
      },
      {
        artist: "Sunny K",
        title: "Electric Voices",
        spotifyUrl: "https://open.spotify.com/search/Sunny%20K%20Electric%20Voices",
      },
      {
        artist: "Zige",
        title: "Futuro Primitivo",
        spotifyUrl: "https://open.spotify.com/search/Zige%20Futuro%20Primitivo",
      },
    ],
  },
] as const;

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
 * Retrieves a single release item by matching its catalog number (e.g., 'IGVA005', 'VA 005') or ID (e.g., 'igva-005').
 *
 * @param {string} query - Identifier or catalog code string to match.
 * @returns {ReleaseItem | undefined} The matched release entity or undefined if not found.
 */
export function getReleaseByCode(query: string): ReleaseItem | undefined {
  // Step 1: Normalize query for case-insensitive matching
  const normalized = query.trim().toLowerCase().replace(/[\s-_]/g, "");

  // Step 2: Search catalog items
  return RELEASES_CATALOG.find((release) => {
    const rId = release.id.toLowerCase().replace(/[\s-_]/g, "");
    const rCat = release.catalogNumber.toLowerCase().replace(/[\s-_]/g, "");
    return (
      rId === normalized ||
      rCat === normalized ||
      rId.replace(/^ig/, "") === normalized.replace(/^ig/, "") ||
      rCat.replace(/^ig/, "") === normalized.replace(/^ig/, "")
    );
  });
}

// Step 3: Re-export adjacent music domain resources for high cohesion
export {
  getPodcasts,
  getDemoDropSpecs,
  PODCASTS_CATALOG,
  DEMO_DROP_SPECS,
};
export type { PodcastEpisode, DemoDropSpecifications };
