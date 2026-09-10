/**
 * @file apps/web/src/components/community/community-hero.tsx
 * @description Layer 1: Presentation - Community & Journal Hero Section.
 * Displays brutalist Display H1 headline, editorial deck, and thematic filter badges.
 */

"use client";

import React from "react";
import Link from "next/link";

/**
 * Filter badge identifiers for community journal topics.
 */
export const COMMUNITY_THEMATIC_BADGES: string[] = [
  "#PionerasDelVoltaje",
  "#CircuitDesign",
  "#DSP",
  "#SoftwareDAW",
  "#SoundDesign",
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
            {`// ENSAYOS & DEBATE TÉCNICO // ${articleCount} ARTÍCULOS`}
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

        {/* Step 5: Research editorial deck */}
        <p className="mx-auto mt-6 max-w-3xl font-mono text-xs leading-relaxed text-neutral-300 sm:text-base md:text-lg">
          Exploramos el impacto histórico de las mujeres en la arquitectura de hardware, la ingeniería de software y la vanguardia sónica. Próximamente sumaremos perfiles de productoras y selectors que hoy revolucionan el circuito internacional con su técnica y trayectoria.
        </p>

        {/* Step 5b: Artist Open Call Industrial Console Banner */}
        <div className="mx-auto mt-8 max-w-3xl border border-raveRed/50 bg-neutral-950/90 p-5 text-left shadow-rave sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 bg-raveRed animate-pulse" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-raveRed">
                  {"// CONVOCATORIA EDITORIAL & ROSTER //"}
                </span>
              </div>
              <p className="font-mono text-xs text-neutral-300 leading-relaxed sm:text-[13px]">
                ¿Eres productora o selector y tienes un sonido que desafía la escena? Recibimos propuestas musicales y proyectos de investigación de forma continua.
              </p>
            </div>
            <Link
              href="/desarrollo-artistico"
              className="inline-flex shrink-0 items-center justify-center border border-raveRed bg-raveRed/10 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-raveRed hover:text-black hover:shadow-rave active:translate-y-0.5"
            >
              [ ENVIAR PROPUESTA ARTÍSTICA ]
            </Link>
          </div>
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
