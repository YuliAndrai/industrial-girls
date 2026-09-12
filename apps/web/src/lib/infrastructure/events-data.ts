/**
 * @file apps/web/src/lib/infrastructure/events-data.ts
 * @description Layer 4: Infrastructure - Recent Showcases & Visual Flyers Catalog (/eventos).
 * Provides the strongly-typed contracts and immutable dataset of official past event flyers.
 */

/**
 * Recent showcase item contract representing an official event flyer.
 */
export interface RecentShowcase {
  /** Unique showcase identifier */
  id: string;
  /** Relative web path to the high-resolution flyer image in public/images/events/ */
  flyerImage: string;
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
    alt: "Industrial Girls Showcase - Bogotá",
  },
  {
    id: "showcase-02",
    flyerImage: "/images/events/showcase-02.jpg",
    alt: "Industrial Girls Showcase - Medellín",
  },
  {
    id: "showcase-03",
    flyerImage: "/images/events/showcase-03.jpg",
    alt: "Industrial Girls Showcase - Roma",
  },
  {
    id: "showcase-04",
    flyerImage: "/images/events/showcase-04.jpg",
    alt: "Industrial Girls Showcase - Manizales",
  },
  {
    id: "showcase-05",
    flyerImage: "/images/events/showcase-05.jpg",
    alt: "Industrial Girls Showcase - Padova",
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
