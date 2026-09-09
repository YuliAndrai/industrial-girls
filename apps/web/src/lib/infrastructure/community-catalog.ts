/**
 * @file apps/web/src/lib/infrastructure/community-catalog.ts
 * @description Layer 4: Infrastructure - Editorial Journal & Community Catalog (/comunidad).
 * Contains the 5 specialized articles on music technology, sound design, and rave culture, plus initial discussions.
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
  /** Paragraphs of content */
  contentParagraphs: string[];
}

/**
 * Dataset: 5 Editorial Articles.
 */
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "pioneras-de-la-sintesis",
    title: "Pioneras de la Síntesis: De Daphne Oram a Eliane Radigue",
    subtitle: "La historia no contada de las mujeres que diseñaron la base tecnológica de la música electrónica.",
    date: "2025-02-10",
    readingTime: "6 min",
    author: "Redacción Industrial Girls",
    tags: ["HISTORIA", "SÍNTESIS", "INNOVACIÓN"],
    excerpt: "Mucho antes de que los sintetizadores comerciales poblaran los estudios, visionarias como Daphne Oram creaban música dibujando ondas ópticas, mientras Eliane Radigue esculpía drones infinitos con el sintetizador modular ARP 2500.",
    contentParagraphs: [
      "La narrativa tradicional de la tecnología musical suele pasar por alto que las bases mismas del sonido electrónico fueron codificadas por mujeres. En el Radiophonic Workshop de la BBC, Daphne Oram inventó la técnica 'Oramics', dibujando directamente sobre cinta de 35mm para transformar trazos gráficos en voltaje analógico y oscilaciones sonoras audibles.",
      "Por su parte, Eliane Radigue dedicó décadas al dominio exhaustivo del ARP 2500, operando sin teclado mediante matrices de pines para explorar microtonalidades, modulaciones de fase lentas y armónicos casi imperceptibles que hoy constituyen la columna vertebral del ambient y el techno hipnótico.",
      "Recuperar su legado no es un ejercicio de nostalgia, sino un recordatorio urgente de que la investigación sonora radical pertenece a quienes se atreven a reconfigurar la máquina desde sus circuitos fundamentales.",
    ],
  },
  {
    slug: "hardware-analogico-silicio",
    title: "Hardware Analógico y Chips de Silicio: El Alma del Sonido Industrial",
    subtitle: "Por qué los filtros discretos y la saturación de transistores siguen venciendo al modelado digital.",
    date: "2025-04-18",
    readingTime: "8 min",
    author: "Ingeniería Sonora Lab",
    tags: ["HARDWARE", "SISTEMAS", "DISTORSIÓN"],
    excerpt: "Analizamos el comportamiento de circuitos icónicos como el filtro OTA del Korg MS-20, los chips SSM y la distorsión por sobrecarga de preamplificadores analógicos en la generación de kicks industriales.",
    contentParagraphs: [
      "En la era del software moderno, la obsesión por el hardware analógico no es capricho estético; es física de semiconductores. Cuando un circuito de transistores se somete a voltajes fuera de su zona lineal, no clipea abruptamente como un entero digital: introduce armónicos pares e impares que comprimen la señal con una textura orgánica y agresiva.",
      "El legendario filtro del Korg MS-20 (chip Korg35 / LM13600) genera una auto-oscilación violenta que ha definido el sonido del EBM y el industrial desde 1978. Al empujar una señal de caja de ritmos a través de su circuito de entrada externa, el umbral de saturación actúa como un compresor dinámico natural.",
      "Comprender la no-linealidad de estos componentes permite a las productoras contemporáneas integrar pedales de distorsión analógica y sintetizadores modulares en su cadena de mastering para lograr un impacto físico demoledor en sistemas de club.",
    ],
  },
  {
    slug: "evolucion-daws-hard-techno",
    title: "Evolución de DAWs en la Escena Hard Techno Global",
    subtitle: "De las limitaciones de secuenciadores antiguos al flujo ultrarrápido de Ableton Live y Bitwig.",
    date: "2025-06-30",
    readingTime: "5 min",
    author: "Producción & Flujos",
    tags: ["DAWS", "WORKFLOW", "TECNOLOGÍA"],
    excerpt: "Cómo el ruteo modular moderno, los racks de efectos paralelos y la automatización por clip transformaron la producción de pistas de más de 155 BPM en los últimos 5 años.",
    contentParagraphs: [
      "El hard techno contemporáneo exige una precisión rítmica milimétrica que habría sido inviable con las herramientas de los noventa. Hoy, la producción se basa en cadenas de sidechain ultrarrápidas, división de bandas de frecuencia para tratar sub-bajos y medios de manera independiente, y saturaciones multicapa.",
      "Ableton Live y Bitwig Studio han liderado esta transformación al ofrecer entornos donde el diseño sonoro y la composición ocurren en tiempo real sin latencia perceptible. La capacidad de encapsular sintetizadores y efectos en macro-racks modulares permite a los artistas recrear la inmediatez de un directo en el estudio.",
      "La democratización de estos entornos ha permitido que una nueva generación de productoras autogestione sus pistas con estándares de club internacional sin necesidad de grandes consolas comerciales.",
    ],
  },
  {
    slug: "hard-techno-resistencia-almacenes",
    title: "Hard Techno y la Resistencia Cultural en los Almacenes",
    subtitle: "El espacio físico clandestino como trinchera contra la comercialización masiva del clubbing.",
    date: "2025-09-14",
    readingTime: "7 min",
    author: "Crónica Rave",
    tags: ["CULTURA", "ESPACIOS", "COMUNIDAD"],
    excerpt: "Desde las fábricas desmanteladas de Berlín Este hasta los almacenes industriales de Bogotá y Medellín, el rave clandestino resiste como un espacio de libertad, catarsis y seguridad colectiva.",
    contentParagraphs: [
      "Cuando los clubes comerciales encarecieron los accesos e impusieron normas de consumo elitistas, la verdadera energía del underground regresó a sus orígenes: los almacenes abandonados, las naves de carga y los sótanos de concreto sin letreros ni teléfonos móviles.",
      "En Bogotá y Berlín, estos espacios no son meras locaciones; son zonas temporalmente autónomas donde la política de 'cero tolerancia al acoso' y el respeto mutuo garantizan que mujeres, personas disidentes y amantes del sonido duro bailen sin vigilancia corporativa.",
      "La música que suena en estos espacios no busca las listas de éxitos: está diseñada para reverberar contra muros de hormigón armado a volúmenes que exigen una entrega física total.",
    ],
  },
  {
    slug: "diseno-sonoro-tactil",
    title: "Diseño Sonoro Táctil: Distorsión Armónica y Microtonalidad",
    subtitle: "Técnicas avanzadas para moldear bombos y sintetizadores que conmocionan la arquitectura del club.",
    date: "2025-11-20",
    readingTime: "6 min",
    author: "Laboratorio de Síntesis",
    tags: ["DISEÑO SONORO", "ACÚSTICA", "MASTERING"],
    excerpt: "Guía práctica de procesamiento: cómo capas de síntesis FM, clipping suave, resonadores estéreo y pitch-bends microtonales construyen una presencia física sin enturbiar el rango de frecuencias graves.",
    contentParagraphs: [
      "El error más común al producir techno de alta velocidad es pensar que más distorsión siempre genera más potencia. En un sistema de sonido de 50.000 vatios, el exceso de energía armónica descontrolada anula la pegada del bombo y genera fatiga auditiva instantánea.",
      "El diseño sonoro táctil se fundamenta en esculpir cada capa: un sub limpio generado por onda senoidal pura entre 40 y 85 Hz, un cuerpo medio procesado con saturación de cinta o válvulas para ganar presencia, y un transitorio de impacto filtrado con precisión para cortar a través de la mezcla.",
      "Al incorporar microtonalidad y ligeras desafinaciones de milicéntimos en sintetizadores solistas, se crea un efecto de coro físico que parece expandir las paredes de la sala de baile sin recurrir a reverbs largas que empantanen el groove.",
    ],
  },
];

/**
 * Initial reader discussion comments.
 */
export const INITIAL_COMMENTS: ArticleComment[] = [
  {
    id: "comm-01",
    articleId: "pioneras-de-la-sintesis",
    author: "VANE_LIVE",
    content: "El trabajo de Eliane Radigue con el ARP 2500 cambió completamente mi forma de entender los drones modulares. Fundamental este rescate.",
    createdAt: "2025-02-12T14:30:00Z",
  },
  {
    id: "comm-02",
    articleId: "hardware-analogico-silicio",
    author: "ModularKicks",
    content: "Totalmente de acuerdo con el MS-20. Ningún plugin emula la resonancia salvaje de ese filtro cuando saturas la entrada.",
    createdAt: "2025-04-20T09:15:00Z",
  },
  {
    id: "comm-03",
    articleId: "hard-techno-resistencia-almacenes",
    author: "BogotaUnderground",
    content: "Las fiestas de almacén en Bogotá son los únicos lugares donde todavía se siente la pureza de la música sin poses de postureo.",
    createdAt: "2025-09-16T22:05:00Z",
  },
];

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
