/**
 * @file apps/web/src/lib/infrastructure/events-catalog.ts
 * @description Layer 4: Infrastructure - Events & Showcases Catalog (/eventos).
 * Provides calendar season status, standardized countries for geographic alerts, and showcase history.
 */

/**
 * Past showcase historical record with social proof.
 */
export interface PastShowcase {
  /** Showcase ID */
  id: string;
  /** Venue name */
  venue: string;
  /** City and Country */
  location: string;
  /** Date of the showcase */
  date: string;
  /** Lineup artists */
  lineup: string[];
  /** YouTube video embed ID */
  youtubeVideoId: string;
  /** Description or attendance highlight */
  highlight: string;
}

/**
 * Current calendar season state definition.
 */
export interface EventCalendarStatus {
  /** Top eyebrow badge label */
  topBadge: string;
  /** Season headline */
  headline: string;
  /** Status banner label */
  statusLabel: string;
  /** Status callout secondary badge */
  statusCallout: string;
  /** Curatorial note */
  curatorialNote: string;
  /** Expected announcement window */
  announcementWindow: string;
}

/**
 * List of standardized countries for ticket presale geographic alerts.
 */
export const STANDARD_COUNTRIES: string[] = [
  "Colombia",
  "Alemania",
  "Francia",
  "Reino Unido",
  "Países Bajos",
  "España",
  "Italia",
  "México",
  "Argentina",
  "Chile",
  "Estados Unidos",
  "Bélgica",
  "Polonia",
  "Portugal",
  "Otro",
];

/**
 * Current status of the touring calendar.
 * Reflects selective curated club sessions and female DJ lineup concept.
 */
export const CALENDAR_STATUS: EventCalendarStatus = {
  topBadge: "EVENTS // SELECTIVE DATES & CLUB SESSIONS // CONCEPTO LINE UP DJS MUJERES",
  headline: "SHOWCASES Y ANUNCIOS PRONTO",
  statusLabel: "TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN",
  statusCallout: "[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]",
  curatorialNote: "Regístrate para acceder a locaciones, alineaciones y preventas prioritarias en tu región.",
  announcementWindow: "TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN",
};

/**
 * Historical record of past Industrial Girls showcases.
 */
export const PAST_SHOWCASES: PastShowcase[] = [
  {
    id: "showcase-001",
    venue: "Tresor Globus Vault",
    location: "Berlín, Alemania",
    date: "2025-05-18",
    lineup: ["DISTORTA", "CLARA CUVÉ", "HEX99", "WALLIS"],
    youtubeVideoId: "dQw4w9WgXcQ",
    highlight: "Capacidad completa en la bóveda subterránea. 7 horas de hard techno continuo a 155 BPM.",
  },
  {
    id: "showcase-002",
    venue: "Warehouse Almacén 44",
    location: "Bogotá, Colombia",
    date: "2025-08-25",
    lineup: ["VANE", "DISTORTA", "ØTTA", "SOMNIAC ONE"],
    youtubeVideoId: "dQw4w9WgXcQ",
    highlight: "Showcase industrial en nave de manufactura abandonada con sistema de sonido Funktion-One calibrado a medida.",
  },
  {
    id: "showcase-003",
    venue: "Fold Basement",
    location: "Londres, Reino Unido",
    date: "2025-11-12",
    lineup: ["CASSIE RAPTOR", "HEX99", "PARFAIT", "LADY MARU"],
    youtubeVideoId: "dQw4w9WgXcQ",
    highlight: "Sesión extendida de 24 horas con escenografía de hierro forjado y visuales estroboscópicos.",
  },
];

/**
 * Retrieves the event calendar season status.
 *
 * @returns {EventCalendarStatus} Immutable status configuration.
 */
export function getEventCalendarStatus(): EventCalendarStatus {
  // Step 1: Return calendar status reference
  return CALENDAR_STATUS;
}

/**
 * Retrieves the standardized list of countries for geographical forms.
 *
 * @returns {string[]} Country names array.
 */
export function getStandardCountries(): string[] {
  // Step 1: Return country list
  return STANDARD_COUNTRIES;
}

/**
 * Retrieves the list of historical showcases.
 *
 * @returns {PastShowcase[]} Showcase records array.
 */
export function getPastShowcases(): PastShowcase[] {
  // Step 1: Return past showcases list
  return PAST_SHOWCASES;
}
