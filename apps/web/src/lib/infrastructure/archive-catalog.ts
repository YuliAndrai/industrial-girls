/**
 * @file apps/web/src/lib/infrastructure/archive-catalog.ts
 * @description Layer 4: Infrastructure - Archive Catalog for 30+ Artists & Media Gallery (/archivo).
 * Lists all producers, selectors, residents, and media assets linked to the Industrial Girls movement.
 */

/**
 * Artist entity recorded in the Industrial Girls archive roster.
 */
export interface ArchiveArtist {
  /** Unique slug */
  slug: string;
  /** Stage alias */
  name: string;
  /** Country of base */
  origin: string;
  /** Dominant sonic subgenres */
  subgenre: string;
  /** Brief artist bio */
  bio: string;
  /** Whether the artist is a resident */
  isResident?: boolean;
  /** Social / Music URL */
  soundCloudUrl: string;
}

/**
 * Media item in the visual and video archive.
 */
export interface MediaArchiveItem {
  /** Item identifier */
  id: string;
  /** Title / Event name */
  title: string;
  /** Date of media capture */
  date: string;
  /** City and Venue */
  location: string;
  /** Type of item */
  type: "photo" | "video";
  /** Image URL or YouTube embed ID */
  mediaUrl: string;
  /** Caption */
  caption: string;
}

/**
 * Dataset: 30+ Artists in the Industrial Girls Archive.
 */
export const ARCHIVE_ARTISTS: ArchiveArtist[] = [
  { slug: "clara-cuve", name: "Clara Cuvé", origin: "Alemania", subgenre: "Hard & Fast Techno", bio: "Velocidad vertiginosa, mezclas quirúrgicas y dinamismo implacable en cabina.", soundCloudUrl: "https://soundcloud.com/claracuve" },
  { slug: "otta", name: "Øtta", origin: "Portugal", subgenre: "Industrial Rave & Schranz", bio: "Fusión explosiva de ritmos acelerados, samples vocales hardcore y energía desbordante.", soundCloudUrl: "https://soundcloud.com/otta-music" },
  { slug: "parfait", name: "Parfait", origin: "Francia", subgenre: "Dark Hypnotic Hard Techno", bio: "Cofundadora de Possession París, referente de la cultura rave europea contemporánea.", soundCloudUrl: "https://soundcloud.com/parfait-music" },
  { slug: "wallis", name: "Wallis", origin: "Alemania / Francia", subgenre: "Live Analog Modular", bio: "Directo 100% analógico con sintetizadores modulares, kicks implacables y feedback.", soundCloudUrl: "https://soundcloud.com/wallis-live" },
  { slug: "caravel", name: "Caravel", origin: "Francia", subgenre: "Raw Hard Techno", bio: "Productora francesa con un sello distintivo de percusión metálica y atmósferas oscuras.", soundCloudUrl: "https://soundcloud.com/caravel-techno" },
  { slug: "somniac-one", name: "Somniac One", origin: "Lituania / Países Bajos", subgenre: "Hardcore Industrial", bio: "Pionera en derribar las fronteras entre el Industrial Techno de club y el Hardcore extremo.", soundCloudUrl: "https://soundcloud.com/somniacone" },
  { slug: "lady-maru", name: "Lady Maru", origin: "Italia", subgenre: "Acid Industrial & Post-Punk", bio: "Veterana de los clubes romanos, sintetizadores distorsionados y líneas de bajo 303.", soundCloudUrl: "https://soundcloud.com/lady-maru" },
  { slug: "cassie-raptor", name: "Cassie Raptor", origin: "Francia", subgenre: "Cyberpunk Industrial Techno", bio: "Energía catártica que transforma la pista en una rebelión audiovisual de alto octanaje.", soundCloudUrl: "https://soundcloud.com/cassieraptor" },
  { slug: "cera-khin", name: "Cera Khin", origin: "Túnez / Alemania", subgenre: "Hard Trance & Hardcore", bio: "Fundadora de Lazy Tapes, selectora sin restricciones estilísticas que domina festivales globales.", soundCloudUrl: "https://soundcloud.com/cerakhin" },
  { slug: "anetha", name: "Anetha", origin: "Francia", subgenre: "Contemporary Acid Techno", bio: "Directora de Mama Told Ya, arquitecta de un sonido ácido, fresco y de resistencia comunitaria.", soundCloudUrl: "https://soundcloud.com/anethamusic" },
  { slug: "spfdj", name: "SPFDJ", origin: "Suecia / Reino Unido", subgenre: "Acid, EBM & Raw Techno", bio: "Cofundadora de Intrepid Skin, conocida por sets implacables que no dan tregua en la pista.", soundCloudUrl: "https://soundcloud.com/spfdj" },
  { slug: "vtss", name: "VTSS", origin: "Polonia", subgenre: "Hard Techno & Experimental Club", bio: "Fuerza motriz de la escena polaca underground y figura global de vanguardia electrónica.", soundCloudUrl: "https://soundcloud.com/vtss-pl" },
  { slug: "daria-kolosova", name: "Daria Kolosova", origin: "Ucrania", subgenre: "Hard Groove & Raw Techno", bio: "Pilar del clubbing en Kyiv, selectora técnica con una lectura impecable del público de almacén.", soundCloudUrl: "https://soundcloud.com/dariakolosova" },
  { slug: "paula-temple", name: "Paula Temple", origin: "Reino Unido", subgenre: "Heavy Industrial Techno", bio: "Diseñadora de sonido de élite, cocreadora del controlador MXF8 y referente insoslayable.", soundCloudUrl: "https://soundcloud.com/paulatemple" },
  { slug: "stephanie-sykes", name: "Stephanie Sykes", origin: "Reino Unido / Alemania", subgenre: "Deep Ambient to Raw Techno", bio: "Residente habitual de Berghain y Jaded Londres con narrativas sonoras abrasivas.", soundCloudUrl: "https://soundcloud.com/stephaniesykes" },
  { slug: "ellen-allien", name: "Ellen Allien", origin: "Alemania", subgenre: "Acid Techno & Berlin Heritage", bio: "Leyenda viviente de la cultura rave berlinesa y fundadora de BPitch Control.", soundCloudUrl: "https://soundcloud.com/ellen-allien" },
  { slug: "rebekah", name: "Rebekah", origin: "Reino Unido", subgenre: "Fast Industrial Hard Techno", bio: "Activista de la cultura de club seguro y productora de texturas industriales viscerales.", soundCloudUrl: "https://soundcloud.com/rebekah" },
  { slug: "fatima-hajji", name: "Fatima Hajji", origin: "España", subgenre: "Hard Techno & Schranz", bio: "Más de dos décadas incendiando escenarios con tempos desbocados y herencia rítmica arábiga.", soundCloudUrl: "https://soundcloud.com/fatimahajji" },
  { slug: "indira-paganotto", name: "Indira Paganotto", origin: "España", subgenre: "Psy-Techno & Acid", bio: "Creadora del movimiento ARTCORE con ritmos galopantes de alta intensidad.", soundCloudUrl: "https://soundcloud.com/indirapaganotto" },
  { slug: "snts", name: "SNTS", origin: "Alemania", subgenre: "Black Industrial & Dystopian", bio: "Productor enigmático con máscara de cuero, texturas analógicas y distorsión implacable.", soundCloudUrl: "https://soundcloud.com/sntsrecords" },
  { slug: "alignment", name: "Alignment", origin: "Italia", subgenre: "Peak Time Acid & Hard Trance", bio: "Sonido de precisión melódica contundente y basslines arrolladores en el sello KNTXT.", soundCloudUrl: "https://soundcloud.com/alignment-3" },
  { slug: "sara-landry", name: "Sara Landry", origin: "Estados Unidos", subgenre: "High-Energy Hard Techno", bio: "La sacerdotisa del hard techno norteamericano y fundadora del sello Hekate Records.", soundCloudUrl: "https://soundcloud.com/saralandrydj" },
  { slug: "i-hate-models", name: "I Hate Models", origin: "Francia", subgenre: "Emotional Industrial Techno", bio: "Catarsis entre la melancolía electrónica, EBM violento y percusiones abrasivas.", soundCloudUrl: "https://soundcloud.com/ihatemodels" },
  { slug: "hector-oaks", name: "Hector Oaks", origin: "España / Alemania", subgenre: "Pure Vinyl Hard Rave", bio: "Maestro absoluto del vinilo y selector incansable de los clásicos más crudos del rave.", soundCloudUrl: "https://soundcloud.com/hector-oaks" },
  { slug: "klangkuenstler", name: "Klangkuenstler", origin: "Alemania", subgenre: "90s Schranz Revival", bio: "Resurrector del sonido Schranz alemán de principios de los 2000 con bombos atronadores.", soundCloudUrl: "https://soundcloud.com/klangkuenstler" },
  { slug: "999999999", name: "999999999", origin: "Italia", subgenre: "Live Hardware Acid Techno", bio: "Dúo italiano que improvisa directos atronadores con baterías Roland y sintetizadores 303.", soundCloudUrl: "https://soundcloud.com/999999999music" },
  { slug: "charlie-sparks", name: "Charlie Sparks", origin: "Reino Unido", subgenre: "Acid Schranz & Rave", bio: "Rápido ascenso en la escena europea gracias a mezclas implacables de hard dance e industrial.", soundCloudUrl: "https://soundcloud.com/charliesparks" },
  { slug: "nico-moreno", name: "Nico Moreno", origin: "Francia", subgenre: "Modern French Hard Techno", bio: "Pionero del renacimiento hard techno francés y fundador del sello Insolent Rave.", soundCloudUrl: "https://soundcloud.com/nicomoreno" },
  { slug: "vane", name: "VANE", origin: "Colombia", subgenre: "Modular Hard Techno", bio: "Residente de Industrial Girls, arquitecta sonora de sets con sintetizadores oscuros.", isResident: true, soundCloudUrl: "https://soundcloud.com/industrialgirls" },
  { slug: "distorta", name: "DISTORTA", origin: "Colombia", subgenre: "Distorted Kicks & Heavy Bass", bio: "Residente de Industrial Girls, curadora principal y propulsora del sonido visceral.", isResident: true, soundCloudUrl: "https://soundcloud.com/industrialgirls" },
  { slug: "hex99", name: "HEX99", origin: "Alemania", subgenre: "EBM Techno & Coldwave", bio: "Residente de Industrial Girls, productor de texturas frías e industriales de club clandestino.", isResident: true, soundCloudUrl: "https://soundcloud.com/industrialgirls" },
];

/**
 * Dataset: Media Archive Items.
 */
export const MEDIA_ARCHIVE: MediaArchiveItem[] = [
  {
    id: "media-01",
    title: "Tresor Vault Session Photo Record",
    date: "2025-05-18",
    location: "Berlín, Alemania",
    type: "photo",
    mediaUrl: "/industrial-girls-logo-grid.png",
    caption: "Atmósfera en el sótano de Globus durante el debut de residentes en la capital alemana.",
  },
  {
    id: "media-02",
    title: "Warehouse Bogotá Underground Reel",
    date: "2025-08-25",
    location: "Bogotá, Colombia",
    type: "video",
    mediaUrl: "dQw4w9WgXcQ",
    caption: "Registro audiovisual del montaje y la prueba de presión sonora en Almacén 44.",
  },
  {
    id: "media-03",
    title: "Fold London Smoke & Strobe Gallery",
    date: "2025-11-12",
    location: "Londres, Reino Unido",
    type: "photo",
    mediaUrl: "/industrial-girls-badge-mask.jpg",
    caption: "La pista de baile inmersa en niebla densa y visuales industriales de alta cadencia.",
  },
];

/**
 * Retrieves the complete list of archive artists.
 *
 * @returns {ArchiveArtist[]} Array of 30+ archive artists.
 */
export function getArchiveArtists(): ArchiveArtist[] {
  // Step 1: Return immutable artists array
  return ARCHIVE_ARTISTS;
}

/**
 * Finds an archive artist by slug identifier.
 *
 * @param {string} slug - Artist slug.
 * @returns {ArchiveArtist | undefined} Found artist or undefined.
 */
export function getArtistBySlug(slug: string): ArchiveArtist | undefined {
  // Step 1: Query artist by slug
  return ARCHIVE_ARTISTS.find((a) => a.slug === slug);
}

/**
 * Retrieves media archive gallery items.
 *
 * @returns {MediaArchiveItem[]} Array of media entries.
 */
export function getMediaArchiveItems(): MediaArchiveItem[] {
  // Step 1: Return media archive items
  return MEDIA_ARCHIVE;
}
