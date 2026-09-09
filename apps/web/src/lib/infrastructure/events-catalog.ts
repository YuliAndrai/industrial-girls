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
  /** Season headline */
  headline: string;
  /** Status banner label */
  statusLabel: string;
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
 */
export const CALENDAR_STATUS: EventCalendarStatus = {
  headline: "PRÓXIMAS FECHAS — EN PREPARACIÓN",
  statusLabel: "TEMPORADA EN CURADURÍA // GIRA 2026-2027",
  curatorialNote: "Nuestro equipo se encuentra diseñando la nueva serie de noches clandestinas y residencias en almacenes de Europa y América Latina. Las fechas, locaciones secretas y accesos se liberarán primero a quienes se encuentren registrados en el radar geográfico.",
  announcementWindow: "PRIMER ANUNCIO: Q4 2026",
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
