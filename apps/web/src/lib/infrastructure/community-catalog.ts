/**
 * @file apps/web/src/lib/infrastructure/community-catalog.ts
 * @description Layer 4: Infrastructure - Editorial Journal & Community Catalog (/comunidad).
 * Contains the 5 specialized articles on pioneering women in electronic music, sound engineering,
 * hardware architecture, and rave culture, plus initial discussions with roles and threading.
 */

/**
 * Reader comment on an editorial article.
 */
export interface ArticleComment {
  /** Comment ID */
  id: string;
  /** Article slug foreign key */
  articleId: string;
  /** Author name / alias */
  author: string;
  /** Comment body */
  content: string;
  /** Timestamp ISO string */
  createdAt: string;
  /** Participant role in the scene */
  role?: string;
  /** Optional subscriber email address (not published publicly) */
  email?: string;
  /** Optional parent comment ID for threaded replies */
  parentId?: string;
  /** Visibility status: true if public in forum feed, false if direct message for editorial team */
  isPublic?: boolean;
}

/**
 * Editorial article in the Industrial Girls Journal.
 */
export interface JournalArticle {
  /** Unique article slug */
  slug: string;
  /** Article title */
  title: string;
  /** Subtitle / Deck */
  subtitle: string;
  /** Publication date */
  date: string;
  /** Reading time in minutes */
  readingTime: string;
  /** Author name and role */
  author: string;
  /** Categorical tags */
  tags: string[];
  /** Short summary snippet */
  excerpt: string;
  /** Archival image URL */
  imageUrl?: string;
  /** Accessible image description */
  imageAlt?: string;
  /** Provocative technical debate question */
  debateQuestion?: string;
  /** Paragraphs of content */
  contentParagraphs: string[];
}

/**
 * Dataset: 5 Editorial Articles with archival Wikimedia Commons imagery and debate triggers.
 */
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "pioneras-del-voltaje",
    title: "Pioneras del Voltaje: De la Música Concreta a la Resonancia Modular",
    subtitle: "De la experimentación en cinta a los sintetizadores modulares que redefinieron el sonido contemporáneo.",
    date: "2025-02-10",
    readingTime: "8 min",
    author: "Industrial Girls Editorial",
    tags: ["#MEMORIA&HISTORIA", "#HARDWARE&SÍNTESIS"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Delia_Derbyshire_1.jpg",
    imageAlt: "Delia Derbyshire pionera del BBC Radiophonic Workshop",
    excerpt: "Delia Derbyshire, Daphne Oram y Éliane Radigue esculpieron las bases del sonido electrónico manipulando cinta, dibujando sonido óptico y dominando el sintetizador ARP 2500.",
    debateQuestion: "¿Cómo influyen las limitaciones de la manipulación física de cinta y los sistemas como Oramics en la textura orgánica que hoy buscamos replicar digitalmente?",
    contentParagraphs: [
      "La historia de la música electrónica moderna no puede escribirse sin Delia Derbyshire y sus innovaciones pioneras en el BBC Radiophonic Workshop. Su técnica para cortar, bucleizar y manipular cinta magnética transformó oscilaciones analógicas crudas en paisajes sonoros revolucionarios sin ayuda de ordenadores comerciales.",
      "Daphne Oram llevó la experimentación un paso más allá concibiendo la técnica Oramics, un sistema donde ondas sonoras y parámetros de modulación eran dibujados directamente a mano sobre tiras de celuloide de 35mm para ser convertidos fotoeléctricamente en voltaje audible.",
      "Por su parte, Éliane Radigue consagró décadas al dominio absoluto del sintetizador modular ARP 2500, operando sin teclado mediante matrices de pines para explorar microtonalidades sutiles, armónicos lentos y retroalimentación controlada que sentaron las bases espirituales del ambient y el techno hipnótico.",
    ],
  },
  {
    slug: "huella-de-silicio-chips-circuitos",
    title: "La Huella de Silicio: Las Mentes Femeninas detrás de los Chips y Circuitos",
    subtitle: "La arquitectura analógica de los sintetizadores Moog y Buchla guiada por la visión matemática y acústica femenina.",
    date: "2025-04-18",
    readingTime: "7 min",
    author: "Industrial Girls Editorial",
    tags: ["#HARDWARE&SÍNTESIS", "#MEMORIA&HISTORIA"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/Suzanne_Ciani_at_KQED_in_August_2024.jpg",
    imageAlt: "Suzanne Ciani operando síntesis modular",
    excerpt: "Suzanne Ciani y Wendy Carlos rediseñaron la síntesis analógica: desde la espacialización cuadrafónica en el Buchla 200 hasta el desarrollo de redes de filtros con pendiente de 24dB en el sistema Moog.",
    debateQuestion: "¿De qué manera la arquitectura abierta y no lineal del Buchla 200 desafía el paradigma compositivo occidental basado en notas discretas?",
    contentParagraphs: [
      "Suzanne Ciani dominó el complejo sintetizador modular Buchla 200 como una virtuosa del voltaje, integrando modulación en anillo, espacialización cuadrafónica y síntesis de voz analógica en producciones artísticas y comerciales que desmitificaron la tecnología sonora en los años setenta.",
      "En paralelo, Wendy Carlos colaboró estrechamente con Robert Moog, aportando rigor musical e ingeniería de diseño para el perfeccionamiento del sintetizador Moog modular. Su trabajo empujó la creación de teclados sensibles al tacto, afinaciones microtonales y las emblemáticas redes de filtros con pendientes de 24dB por octava.",
      "Comprender el silicio y los transistores desde la perspectiva de estas pioneras nos recuerda que la máquina es un lienzo plástico donde la respuesta no lineal de los componentes define la calidez y el alma del sonido underground.",
    ],
  },
  {
    slug: "espectro-ensanchado-hedy-lamarr",
    title: "Espectro Ensanchado y Telecomunicaciones: El Vínculo Científico de Hedy Lamarr",
    subtitle: "De los rollos de pianola al salto de frecuencia que sostiene el audio digital inalámbrico y las redes modernas.",
    date: "2025-06-12",
    readingTime: "6 min",
    author: "Industrial Girls Editorial",
    tags: ["#MEMORIA&HISTORIA", "#HARDWARE&SÍNTESIS"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/83/Hedy_Lamarr_Publicity_Photo_for_The_Heavenly_Body_1944.jpg",
    imageAlt: "Hedy Lamarr, inventora de la tecnología de espectro ensanchado por salto de frecuencia",
    excerpt: "En 1942, Hedy Lamarr patentó el salto de frecuencia mediante rollos mecánicos de pianola, sentando los fundamentos del espectro ensanchado sobre los que se construyen Wi-Fi, Bluetooth y la sincronización de audio.",
    debateQuestion: "¿Qué paralelismos encuentras entre la sincronización rítmica de audio digital en redes modernas y el salto de frecuencia mecánico patentado en 1942?",
    contentParagraphs: [
      "La actriz y científica Hedy Lamarr patentó en 1942, junto al compositor George Antheil, un sistema secreto de comunicaciones basado en 88 frecuencias que cambiaban de forma impredecible guiadas por rollos perforados de pianola, evitando la interferencia de torpedos guiados por radio.",
      "Este concepto seminal de salto de frecuencia sentó los cimientos teóricos del espectro ensanchado, un principio matemático y radioeléctrico sin el cual las redes celulares modernas, los protocolos Wi-Fi, Bluetooth y la transmisión digital de audio inalámbrico de baja latencia no existirían.",
      "El cruce entre música mecánica y física cuántica de telecomunicaciones demuestra que la vanguardia técnica surge de conectar disciplinas artísticas con el pensamiento electromagnético más radical.",
    ],
  },
  {
    slug: "arquitectura-software-tarjetas-perforadas-beat",
    title: "Arquitectura de Software: De las Tarjetas Perforadas a la Democratización del Beat",
    subtitle: "Las líneas de código que abrieron el camino desde el motor analítico de Lovelace hasta el software generativo en Bell Labs.",
    date: "2025-08-20",
    readingTime: "8 min",
    author: "Industrial Girls Editorial",
    tags: ["#SOFTWARE&DAW", "#MEMORIA&HISTORIA"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Laurie_Spiegel_2.jpg",
    imageAlt: "Laurie Spiegel, pionera del software musical interactivo",
    excerpt: "Desde la profecía algorítmica de Ada Lovelace hasta la creación del sistema interactivo GROOVE y Music Mouse por Laurie Spiegel en Bell Labs, cuyo sonido viaja en el disco de oro de las sondas Voyager.",
    debateQuestion: "¿Cómo reinterpreta el software generativo actual la visión de interactividad táctil e intuición que Laurie Spiegel diseñó con Music Mouse?",
    contentParagraphs: [
      "Ada Lovelace fue la primera persona en vislumbrar que el motor analítico de Babbage no solo manipularía números, sino que podría componer piezas musicales elaboradas de cualquier grado de complejidad si se le suministraban las relaciones armónicas adecuadas en tarjetas perforadas.",
      "Más de un siglo después, en los laboratorios Bell Labs, la investigadora y compositora Laurie Spiegel materializó esa profecía programando GROOVE, el primer sistema interactivo en tiempo real para síntesis híbrida, y más tarde Music Mouse, democratizando la composición asistida por ordenador para computadoras personales.",
      "Su composición 'Harmonices Mundi' fue seleccionada para viajar a bordo del disco de oro de las sondas espaciales Voyager, convirtiendo su código sonoro en el testimonio humano de la Tierra navegando el espacio interestelar.",
    ],
  },
  {
    slug: "arquitectura-hard-techno-distorsion-armonica",
    title: "Arquitectura del Hard Techno: Distorsión Armónica y Resistencia Sónica",
    subtitle: "Deconstrucción sónica a 150+ BPM: saturación Eurorack, wavefolding y la reapropiación del almacén industrial.",
    date: "2025-10-30",
    readingTime: "6 min",
    author: "Industrial Girls Editorial",
    tags: ["#LIVES&HYBRIDS", "#PRODUCTORAS&DJS"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Eurorack_Modular_Synthesizer.jpg",
    imageAlt: "Sistema modular Eurorack con cables de patch y módulos de saturación analógica",
    excerpt: "Análisis del diseño sonoro a 150+ BPM: módulos Eurorack de clipping asimétrico, síntesis percusiva de kicks aplastantes y el almacén como espacio físico de resistencia comunitaria.",
    debateQuestion: "¿En qué punto la distorsión extrema y el wavefolding dejan de ser un efecto estético para convertirse en la estructura armónica principal del techno moderno?",
    contentParagraphs: [
      "La evolución del hard techno contemporáneo a más de 150 BPM ha empujado el diseño sonoro hacia límites acústicos extremos. El uso de sintetizadores con módulos de Eurorack wavefolding y clipping asimétrico genera armónicos densos que atraviesan los subwoofers de club sin perder impacto físico.",
      "El procesamiento percusivo de bombos industriales requiere técnicas avanzadas: capas separadas para el transitorio de ataque, síntesis FM en el rango medio y saturación valvular controlada para que la presión sonora sea aplastante pero inteligible en recintos de hormigón armado.",
      "Esta música no se diseñó para la radio comercial ni para las listas de reproducción estandarizadas; vive en los almacenes industriales clandestinos, donde la acústica cruda, el anonimato y la política de cero tolerancia al acoso convierten la pista de baile en un reducto de liberación colectiva y resistencia sónica.",
    ],
  },
];

/**
 * Baseline initial comments collection.
 * Invariant: Zero mock comments or fabricated user testimonials.
 * Real participant comments are received dynamically via the debate console under editorial moderation.
 */
export const INITIAL_COMMENTS: ArticleComment[] = [];

/**
 * Retrieves all journal articles.
 *
 * @returns {JournalArticle[]} Array of 5 journal articles.
 */
export function getJournalArticles(): JournalArticle[] {
  // Step 1: Return immutable articles array
  return JOURNAL_ARTICLES;
}

/**
 * Finds an article by slug.
 *
 * @param {string} slug - Article slug identifier.
 * @returns {JournalArticle | undefined} Found article or undefined.
 */
export function getArticleBySlug(slug: string): JournalArticle | undefined {
  // Step 1: Query article by slug
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}

/**
 * Retrieves comments associated with an article.
 *
 * @param {string} articleId - Article slug.
 * @returns {ArticleComment[]} Comments list.
 */
export function getArticleComments(articleId: string): ArticleComment[] {
  // Step 1: Filter comments by article ID
  return INITIAL_COMMENTS.filter((c) => c.articleId === articleId);
}
