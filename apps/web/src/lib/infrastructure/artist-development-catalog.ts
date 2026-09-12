/**
 * @file apps/web/src/lib/infrastructure/artist-development-catalog.ts
 * @description Layer 4: Infrastructure - Static Catalog for Artist Development 360° Module.
 * Defines the strongly-typed pillars, services, add-ons, and diagnostic categories.
 */

/**
 * Service item within a development pillar.
 */
export interface ServiceItem {
  /** Unique identifier for the service */
  id: string;
  /** Human-readable title */
  title: string;
  /** Comprehensive service description */
  description: string;
  /** Whether the service is offered as an add-on */
  isAddon?: boolean;
}

/**
 * High-level developmental pillar grouping related service offerings.
 */
export interface ServicePillar {
  /** Unique pillar identifier (e.g., '01', '02', '03', '04') */
  id: string;
  /** Numeric label string for brutalist tactical index */
  indexNumber: string;
  /** Pillar headline */
  title: string;
  /** Tactical subtitle / domain focus */
  subtitle: string;
  /** Detailed services included in this pillar */
  services: ServiceItem[];
}

/**
 * Immutable dataset defining the 4 pillars of the Artist Development Agency.
 */
export const ARTIST_DEV_PILLARS: ServicePillar[] = [
  {
    id: "strategy-diagnosis",
    indexNumber: "01",
    title: "ESTRATEGIA & DIAGNÓSTICO",
    subtitle: "EVALUACIÓN DE PERFIL Y MODELO DE NEGOCIO",
    services: [
      {
        id: "diagnostic-level-1",
        title: "Diagnóstico Artístico (Nivel 1)",
        description: "Evaluación exhaustiva de catálogo, posicionamiento sonoro y canales digitales.",
      },
      {
        id: "plan-completo-360",
        title: "Plan Completo 360°",
        description: "Plan de negocio para artistas, estrategia de redes sociales, branding visual y confección de EPK profesional internacional.",
      },
    ],
  },
  {
    id: "sound-engineering",
    indexNumber: "02",
    title: "INGENIERÍA SONORA & PRODUCCIÓN",
    subtitle: "CALIDAD DE CLUB Y DIRECCIÓN MUSICAL",
    services: [
      {
        id: "sound-production",
        title: "Producción & Sound Design",
        description: "Producción musical avanzada en géneros de club y diseño sonoro a medida.",
      },
      {
        id: "mastering-tracks",
        title: "Masterización de Pistas",
        description: "Calibración sonora para clubes, festivales y formatos digitales.",
        isAddon: true,
      },
      {
        id: "visual-art-direction",
        title: "Diseño de Arte Visual",
        description: "Portadas de lanzamientos, dirección de arte para singles y EPs.",
      },
    ],
  },
  {
    id: "legal-publishing",
    indexNumber: "03",
    title: "LEGAL, REGISTROS & LANZAMIENTOS",
    subtitle: "PROTECCIÓN JURÍDICA Y MONETIZACIÓN",
    services: [
      {
        id: "contracts-copyright",
        title: "Contratos & Derechos de Autor",
        description: "Asesoría financiera y estructuración contractual.",
        isAddon: true,
      },
      {
        id: "track-legalization",
        title: "Legalización y Registro Formal",
        description: "Legalización y registro formal de tracks y obras musicales ante entidades de gestión colectiva.",
      },
      {
        id: "launch-campaign",
        title: "Campaña de Lanzamiento",
        description: "Estrategia de estreno, pitch editorial, clips audiovisuales y material promocional.",
      },
    ],
  },
  {
    id: "digital-infrastructure",
    indexNumber: "04",
    title: "INFRAESTRUCTURA DIGITAL & AUTOMATIZACIÓN",
    subtitle: "PLATAFORMAS WEB Y HERRAMIENTAS DE GESTIÓN",
    services: [
      {
        id: "web-development",
        title: "Diseño y Desarrollo Web",
        description: "Diseño y desarrollo de páginas web y landing pages para DJs/Productoras.",
      },
      {
        id: "process-automation",
        title: "Automatización de Procesos",
        description: "Automatización de procesos y optimización de flujos de trabajo en producción y booking.",
      },
      {
        id: "software-migration",
        title: "Migración y Configuración de Software",
        description: "Migración y configuración de software musical y herramientas de gestión.",
      },
    ],
  },
];

/**
 * Key value proposition badges declared in the Hero Section.
 */
export const ARTIST_DEV_BADGES: string[] = [
  "Diagnóstico Nivel 1",
  "Identidad & EPK",
  "Ingeniería de Audio",
  "Legal & Publishing",
  "Soluciones Digitales",
];

/**
 * Retrieves all artist development pillars.
 *
 * @returns {ServicePillar[]} Immutable array of all 4 service pillars.
 */
export function getArtistDevPillars(): ServicePillar[] {
  // Step 1: Return immutable dataset reference
  return ARTIST_DEV_PILLARS;
}

/**
 * Looks up a specific pillar by its ID.
 *
 * @param {string} id - The pillar identifier.
 * @returns {ServicePillar | undefined} The found pillar or undefined.
 */
export function getPillarById(id: string): ServicePillar | undefined {
  // Step 1: Query pillar by id matching
  return ARTIST_DEV_PILLARS.find((pillar) => pillar.id === id);
}
