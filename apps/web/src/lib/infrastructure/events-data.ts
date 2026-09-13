/**
 * @file apps/web/src/lib/infrastructure/events-data.ts
 * @description Layer 4: Infrastructure - Recent Showcases & Visual Flyers Catalog (/eventos).
 * Provides the strongly-typed contracts and immutable dataset of official past event flyers.
 */

/**
 * Recent showcase item contract representing an official event flyer with city and date metadata.
 */
export interface RecentShowcase {
  /** Unique showcase identifier */
  id: string;
  /** Relative web path to the high-resolution flyer image in public/images/events/ */
  flyerImage: string;
  /** City where the showcase took place */
  city: string;
  /** ISO 3166-1 alpha-2 country code (e.g. 'CO', 'IT') */
  countryCode: string;
  /** Chronological event date label */
  date: string;
  /** Accessible alt text for screen readers */
  alt: string;
}

/**
 * Immutable catalog of recent Industrial Girls showcases and club sessions.
 * Sourced directly from the official flyers archive in public/images/events/.
 */
export const RECENT_SHOWCASES: readonly RecentShowcase[] = [
  {
    id: "showcase-bogota-2026",
    flyerImage: "/images/events/showcase-01.jpg",
    city: "BOGOTÁ",
    countryCode: "CO",
    date: "28 JUN 2026",
    alt: "Industrial Girls Showcase — Bogotá [CO] // 28 JUN 2026",
  },
  {
    id: "showcase-medellin-2026",
    flyerImage: "/images/events/showcase-02.jpg",
    city: "MEDELLÍN",
    countryCode: "CO",
    date: "26 JUN 2026",
    alt: "Industrial Girls Showcase — Medellín [CO] // 26 JUN 2026",
  },
  {
    id: "showcase-roma-2026",
    flyerImage: "/images/events/showcase-03.jpg",
    city: "ROMA",
    countryCode: "IT",
    date: "01 JUN 2026",
    alt: "Industrial Girls Showcase — Roma [IT] // 01 JUN 2026",
  },
  {
    id: "showcase-manizales-2025",
    flyerImage: "/images/events/showcase-04.jpg",
    city: "MANIZALES",
    countryCode: "CO",
    date: "04 DIC 2025",
    alt: "Industrial Girls Showcase — Manizales [CO] // 04 DIC 2025",
  },
  {
    id: "showcase-padova-2025",
    flyerImage: "/images/events/showcase-05.jpg",
    city: "PADOVA",
    countryCode: "IT",
    date: "07 NOV 2025",
    alt: "Industrial Girls Showcase — Padova [IT] // 07 NOV 2025",
  },
] as const;

/**
 * Retrieves the recent showcases collection.
 *
 * @returns {readonly RecentShowcase[]} Defensive immutable array of recent showcase flyers.
 */
export function getRecentShowcases(): readonly RecentShowcase[] {
  // Step 1: Return immutable showcase flyers array
  return RECENT_SHOWCASES;
}

/**
 * Looks up a specific recent showcase by its ID.
 *
 * @param {string} id - The showcase identifier.
 * @returns {RecentShowcase | undefined} Matching showcase or undefined.
 */
export function getRecentShowcaseById(id: string): RecentShowcase | undefined {
  // Step 1: Query showcase by id
  return RECENT_SHOWCASES.find((item) => item.id === id);
}
