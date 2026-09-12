/**
 * @file apps/web/src/components/landing/bento-command-center.tsx
 * @description Layer 1: Presentation - Home Bento Command Center Component.
 * Implements the technical console bento grid directly below the hero slogan,
 * providing immediate low-friction access to the 7 core ecosystem modules
 * and the official social frequencies dock.
 */

import React from "react";
import Link from "next/link";
import {
  getHomeHubCards,
  getHomeSocialLinks,
  type HomeHubCard,
} from "@/lib/infrastructure/home-hub-data";

/**
 * Direct Linktree-style command center component rendering 6 prioritized console buttons.
 *
 * @returns {React.ReactElement} The rendered Command Center stack and social dock.
 */
export function BentoCommandCenter(): React.ReactElement {
  // Step 1: Retrieve immutable catalog cards and social frequency channels
  const hubCards = getHomeHubCards();
  const socialLinks = getHomeSocialLinks();

  return (
    <section
      id="command-center"
      aria-label="Consola de comando y accesos directos de Industrial Girls"
      className="w-full max-w-xl mx-auto px-4 py-4"
    >
      {/* Step 2: Render Vertical Stacked Linktree-Style Button List */}
      <div className="space-y-3">
        {hubCards.map((card: HomeHubCard) => {
          const isFlagship = card.isFlagship;
          const isExternal = card.isExternal;

          // Step 2A: Shared button inner layout
          const buttonContent = (
            <div className="flex items-center justify-between w-full gap-3 sm:gap-4 text-left">
              {/* Left: Monospace numerical code and optional badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs font-bold text-red-500">
                  [ {card.code} ]
                </span>
                {card.badge && (
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-none font-semibold ${
                      isFlagship
                        ? "bg-red-950/60 text-red-400 border border-red-800/60"
                        : "bg-white/10 text-neutral-300 border border-white/20"
                    }`}
                  >
                    {card.badge}
                  </span>
                )}
              </div>

              {/* Center: Title & concise subtitle */}
              <div className="flex-1 min-w-0 py-0.5">
                <h2 className="font-mono text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-red-400 transition-colors truncate">
                  {card.title}
                </h2>
                <p className="font-mono text-xs text-neutral-400 leading-snug truncate sm:whitespace-normal">
                  {card.subtitle}
                </p>
              </div>

              {/* Right: Interactive arrow indicator */}
              <div className="shrink-0 font-mono text-xs text-neutral-400 group-hover:text-red-400 transition-colors">
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  {isExternal ? "↗" : "→"}
                </span>
              </div>
            </div>
          );

          // Step 2B: Visual class hierarchy
          const baseClasses = isFlagship
            ? "group relative flex items-center p-4 bg-neutral-950/80 hover:bg-neutral-900 border border-red-600/70 hover:border-red-500 rounded-none shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all duration-200"
            : "group relative flex items-center p-4 bg-black/70 hover:bg-white/5 border border-white/15 hover:border-white/40 rounded-none transition-all duration-200";

          // Step 2C: Render external anchor or internal Next.js Link
          if (isExternal) {
            return (
              <a
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Acceso externo a ${card.title} - ${card.subtitle}`}
                className={baseClasses}
              >
                {buttonContent}
              </a>
            );
          }

          return (
            <Link
              key={card.id}
              href={card.href}
              aria-label={`Navegar a ${card.title} - ${card.subtitle}`}
              className={baseClasses}
            >
              {buttonContent}
            </Link>
          );
        })}
      </div>

      {/* Step 3: Social Dock Inferior */}
      <div
        aria-label="Frecuencias y canales sociales oficiales"
        className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 font-mono text-xs"
      >
        <span className="text-neutral-500 uppercase tracking-widest text-[10px]">
          {"[ FRECUENCIAS // OFICIALES ]:"}
        </span>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Canal oficial de Industrial Girls en ${link.label}`}
            className="text-neutral-400 hover:text-red-500 transition-colors tracking-wider flex items-center gap-1"
          >
            <span>{link.label}</span>
            <span className="text-[10px] text-neutral-600">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default BentoCommandCenter;
