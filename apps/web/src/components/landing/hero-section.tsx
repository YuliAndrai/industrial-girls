/**
 * @file apps/web/src/components/landing/hero-section.tsx
 * @description Layer 1: Presentation - Hero Section for Industrial Girls.
 * Atmospheric industrial rave hero with red glow, circular balaclava emblem, brutalist claim, and CTA triggers.
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Fullscreen hero section introducing the label's ethos and core calls to action.
 *
 * @returns {React.ReactElement} The rendered hero section.
 */
export function HeroSection(): React.ReactElement {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-20 sm:px-6 lg:py-32 rave-scanlines">
      {/* Background Ambient Rave Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 rave-grain opacity-40" />

      {/* Decorative Grid Lines */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-2 divide-x divide-raveRed/10 sm:grid-cols-4" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
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
          <span className="border border-raveRed/60 bg-raveRed/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-raveRed sm:text-xs">
            #INDUSTRIALGIRLS
          </span>
          <span className="border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-300 sm:text-xs">
            #HARDTECHNO
          </span>
          <span className="border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-300 sm:text-xs">
            #FUTURESOUNDSOFTECHNO
          </span>
        </div>

        {/* Step 3: Massive Slogan Header (Exhale Parity) */}
        <h1 className="max-w-5xl text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          TALENTO, IDENTIDAD <br />
          <span className="text-raveRed drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">
            Y REVOLUCIÓN SONORA
          </span>
        </h1>

        <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-neutral-300 sm:text-base md:text-lg">
          Raw uncompromising beats, warehouse sonic architecture, and the future of hard industrial electronics.
        </p>

        {/* Step 4: Primary Action Trigger Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="#events" className="focus:outline-none">
            <TactileButton variant="primary" size="lg">
              <span className="flex items-center gap-2">
                <span>[ EXPLORE RAVES & EVENTS ]</span>
                <span className="text-xs">&darr;</span>
              </span>
            </TactileButton>
          </Link>

          <Link href="#records" className="focus:outline-none">
            <TactileButton variant="outline" size="lg">
              <span className="flex items-center gap-2">
                <span>[ LATEST RELEASES ]</span>
                <span className="text-xs">&rarr;</span>
              </span>
            </TactileButton>
          </Link>
        </div>
      </div>

      {/* Step 5: Bottom Scroll Indicator */}
      <Link
        href="#events"
        className="group mt-12 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-raveRed transition-colors"
        aria-label="Scroll to next section"
      >
        <span>SCROLL DOWN</span>
        <span className="h-6 w-3.5 rounded-full border border-neutral-700 p-0.5 group-hover:border-raveRed transition-colors">
          <span className="block h-1.5 w-1.5 rounded-full bg-raveRed animate-bounce mx-auto" />
        </span>
      </Link>
    </section>
  );
}
