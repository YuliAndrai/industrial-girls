/**
 * @file apps/web/src/lib/infrastructure/services-data.ts
 * @description Layer 4: Infrastructure - Strongly-typed Technical Services Catalog for Artist Development.
 * Option 3 Architecture: 5 technical services with Launch Campaign (Campaña de Lanzamiento)
 * designated as the primary flagship service.
 */

/**
 * Technical service item contract for Artist Development offerings.
 */
export interface ServiceItem {
  /** Unique semantic identifier */
  id: string;
  /** Tactical sequential code index (e.g. '01', '02') */
  code: string;
  /** High-level uppercase service title */
  title: string;
  /** Optional badge description (e.g., 'SERVICIO INSIGNIA // FLAGSHIP') */
  badge?: string;
  /** Comprehensive editorial service description */
  description: string;
  /** Distinct feature bullet points and deliverables */
  features: readonly string[];
  /** Flag indicating whether this service is the flagship offering */
  isPrimary?: boolean;
}

/**
 * Immutable catalog containing the 5 official technical services.
 */
export const SERVICES_CATALOG: readonly ServiceItem[] = [
  {
    id: "campana-lanzamiento",
    code: "01",
    title: "CAMPAÑA DE LANZAMIENTO",
    badge: "SERVICIO INSIGNIA // FLAGSHIP",
    isPrimary: true,
    description:
      "Estrategia integral de estreno para singles y EPs. Diseñada para maximizar alcance, visibilidad y posicionamiento en la industria de club.",
    features: [
      "Estrategia de lanzamiento y cronograma de estreno",
      "Pitch editorial y envío directo a curadores / playlists",
      "Registro formal de tracks y metadatos",
      "Piezas gráficas oficiales para prensa y plataformas",
      "Video teasers y clips dinámicos de difusión",
    ],
  },
  {
    id: "plan-artistico-360",
    code: "02",
    title: "PLAN ARTÍSTICO 360°",
    description:
      "Programa de aceleración y estructura profesional para productoras que buscan consolidar su proyecto en el circuito global.",
    features: [
      "Plan de negocio musical y proyección estratégica",
      "Estrategia de comunicación y narrativa en redes",
      "Diseño y desarrollo de EPK profesional",
      "Dirección de marca y conceptualización visual (Branding)",
    ],
  },
  {
    id: "legal-contratos",
    code: "03",
    title: "LEGAL & CONTRATOS",
    description:
      "Blindaje jurídico, financiero y administrativo para la protección de obras y acuerdos con sellos.",
    features: [
      "Revisión y redacción de contratos discográficos",
      "Legalización y protección de fonogramas / tracks",
      "Gestión de derechos de autor y publishing",
      "Asesoría financiera estratégica (Add-on)",
    ],
  },
  {
    id: "audio-mastering",
    code: "04",
    title: "AUDIO & MASTERING",
    description:
      "Ingeniería de sonido y acabados acústicos de alto impacto optimizados para sistemas de sonido de club.",
    features: [
      "Masterización orientada a club y streaming (Lossless / WAV)",
      "Tratamiento armónico y contundencia en graves",
      "Dirección de arte sonoro y concepto de mezcla (Add-on)",
    ],
  },
  {
    id: "infraestructura-digital",
    code: "05",
    title: "INFRAESTRUCTURA DIGITAL",
    description:
      "Herramientas técnicas, presencia digital independiente y optimización operativa para proyectos musicales.",
    features: [
      "Diseño y desarrollo de páginas web para artistas",
      "Diseño de artes gráficas y piezas de identidad",
      "Automatización de procesos operativos",
      "Migración de software y flujos de trabajo en estudio",
    ],
  },
] as const;

/**
 * Retrieves all technical services from the catalog.
 *
 * @returns {readonly ServiceItem[]} Defensive immutable array of services.
 */
export function getServicesCatalog(): readonly ServiceItem[] {
  // Step 1: Return immutable services catalog
  return SERVICES_CATALOG;
}

/**
 * Looks up a specific technical service by its unique id.
 *
 * @param {string} id - The service identifier.
 * @returns {ServiceItem | undefined} Found service entity or undefined.
 */
export function getServiceById(id: string): ServiceItem | undefined {
  // Step 1: Search service by id match
  return SERVICES_CATALOG.find((service) => service.id === id);
}
