/**
 * @file apps/web/src/components/artist-development/services-grid.tsx
 * @description Layer 1: Presentation - Technical Services Console Grid (Option 3 Architecture).
 * Renders asymmetric technical console cards covering Launch Campaign (Flagship),
 * 360° Artist Plan, Legal & Contracts, Audio & Mastering, and Digital Infrastructure.
 */

import React from "react";
import Link from "next/link";
import { getServicesCatalog } from "@/lib/infrastructure/services-data";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Technical services console grid for Artist Development.
 *
 * @returns {React.ReactElement} Rendered console grid section.
 */
export function ServicesGrid(): React.ReactElement {
  // Step 1: Retrieve technical services catalog from Layer 4 Infrastructure
  const services = getServicesCatalog();
  const flagship = services.find((s) => s.isPrimary) || services[0];
  const secondaryServices = services.filter((s) => s.id !== flagship.id);

  return (
    <section id="servicios" className="w-full border-b border-raveBorder bg-bg py-16 sm:py-24 px-4 sm:px-6 relative scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Step 2: Section Header with Eyebrow, Title and Editorial Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-raveRed pb-6 mb-12 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
              {"// INFRAESTRUCTURA B2B & CREATIVE HUB // SERVICIOS ESPECIALIZADOS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              CATÁLOGO DE <br className="hidden sm:inline" />
              <span className="text-raveRed">SERVICIOS TÉCNICOS</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-raveTextMuted max-w-md sm:text-right leading-relaxed">
            Herramientas de aceleración, ingeniería de audio, soporte legal y estrategia diseñadas para productoras y selectors de la vanguardia electrónica.
          </p>
        </div>

        {/* Step 3: Asymmetric Technical Grid (Flagship Card 01 full-width, followed by 2x2 grid) */}
        <div className="space-y-6 lg:space-y-8">
          {/* Card 01: Flagship Service Card (Campaña de Lanzamiento) */}
          <article
            key={flagship.id}
            className="group relative border border-red-600/70 bg-panel/90 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-red-500 hover:shadow-rave"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                {/* Header with Sequential Code, Status and Flagship Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base sm:text-lg font-black text-raveRed group-hover:scale-110 transition-transform">
                      /{flagship.code}
                    </span>
                    <span className="font-mono text-[11px] text-white/50 tracking-wider">
                      {"// MODULO PRIORITARIO"}
                    </span>
                  </div>
                  <span className="border border-red-600/60 bg-red-600/10 px-2.5 py-1 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-400">
                    [ FLAGSHIP // SERVICIO INSIGNIA ]
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white group-hover:text-raveRed transition-colors font-mono">
                  {flagship.title}
                </h3>
                <p className="mt-2 font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                  {flagship.description}
                </p>

                {/* Features List with Industrial Markers */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {flagship.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 font-mono text-xs text-neutral-300">
                      <span className="text-raveRed font-bold shrink-0">{"//"}</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="lg:self-end shrink-0 w-full sm:w-auto mt-4 lg:mt-0">
                <Link href="#diagnostico" className="block w-full sm:w-auto focus:outline-none" aria-label={`Solicitar servicio de ${flagship.title}`}>
                  <TactileButton variant="primary" size="lg" className="w-full sm:w-auto">
                    <span>[ INCLUIR EN DIAGNÓSTICO ]</span>
                  </TactileButton>
                </Link>
              </div>
            </div>
          </article>

          {/* Cards 02 to 05: Standard 2x2 Technical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {secondaryServices.map((service) => (
              <article
                key={service.id}
                className="group flex flex-col justify-between border border-white/10 bg-black/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-raveRed hover:shadow-rave"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="font-mono text-sm font-black text-raveRed group-hover:scale-110 transition-transform">
                      /{service.code}
                    </span>
                    <span className="border border-white/20 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      MODULO ACTIVO
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-raveRed transition-colors font-mono">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-6 space-y-2.5 pt-4 border-t border-white/10">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 font-mono text-xs text-neutral-300">
                        <span className="text-raveRed font-bold shrink-0">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-8 pt-4 border-t border-white/10">
                  <Link href="#diagnostico" className="block w-full focus:outline-none" aria-label={`Incluir ${service.title} en diagnóstico`}>
                    <TactileButton variant="outline" size="sm" className="w-full">
                      <span>[ INCLUIR EN DIAGNÓSTICO ]</span>
                    </TactileButton>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
