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
  /** Unique track identifier within the compilation (e.g. 'va005-01') */
  id: string;
  /** Name of the producing artist */
  artist: string;
  /** Official track title */
  title: string;
  /** Direct Spotify search or track URL */
  spotifyUrl: string;
  /** Official verified Spotify Track ID (22-character Base62) */
  spotifyTrackId: string;
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
  /** Official Spotify search or album endpoint URL */
  spotifyUrl: string;
  /** Official verified Spotify Album ID (22-character Base62) (optional) */
  spotifyAlbumId?: string;
  /** Direct official buy URL (Bandcamp or Beatport) */
  buyUrl: string;
  /** Dynamic label designating the purchase platform */
  buyLabel: "BANDCAMP" | "BEATPORT";
  /** Curated tracklist items */
  tracklist: readonly TrackItem[];
  /** Backward-compatible alias for catalogNumber */
  catalogCode?: string;
  /** Backward-compatible alias for year */
  releaseDate?: string;
  /** Backward-compatible alias for tracklist */
  tracks?: readonly TrackItem[];
  /** Backward-compatible alias for Beatport purchase link */
  beatportUrl?: string;
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
    buyUrl: "https://www.beatport.com/es/label/industrial-girls/106032",
    buyLabel: "BEATPORT",
    beatportUrl: "https://www.beatport.com/es/label/industrial-girls/106032",
    tracklist: [
      {
        id: "va005-01",
        artist: "ÆTERIS",
        title: "Psycho Moves",
        spotifyUrl: "https://open.spotify.com/track/1aE5hVRBrKqTioBzjWySd8",
        spotifyTrackId: "1aE5hVRBrKqTioBzjWySd8",
      },
      {
        id: "va005-02",
        artist: "Lady Maru",
        title: "Imagination",
        spotifyUrl: "https://open.spotify.com/track/0s9qHgMXQOAdtyCm0cKKJf",
        spotifyTrackId: "0s9qHgMXQOAdtyCm0cKKJf",
      },
      {
        id: "va005-03",
        artist: "Andhray",
        title: "Memento",
        spotifyUrl: "https://open.spotify.com/track/68KwzzA0ybAGpUALiaJ0Ci",
        spotifyTrackId: "68KwzzA0ybAGpUALiaJ0Ci",
      },
      {
        id: "va005-04",
        artist: "Lea Node",
        title: "Altares Secretos",
        spotifyUrl: "https://open.spotify.com/track/2BU8u2A3MgSVvG6rWm2Pfw",
        spotifyTrackId: "2BU8u2A3MgSVvG6rWm2Pfw",
      },
      {
        id: "va005-05",
        artist: "Kamra",
        title: "Ravers",
        spotifyUrl: "https://open.spotify.com/track/7xHKKtBg84nBXXmR7WzRyn",
        spotifyTrackId: "7xHKKtBg84nBXXmR7WzRyn",
      },
      {
        id: "va005-06",
        artist: "Masicaya",
        title: "High Industrial",
        spotifyUrl: "https://open.spotify.com/track/1shXcDkaOF8h5eDMqlIovR",
        spotifyTrackId: "1shXcDkaOF8h5eDMqlIovR",
      },
    ],
  },
  {
    id: "igva-004",
    catalogNumber: "IGVA004",
    title: "INDUSTRIAL GIRLS VA 004",
    year: "2023",
    coverImage: "/images/releases/va-004.jpg",
    spotifyUrl: "https://open.spotify.com/album/2NYM9hi9JCz7fe0CIUv6hO",
    spotifyAlbumId: "2NYM9hi9JCz7fe0CIUv6hO",
    buyUrl: "https://industrialgirls.bandcamp.com/album/industrial-girls-004",
    buyLabel: "BANDCAMP",
    beatportUrl: "https://industrialgirls.bandcamp.com/album/industrial-girls-004",
    tracklist: [
      {
        id: "va004-01",
        artist: "Ayako Mori",
        title: "Red Ribbon",
        spotifyUrl: "https://open.spotify.com/track/2qFqOsh2Z0HeasyC7bv4jY",
        spotifyTrackId: "2qFqOsh2Z0HeasyC7bv4jY",
      },
      {
        id: "va004-02",
        artist: "Lady Maru",
        title: "Order and Anarchy",
        spotifyUrl: "https://open.spotify.com/track/7oQdWfeMVdfCeK6rF1aSAC",
        spotifyTrackId: "7oQdWfeMVdfCeK6rF1aSAC",
      },
      {
        id: "va004-03",
        artist: "Isabelle Beaucamp",
        title: "Rave in Peace",
        spotifyUrl: "https://open.spotify.com/track/1T8zWfYg7Ynj3aVIFpAMNg",
        spotifyTrackId: "1T8zWfYg7Ynj3aVIFpAMNg",
      },
      {
        id: "va004-04",
        artist: "Bietka AKA Acid Zombeat & Mind Haze",
        title: "Ghost Planes",
        spotifyUrl: "https://open.spotify.com/track/1EQgQ3cOC2nlnjcfRYOIRg",
        spotifyTrackId: "1EQgQ3cOC2nlnjcfRYOIRg",
      },
      {
        id: "va004-05",
        artist: "Lea Node",
        title: "I Decide To Dance",
        spotifyUrl: "https://open.spotify.com/track/7jqzqB7aD2fEOTQ6N95DZZ",
        spotifyTrackId: "7jqzqB7aD2fEOTQ6N95DZZ",
      },
      {
        id: "va004-06",
        artist: "Masicaya",
        title: "Bass Lad",
        spotifyUrl: "https://open.spotify.com/track/6niiGkuOQpw06URwC623sh",
        spotifyTrackId: "6niiGkuOQpw06URwC623sh",
      },
      {
        id: "va004-07",
        artist: "Kamra",
        title: "Du Hast Re Edit",
        spotifyUrl: "https://open.spotify.com/track/4sVJddkcjoaDXEkdgRqnEJ",
        spotifyTrackId: "4sVJddkcjoaDXEkdgRqnEJ",
      },
      {
        id: "va004-08",
        artist: "Hidalgo",
        title: "Wolf",
        spotifyUrl: "https://open.spotify.com/track/1d3UoEo7SUANbhzbV8G1vJ",
        spotifyTrackId: "1d3UoEo7SUANbhzbV8G1vJ",
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
    buyUrl: "https://www.beatport.com/es/release/industrial-girls-va-003/3953660",
    buyLabel: "BEATPORT",
    beatportUrl: "https://www.beatport.com/es/release/industrial-girls-va-003/3953660",
    tracklist: [
      {
        id: "va003-01",
        artist: "Jean Terechkova",
        title: "Stucked Melody",
        spotifyUrl: "https://open.spotify.com/track/76M9sQMotKmcaPHwGwGA57",
        spotifyTrackId: "76M9sQMotKmcaPHwGwGA57",
      },
      {
        id: "va003-02",
        artist: "Lady Maru",
        title: "Hardcore Summer",
        spotifyUrl: "https://open.spotify.com/track/3xMO7xM0RZs9yXiBmyAUv2",
        spotifyTrackId: "3xMO7xM0RZs9yXiBmyAUv2",
      },
      {
        id: "va003-03",
        artist: "Daniela Fuzz",
        title: "Vandals",
        spotifyUrl: "https://open.spotify.com/track/2cFvt0nWjZtNajA7vT4yFQ",
        spotifyTrackId: "2cFvt0nWjZtNajA7vT4yFQ",
      },
      {
        id: "va003-04",
        artist: "Kimmy",
        title: "Agonía",
        spotifyUrl: "https://open.spotify.com/track/35mvBvDm0KGIJlvaWoubDW",
        spotifyTrackId: "35mvBvDm0KGIJlvaWoubDW",
      },
      {
        id: "va003-05",
        artist: "Andhray",
        title: "Girl From The Dark",
        spotifyUrl: "https://open.spotify.com/track/1MzPqm1xWPSXZp9WtZimTp",
        spotifyTrackId: "1MzPqm1xWPSXZp9WtZimTp",
      },
      {
        id: "va003-06",
        artist: "Sunny K",
        title: "Our Light In Space",
        spotifyUrl: "https://open.spotify.com/track/6Etsan7if7Fo6bImwKp31y",
        spotifyTrackId: "6Etsan7if7Fo6bImwKp31y",
      },
      {
        id: "va003-07",
        artist: "Anjylyk",
        title: "Relative Freedom",
        spotifyUrl: "https://open.spotify.com/track/5b1U76M6KrTxqSKUNnd2rY",
        spotifyTrackId: "5b1U76M6KrTxqSKUNnd2rY",
      },
      {
        id: "va003-08",
        artist: "Kamra",
        title: "Rebirth",
        spotifyUrl: "https://open.spotify.com/track/4u19iBA7h8nWfBEJ2FOLTA",
        spotifyTrackId: "4u19iBA7h8nWfBEJ2FOLTA",
      },
      {
        id: "va003-09",
        artist: "Masicaya",
        title: "Jump Corrosive",
        spotifyUrl: "https://open.spotify.com/track/62vfDtOYYUIDRdGVKsnbyY",
        spotifyTrackId: "62vfDtOYYUIDRdGVKsnbyY",
      },
    ],
  },
  {
    id: "igva-002",
    catalogNumber: "IGVA002",
    title: "INDUSTRIAL GIRLS VA 002",
    year: "2022",
    coverImage: "/images/releases/va-002.jpg",
    spotifyUrl: "https://open.spotify.com/album/0EcJxLjGjzv5Y6xNkp62h8",
    spotifyAlbumId: "0EcJxLjGjzv5Y6xNkp62h8",
    buyUrl: "https://www.beatport.com/es/release/industrial-girls-002/4716681",
    buyLabel: "BEATPORT",
    beatportUrl: "https://www.beatport.com/es/release/industrial-girls-002/4716681",
    tracklist: [
      {
        id: "va002-01",
        artist: "Daniela Fuzz",
        title: "Bangover",
        spotifyUrl: "https://open.spotify.com/track/6CP1glCdRIXs8ceNKjuAiU",
        spotifyTrackId: "6CP1glCdRIXs8ceNKjuAiU",
      },
      {
        id: "va002-02",
        artist: "Debbie & Andhray",
        title: "Feline Blink",
        spotifyUrl: "https://open.spotify.com/track/30TPs7A1WVHiqR3xCdh2TF",
        spotifyTrackId: "30TPs7A1WVHiqR3xCdh2TF",
      },
      {
        id: "va002-03",
        artist: "Zaphy",
        title: "Don't Be Afraid",
        spotifyUrl: "https://open.spotify.com/track/0dPOiajyCRuZxFsyNvhScD",
        spotifyTrackId: "0dPOiajyCRuZxFsyNvhScD",
      },
      {
        id: "va002-04",
        artist: "Paula Vélez",
        title: "Spektra",
        spotifyUrl: "https://open.spotify.com/track/3TwZQgWMB2b3xtdlZjDJd7",
        spotifyTrackId: "3TwZQgWMB2b3xtdlZjDJd7",
      },
      {
        id: "va002-05",
        artist: "Celeste Betancur",
        title: "Hyperion",
        spotifyUrl: "https://open.spotify.com/track/31QWYY2QIyDk0ePMTCkrZl",
        spotifyTrackId: "31QWYY2QIyDk0ePMTCkrZl",
      },
    ],
  },
  {
    id: "igva-001",
    catalogNumber: "IGVA001",
    title: "INDUSTRIAL GIRLS VA 001",
    year: "2021",
    coverImage: "/images/releases/va-001.jpg",
    spotifyUrl: "https://open.spotify.com/album/0e32qlFYpBFxqXyQxKl6AV",
    spotifyAlbumId: "0e32qlFYpBFxqXyQxKl6AV",
    buyUrl: "https://www.beatport.com/es/release/industrial-girls-001/3916941",
    buyLabel: "BEATPORT",
    beatportUrl: "https://www.beatport.com/es/release/industrial-girls-001/3916941",
    tracklist: [
      {
        id: "va001-01",
        artist: "Juliana Yamasaki",
        title: "Sensor",
        spotifyUrl: "https://open.spotify.com/track/3VBn3rngTQXhAzvMbtkD1N",
        spotifyTrackId: "3VBn3rngTQXhAzvMbtkD1N",
      },
      {
        id: "va001-02",
        artist: "Caravel",
        title: "Wounded Pride",
        spotifyUrl: "https://open.spotify.com/track/6TphGLmyTqbmvuwvRrIFHo",
        spotifyTrackId: "6TphGLmyTqbmvuwvRrIFHo",
      },
      {
        id: "va001-03",
        artist: "BB Deng",
        title: "Broken Ego",
        spotifyUrl: "https://open.spotify.com/track/2EQopxt5nX5VcGE59fUSUN",
        spotifyTrackId: "2EQopxt5nX5VcGE59fUSUN",
      },
      {
        id: "va001-04",
        artist: "Camila Villegas",
        title: "Sticky",
        spotifyUrl: "https://open.spotify.com/track/2l47vO7JN60OWixQCJOQfm",
        spotifyTrackId: "2l47vO7JN60OWixQCJOQfm",
      },
      {
        id: "va001-05",
        artist: "Andhray",
        title: "Trip In The City",
        spotifyUrl: "https://open.spotify.com/track/2wy4ZpkMSeDphIjfEeZ98d",
        spotifyTrackId: "2wy4ZpkMSeDphIjfEeZ98d",
      },
      {
        id: "va001-06",
        artist: "Sunny K",
        title: "Electric Voices",
        spotifyUrl: "https://open.spotify.com/track/071jkVavDcCGrBLgYNClxH",
        spotifyTrackId: "071jkVavDcCGrBLgYNClxH",
      },
      {
        id: "va001-07",
        artist: "Zige",
        title: "Futuro Primitivo",
        spotifyUrl: "https://open.spotify.com/track/3kXIeSkjEurUICeZvaGGIS",
        spotifyTrackId: "3kXIeSkjEurUICeZvaGGIS",
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
