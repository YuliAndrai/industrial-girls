/**
 * @file apps/web/src/lib/infrastructure/community-copy.ts
 * @description Layer 4: Infrastructure - Community & Journal Editorial Copy Dictionary.
 * Centralizes all editorial titles, badges, introduction decks, and category tags to ensure UI immutability.
 */

/**
 * Editorial copy dictionary for the Community Hero module (/comunidad).
 */
export const COMMUNITY_HERO_COPY = {
  topBadge: "// ARCHIVO EDITORIAL & NOTICIAS // EDICIÓN 01",
  headline: {
    prefix: "NOTICIAS, MEMORIA &",
    accent: "CULTURA",
    suffix: "UNDERGROUND",
  },
  paragraphs: [
    "Exploramos el impacto histórico y contemporáneo de las mujeres en la música electrónica, la arquitectura de hardware, la ingeniería de software y la innovación sonora.",
    "Mantente al día con las últimas noticias, entrevistas y perfiles de DJs, productoras, artistas live y proyectos híbridos que están transformando el circuito internacional a través de su técnica, creatividad y trayectoria.",
    "Este espacio está dedicado a visibilizar el talento que impulsa la evolución de la cultura electrónica a nivel global.",
  ],
  thematicBadges: [
    "#MEMORIA&HISTORIA",
    "#PRODUCTORAS&DJS",
    "#LIVES&HYBRIDS",
    "#HARDWARE&SÍNTESIS",
    "#SOFTWARE&DAW",
  ],
} as const;

/**
 * Editorial copy dictionary for the Discussion Console module (/comunidad).
 */
export const COMMUNITY_DISCUSSION_COPY = {
  sectionBadge: "// FORO TÉCNICO & PARTICIPACIÓN ABIERTA",
  heading: "DEBATE, DÉJANOS TU COMENTARIO.",
  subheading: "Terminal de intercambio sobre arquitectura sonora, hardware y producción de club.",
  feedbackSubmitted: "Aporte enviado. Será publicado tras la moderación y verificación editorial.",
} as const;

/**
 * Direct community channels copy dictionary (/comunidad).
 */
export const COMMUNITY_CHANNELS_COPY = {
  badge: "// RADAR DIRECTO // Alertas de convocatorias, drops de música y eventos en tiempo real.",
  description: "Alertas de convocatorias, drops de música y eventos en tiempo real.",
  telegramButtonLabel: "[ UNIRSE AL CANAL DE TELEGRAM (PRÓXIMAMENTE) ]",
  telegramButtonActive: "[ UNIRSE AL CANAL DE TELEGRAM ]",
  telegramTooltip: "> Canal de Telegram en configuración. Enlace disponible próximamente.",
  whatsappButtonLabel: "[ CANAL DE NOVEDADES WHATSAPP (PRÓXIMAMENTE) ]",
  whatsappButtonActive: "[ CANAL DE NOVEDADES WHATSAPP ]",
  whatsappTooltip: "> Canal de WhatsApp en configuración. Enlace disponible próximamente.",
} as const;
