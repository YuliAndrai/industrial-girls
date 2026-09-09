/**
 * @file apps/web/src/lib/infrastructure/music-catalog.ts
 * @description Layer 4: Infrastructure - Static Catalog for Music Section (/musica).
 * Strongly typed datasets for compilations (VA 001-005), podcast sessions (IG MIX 001-004), and demo drop specs.
 */

/**
 * Track metadata within a compilation release.
 */
export interface CompilationTrack {
  /** Sequential track position on release (e.g., 'A1', 'B2', '01') */
  position: string;
  /** Name of the producing artist */
  artist: string;
  /** Track title */
  title: string;
  /** Track duration string */
  duration: string;
}

/**
 * Various Artists (VA) compilation release entity.
 */
export interface CompilationRelease {
  /** Unique release identifier (e.g., 'va-001') */
  id: string;
  /** Canonical catalog code (e.g., 'IGVA001') */
  catalogCode: string;
  /** Release title */
  title: string;
  /** Release subtitle / theme */
  subtitle: string;
  /** Year of release */
  year: string;
  /** Release cover art path */
  coverImage: string;
  /** Tracklist items */
  tracks: CompilationTrack[];
  /** Streaming and purchase links */
  links: {
    bandcamp: string;
    beatport: string;
    soundcloud?: string;
  };
}

/**
 * Official podcast episode entity for Industrial Girls Mixes.
 */
export interface PodcastEpisode {
  /** Episode unique identifier */
  id: string;
  /** Episode code (e.g., 'IG MIX 001') */
  code: string;
  /** Guest DJ / Selector */
  artist: string;
  /** Country of base */
  origin: string;
  /** Duration in MM:SS or HH:MM format */
  duration: string;
  /** Date published */
  date: string;
  /** SoundCloud embed track or playlist URL */
  soundCloudEmbedUrl: string;
  /** YouTube embed URL or video ID */
  youtubeEmbedId: string;
  /** Highlights of the session */
  trackHighlights: string[];
}

/**
 * Specification and guidelines for Demo Drop track submissions.
 */
export interface DemoDropSpecifications {
  /** Guidelines title */
  title: string;
  /** Allowed formats (e.g., WAV, AIFF, MP3 320kbps) */
  acceptedFormats: string[];
  /** Allowed submission cloud providers */
  allowedProviders: string[];
  /** Curation and review policy notes */
  rules: string[];
  /** Official inbox email */
  contactEmail: string;
}

/**
 * Dataset: Official VA Compilations (VA 001 - VA 005).
 */
export const COMPILATIONS_CATALOG: CompilationRelease[] = [
  {
    id: "va-001",
    catalogCode: "VA 001",
    title: "SUBTERRÁNEA CORP VOL. 1",
    subtitle: "RAW HARD INDUSTRIAL TECHNO COMPILATION",
    year: "2024",
    coverImage: "/industrial-girls-badge-mask.jpg",
    tracks: [
      { position: "01", artist: "DISTORTA", title: "Resonancia Tóxica", duration: "05:48" },
      { position: "02", artist: "VANE", title: "Invasión Neón", duration: "06:12" },
      { position: "03", artist: "HEX99", title: "Ritual en el Sótano", duration: "05:30" },
      { position: "04", artist: "CARAVEL", title: "Black Steel", duration: "06:05" },
    ],
    links: {
      bandcamp: "https://industrialgirls.bandcamp.com/album/va-001",
      beatport: "https://www.beatport.com/label/industrial-girls/10492",
    },
  },
  {
    id: "va-002",
    catalogCode: "VA 002",
    title: "DISTORSIÓN SISTÉMICA",
    subtitle: "BERLIN WAREHOUSE SOUNDS & BOGOTÁ UNDERGROUND",
    year: "2025",
    coverImage: "/industrial-girls-logo-grid.png",
    tracks: [
      { position: "01", artist: "CLARA CUVÉ", title: "Neuro-Transmission", duration: "05:55" },
      { position: "02", artist: "ØTTA", title: "Furia Nocturna", duration: "06:20" },
      { position: "03", artist: "WALLIS", title: "Analog Brutalism", duration: "05:44" },
      { position: "04", artist: "DISTORTA", title: "Válvulas Calientes", duration: "06:10" },
    ],
    links: {
      bandcamp: "https://industrialgirls.bandcamp.com/album/va-002",
      beatport: "https://www.beatport.com/label/industrial-girls/10492",
    },
  },
  {
    id: "va-003",
    catalogCode: "VA 003",
    title: "CADENAS & SILICIO",
    subtitle: "HIGH-BPM ACID & DISTORTED KICKS",
    year: "2025",
    coverImage: "/industrial-girls-badge-mask.jpg",
    tracks: [
      { position: "01", artist: "PARFAIT", title: "Sensory Overdrive", duration: "06:02" },
      { position: "02", artist: "LADY MARU", title: "Roma Hardcore", duration: "05:39" },
      { position: "03", artist: "SOMNIAC ONE", title: "Percussive Warfare", duration: "06:33" },
      { position: "04", artist: "HEX99", title: "Corte de Energía", duration: "05:15" },
    ],
    links: {
      bandcamp: "https://industrialgirls.bandcamp.com/album/va-003",
      beatport: "https://www.beatport.com/label/industrial-girls/10492",
    },
  },
  {
    id: "va-004",
    catalogCode: "VA 004",
    title: "VÓRTICE INDUSTRIAL",
    subtitle: "HEAVY INDUSTRIAL EBM & TECHNO TEXTURES",
    year: "2025",
    coverImage: "/industrial-girls-logo-grid.png",
    tracks: [
      { position: "01", artist: "CASSIE RAPTOR", title: "Láser Sangriento", duration: "05:50" },
      { position: "02", artist: "ANETHA", title: "Orbiting Fury", duration: "06:18" },
      { position: "03", artist: "SPFDJ", title: "Intoxicated Rhythm", duration: "05:42" },
      { position: "04", artist: "VANE", title: "Frecuencia Cero", duration: "05:58" },
    ],
    links: {
      bandcamp: "https://industrialgirls.bandcamp.com/album/va-004",
      beatport: "https://www.beatport.com/label/industrial-girls/10492",
    },
  },
  {
    id: "va-005",
    catalogCode: "VA 005",
    title: "MANIFIESTO SONORO",
    subtitle: "ANNIVERSARY HARD TECHNO RESISTANCE",
    year: "2026",
    coverImage: "/industrial-girls-badge-mask.jpg",
    tracks: [
      { position: "01", artist: "PAULA TEMPLE", title: "Gegen Attack", duration: "06:40" },
      { position: "02", artist: "VTSS", title: "Tunnel Acceleration", duration: "05:47" },
      { position: "03", artist: "REBEKAH", title: "Iron Flesh", duration: "06:15" },
      { position: "04", artist: "DISTORTA", title: "Sombra Rave", duration: "06:05" },
    ],
    links: {
      bandcamp: "https://industrialgirls.bandcamp.com/album/va-005",
      beatport: "https://www.beatport.com/label/industrial-girls/10492",
    },
  },
];

/**
 * Dataset: Official Podcast Episodes (IG MIX 001 - IG MIX 004).
 */
export const PODCASTS_CATALOG: PodcastEpisode[] = [
  {
    id: "ig-mix-001",
    code: "IG MIX 001",
    artist: "DISTORTA",
    origin: "Bogotá, Colombia",
    duration: "62:14",
    date: "2025-01-15",
    soundCloudEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1758291039&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    youtubeEmbedId: "dQw4w9WgXcQ",
    trackHighlights: ["Hard Industrial", "Peak Time 155 BPM", "Live Modular Cuts"],
  },
  {
    id: "ig-mix-002",
    code: "IG MIX 002",
    artist: "VANE",
    origin: "Medellín, Colombia",
    duration: "58:40",
    date: "2025-03-22",
    soundCloudEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1758291039&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    youtubeEmbedId: "dQw4w9WgXcQ",
    trackHighlights: ["Acid Raw", "Schranz Grooves", "Dark Atmosphere"],
  },
  {
    id: "ig-mix-003",
    code: "IG MIX 003",
    artist: "HEX99",
    origin: "Berlin, Alemania",
    duration: "65:05",
    date: "2025-06-10",
    soundCloudEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1758291039&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    youtubeEmbedId: "dQw4w9WgXcQ",
    trackHighlights: ["EBM Techno", "Heavy Bassline", "Vault Pressure"],
  },
  {
    id: "ig-mix-004",
    code: "IG MIX 004",
    artist: "CARAVEL",
    origin: "París, Francia",
    duration: "60:00",
    date: "2025-09-05",
    soundCloudEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1758291039&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    youtubeEmbedId: "dQw4w9WgXcQ",
    trackHighlights: ["Fast Paced 160 BPM", "Distorted Kicks", "Exclusive Dubplates"],
  },
];

/**
 * Dataset: Demo Drop Specifications.
 */
export const DEMO_DROP_SPECS: DemoDropSpecifications = {
  title: "RECEPCIÓN & CURADURÍA DE PISTAS (DEMO DROP)",
  acceptedFormats: ["WAV 24-bit / 44.1kHz", "AIFF 24-bit", "MP3 320kbps (Solo para pre-escucha)"],
  allowedProviders: ["SoundCloud enlace privado habilitado para descarga", "Dropbox carpeta directa"],
  rules: [
    "Solo producciones originales terminadas e inéditas (no bootlegs sin autorización ni mashups).",
    "BPM sugerido: 145 a 165 BPM dentro de las vertientes de Hard Techno, Industrial, Acid y Schranz.",
    "Incluir datos del artista, bio breve y enlaces a redes sociales en la descripción del link.",
    "Tiempo de respuesta promedio: 7 a 14 días laborables si el track es seleccionado para compilado o EP solista.",
  ],
  contactEmail: "demos@industrialgirls.com",
};

/**
 * Retrieves all VA compilation releases.
 *
 * @returns {CompilationRelease[]} Array of compilation releases.
 */
export function getCompilations(): CompilationRelease[] {
  // Step 1: Return immutable compilations catalog
  return COMPILATIONS_CATALOG;
}

/**
 * Retrieves a specific compilation by its ID or catalog code.
 *
 * @param {string} query - Identifier or catalog code.
 * @returns {CompilationRelease | undefined} Matched release or undefined.
 */
export function getCompilationByCode(query: string): CompilationRelease | undefined {
  // Step 1: Normalize query and search
  const normalized = query.trim().toLowerCase();
  return COMPILATIONS_CATALOG.find(
    (c) => c.id.toLowerCase() === normalized || c.catalogCode.toLowerCase() === normalized
  );
}

/**
 * Retrieves all podcast episodes.
 *
 * @returns {PodcastEpisode[]} Array of podcast episodes.
 */
export function getPodcasts(): PodcastEpisode[] {
  // Step 1: Return immutable podcasts catalog
  return PODCASTS_CATALOG;
}

/**
 * Retrieves Demo Drop submission requirements.
 *
 * @returns {DemoDropSpecifications} Official specifications object.
 */
export function getDemoDropSpecs(): DemoDropSpecifications {
  // Step 1: Return specs reference
  return DEMO_DROP_SPECS;
}
