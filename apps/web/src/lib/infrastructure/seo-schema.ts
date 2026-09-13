/**
 * @file apps/web/src/lib/infrastructure/seo-schema.ts
 * @description Layer 4: Infrastructure - Schema.org JSON-LD Structured Data & Semantic Graph.
 * Architectural Boundary: Governs static metadata, authority entities, and canonical graph definitions
 * for search engine crawlers and generative AI engines (GEO/LLMO). Pure data layer with zero UI or client-side dependencies.
 */

/**
 * Geographical administrative area served by the entity.
 */
export interface AdministrativeArea {
  /** Schema.org item type */
  readonly "@type": "AdministrativeArea";
  /** Area or jurisdiction name */
  readonly name: string;
}

/**
 * Schema.org MusicGroup entity contract for the record label, artists, and sound collective.
 */
export interface MusicGroupEntity {
  /** Schema.org item type */
  readonly "@type": "MusicGroup";
  /** Canonical URI identity */
  readonly "@id": string;
  /** Legal and brand name */
  readonly name: string;
  /** Alternate or commercial monikers */
  readonly alternateName?: readonly string[];
  /** Official web portal URL */
  readonly url: string;
  /** Official logo asset URL */
  readonly logo?: string;
  /** Primary showcase image URL */
  readonly image?: string;
  /** Detailed institutional description */
  readonly description: string;
  /** Subgenres and musical spectrum */
  readonly genre: readonly string[];
  /** Authoritative Knowledge Graph references */
  readonly knowsAbout: readonly string[];
  /** Geographic distribution footprint */
  readonly areaServed: readonly AdministrativeArea[];
  /** Verified social and streaming profile links */
  readonly sameAs?: readonly string[];
}

/**
 * Parent organization reference contract.
 */
export interface ParentOrganizationRef {
  /** Canonical URI identity of the parent organization */
  readonly "@id": string;
}

/**
 * Schema.org MusicPlatform entity contract representing the cultural broadcast and catalog system.
 */
export interface MusicPlatformEntity {
  /** Schema.org item type */
  readonly "@type": "MusicPlatform";
  /** Canonical URI identity */
  readonly "@id": string;
  /** Platform identifier name */
  readonly name: string;
  /** Alternate platform moniker */
  readonly alternateName?: string;
  /** Platform root URL */
  readonly url?: string;
  /** Cultural and functional platform mission description */
  readonly description?: string;
  /** Parent organization linkage */
  readonly parentOrganization?: ParentOrganizationRef;
  /** Geographic distribution footprint */
  readonly areaServed?: readonly AdministrativeArea[];
  /** Verified external ecosystem links */
  readonly sameAs?: readonly string[];
}

/**
 * Root Schema.org Graph schema specification containing top-level linked data.
 */
export interface RootJsonLdGraph {
  /** Schema.org context definition */
  readonly "@context": "https://schema.org";
  /** Ordered graph entities containing MusicGroup and MusicPlatform */
  readonly "@graph": readonly [MusicGroupEntity, MusicPlatformEntity];
}

/**
 * Canonical Root JSON-LD Structured Graph for Industrial Girls.
 * Injected in root layout head for semantic indexing and LLM authority.
 */
export const ROOT_JSON_LD_SCHEMA: RootJsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // Step 1: Declare primary MusicGroup entity with subgenres and authority entities
    {
      "@type": "MusicGroup",
      "@id": "https://industrialgirls.com/#organization",
      name: "Industrial Girls",
      alternateName: ["Industrial Girls Music", "Industrial Girls Records"],
      url: "https://industrialgirls.com",
      description:
        "Plataforma cultural, sello discográfico y agencia de desarrollo artístico enfocada en mujeres en la música electrónica, techno underground, hard techno y cultura clubbing global.",
      genre: [
        "Techno",
        "Industrial Techno",
        "Hard Techno",
        "Acid Techno",
        "EBM",
        "Groove Techno",
        "Trance",
      ],
      knowsAbout: [
        "Women in Electronic Music",
        "Female DJs",
        "Techno Culture",
        "Gender Diversity in Electronic Music",
        "Underground Electronic Music",
        "Electronic Music Label",
        "Artist Development",
        "https://en.wikipedia.org/wiki/Charlotte_de_Witte",
        "https://en.wikipedia.org/wiki/Amelie_Lens",
        "https://en.wikipedia.org/wiki/Nina_Kraviz",
        "https://en.wikipedia.org/wiki/Peggy_Gou",
        "https://en.wikipedia.org/wiki/Sara_Landry",
        "https://en.wikipedia.org/wiki/Awakenings",
        "https://en.wikipedia.org/wiki/MUTEK",
      ],
      areaServed: [
        { "@type": "AdministrativeArea", name: "Global" },
        { "@type": "AdministrativeArea", name: "Colombia" },
        { "@type": "AdministrativeArea", name: "Europe" },
        { "@type": "AdministrativeArea", name: "Asia" },
      ],
    },
    // Step 2: Declare complementary MusicPlatform entity linked to parent organization
    {
      "@type": "MusicPlatform",
      "@id": "https://industrialgirls.com/#label",
      name: "Industrial Girls Record Label",
      parentOrganization: {
        "@id": "https://industrialgirls.com/#organization",
      },
    },
  ],
} as const;
