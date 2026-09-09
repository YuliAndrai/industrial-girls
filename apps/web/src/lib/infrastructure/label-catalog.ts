/**
 * @file apps/web/src/lib/infrastructure/label-catalog.ts
 * @description Layer 4: Infrastructure - Label Catalog Repository.
 * Provides strongly typed static catalog data for Industrial Girls releases, tour dates/club events, residents, and merchandise.
 */

/**
 * Physical or digital format for audio releases.
 */
export type ReleaseFormat = '12" Vinyl' | "Digital" | "Cassette" | "Vinyl + Digital";

/**
 * Discographic release entity contract.
 */
export interface Release {
  /** Unique release identifier */
  id: string;
  /** Catalog code (e.g., 'IG001', 'IG002') */
  catalogNumber: string;
  /** Title of the EP, single, or LP */
  title: string;
  /** Performing or producing artist moniker */
  artist: string;
  /** ISO release date (YYYY-MM-DD) */
  releaseDate: string;
  /** Distribution format */
  format: ReleaseFormat;
  /** Nominal BPM tempo rating */
  bpm?: number;
  /** Ordered list of track titles */
  tracklist: string[];
  /** Path or URL to high-contrast cover art */
  coverImage: string;
  /** External streaming URL (SoundCloud / Bandcamp) */
  streamUrl?: string;
  /** Direct Bandcamp purchase link */
  bandcampUrl?: string;
}

/**
 * Event booking ticket status.
 */
export type EventStatus = "upcoming" | "sold_out" | "past";

/**
 * Live showcase or club rave event entity contract.
 */
export interface Event {
  /** Unique event identifier */
  id: string;
  /** Event or showcase title */
  venue: string;
  /** Metropolitan city */
  city: string;
  /** Country or regional ISO code */
  country: string;
  /** ISO event date string */
  date: string;
  /** Headline and resident artists performing */
  lineup: string[];
  /** Direct link for pre-sale ticket purchase */
  ticketUrl: string;
  /** Availability state */
  status: EventStatus;
  /** Geographic coordinates or secret warehouse code */
  coordinates?: string;
}

/**
 * Label resident DJ or music producer entity contract.
 */
export interface Resident {
  /** Unique resident identifier */
  id: string;
  /** Legal or stage name */
  name: string;
  /** Artist moniker used on flyers and releases */
  moniker: string;
  /** Collective role (e.g., 'Resident DJ / Sound Architect') */
  role: string;
  /** Brief artist bio highlighting sound aesthetic */
  bio: string;
  /** Path or URL to high-contrast portrait */
  avatarUrl: string;
  /** Profile link on SoundCloud */
  soundcloudUrl?: string;
  /** Profile link on Instagram */
  instagramUrl?: string;
}

/**
 * Official merchandise category.
 */
export type MerchCategory = "apparel" | "vinyl" | "accessories";

/**
 * Merchandise product entity contract.
 */
export interface MerchProduct {
  /** Unique SKU product identifier */
  id: string;
  /** Product title */
  name: string;
  /** Product category */
  category: MerchCategory;
  /** Retail price in primary currency */
  price: number;
  /** Currency code (EUR/USD) */
  currency: string;
  /** Product imagery URL */
  image: string;
  /** Inventory availability flag */
  inStock: boolean;
  /** Available sizing options */
  sizes?: string[];
}

/**
 * Static baseline discography catalog for Industrial Girls.
 */
export const RELEASES_CATALOG: readonly Release[] = [
  {
    id: "ig-001",
    catalogNumber: "IG001",
    title: "Subterránea EP",
    artist: "Paula Temple & Vane",
    releaseDate: "2026-01-15",
    format: '12" Vinyl',
    bpm: 145,
    tracklist: [
      "A1. Subterránea (Original Mix)",
      "A2. Steel & Sweat",
      "B1. Subterránea (Rave Drill Rework)",
      "B2. Decibel Protocol",
    ],
    coverImage: "/images/releases/ig001.jpg",
    bandcampUrl: "https://industrialgirls.bandcamp.com/album/ig001-subterranea",
  },
  {
    id: "ig-002",
    catalogNumber: "IG002",
    title: "Acid Furnace",
    artist: "SØS Gunver Ryberg",
    releaseDate: "2026-03-20",
    format: "Vinyl + Digital",
    bpm: 148,
    tracklist: [
      "A1. Acid Furnace (Main Stage Mix)",
      "A2. Hydraulic Valve",
      "B1. Molten Iron",
      "B2. Acid Furnace (Tool)",
    ],
    coverImage: "/images/releases/ig002.jpg",
    bandcampUrl: "https://industrialgirls.bandcamp.com/album/ig002-acid-furnace",
  },
  {
    id: "ig-003",
    catalogNumber: "IG003",
    title: "Hardwire Rituals",
    artist: "VTSS & Lokier",
    releaseDate: "2026-05-10",
    format: '12" Vinyl',
    bpm: 150,
    tracklist: [
      "A1. Hardwire Rituals",
      "A2. Static Transmission",
      "B1. Flesh to Steel",
    ],
    coverImage: "/images/releases/ig003.jpg",
    bandcampUrl: "https://industrialgirls.bandcamp.com/album/ig003-hardwire-rituals",
  },
  {
    id: "ig-004",
    catalogNumber: "IG004",
    title: "Monolith Collision",
    artist: "Klangkuenstler",
    releaseDate: "2026-07-04",
    format: "Digital",
    bpm: 152,
    tracklist: [
      "01. Monolith Collision",
      "02. Concrete Echo",
      "03. Monolith Collision (Dub)",
    ],
    coverImage: "/images/releases/ig004.jpg",
    bandcampUrl: "https://industrialgirls.bandcamp.com/album/ig004-monolith-collision",
  },
  {
    id: "ig-005",
    catalogNumber: "IG005",
    title: "Nocturnal Voltage",
    artist: "Cera Khin",
    releaseDate: "2026-08-18",
    format: '12" Vinyl',
    bpm: 154,
    tracklist: [
      "A1. Nocturnal Voltage",
      "A2. High Frequency Distress",
      "B1. Bassline Exorcism",
    ],
    coverImage: "/images/releases/ig005.jpg",
    bandcampUrl: "https://industrialgirls.bandcamp.com/album/ig005-nocturnal-voltage",
  },
  {
    id: "ig-006",
    catalogNumber: "IG006",
    title: "Anarchy in the Void",
    artist: "Industrial Girls All-Stars",
    releaseDate: "2026-09-30",
    format: "Vinyl + Digital",
    bpm: 155,
    tracklist: [
      "A1. Void Walker",
      "A2. Heavy Machina",
      "B1. Raw Pressure",
      "B2. Termination Sequence",
    ],
    coverImage: "/images/releases/ig006.jpg",
    bandcampUrl: "https://industrialgirls.bandcamp.com/album/ig006-anarchy-in-the-void",
  },
];

/**
 * Static baseline tour dates and live showcase listings.
 */
export const EVENTS_CATALOG: readonly Event[] = [
  {
    id: "evt-001",
    venue: "Tresor",
    city: "Berlin",
    country: "DE",
    date: "2026-10-12T23:59:00Z",
    lineup: ["Paula Temple", "SØS Gunver Ryberg", "Industrial Girls Collective"],
    ticketUrl: "https://ra.co/events/tresor-industrial-girls",
    status: "upcoming",
    coordinates: "52.5113° N, 13.4188° E",
  },
  {
    id: "evt-002",
    venue: "Fold",
    city: "London",
    country: "UK",
    date: "2026-11-06T23:00:00Z",
    lineup: ["VTSS", "Lokier", "Cera Khin"],
    ticketUrl: "https://ra.co/events/fold-industrial-girls",
    status: "upcoming",
    coordinates: "51.5207° N, 0.0055° E",
  },
  {
    id: "evt-003",
    venue: "Shelter",
    city: "Amsterdam",
    country: "NL",
    date: "2026-11-28T23:30:00Z",
    lineup: ["Klangkuenstler", "Paula Temple"],
    ticketUrl: "https://ra.co/events/shelter-industrial-girls",
    status: "upcoming",
    coordinates: "52.3831° N, 4.9022° E",
  },
  {
    id: "evt-004",
    venue: "Warehouse Zone Industrial",
    city: "Bogotá",
    country: "CO",
    date: "2026-12-19T22:00:00Z",
    lineup: ["Industrial Girls Residents", "Special Secret B2B"],
    ticketUrl: "https://industrialgirls.co/tickets/bogota-secret",
    status: "upcoming",
    coordinates: "4.6097° N, 74.0817° W",
  },
];

/**
 * Static baseline roster of resident DJs and sound designers.
 */
export const RESIDENTS_CATALOG: readonly Resident[] = [
  {
    id: "res-001",
    name: "Vane Valenzuela",
    moniker: "VANE",
    role: "Founder & Resident DJ",
    bio: "Pioneering high-velocity industrial percussion and harsh sonic textures across Latin America and Europe.",
    avatarUrl: "/images/residents/vane.jpg",
    soundcloudUrl: "https://soundcloud.com/industrialgirls-vane",
    instagramUrl: "https://instagram.com/vane_industrial",
  },
  {
    id: "res-002",
    name: "Elena Richter",
    moniker: "DISTORTA",
    role: "Modular Sound Architect",
    bio: "Specializing in live analogue modular synthesis, 150+ BPM kick drums, and relentless wall-of-sound live sets.",
    avatarUrl: "/images/residents/distorta.jpg",
    soundcloudUrl: "https://soundcloud.com/distorta-live",
    instagramUrl: "https://instagram.com/distorta_ig",
  },
  {
    id: "res-003",
    name: "Mara Blackwood",
    moniker: "HEX99",
    role: "Resident Producer",
    bio: "Dark ambient drone meets punishing broken beats, inspired by decommissioned European industrial plants.",
    avatarUrl: "/images/residents/hex99.jpg",
    soundcloudUrl: "https://soundcloud.com/hex99-techno",
    instagramUrl: "https://instagram.com/hex99_sound",
  },
];

/**
 * Static baseline merchandise catalog.
 */
export const MERCH_CATALOG: readonly MerchProduct[] = [
  {
    id: "merch-001",
    name: "Tactile Heavyweight Balaclava",
    category: "accessories",
    price: 35,
    currency: "EUR",
    image: "/images/merch/balaclava.jpg",
    inStock: true,
    sizes: ["One Size"],
  },
  {
    id: "merch-002",
    name: "Gothic Lattice Heavy Hoodie (450 GSM)",
    category: "apparel",
    price: 95,
    currency: "EUR",
    image: "/images/merch/hoodie.jpg",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "merch-003",
    name: "IG001-IG006 Collector Vinyl Boxset",
    category: "vinyl",
    price: 130,
    currency: "EUR",
    image: "/images/merch/boxset.jpg",
    inStock: true,
    sizes: ["Limited 200 Copies"],
  },
];

/**
 * Retrieves all cataloged discographic releases.
 *
 * @returns {readonly Release[]} Read-only array of all music releases.
 */
export function getReleases(): readonly Release[] {
  // Step 1: Return immutable releases dataset
  return RELEASES_CATALOG;
}

/**
 * Finds a specific discographic release by its catalog code (e.g., 'IG001').
 *
 * @param {string} catalogNumber - The catalog identifier code to search.
 * @returns {Release | undefined} Matching release or undefined if not found.
 */
export function getReleaseByCatalogNumber(catalogNumber: string): Release | undefined {
  // Step 1: Sanitize query string
  const normalizedCode = catalogNumber.trim().toUpperCase();

  // Step 2: Query catalog array
  return RELEASES_CATALOG.find((r) => r.catalogNumber.toUpperCase() === normalizedCode);
}

/**
 * Retrieves all club rave dates and tour events.
 *
 * @returns {readonly Event[]} Read-only array of all tour events.
 */
export function getEvents(): readonly Event[] {
  // Step 1: Return immutable events dataset
  return EVENTS_CATALOG;
}

/**
 * Retrieves only upcoming tour and club events.
 *
 * @returns {readonly Event[]} Upcoming events sorted chronologically.
 */
export function getUpcomingEvents(): readonly Event[] {
  // Step 1: Filter by status 'upcoming'
  return EVENTS_CATALOG.filter((evt) => evt.status === "upcoming");
}

/**
 * Retrieves all resident DJs and sound designers.
 *
 * @returns {readonly Resident[]} Read-only array of residents.
 */
export function getResidents(): readonly Resident[] {
  // Step 1: Return immutable residents dataset
  return RESIDENTS_CATALOG;
}

/**
 * Retrieves all available label merchandise products.
 *
 * @returns {readonly MerchProduct[]} Read-only array of merchandise items.
 */
export function getMerchProducts(): readonly MerchProduct[] {
  // Step 1: Return immutable merchandise dataset
  return MERCH_CATALOG;
}
