/**
 * @file apps/web/src/app/archivo/archivo-view.tsx
 * @description Layer 1: Presentation - Interactive Archive & Artists Roster Directory View (/archivo).
 *
 * ARCHITECTURAL LAYER SPECIFICATION:
 * - Layer: Layer 1 (Presentation)
 * - Responsibility: Client Component rendering the interactive artists roster directory with tactical brutalist styling,
 *   monospace typography, reactive search filtering, and clean interactive profile links.
 * - Invariant: Exactly one semantic H1 element per route. Zero raw fetch or database access;
 *   consumes immutable datasets from Layer 4 Infrastructure (archive-data).
 * - Invariant: Zero musical genre or subgenre badges or columns displayed.
 */

"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";
import {
  getArtistsRoster,
  ArtistProfile,
} from "@/lib/infrastructure/archive-data";

/**
 * Interactive Client Component for the Archive Section and Artists Roster.
 *
 * @returns {React.ReactElement} The rendered ArchivoView element.
 */
export function ArchivoView(): React.ReactElement {
  // Step 1: Manage drawer navigation and procedural sound effects state
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();
  const { isSoundEnabled, toggleSound } = useSoundFx();

  // Step 2: Load roster artists from Layer 4 Infrastructure catalog
  const artists = useMemo(() => getArtistsRoster(), []);

  // Step 3: Reactive state for client-side search query filtering
  const [searchQuery, setSearchQuery] = useState("");

  // Step 4: Filter artists roster based on name, country, or country code
  const filteredArtists = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return artists;
    return artists.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.country.toLowerCase().includes(query) ||
        a.countryCode.toLowerCase().includes(query)
    );
  }, [artists, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      {/* Global Navigation Header */}
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />

      {/* Accessible Navigation Drawer */}
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      <main className="flex-1 w-full">
        {/* Step 5: Archive Hero Section */}
        <section className="relative flex min-h-[45vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 text-center rave-scanlines">
          {/* Radial Red Brand Ambient Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />

          <div className="relative z-10 mx-auto max-w-4xl">
            {/* Top Eyebrow Badge */}
            <span className="border border-raveRed/60 bg-raveRed/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-raveRed inline-block max-w-full break-words text-center leading-relaxed">
              {"// HISTORIAL & REGISTRO // ARCHIVO GLOBAL"}
            </span>

            {/* Main Single Semantic H1 Headline */}
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,0,0,0.35)]">
              ROSTER DE ARTISTAS & MEMORIA VISUAL
            </h1>

            {/* Curatorial Subtitle */}
            <p className="mt-4 font-mono text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Registro de DJs, productoras y directos que han formado parte del circuito sonoro de Industrial Girls.
            </p>
          </div>
        </section>

        {/* Step 6: Typographic Artists Roster Directory */}
        <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            {/* Directory Header & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-raveBorder pb-4 mb-10 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// ARCHIVO // EDICIONES PASADAS"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  ARTISTAS EN NUESTROS EVENTOS
                </h2>
              </div>

              {/* Search Filter Input */}
              <div className="w-full sm:w-80">
                <label htmlFor="artist-search" className="sr-only">
                  Buscar artista o país
                </label>
                <input
                  id="artist-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por alias o país..."
                  className="w-full border border-raveBorder bg-panel px-4 py-2.5 font-mono text-xs text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
                />
              </div>
            </div>

            {/* Tactical Brutalism Roster Directory Rows */}
            <div className="flex flex-col divide-y divide-white/10 border border-raveBorder bg-panel/30">
              {filteredArtists.map((artist: ArtistProfile, index: number) => (
                <article
                  key={artist.id}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-3.5 px-4 sm:px-6 min-h-[52px] transition-all duration-200 hover:bg-black/90 hover:border-l-4 hover:border-l-raveRed"
                >
                  {/* Left Column: Index, Artist Name & Country Code */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono text-xs text-white/40 w-8 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white group-hover:text-raveRed group-hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] transition-colors">
                      {artist.name}
                    </h3>
                    <span className="ml-2 font-mono text-xs font-bold text-raveRed tracking-wider">
                      {"[" + artist.countryCode + "]"}
                    </span>
                  </div>

                  {/* Right Column: Interactive Profile Link Buttons */}
                  {artist.links && (
                    <div className="mt-2 md:mt-0 md:ml-auto flex flex-wrap items-center gap-2 font-mono text-[11px]">
                      {artist.links.spotify && (
                        <a
                          href={artist.links.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider"
                          aria-label={"Spotify de " + artist.name}
                        >
                          [ SPOTIFY ]
                        </a>
                      )}
                      {artist.links.soundcloud && (
                        <a
                          href={artist.links.soundcloud}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider"
                          aria-label={"SoundCloud de " + artist.name}
                        >
                          [ SOUNDCLOUD ]
                        </a>
                      )}
                      {artist.links.instagram && (
                        <a
                          href={artist.links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider"
                          aria-label={"Instagram de " + artist.name}
                        >
                          [ IG ]
                        </a>
                      )}
                      {artist.links.residentAdvisor && (
                        <a
                          href={artist.links.residentAdvisor}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider"
                          aria-label={"Resident Advisor de " + artist.name}
                        >
                          [ RA ]
                        </a>
                      )}
                      {artist.links.bandcamp && (
                        <a
                          href={artist.links.bandcamp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider"
                          aria-label={"Bandcamp de " + artist.name}
                        >
                          [ BC ]
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Empty Search Feedback */}
            {filteredArtists.length === 0 && (
              <div className="border border-raveBorder bg-panel/30 p-12 text-center">
                <p className="font-mono text-sm text-neutral-400">
                  No se encontraron artistas para el criterio: <span className="text-raveRed">&ldquo;{searchQuery}&rdquo;</span>
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 font-mono text-xs uppercase text-raveRed underline hover:text-white"
                >
                  [ RESTABLECER FILTROS ]
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Persistent Floating Audio Bar */}
      <FloatingSoundBar
        isSoundActive={isSoundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
