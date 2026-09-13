/**
 * @file apps/web/src/components/landing/hero-section.tsx
 * @description Layer 1: Presentation - Minimalist Hero Section for Industrial Girls.
 * Atmospheric industrial rave hero with red glow, circular balaclava emblem, brutalist claim,
 * and immediate connection to the Bento Command Center console.
 */

import React from "react";
import Image from "next/image";
import { BentoCommandCenter } from "@/components/landing/bento-command-center";

/**
 * Fullscreen minimalist hero section introducing the label's ethos and core Bento command center.
 *
 * @returns {React.ReactElement} The rendered hero section.
 */
export function HeroSection(): React.ReactElement {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 sm:px-6 lg:py-24 rave-scanlines">
      {/* Background Ambient Rave Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 rave-grain opacity-40" />

      {/* Decorative Grid Lines */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-2 divide-x divide-raveRed/10 sm:grid-cols-4" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center w-full">
        {/* Step 1: Balaclava Mask Emblem */}
        <div className="group relative mb-8 h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-full border-2 border-raveRed p-1 shadow-rave transition-transform duration-500 hover:scale-105">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
            <Image
              src="/assets/images/industrial-girls-badge-mask.jpg"
              alt="Industrial Girls Balaclava Emblem"
              fill
              sizes="144px"
              className="object-cover transition-all duration-700 group-hover:brightness-110"
              priority
            />
          </div>
          {/* Subtle Rotating Red Radar Ring */}
          <div className="absolute inset-0 rounded-full border-t border-raveRed/60 animate-spin" />
        </div>

        {/* Step 2: Hashtags and Metadata Tags */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center rounded-full border border-raveRed/40 bg-black/80 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-neutral-200 backdrop-blur-sm transition-colors hover:border-raveRed hover:text-white sm:text-xs">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-raveRed animate-pulse" />
            #IndustrialGirls
          </span>
          <span className="inline-flex items-center rounded-full border border-raveRed/40 bg-black/80 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-neutral-200 backdrop-blur-sm transition-colors hover:border-raveRed hover:text-white sm:text-xs">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-raveRed" />
            #TechnoGirls
          </span>
          <span className="inline-flex items-center rounded-full border border-raveRed/40 bg-black/80 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-neutral-200 backdrop-blur-sm transition-colors hover:border-raveRed hover:text-white sm:text-xs">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-raveRed" />
            #HardGirls
          </span>
        </div>

        {/* Step 3: Massive Slogan Header (Exhale Parity) */}
        <h1 className="max-w-5xl text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          TALENTO, IDENTIDAD <br />
          <span className="text-raveRed drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">
            REVOLUCIÓN SONORA
          </span>
        </h1>

        {/* Step 4: Bento Command Center Console (Option B - Low Friction Connection) */}
        <div className="mt-6 sm:mt-8 w-full">
          <BentoCommandCenter />
        </div>
      </div>
    </section>
  );
}
