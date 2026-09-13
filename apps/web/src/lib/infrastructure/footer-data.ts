/**
 * @file apps/web/src/lib/infrastructure/footer-data.ts
 * @description Layer 4: Infrastructure - Official Social Networks Catalog for Global Footer.
 * Defines strongly-typed contracts and immutable registries of verified external
 * media channels, official platforms, and streaming directories for Industrial Girls.
 *
 * All external URLs are represented as pure, raw strings without markdown wrapper syntax.
 */

/**
 * Contract representing an official external social or media channel.
 */
export interface SocialLinkItem {
  /** Unique technical identifier */
  id: string;
  /** Display name of the platform */
  name: string;
  /** Direct canonical destination URL */
  href: string;
  /** Vector icon identifier */
  icon: "instagram" | "soundcloud" | "facebook" | "beatport" | "bandcamp" | "youtube";
  /** Accessible label describing destination and purpose for assistive tech */
  ariaLabel: string;
}

/**
 * Immutable catalog of official verified social and streaming platforms.
 */
export const OFFICIAL_SOCIAL_LINKS: readonly SocialLinkItem[] = [
  {
    id: "social-instagram",
    name: "Instagram",
    href: "https://www.instagram.com/industrialgirlsmusic/",
    icon: "instagram",
    ariaLabel: "Seguir a Industrial Girls en Instagram",
  },
  {
    id: "social-soundcloud",
    name: "SoundCloud",
    href: "https://soundcloud.com/industrial_girls",
    icon: "soundcloud",
    ariaLabel: "Escuchar Industrial Girls en SoundCloud",
  },
  {
    id: "social-youtube",
    name: "YouTube",
    href: "https://www.youtube.com/@industrialgirls4388",
    icon: "youtube",
    ariaLabel: "Ver Industrial Girls en YouTube",
  },
  {
    id: "social-facebook",
    name: "Facebook",
    href: "https://www.facebook.com/Industrialgirlsmusic.col/",
    icon: "facebook",
    ariaLabel: "Seguir a Industrial Girls en Facebook",
  },
  {
    id: "social-beatport",
    name: "Beatport",
    href: "https://www.beatport.com/es/label/industrial-girls/106032",
    icon: "beatport",
    ariaLabel: "Catálogo de Industrial Girls en Beatport",
  },
  {
    id: "social-bandcamp",
    name: "Bandcamp",
    href: "https://industrialgirls.bandcamp.com/music",
    icon: "bandcamp",
    ariaLabel: "Comprar música en Industrial Girls Bandcamp",
  },
] as const;

/**
 * Retrieves a defensive copy of the official social links collection.
 *
 * @returns {SocialLinkItem[]} Array of verified social link items.
 */
export function getOfficialSocialLinks(): SocialLinkItem[] {
  // Step 1: Return defensive copy of immutable links
  return [...OFFICIAL_SOCIAL_LINKS];
}
