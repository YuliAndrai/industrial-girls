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
  topBadge: "// SELECTIVE DATES & CLUB SESSIONS //",
  headline: "SHOWCASES & FECHAS SELECCIONADAS",
  statusLabel: "TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN",
  statusCallout: "[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]",
  curatorialNote: "Conexiones entre cabinas, clubs y residencias underground en desarrollo. Curadurías directas para la pista de baile.",
  announcementWindow: "TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN",
};

/**
 * Historical record of past Industrial Girls showcases.
 * Invariant: Zero mock or unconfirmed dates. Verified historical flyers are maintained in events-data.ts.
 */
export const PAST_SHOWCASES: readonly PastShowcase[] = [];

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
 * @returns {readonly PastShowcase[]} Showcase records array.
 */
export function getPastShowcases(): readonly PastShowcase[] {
  // Step 1: Return past showcases list
  return PAST_SHOWCASES;
}
