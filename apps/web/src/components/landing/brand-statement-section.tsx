/**
 * @file apps/web/src/components/landing/brand-statement-section.tsx
 * @description Layer 1: Presentation - Brand Statement & Platform Description Section.
 * Renders the brand manifesto, subtitle, and quick exploration CTA bar below the hero section.
 */

import React from "react";
import { BRAND_STATEMENT } from "@/lib/infrastructure/brand-catalog";

/**
 * Editorial brand statement section showcasing Industrial Girls' ethos.
 *
 * @returns {React.ReactElement} The rendered brand statement section.
 */
export function BrandStatementSection(): React.ReactElement {
  return (
    <section
      id="brand-statement"
      className="relative w-full border-b border-white/10 bg-black px-4 py-12 sm:px-6 sm:py-16 md:py-20 rave-scanlines"
      aria-label="Declaración de plataforma Industrial Girls Music"
    >
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(255,0,0,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 rave-grain opacity-20" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Clean Minimalist Typographic Block with Left Red Accent Line */}
        <div className="border-l-2 border-raveRed/60 pl-6 sm:pl-8 py-1 space-y-4 text-left">
          {BRAND_STATEMENT.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg sm:text-xl font-normal leading-relaxed text-neutral-200"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
