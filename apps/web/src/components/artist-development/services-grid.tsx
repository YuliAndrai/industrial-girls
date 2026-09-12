/**
 * @file apps/web/src/components/artist-development/services-grid.tsx
 * @description Layer 1: Presentation - 4-Pillar Modular Services Grid.
 * Renders interactive tactile cards covering Strategy, Sound Engineering, Legal, and Digital Infrastructure.
 */

import React from "react";
import Link from "next/link";
import { getArtistDevPillars } from "@/lib/infrastructure/artist-development-catalog";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Interactive 4-pillar modular services grid for Artist Development.
 *
 * @returns {React.ReactElement} Rendered grid section.
 */
export function ServicesGrid(): React.ReactElement {
  const pillars = getArtistDevPillars();

  return (
    <section id="servicios" className="w-full border-b border-raveBorder bg-bg py-16 sm:py-24 px-4 sm:px-6 relative scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-raveRed pb-6 mb-12 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
              {"// ARQUITECTURA DE SERVICIOS // 4 PILARES"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              INFRAESTRUCTURA <br className="hidden sm:inline" />
              <span className="text-raveRed">PROFESIONAL 360°</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-raveTextMuted max-w-sm sm:text-right">
            PROGRAMAS MODULARES ADAPTADOS A CADA ETAPA DEL ARTISTA
          </span>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group flex flex-col justify-between border border-raveBorder bg-panel/80 p-6 sm:p-8 transition-all hover:border-raveRed hover:shadow-rave"
            >
              <div>
                {/* Pillar Header */}
                <div className="flex items-center justify-between border-b border-raveBorder/60 pb-4 mb-6">
                  <span className="font-mono text-sm font-black text-raveRed group-hover:scale-110 transition-transform">
                    /{pillar.indexNumber}
                  </span>
                  <span className="border border-raveRed/30 bg-raveRed/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-raveRed">
                    MODULO ACTIVO
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-raveRed transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-raveTextMuted">
                  {pillar.subtitle}
                </p>

                {/* Services List */}
                <div className="mt-6 space-y-4">
                  {pillar.services.map((service) => (
                    <div
                      key={service.id}
                      className="border-l-2 border-raveBorder/60 pl-4 transition-colors hover:border-raveRed"
                    >
                      <div className="flex items-center gap-2">
                        <h4 className="font-mono text-sm font-bold text-white">
                          {service.title}
                        </h4>
                        {service.isAddon && (
                          <span className="border border-raveRed bg-raveRed px-1.5 py-0.2 font-mono text-[9px] font-bold text-black uppercase">
                            ADD-ON
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-neutral-400 leading-relaxed font-mono">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-8 pt-4 border-t border-raveBorder/40">
                <Link href="#diagnostico" className="block w-full focus:outline-none">
                  <TactileButton variant="outline" size="sm" className="w-full">
                    <span>[ INCLUIR EN DIAGNÓSTICO ]</span>
                  </TactileButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
