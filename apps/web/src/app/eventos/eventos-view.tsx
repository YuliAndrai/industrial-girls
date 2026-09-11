/**
 * @file apps/web/src/app/eventos/eventos-view.tsx
 * @description Layer 1: Presentation - Events & Showcases Route (/eventos).
 * Displays season status (En Preparación), geographic subscription form, and historical showcase social proof.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { GeographicForm } from "@/components/common/geographic-form";
import { TactileButton } from "@/components/ui/tactile-button";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";
import {
  getEventCalendarStatus,
  getPastShowcases,
} from "@/lib/infrastructure/events-catalog";

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

  // Step 3: Retrieve event calendar status and showcase social proof from infrastructure
  const calendarStatus = getEventCalendarStatus();
  const pastShowcases = getPastShowcases();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      <main className="flex-1 w-full">
        {/* Calendar Season Status Hero */}
        <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 text-center rave-scanlines">
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
        <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <GeographicForm
              source="events"
              title="RADAR GEOGRÁFICO DE PREVENTAS"
              subtitle="Notificarme de nuevas fechas y preventas exclusivas en mi ciudad."
              buttonText="[ ACTIVAR RADAR DE EVENTOS EN MI CIUDAD ]"
            />
          </div>
        </section>

        {/* Social Proof: Past Showcases History */}
        <section className="w-full border-b border-raveBorder bg-panel/40 py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-raveRed pb-4 mb-10 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// MEMORIA HISTÓRICA // SOCIAL PROOF"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  HISTORIAL DE SHOWCASES
                </h2>
              </div>
              <Link href="/archivo" className="focus:outline-none">
                <TactileButton variant="outline" size="sm">
                  <span>[ EXPLORAR REGISTRO COMPLETO EN ARCHIVO &rarr; ]</span>
                </TactileButton>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastShowcases.map((showcase) => (
                <div
                  key={showcase.id}
                  className="border border-raveBorder bg-black p-6 flex flex-col justify-between hover:border-raveRed transition-all"
                >
                  <div>
                    <span className="font-mono text-xs text-raveRed font-bold">
                      {showcase.date} &bull; {showcase.location}
                    </span>
                    <h3 className="text-xl font-black uppercase text-white mt-1">
                      {showcase.venue}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-neutral-300 leading-relaxed">
                      {showcase.highlight}
                    </p>

                    <div className="mt-4 pt-3 border-t border-raveBorder/40">
                      <span className="font-mono text-[10px] uppercase text-raveTextMuted block mb-1">
                        LINEUP EJECUTADO:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {showcase.lineup.map((artist) => (
                          <span
                            key={artist}
                            className="border border-white/10 bg-panel px-2 py-0.5 font-mono text-[10px] text-white"
                          >
                            {artist}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-raveBorder/60 font-mono text-xs">
                    <a
                      href={"https://www.youtube.com/watch?v=" + showcase.youtubeVideoId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-raveRed transition-colors"
                    >
                      &gt; VER REGISTRO EN YOUTUBE
                    </a>
                  </div>
                </div>
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
