/**
 * @file apps/web/src/components/community/community-hero.tsx
 * @description Layer 1: Presentation - Community & Journal Hero Section.
 * Displays brutalist Display H1 headline, editorial deck, and thematic filter badges.
 */

"use client";

import React from "react";

/**
 * Filter badge identifiers for community journal topics.
 */
export const COMMUNITY_THEMATIC_BADGES: string[] = [
  "#MEMORIA&HISTORIA",
  "#PRODUCTORAS&DJS",
  "#LIVES&HYBRIDS",
  "#HARDWARE&SÍNTESIS",
  "#SOFTWARE&DAW",
];

/**
 * Contract props for CommunityHero component.
 */
export interface CommunityHeroProps {
  /** Currently active thematic filter badge */
  activeFilter?: string;
  /** Callback triggered when a thematic badge is clicked */
  onSelectFilter?: (badge: string) => void;
  /** Total count of editorial articles */
  articleCount?: number;
}

/**
 * Hero presentation section for the Community Journal (/comunidad).
 *
 * @param {CommunityHeroProps} props - Component properties.
 * @returns {React.ReactElement} Rendered hero element.
 */
export function CommunityHero({
  activeFilter,
  onSelectFilter,
  articleCount = 5,
}: CommunityHeroProps = {}): React.ReactElement {
  // Step 1: Render outer hero section with brutalist scanlines and red bottom border
  return (
    <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 text-center rave-scanlines sm:px-6 lg:py-24">
      {/* Step 2: Atmospheric radial gradient glow and rave grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 rave-grain opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Step 3: Editorial category tag */}
        <div className="mb-4">
          <span className="border border-raveRed/60 bg-raveRed/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-raveRed sm:text-xs">
            {"// ARCHIVO EDITORIAL & NOTICIAS // EDICIÓN 01"}
          </span>
        </div>

        {/* Step 4: Display H1 headline */}
        <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          NOTICIAS, MEMORIA &{" "}
          <span className="text-raveRed drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">
            CULTURA
          </span>{" "}
          UNDERGROUND
        </h1>

        {/* Step 5: Research editorial deck & statement */}
        <div className="mx-auto mt-6 max-w-3xl space-y-3 font-mono text-xs leading-relaxed text-neutral-300 sm:text-sm md:text-base">
          <p>
            Exploramos el impacto histórico y contemporáneo de las mujeres en la música electrónica, la arquitectura de hardware, la ingeniería de software y la innovación sonora.
          </p>
          <p>
            Mantente al día con las últimas noticias, entrevistas y perfiles de DJs, productoras, artistas live y proyectos híbridos que están transformando el circuito internacional a través de su técnica, creatividad y trayectoria.
          </p>
          <p>
            Este espacio está dedicado a visibilizar el talento que impulsa la evolución de la cultura electrónica a nivel global.
          </p>
          <p>
            ¿Conoces una artista cuya historia merece ser contada? Envíanos su perfil y ayúdanos a seguir construyendo este archivo de inspiración, conocimiento y comunidad.
          </p>
        </div>

        {/* Step 6: Thematic filter badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {COMMUNITY_THEMATIC_BADGES.map((badge) => {
            const isSelected = activeFilter === badge;
            return (
              <button
                key={badge}
                type="button"
                onClick={() => onSelectFilter?.(badge)}
                className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  isSelected
                    ? "border-raveRed bg-raveRed/20 text-white font-bold"
                    : "border-white/20 bg-panel/80 text-neutral-300 hover:border-raveRed hover:text-white"
                }`}
              >
                {badge}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CommunityHero;
