/**
 * @file apps/web/src/lib/infrastructure/home-hub-data.ts
 * @description Layer 4: Infrastructure - Central navigation contracts and data catalog
 * for the Home Page Bento Command Center. Exposes strongly-typed data structures
 * for hub ecosystem direct access cards and social frequency channels.
 */

/**
 * Contract representing an interactive direct-access card in the Home Bento Command Center.
 */
export interface HomeHubCard {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly badge?: string;
  readonly isFlagship?: boolean;
}

/**
 * Contract representing an external social channel link in the Home Bento Dock.
 */
export interface HomeSocialLink {
  readonly label: string;
  readonly href: string;
}

/**
 * Catalog of canonical ecosystem destinations rendered as console buttons in the Bento Grid.
 */
export const HOME_HUB_CARDS: readonly HomeHubCard[] = [
  {
    id: "hub-release",
    code: "01",
    title: "RELEASES & VA'S",
    subtitle: "Catálogo oficial compilado VA 001 - 005 en Beatport y Spotify",
    href: "/musica#releases",
    badge: "CATÁLOGO ACTIVO",
  },
  {
    id: "hub-flagship",
    code: "02",
    title: "CAMPAÑA DE LANZAMIENTO & AGENCIA",
    subtitle: "Estrategia integral de estreno, pitch editorial, registro y desarrollo 360°",
    href: "/desarrollo-artistico#servicios",
    badge: "SERVICIO INSIGNIA",
    isFlagship: true,
  },
  {
    id: "hub-podcasts",
    code: "03",
    title: "PODCAST'S SERIES",
    subtitle: "Sesiones exclusivas curadas de estudio y cabina en SoundCloud y YouTube",
    href: "/musica#podcasts",
  },
  {
    id: "hub-demo",
    code: "04",
    title: "DEMO DROP // ENVIAR TRACKS",
    subtitle: "Recepción abierta de producciones sin límite de BPM ni género",
    href: "/musica#demo-drop",
  },
  {
    id: "hub-events",
    code: "05",
    title: "SHOWCASES & FECHAS SELECCIONADAS",
    subtitle: "Flyers oficiales de encuentros anteriores y radar de alertas por ciudad",
    href: "/eventos",
  },
  {
    id: "hub-archive",
    code: "06",
    title: "DIRECTORIO ROSTER & VIDEOTECA",
    subtitle: "30 artistas vinculadas a cabina y registros audiovisuales multicámara",
    href: "/archivo",
  },
  {
    id: "hub-community",
    code: "07",
    title: "NOTICIAS, MEMORIA & MAGAZINE",
    subtitle: "Investigación editorial de vanguardia, debate técnico y canal directo",
    href: "/comunidad",
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
