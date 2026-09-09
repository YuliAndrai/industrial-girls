/**
 * @file apps/web/src/components/artist-development/artist-dev-hero.tsx
 * @description Layer 1: Presentation - Hero Section for Artist Development 360° Module.
 * Displays brutalist H1 headline, value proposition subtitle, tactical badges, and action triggers.
 */

import React from "react";
import Link from "next/link";
import { TactileButton } from "@/components/ui/tactile-button";
import { ARTIST_DEV_BADGES } from "@/lib/infrastructure/artist-development-catalog";

/**
 * Fullscreen atmospheric hero presenting the Artist Development Agency ethos.
 *
 * @returns {React.ReactElement} Rendered hero component.
 */
export function ArtistDevHero(): React.ReactElement {
  return (
    <section className="relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 sm:px-6 lg:py-24 rave-scanlines">
      {/* Background Ambient Rave Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 rave-grain opacity-40" />

      {/* Decorative Grid Lines */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-2 divide-x divide-raveRed/10 sm:grid-cols-4" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Step 1: Category Tag */}
        <div className="mb-4">
          <span className="border border-raveRed/60 bg-raveRed/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-raveRed sm:text-xs">
            {"// AGENCIA DE ACELERACIÓN & GESTIÓN INTEGRAL"}
          </span>
        </div>

        {/* Step 2: Main H1 Headline */}
        <h1 className="max-w-4xl text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          AGENCIA DE DESARROLLO <br />
          <span className="text-raveRed drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">
            ARTÍSTICO 360°
          </span>
        </h1>

        {/* Step 3: Value Proposition Subtitle */}
        <p className="mt-6 max-w-3xl font-mono text-sm leading-relaxed text-neutral-300 sm:text-base md:text-lg">
          Infraestructura estratégica, técnica y legal para productoras y artistas de la música electrónica que buscan consolidar su carrera global.
        </p>

        {/* Step 4: Key Badges Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {ARTIST_DEV_BADGES.map((badge) => (
            <span
              key={badge}
              className="border border-white/20 bg-panel/80 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-neutral-200 transition-colors hover:border-raveRed hover:text-white"
            >
              &bull; {badge}
            </span>
          ))}
        </div>

        {/* Step 5: Primary CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="#diagnostico" className="focus:outline-none">
            <TactileButton variant="primary" size="lg">
              <span className="flex items-center gap-2">
                <span>[ SOLICITAR DIAGNÓSTICO ]</span>
                <span className="text-xs">&darr;</span>
              </span>
            </TactileButton>
          </Link>

          <Link href="#servicios" className="focus:outline-none">
            <TactileButton variant="outline" size="lg">
              <span className="flex items-center gap-2">
                <span>[ EXPLORAR 4 PILARES ]</span>
                <span className="text-xs">&rarr;</span>
              </span>
            </TactileButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
