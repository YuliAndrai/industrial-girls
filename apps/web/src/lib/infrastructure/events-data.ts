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
  /** Optional ISO 3166-1 alpha-2 country code (e.g. 'CO', 'IT') */
  countryCode?: string;
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
    id: "showcase-01",
    flyerImage: "/images/events/showcase-01.jpg",
    city: "BOGOTÁ",
    countryCode: "CO",
    date: "02 DIC 2023",
    alt: "Industrial Girls Showcase — Bogotá",
  },
  {
    id: "showcase-02",
    flyerImage: "/images/events/showcase-02.jpg",
    city: "MEDELLÍN",
    countryCode: "CO",
    date: "26 JUN 2024",
    alt: "Industrial Girls Showcase — Medellín",
  },
  {
    id: "showcase-03",
    flyerImage: "/images/events/showcase-03.jpg",
    city: "ROMA",
    countryCode: "IT",
    date: "01 JUN 2024",
    alt: "Industrial Girls Showcase — Roma",
  },
  {
    id: "showcase-04",
    flyerImage: "/images/events/showcase-04.jpg",
    city: "MANIZALES",
    countryCode: "CO",
    date: "04 DIC 2021",
    alt: "Industrial Girls Showcase — Manizales",
  },
  {
    id: "showcase-05",
    flyerImage: "/images/events/showcase-05.jpg",
    city: "PADOVA",
    countryCode: "IT",
    date: "07 NOV 2025",
    alt: "Industrial Girls Showcase — Padova",
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
