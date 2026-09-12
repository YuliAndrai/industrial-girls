/**
 * @file apps/web/src/lib/infrastructure/archive-data.ts
 * @description Layer 4: Infrastructure - Archive Artists Roster & Media Archive Catalog.
 *
 * ARCHITECTURAL LAYER SPECIFICATION:
 * - Layer: Layer 4 (Infrastructure & Data Persistence)
 * - Responsibility: Static dataset, catalogs, and external/internal data providers.
 * - Invariant: Self-contained. Must NEVER import from Layer 1 (Presentation),
 *   Layer 2 (Application/Hooks), or Layer 3 (Domain/Pipelines).
 * - Invariant: Strictly musical scene catalog. Zero musical genres or subgenres properties.
 * - Consumer: Consumed by Layer 3 Domain queries and Layer 1 Presentation views.
 */

/**
 * Social media and streaming profile links for a roster artist.
 */
export interface ArtistProfileLinks {
  /** Spotify artist profile or discography URL */
  spotify?: string;
  /** SoundCloud profile or artist URL */
  soundcloud?: string;
  /** Resident Advisor artist profile URL */
  residentAdvisor?: string;
  /** Instagram artist handle or profile URL */
  instagram?: string;
  /** Bandcamp discography or store URL */
  bandcamp?: string;
}

/**
 * Entity contract representing an artist in the Industrial Girls archive roster.
 */
export interface ArtistProfile {
  /** Unique normalized slug or identifier */
  id: string;
  /** Stage alias or display name */
  name: string;
  /** Country of origin / base (Spanish display name) */
  country: string;
  /** ISO 3166-1 alpha-2 country code for flag emoji and visual tags */
  countryCode: string;
}

/**
 * Backward-compatible type alias for legacy references.
 */
export type RosterArtistEntity = ArtistProfile;

// Step 1: Define the immutable initial roster dataset of 44 scene artists
/**
 * Typed catalog containing the 44 featured scene artists who have shaped
 * the Industrial Girls international sound circuit.
 */
export const ARTISTS_ROSTER: readonly ArtistProfile[] = [
  {
    id: "clara-cuve",
    name: "Clara Cuvé",
    country: "Alemania",
    countryCode: "DE",
  },
  {
    id: "otta",
    name: "Øtta",
    country: "Portugal",
    countryCode: "PT",
  },
  {
    id: "parfait",
    name: "Parfait",
    country: "Francia",
    countryCode: "FR",
  },
  {
    id: "lessss",
    name: "Lessss",
    country: "Francia",
    countryCode: "FR",
  },
  {
    id: "wallis",
    name: "Wallis",
    country: "Alemania",
    countryCode: "DE",
  },
  {
    id: "ayako-mori",
    name: "Ayako Mori",
    country: "Japón",
    countryCode: "JP",
  },
  {
    id: "lady-maru",
    name: "Lady Maru",
    country: "Italia",
    countryCode: "IT",
  },
  {
    id: "jean-terechkova",
    name: "Jean Terechkova",
    country: "Francia",
    countryCode: "FR",
  },
  {
    id: "somniac-one",
    name: "Somniac One",
    country: "Países Bajos",
    countryCode: "NL",
  },
  {
    id: "la-penderie-noire",
    name: "La Penderie Noire",
    country: "Bélgica",
    countryCode: "BE",
  },
  {
    id: "laren",
    name: "Laren",
    country: "Turquía",
    countryCode: "TR",
  },
  {
    id: "caravel",
    name: "Caravel",
    country: "Francia",
    countryCode: "FR",
  },
  {
    id: "debbie",
    name: "Debbie",
    country: "Italia",
    countryCode: "IT",
  },
  {
    id: "vinka-wydro",
    name: "Vinka Wydro",
    country: "Francia",
    countryCode: "FR",
  },
  {
    id: "dance-divine",
    name: "Dance Divine",
    country: "Francia / Bélgica",
    countryCode: "FR",
  },
  {
    id: "andhray",
    name: "Andhray",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "paula-velez",
    name: "Paula Vélez",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "daniela-fuzz",
    name: "Daniela Fuzz",
    country: "Chile",
    countryCode: "CL",
  },
  {
    id: "sunny-k",
    name: "Sunny K",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "camila-villegas",
    name: "Camila Villegas",
    country: "Argentina",
    countryCode: "AR",
  },
  {
    id: "kimmy",
    name: "Kimmy",
    country: "Chile",
    countryCode: "CL",
  },
  {
    id: "zaphy",
    name: "Zaphy",
    country: "Chile",
    countryCode: "CL",
  },
  {
    id: "anjylyk",
    name: "Anjylyk",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "masicaya",
    name: "Masicaya",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "kamra",
    name: "Kamra",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "lea-node",
    name: "Lea Node",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "hidalgo",
    name: "Hidalgo",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "celeste-betancur",
    name: "Celeste Betancur",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "isabelle-beaucamp",
    name: "Isabelle Beaucamp",
    country: "Alemania",
    countryCode: "DE",
  },
  {
    id: "juliana-yamasaki",
    name: "Juliana Yamasaki",
    country: "Brasil",
    countryCode: "BR",
  },
  {
    id: "stinny-stone",
    name: "Stinny Stone",
    country: "Alemania",
    countryCode: "DE",
  },
  {
    id: "annie",
    name: "ANNIE",
    country: "Italia",
    countryCode: "IT",
  },
  {
    id: "dj-hotmail",
    name: "DJ HOTMAIL",
    country: "Turquía",
    countryCode: "TR",
  },
  {
    id: "killer-queen",
    name: "KILLER QUEEN",
    country: "Italia",
    countryCode: "IT",
  },
  {
    id: "sklena",
    name: "SKLENA",
    country: "Francia",
    countryCode: "FR",
  },
  {
    id: "node",
    name: "NØDE",
    country: "Italia",
    countryCode: "IT",
  },
  {
    id: "elen-payne",
    name: "ELEN PAYNE",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "techsia",
    name: "TECHSIA",
    country: "Italia",
    countryCode: "IT",
  },
  {
    id: "mmell",
    name: "MMELL",
    country: "Italia",
    countryCode: "IT",
  },
  {
    id: "roma",
    name: "ROMA",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "keith-barrera",
    name: "KEITH BARRERA",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "briela-veneno",
    name: "BRIELA VENENO",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "sai",
    name: "SAI",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "sophia",
    name: "SOPHIA",
    country: "Colombia",
    countryCode: "CO",
  },
] as const;

// Step 2: Export getter function providing read access to the roster
/**
 * Retrieves the complete list of archive roster artists.
 *
 * @returns {readonly ArtistProfile[]} An array of roster artist entities.
 */
export function getArtistsRoster(): readonly ArtistProfile[] {
  // Step 2.1: Return a shallow copy of the immutable catalog to protect source state
  return [...ARTISTS_ROSTER];
}

/**
 * Entity contract representing a unified video record in the Industrial Girls archive
 * (native local HTML5 video or external YouTube stream broadcast).
 */
export interface ArchiveVideoItem {
  readonly id: string;
  readonly type: "local" | "youtube";
  readonly src: string;
  readonly title?: string;
  readonly thumbnailUrl?: string;
  readonly url?: string;
  readonly youtubeId?: string;
}

/**
 * Backward-compatible type alias for ArchiveVideo.
 */
export type ArchiveVideo = ArchiveVideoItem;

// Step 3: Define the immutable unified archive video catalog (4 local + 3 YouTube)
/**
 * Typed catalog containing 7 unified video records documenting live field captures,
 * direct club broadcasts, and international hybrid showcases.
 */
export const ARCHIVE_VIDEOS: readonly ArchiveVideoItem[] = [
  // 4 Videos Locales restantes (CERO TEXTOS, CERO NOMBRES)
  { id: "vid-01", type: "local", src: "/videos/archive/video-01.mp4" },
  { id: "vid-02", type: "local", src: "/videos/archive/video-02.mp4" },
  { id: "vid-03", type: "local", src: "/videos/archive/video-03.mp4" },
  { id: "vid-04", type: "local", src: "/videos/archive/video-04.mp4" },

  // 3 Videos YouTube: Títulos literales provistos por el usuario
  {
    id: "yt-01",
    type: "youtube",
    title: "IVKA & HAZEL - ANTISISTEMA X INDUSTRIAL GIRLS (BOGOTÁ)",
    src: "https://youtu.be/AXM433YoYzQ",
    url: "https://youtu.be/AXM433YoYzQ",
    youtubeId: "AXM433YoYzQ",
    thumbnailUrl: "https://img.youtube.com/vi/AXM433YoYzQ/hqdefault.jpg",
  },
  {
    id: "yt-02",
    type: "youtube",
    title: "Industrial Girls - Juliana Yamasaki",
    src: "https://www.youtube.com/live/hePpvpRLwwc",
    url: "https://www.youtube.com/live/hePpvpRLwwc",
    youtubeId: "hePpvpRLwwc",
    thumbnailUrl: "https://img.youtube.com/vi/hePpvpRLwwc/hqdefault.jpg",
  },
  {
    id: "yt-03",
    type: "youtube",
    title: "INDUSTRIAL GIRLS - 4TO ANIVERSARIO 02 DIC 2023",
    src: "https://youtu.be/4vaopkiPKhc",
    url: "https://youtu.be/4vaopkiPKhc",
    youtubeId: "4vaopkiPKhc",
    thumbnailUrl: "https://img.youtube.com/vi/4vaopkiPKhc/hqdefault.jpg",
  },
] as const;

// Step 4: Export getter function providing read access to real archive videos
/**
 * Retrieves the complete list of unified archive videos (local native + YouTube).
 *
 * @returns {readonly ArchiveVideoItem[]} An array of archive video entities.
 */
export function getArchiveVideos(): readonly ArchiveVideoItem[] {
  // Step 4.1: Return a shallow copy of the immutable catalog to protect source state
  return [...ARCHIVE_VIDEOS];
}

/**
 * Entity contract representing a photographic or audiovisual record in the Industrial Girls media archive.
 * @deprecated Use ArchiveVideoItem or ArchivePhoto instead.
 */
export interface MediaArchiveItem {
  id: string;
  title: string;
  date: string;
  location: string;
  type: "photo" | "video";
  mediaUrl: string;
  caption: string;
  duration?: string;
  thumbnailUrl?: string;
}

/**
 * Curated media archive items mapping real YouTube and local videos without mock records.
 */
export const MEDIA_ARCHIVE: readonly MediaArchiveItem[] = ARCHIVE_VIDEOS.map((v) => ({
  id: v.id,
  title: v.title || v.id,
  date: "2026-03-01",
  location: v.type === "local" ? "Archivo Local" : "YouTube Oficial",
  type: "video" as const,
  mediaUrl: v.src,
  caption: v.title || v.id,
  thumbnailUrl: v.thumbnailUrl || "",
}));

/**
 * Retrieves the list of media archive items.
 *
 * @returns {readonly MediaArchiveItem[]} An array of media archive entities.
 */
export function getMediaArchiveItems(): readonly MediaArchiveItem[] {
  return [...MEDIA_ARCHIVE];
}

// Step 5: Define ArchivePhoto contract for photographic captures
/**
 * Entity contract representing a photographic visual frame in the Industrial Girls archive.
 */
export interface ArchivePhoto {
  /** Unique photo identifier (e.g. photo-01) */
  id: string;
  /** Public asset URL for the photo */
  url: string;
  /** Descriptive alternative text */
  alt: string;
}

/**
 * Total count of verified unique photographic visual frames in the archive catalog
 * after advanced binary hash and visual perceptual deduplication.
 */
export const TOTAL_UNIQUE_PHOTOS = 37;

// Step 6: Define the immutable unique photo archive catalog
/**
 * Typed catalog containing the 37 verified unique photographic visual frames recorded across
 * Industrial Girls raves, club nights, and warehouse showcases.
 */
export const ARCHIVE_PHOTOS: readonly ArchivePhoto[] = Object.freeze(
  Array.from({ length: TOTAL_UNIQUE_PHOTOS }, (_, i) => {
    const index = String(i + 1).padStart(2, "0");
    return {
      id: `photo-${index}`,
      url: `/images/archive/photo-${index}.jpg`,
      alt: `Industrial Girls Archive Visual Frame ${index}`,
    };
  })
);

// Step 7: Export getter function providing read access to the archive photos
/**
 * Retrieves the complete list of unique archive visual photos.
 *
 * @returns {readonly ArchivePhoto[]} An array of unique archive photo entities.
 */
export function getArchivePhotos(): readonly ArchivePhoto[] {
  // Step 7.1: Return a shallow copy of the immutable catalog to protect source state
  return [...ARCHIVE_PHOTOS];
}

