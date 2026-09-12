/**
 * @file apps/web/src/components/landing/bento-command-center.tsx
 * @description Layer 1: Presentation - Home Bento Command Center Component.
 * Implements the technical console bento grid directly below the hero slogan,
 * providing immediate low-friction access to the 7 core ecosystem modules
 * and the official social frequencies dock.
 */

import React from "react";
import Link from "next/link";
import { getHomeHubCards, getHomeSocialLinks } from "@/lib/infrastructure/home-hub-data";

/**
 * Bento Command Center component displaying structured ecosystem routing console.
 *
 * @returns {React.ReactElement} The rendered Bento grid and social dock.
 */
export function BentoCommandCenter(): React.ReactElement {
  // Step 1: Retrieve immutable catalog cards and social frequency channels
  const hubCards = getHomeHubCards();
  const socialLinks = getHomeSocialLinks();

  return (
    <section
      id="command-center"
      aria-label="Consola de comando y accesos directos de Industrial Girls"
      className="w-full max-w-5xl mx-auto px-4 py-6"
    >
      {/* Step 2: Render Responsive Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {hubCards.map((card) => {
          if (card.isFlagship) {
            // Step 2A: Render Flagship Primary Console Card (Full width on desktop)
            return (
              <Link
                key={card.id}
                href={card.href}
                aria-label={`Acceder a ${card.title} - ${card.subtitle}`}
                className="group md:col-span-2 relative flex flex-col justify-between p-5 sm:p-6 bg-black/85 backdrop-blur-md border border-red-600/70 hover:border-red-500 rounded shadow-[0_0_25px_rgba(220,38,38,0.25)] transition-all duration-200"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-red-500">
                        [{card.code}]
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-red-400 font-semibold bg-red-950/40 px-2 py-0.5 border border-red-800/60 rounded">
                        {card.badge || "[ SERVICIO INSIGNIA ]"}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-red-400 transition-colors">
                      [ ABRIR CONSOLA ] <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                    </span>
                  </div>

                  <h2 className="font-mono text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                    {card.title}
                  </h2>

                  <p className="mt-1.5 font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                  <span>{"//"} INFRAESTRUCTURA B2B & SERVICIOS 360°</span>
                  <span className="text-red-500 group-hover:text-red-400 transition-colors">ACCESO DIRECTO •</span>
                </div>
              </Link>
            );
          }

          // Step 2B: Render Standard Bento Console Card (01, 03 to 07)
          return (
            <Link
              key={card.id}
              href={card.href}
              aria-label={`Navegar a ${card.title} - ${card.subtitle}`}
              className="group relative flex flex-col justify-between p-4 bg-black/75 backdrop-blur-md border border-white/15 hover:border-red-600/60 rounded transition-all duration-200 hover:bg-white/[0.02]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-500">
                      [{card.code}]
                    </span>
                    {card.badge && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 bg-white/10 px-1.5 py-0.5 rounded">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-neutral-500 group-hover:text-red-400 transition-colors inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>

                <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                  {card.title}
                </h3>

                <p className="mt-1 font-mono text-xs text-neutral-400 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-end font-mono text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors">
                <span>ENLACE CANÓNICO ➔</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Step 3: Social Dock Inferior */}
      <div
        aria-label="Frecuencias y canales sociales oficiales"
        className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs"
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
