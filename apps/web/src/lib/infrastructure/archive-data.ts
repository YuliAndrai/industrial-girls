/**
 * @file apps/web/src/lib/infrastructure/archive-data.ts
 * @description Layer 4: Infrastructure - Archive Artists Roster Catalog.
 *
 * ARCHITECTURAL LAYER SPECIFICATION:
 * - Layer: Layer 4 (Infrastructure & Data Persistence)
 * - Responsibility: Static dataset, catalogs, and external/internal data providers.
 * - Invariant: Self-contained. Must NEVER import from Layer 1 (Presentation),
 *   Layer 2 (Application/Hooks), or Layer 3 (Domain/Pipelines).
 * - Consumer: Consumed by Layer 3 Domain queries and Layer 1 Presentation views.
 */

/**
 * Social media and streaming profile links for a roster artist.
 */
export interface RosterArtistSocialLinks {
  /** SoundCloud profile or artist URL */
  soundcloud?: string;
  /** Resident Advisor artist profile URL */
  ra?: string;
  /** Instagram artist handle or profile URL */
  instagram?: string;
}

/**
 * Entity contract representing an artist in the Industrial Girls archive roster.
 */
export interface RosterArtistEntity {
  /** Unique normalized slug or identifier */
  id: string;
  /** Stage alias or display name */
  name: string;
  /** Country of origin / base (Spanish display name) */
  country: string;
  /** ISO 3166-1 alpha-2 country code for flag emoji and visual tags */
  countryCode: string;
  /** Dominant sonic subgenre or tactical sound style */
  subgenre: string;
  /** Optional social and streaming profile links */
  socialLinks?: {
    soundcloud?: string;
    ra?: string;
    instagram?: string;
  };
}

// Step 1: Define the immutable initial roster dataset of 8 scene artists
/**
 * Typed stub catalog containing the 8 featured scene artists who have shaped
 * the Industrial Girls international sound circuit.
 */
export const ARTISTS_ROSTER: RosterArtistEntity[] = [
  {
    id: "clara-cuve",
    name: "Clara Cuvé",
    country: "Alemania",
    countryCode: "DE",
    subgenre: "Fast & Hard Techno",
    socialLinks: {
      soundcloud: "https://soundcloud.com/claracuve",
      instagram: "https://instagram.com/claracuve",
    },
  },
  {
    id: "otta",
    name: "Øtta",
    country: "Portugal",
    countryCode: "PT",
    subgenre: "Hard Techno & Industrial",
    socialLinks: {
      soundcloud: "https://soundcloud.com/otta-music",
      instagram: "https://instagram.com/otta_techno",
    },
  },
  {
    id: "parfait",
    name: "Parfait",
    country: "Francia",
    countryCode: "FR",
    subgenre: "Industrial Groove",
    socialLinks: {
      soundcloud: "https://soundcloud.com/parfait-dj",
      instagram: "https://instagram.com/parfait_possession",
    },
  },
  {
    id: "wallis",
    name: "Wallis",
    country: "Alemania",
    countryCode: "DE",
    subgenre: "Modular Live & Industrial",
    socialLinks: {
      soundcloud: "https://soundcloud.com/wallis_live",
      instagram: "https://instagram.com/wallis_live",
    },
  },
  {
    id: "caravel",
    name: "Caravel",
    country: "Francia",
    countryCode: "FR",
    subgenre: "Dark Industrial",
    socialLinks: {
      soundcloud: "https://soundcloud.com/caravel-music",
      instagram: "https://instagram.com/caravel_music",
    },
  },
  {
    id: "somniac-one",
    name: "Somniac One",
    country: "Países Bajos",
    countryCode: "NL",
    subgenre: "Industrial Hardcore",
    socialLinks: {
      soundcloud: "https://soundcloud.com/somniacone",
      instagram: "https://instagram.com/somniacone",
    },
  },
  {
    id: "lady-maru",
    name: "Lady Maru",
    country: "Italia",
    countryCode: "IT",
    subgenre: "Acid Techno & EBM",
    socialLinks: {
      soundcloud: "https://soundcloud.com/ladymaru",
      instagram: "https://instagram.com/ladymaru_dj",
    },
  },
  {
    id: "juliana-yamasaki",
    name: "Juliana Yamasaki",
    country: "Brasil",
    countryCode: "BR",
    subgenre: "Hard Techno",
    socialLinks: {
      soundcloud: "https://soundcloud.com/julianayamasaki",
      instagram: "https://instagram.com/julianayamasaki",
    },
  },
];

// Step 2: Export getter function providing read access to the roster
/**
 * Retrieves the complete list of archive roster artists.
 *
 * @returns {RosterArtistEntity[]} An array of roster artist entities.
 */
export function getArtistsRoster(): RosterArtistEntity[] {
  // Step 2.1: Return a shallow copy of the immutable catalog to protect source state
  return [...ARTISTS_ROSTER];
}
