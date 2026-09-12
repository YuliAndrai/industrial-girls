/**
 * @file apps/web/src/app/eventos/eventos-view.tsx
 * @description Layer 1: Presentation - Events & Showcases Route (/eventos).
 * Displays season status (En Preparación), geographic subscription form, and historical showcase social proof.
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { GeographicForm } from "@/components/common/geographic-form";
import { TactileButton } from "@/components/ui/tactile-button";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";
import { getEventCalendarStatus } from "@/lib/infrastructure/events-catalog";
import { getRecentShowcases } from "@/lib/infrastructure/events-data";

/**
 * Events and touring calendar page view.
 *
 * @returns {React.ReactElement} The rendered Eventos view.
 */
export function EventosView(): React.ReactElement {
  // Step 1: Manage drawer navigation state through application hook
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();

  // Step 2: Manage global audio and tactile sound interactions
  const { isSoundEnabled, toggleSound } = useSoundFx();

  // Step 3: Retrieve event calendar status and recent showcases from infrastructure
  const calendarStatus = getEventCalendarStatus();
  const recentShowcases = getRecentShowcases();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      <main className="flex-1 w-full">
        {/* Calendar Season Status Hero */}
        <section id="calendario" className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 text-center rave-scanlines scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-4xl">
            {/* Step 4: Render top eyebrow badge with responsive wrapping and centering */}
            <span className="inline-block max-w-full break-words border border-raveRed/60 bg-raveRed/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-raveRed text-center leading-relaxed">
              {calendarStatus.topBadge}
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,0,0,0.4)]">
              {calendarStatus.headline}
            </h1>
            <p className="mt-4 font-mono text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              {calendarStatus.curatorialNote}
            </p>
          </div>
        </section>

        {/* Geographic Capture Section for Presales */}
        <section id="radar" className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6 scroll-mt-24">
          <div className="mx-auto max-w-3xl">
            <GeographicForm
              source="events"
              badge="ÚNETE A NUESTRO TELEGRAM // RECIBE NOTICIAS"
              title="PREVENTAS & ALERTAS POR CIUDAD"
              subtitle="Notificarme de nuevas fechas y preventas exclusivas en mi ciudad."
              buttonText="[ RECIBIR NOTICIAS DE EVENTOS EN MI CIUDAD ]"
            />
          </div>
        </section>

        {/* Recent Showcases & Visual Flyers */}
        <section className="w-full border-b border-raveBorder bg-panel/40 py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-raveRed pb-4 mb-10 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// MEMORIA HISTÓRICA // ARCHIVO VISUAL"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  ÚLTIMOS SHOWCASES
                </h2>
              </div>
              <Link href="/archivo" className="focus:outline-none">
                <TactileButton variant="outline" size="sm">
                  <span>[ EXPLORAR REGISTRO COMPLETO EN ARCHIVO &rarr; ]</span>
                </TactileButton>
              </Link>
            </div>

            {/* Visual Flyers Grid (Cartel Proportion aspect-[3/4]) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentShowcases.map((showcase) => (
                <article
                  key={showcase.id}
                  className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/10 bg-black transition-all duration-300 hover:border-raveRed hover:shadow-rave"
                >
                  <Image
                    src={showcase.flyerImage}
                    alt={showcase.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FloatingSoundBar isSoundActive={isSoundEnabled} onToggleSound={toggleSound} />
      <Footer />
    </div>
  );
}
