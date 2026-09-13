/**
 * @file apps/web/src/lib/infrastructure/brand-catalog.ts
 * @description Layer 4: Infrastructure - Brand Statement and Platform Ethos Catalog.
 * Centralizes verified hashtags, official brand statement paragraphs, and quick exploration route links.
 */

export interface BrandHashtag {
  readonly tag: string;
  readonly label: string;
}

export interface BrandStatementData {
  readonly title: string;
  readonly subtitle: string;
  readonly paragraphs: readonly string[];
}

export interface QuickExplorationLink {
  readonly label: string;
  readonly href: string;
  readonly ariaLabel: string;
}

/**
 * Verified official hashtags for Industrial Girls.
 */
export const BRAND_HASHTAGS: readonly BrandHashtag[] = [
  { tag: "#IndustrialGirls", label: "Industrial Girls" },
  { tag: "#TechnoGirls", label: "Techno Girls" },
  { tag: "#HardGirls", label: "Hard Girls" },
];

/**
 * Official Brand Statement & Platform Description (Minimalist Edition).
 */
export const BRAND_STATEMENT: BrandStatementData = {
  title: "PLATAFORMA & SELLO DISCOGRÁFICO",
  subtitle: "",
  paragraphs: [
    "Industrial Girls Music es una plataforma de música electrónica, sello discográfico y serie de eventos especializada en techno, hard techno, hard dance, trance y cultura underground.",
    "A través de lanzamientos, podcasts, showcases y eventos, conecta artistas, público y comunidad dentro de la escena electrónica internacional.",
  ],
};

/**
 * Quick exploration navigation links for core modules.
 */
export const QUICK_EXPLORATION_LINKS: readonly QuickExplorationLink[] = [
  {
    label: "[ Explorar Música ]",
    href: "/musica",
    ariaLabel: "Navegar al catálogo de música y lanzamientos",
  },
  {
    label: "[ Desarrollo Artístico ]",
    href: "/desarrollo-artistico",
    ariaLabel: "Navegar al módulo de desarrollo artístico 360",
  },
  {
    label: "[ Archivo & Artistas ]",
    href: "/archivo",
    ariaLabel: "Navegar al archivo histórico y roster de artistas",
  },
];
