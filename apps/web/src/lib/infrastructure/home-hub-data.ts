/**
 * @file apps/web/src/lib/infrastructure/home-hub-data.ts
 * @description Layer 4: Infrastructure - Central navigation contracts and data catalog
 * for the Home Page Bento Command Center. Exposes strongly-typed data structures
 * for hub ecosystem direct access cards and social frequency channels.
 */

/**
 * Contract representing an interactive direct-access card in the Home Command Center.
 */
export interface HomeHubCard {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly badge?: string;
  readonly isFlagship?: boolean;
  readonly isExternal?: boolean;
}

/**
 * Contract representing an external social channel link in the Home Bento Dock.
 */
export interface HomeSocialLink {
  readonly label: string;
  readonly href: string;
}

/**
 * Catalog of canonical ecosystem destinations rendered as console buttons in the Command Center.
 */
export const HOME_HUB_CARDS: readonly HomeHubCard[] = [
  {
    id: "hub-agency",
    code: "01",
    title: "CAMPAÑA DE LANZAMIENTO & AGENCIA",
    subtitle: "Estrategia integral de estreno, pitch editorial, registro y desarrollo 360°",
    href: "/desarrollo-artistico#servicios",
    badge: "FLAGSHIP",
    isFlagship: true,
  },
  {
    id: "hub-events",
    code: "02",
    title: "EVENTOS",
    subtitle: "Showcases, carteles anteriores y radar de preventas por ciudad",
    href: "/eventos",
  },
  {
    id: "hub-music",
    code: "03",
    title: "MÚSICA",
    subtitle: "Catálogo de lanzamientos VA 001 - 005, podcasts y demo drop",
    href: "/musica",
  },
  {
    id: "hub-archive",
    code: "04",
    title: "ARCHIVO",
    subtitle: "Directorio de más de 30 artistas, fototeca y registros en video",
    href: "/archivo",
  },
  {
    id: "hub-community",
    code: "05",
    title: "COMUNIDAD",
    subtitle: "Magazine editorial, investigación de vanguardia y debate",
    href: "/comunidad",
  },
  {
    id: "hub-telegram",
    code: "06",
    title: "GRUPO TELEGRAM",
    subtitle: "Canal oficial y acceso prioritario a la red directa",
    href: "https://t.me/industrialgirls",
    badge: "COMMUNITY",
    isExternal: true,
  },
] as const;

/**
 * Official social and streaming channels of Industrial Girls Records.
 * Invariant: URLs must be pure, clean strings without markdown formatting wrappers.
 */
export const HOME_SOCIAL_LINKS: readonly HomeSocialLink[] = [
  { label: "SOUNDCLOUD", href: "https://soundcloud.com/industrial_girls" },
  { label: "BEATPORT", href: "https://www.beatport.com/es/label/industrial-girls/106032" },
  { label: "SPOTIFY", href: "https://open.spotify.com" },
  { label: "YOUTUBE", href: "https://youtube.com" },
  { label: "INSTAGRAM", href: "https://instagram.com" },
] as const;

/**
 * Accessor returning an immutable snapshot of all Home Bento Command Center destination cards.
 *
 * @returns {readonly HomeHubCard[]} Immutable array of hub cards.
 */
export function getHomeHubCards(): readonly HomeHubCard[] {
  // Step 1: Return defensive copy of immutable catalog reference
  return [...HOME_HUB_CARDS];
}

/**
 * Accessor returning an immutable snapshot of all Home Bento social frequency links.
 *
 * @returns {readonly HomeSocialLink[]} Immutable array of social links.
 */
export function getHomeSocialLinks(): readonly HomeSocialLink[] {
  // Step 1: Return defensive copy of immutable links reference
  return [...HOME_SOCIAL_LINKS];
}
