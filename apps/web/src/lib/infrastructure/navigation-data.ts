/**
 * @file apps/web/src/lib/infrastructure/navigation-data.ts
 * @description Layer 4: Infrastructure - Master Platform Navigation Catalog & Subsection Contracts.
 * Architectural Boundary: Governs the typed hierarchy of the 5 master routes and their respective
 * deep-link anchor subsections across desktop flyout menus and mobile drawer accordions.
 *
 * Invariants:
 * - Pure data catalog with zero runtime side-effects.
 * - No client hooks, UI state, or React DOM dependencies.
 * - Strongly typed immutable contracts (readonly arrays and properties).
 */

/**
 * Sub-navigation item contract for deep-link anchors within a master section.
 */
export interface SubNavItem {
  /** Visible label rendered in uppercase monospace */
  readonly label: string;
  /** Deep link href target containing route path and anchor id (e.g. '/musica#releases') */
  readonly href: string;
}

/**
 * Primary navigation item contract representing one of the 5 master platform routes.
 */
export interface NavItem {
  /** Master section title */
  readonly label: string;
  /** Top-level route path (e.g. '/musica') */
  readonly href: string;
  /** Optional architectural brief note for drawer display */
  readonly note?: string;
  /** Ordered list of sub-sections with deep-link anchors */
  readonly subSections: readonly SubNavItem[];
}

/**
 * Immutable master catalog defining the 5 primary platform routes and their deep-link subsections.
 */
export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  // Step 1: Master Route 01 - Música (Releases, Podcasts, Demo Drop)
  {
    label: "MÚSICA",
    href: "/musica",
    note: "CATÁLOGO VA 001-005, PODCASTS & DEMO DROP",
    subSections: [
      { label: "RELEASES & VA'S", href: "/musica#releases" },
      { label: "PODCAST'S", href: "/musica#podcasts" },
      { label: "DEMO DROP // ENVIAR", href: "/musica#demo-drop" },
    ],
  },
  // Step 2: Master Route 02 - Desarrollo Artístico (Servicios 360°, Diagnóstico)
  {
    label: "DESARROLLO ARTÍSTICO",
    href: "/desarrollo-artistico",
    note: "AGENCIA 360° // INFRAESTRUCTURA & GESTIÓN",
    subSections: [
      { label: "PILARES & SERVICIOS 360°", href: "/desarrollo-artistico#servicios" },
      { label: "SOLICITAR DIAGNÓSTICO", href: "/desarrollo-artistico#diagnostico" },
    ],
  },
  // Step 3: Master Route 03 - Eventos (Calendario, Radar Geográfico)
  {
    label: "EVENTOS",
    href: "/eventos",
    note: "CALENDARIO DE GIRAS, ALERTA GEOGRÁFICA & SHOWCASES",
    subSections: [
      { label: "CALENDARIO & SHOWCASES", href: "/eventos#calendario" },
      { label: "RADAR GEOGRÁFICO // PREVENTAS", href: "/eventos#radar" },
    ],
  },
  // Step 4: Master Route 04 - Archivo (Roster, Galería, Videos)
  {
    label: "ARCHIVO",
    href: "/archivo",
    note: "ROSTER DE MÁS DE 30 ARTISTAS & REGISTRO VISUAL",
    subSections: [
      { label: "ARTISTAS EN EVENTOS & LABEL", href: "/archivo#roster" },
      { label: "GALERÍA VISUAL", href: "/archivo#galeria" },
      { label: "VIDEOS & REGISTRO MULTICÁMARA", href: "/archivo#videos" },
    ],
  },
  // Step 5: Master Route 05 - Comunidad (Journal, Foro, Red Global)
  {
    label: "COMUNIDAD",
    href: "/comunidad",
    note: "JOURNAL EDITORIAL, DEBATE TÉCNICO & SUSCRIPCIÓN",
    subSections: [
      { label: "JOURNAL & INVESTIGACIÓN", href: "/comunidad#journal" },
      { label: "DEBATE & FORO TÉCNICO", href: "/comunidad#foro" },
      { label: "RED GLOBAL & TELEGRAM", href: "/comunidad#red" },
    ],
  },
] as const;

/**
 * Accessor function returning the immutable master navigation catalog.
 *
 * @returns {readonly NavItem[]} Protected copy of the master navigation items.
 */
export function getMainNavItems(): readonly NavItem[] {
  // Step 1: Return the immutable navigation items collection
  return MAIN_NAV_ITEMS;
}
