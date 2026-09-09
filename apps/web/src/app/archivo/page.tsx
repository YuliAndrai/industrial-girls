/**
 * @file apps/web/src/app/archivo/page.tsx
 * @description Layer 1: Presentation - Roster & Media Archive Route (/archivo).
 * Typographic grid presenting 30+ artists linked to Industrial Girls, alongside media archive gallery items.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";
import {
  getArchiveArtists,
  getMediaArchiveItems,
} from "@/lib/infrastructure/archive-catalog";

/**
 * Archive roster and media gallery view.
 *
 * @returns {React.ReactElement} The rendered Archivo page.
 */
export default function ArchivoPage(): React.ReactElement {
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();
  const { isSoundEnabled, toggleSound } = useSoundFx();

  const artists = getArchiveArtists();
  const mediaItems = getMediaArchiveItems();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtists = artists.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subgenre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      <main className="flex-1 w-full">
        {/* Archive Hero */}
        <section className="relative flex min-h-[45vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 text-center rave-scanlines">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="border border-raveRed/60 bg-raveRed/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-raveRed">
              {"// REGISTRO COLECTIVO // +30 ARTISTAS VINCULADAS"}
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              ARCHIVO & <span className="text-raveRed">ROSTER GLOBAL</span>
            </h1>
            <p className="mt-4 font-mono text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Índice tipográfico y sonoro de las productoras, selectores e ingenieras que han forjado el sonido de Industrial Girls en almacenes del mundo.
            </p>
          </div>
        </section>

        {/* Subsection 1: 30+ Artists Typographic & Visual Grid */}
        <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-raveBorder pb-4 mb-8 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// ÍNDICE DE ARTISTAS (" + filteredArtists.length + " REGISTROS)"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  ROSTER DE COLECTIVO
                </h2>
              </div>
              <div className="w-full sm:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por alias, país o estilo..."
                  className="w-full border border-raveBorder bg-panel px-3 py-2 font-mono text-xs text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArtists.map((artist) => (
                <div
                  key={artist.slug}
                  className="border border-raveBorder bg-panel/40 p-5 hover:border-raveRed transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-raveBorder/40 pb-2 mb-3">
                      <span className="font-mono text-[10px] text-raveRed uppercase font-bold">
                        {artist.origin}
                      </span>
                      {artist.isResident && (
                        <span className="border border-raveRed bg-raveRed px-1.5 py-0.2 font-mono text-[9px] font-bold text-black uppercase">
                          RESIDENTE
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">
                      {artist.name}
                    </h3>
                    <p className="font-mono text-xs text-neutral-400 mt-1">
                      {artist.subgenre}
                    </p>
                    <p className="mt-2 text-xs text-neutral-300 font-mono leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-raveBorder/40 font-mono text-xs">
                    <a
                      href={artist.soundCloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-raveRed transition-colors"
                    >
                      &gt; SOUNDCLOUD OFICIAL
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subsection 2: Media Archive Visual Gallery */}
        <section className="w-full border-b border-raveBorder bg-panel/40 py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="border-b-2 border-raveRed pb-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                {"// REGISTRO FOTOGRÁFICO & AUDIOVISUAL"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                MEDIA ARCHIVE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mediaItems.map((item) => (
                <div key={item.id} className="border border-raveBorder bg-black overflow-hidden flex flex-col">
                  {item.type === "photo" ? (
                    <div className="relative aspect-video w-full border-b border-raveBorder bg-panel">
                      <Image
                        src={item.mediaUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover p-2"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full border-b border-raveBorder bg-panel flex items-center justify-center text-center p-4">
                      <div>
                        <span className="border border-raveRed px-3 py-1 font-mono text-xs font-bold text-raveRed uppercase">
                          [ VIDEO STREAM // YOUTUBE ]
                        </span>
                        <a
                          href={"https://www.youtube.com/watch?v=" + item.mediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 block font-mono text-xs text-white hover:text-raveRed underline"
                        >
                          VER EN VIVO &rarr;
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <span className="font-mono text-[10px] text-raveRed font-bold">
                      {item.date} &bull; {item.location}
                    </span>
                    <h4 className="font-mono text-sm font-bold uppercase text-white mt-1">
                      {item.title}
                    </h4>
                    <p className="mt-1 font-mono text-xs text-neutral-400">
                      {item.caption}
                    </p>
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
