/**
 * @file apps/web/src/lib/infrastructure/route-metadata.ts
 * @description Layer 4: Infrastructure - Static Route Metadata & Open Graph Configurations.
 * Architectural Boundary: Governs static Next.js route metadata, Open Graph cards, Twitter cards,
 * and canonical SEO properties for all platform routes. Pure configuration layer with zero UI or client-side dependencies.
 *
 * Invariants:
 * - Pure data catalog with zero runtime side-effects.
 * - No client hooks, UI state, or React DOM dependencies.
 * - Adheres strictly to Next.js Metadata API contracts.
 */

import type { Metadata } from "next";

/**
 * Valid route keys corresponding to primary platform sections.
 */
export type AppRouteKey =
  | "home"
  | "musica"
  | "desarrolloArtistico"
  | "eventos"
  | "comunidad";

/**
 * Route metadata mapping contract ensuring complete coverage of all platform sections.
 */
export type RouteMetadataMap = Record<AppRouteKey, Metadata>;

/**
 * Base site URL used for canonical resolution and Open Graph URLs.
 */
export const SITE_URL = "https://industrialgirls.com";

/**
 * Default fallback Open Graph and Twitter Card image.
 */
export const DEFAULT_OG_IMAGE = "/assets/images/industrial-girls-badge-mask.jpg";

/**
 * Static Next.js Route Metadata catalog for all top-level platform entrypoints.
 * Canonical definitions for titles, descriptions, keywords, Open Graph, and Twitter Cards.
 */
export const ROUTE_METADATA: RouteMetadataMap = {
  // Step 1: Configure Home landing page metadata (/)
  home: {
    title: "Industrial Girls | Women in Electronic Music, Underground Techno & Global Club Culture",
    description:
      "Plataforma cultural, sello discográfico y agencia de desarrollo artístico que impulsa a mujeres y proyectos de vanguardia en la música electrónica global.",
    keywords: [
      "Female DJs",
      "Women in Electronic Music",
      "Female Techno DJs",
      "Underground Techno",
      "Industrial Girls",
      "Global Club Culture",
    ],
    openGraph: {
      title: "Industrial Girls | Women in Electronic Music, Underground Techno & Global Club Culture",
      description:
        "Plataforma cultural, sello discográfico y agencia de desarrollo artístico que impulsa a mujeres y proyectos de vanguardia en la música electrónica global.",
      url: SITE_URL,
      siteName: "Industrial Girls",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Industrial Girls - Women in Electronic Music & Underground Club Culture",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Industrial Girls | Women in Electronic Music, Underground Techno & Global Club Culture",
      description:
        "Plataforma cultural, sello discográfico y agencia de desarrollo artístico que impulsa a mujeres y proyectos de vanguardia en la música electrónica global.",
      images: [DEFAULT_OG_IMAGE],
    },
  },

  // Step 2: Configure Music catalog route metadata (/musica)
  musica: {
    title: "Catálogo Sonoro & Podcasts | Industrial Girls Records",
    description:
      "Lanzamientos oficiales de techno, hard techno, industrial y series curadas de podcast con artistas consagradas y emergentes de la escena internacional.",
    keywords: [
      "Catálogo Sonoro",
      "Podcasts Techno",
      "Hard Techno Releases",
      "Industrial Techno",
      "Industrial Girls Records",
    ],
    openGraph: {
      title: "Catálogo Sonoro & Podcasts | Industrial Girls Records",
      description:
        "Lanzamientos oficiales de techno, hard techno, industrial y series curadas de podcast con artistas consagradas y emergentes de la escena internacional.",
      url: `${SITE_URL}/musica`,
      siteName: "Industrial Girls",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Catálogo Sonoro & Podcasts - Industrial Girls Records",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Catálogo Sonoro & Podcasts | Industrial Girls Records",
      description:
        "Lanzamientos oficiales de techno, hard techno, industrial y series curadas de podcast con artistas consagradas y emergentes de la escena internacional.",
      images: [DEFAULT_OG_IMAGE],
    },
  },

  // Step 3: Configure Artist Development agency route metadata (/desarrollo-artistico)
  desarrolloArtistico: {
    title: "Agencia de Desarrollo Artístico 360° | Industrial Girls",
    description:
      "Ecosistema de aceleración para DJs y productoras: diagnósticos de carrera, EPK, estrategia legal, ingeniería sonora y posicionamiento global.",
    keywords: [
      "Desarrollo Artístico 360",
      "Agencia para Productoras",
      "DJs Femeninas",
      "Ingeniería Sonora",
      "Industrial Girls Agency",
    ],
    openGraph: {
      title: "Agencia de Desarrollo Artístico 360° | Industrial Girls",
      description:
        "Ecosistema de aceleración para DJs y productoras: diagnósticos de carrera, EPK, estrategia legal, ingeniería sonora y posicionamiento global.",
      url: `${SITE_URL}/desarrollo-artistico`,
      siteName: "Industrial Girls",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Agencia de Desarrollo Artístico 360° - Industrial Girls",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Agencia de Desarrollo Artístico 360° | Industrial Girls",
      description:
        "Ecosistema de aceleración para DJs y productoras: diagnósticos de carrera, EPK, estrategia legal, ingeniería sonora y posicionamiento global.",
      images: [DEFAULT_OG_IMAGE],
    },
  },

  // Step 4: Configure Events & Showcases route metadata (/eventos)
  eventos: {
    title: "Showcases & Club Nights | Industrial Girls Events",
    description:
      "Curadurías para la pista de baile, warehouse raves y noches de club conectando escenas locales con el circuito electrónico europeo y global.",
    keywords: [
      "Showcases Techno",
      "Club Nights",
      "Warehouse Raves",
      "Eventos Underground",
      "Industrial Girls Events",
    ],
    openGraph: {
      title: "Showcases & Club Nights | Industrial Girls Events",
      description:
        "Curadurías para la pista de baile, warehouse raves y noches de club conectando escenas locales con el circuito electrónico europeo y global.",
      url: `${SITE_URL}/eventos`,
      siteName: "Industrial Girls",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Showcases & Club Nights - Industrial Girls Events",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Showcases & Club Nights | Industrial Girls Events",
      description:
        "Curadurías para la pista de baile, warehouse raves y noches de club conectando escenas locales con el circuito electrónico europeo y global.",
      images: [DEFAULT_OG_IMAGE],
    },
  },

  // Step 5: Configure Community & Journal route metadata (/comunidad)
  comunidad: {
    title: "Noticias, Memoria & Archivo Editorial | Industrial Girls Journal",
    description:
      "Investigación sobre pioneras del sintetizador, diseño sonoro, hardware analógico, DAWs y perfiles de artistas que redefinen la música electrónica.",
    keywords: [
      "Noticias Techno",
      "Memoria Histórica",
      "Archivo Editorial",
      "Pioneras del Sintetizador",
      "Industrial Girls Journal",
    ],
    openGraph: {
      title: "Noticias, Memoria & Archivo Editorial | Industrial Girls Journal",
      description:
        "Investigación sobre pioneras del sintetizador, diseño sonoro, hardware analógico, DAWs y perfiles de artistas que redefinen la música electrónica.",
      url: `${SITE_URL}/comunidad`,
      siteName: "Industrial Girls",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Noticias, Memoria & Archivo Editorial - Industrial Girls Journal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Noticias, Memoria & Archivo Editorial | Industrial Girls Journal",
      description:
        "Investigación sobre pioneras del sintetizador, diseño sonoro, hardware analógico, DAWs y perfiles de artistas que redefinen la música electrónica.",
      images: [DEFAULT_OG_IMAGE],
    },
  },
};
