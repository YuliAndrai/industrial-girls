/**
 * @file apps/web/src/app/musica/musica-view.tsx
 * @description Layer 1: Presentation - Music Catalog & Audio Vault Route (/musica).
 * Features quick selector (Releases | Podcasts | Demo Drop), VA 001-005 grid, podcast embeds, and Demo Drop specs.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { TactileButton } from "@/components/ui/tactile-button";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";
import {
  getReleasesCatalog,
  ReleaseItem,
} from "@/lib/infrastructure/music-data";
import {
  getDemoDropSpecs,
} from "@/lib/infrastructure/music-catalog";
import {
  getPodcastsCatalog,
  PodcastEpisode,
} from "@/lib/infrastructure/podcast-data";

/**
 * Music catalog and audio archive route page.
 *
 * @returns {React.ReactElement} The rendered Music page view.
 */
export function MusicaView(): React.ReactElement {
  // Step 1: Manage drawer navigation state through application hook
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();

  // Step 2: Manage global audio and tactile sound interactions
  const { isSoundEnabled, toggleSound } = useSoundFx();

  // Step 3: Retrieve catalog datasets from infrastructure layer
  const releases = getReleasesCatalog();
  const podcasts = getPodcastsCatalog();
  const demoDropSpecs = getDemoDropSpecs();

  // Step 4: Maintain active tab filter
  const [activeTab, setActiveTab] = useState<"releases" | "podcasts" | "demodrop">("releases");

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 text-center rave-scanlines">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <span className="border border-raveRed/60 bg-raveRed/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-raveRed">
              {"// CATÁLOGO DISCOGRÁFICO // BOVEDA SONORA"}
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              LABEL
            </h1>
            <p className="mt-4 font-mono text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Discografía digital, Podcasts y canal directo de recepción para producciones inéditas.
            </p>

            {/* Quick Filter Selector Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setActiveTab("releases")}
                className={`px-6 py-3 sm:px-7 sm:py-3.5 font-mono text-sm sm:text-base uppercase font-bold tracking-wider transition-all duration-200 ${
                  activeTab === "releases"
                    ? "border border-red-600 bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                    : "border border-white/20 bg-black/60 text-white/80 hover:border-white hover:text-white hover:bg-white/5"
                }`}
              >
                [ RELEASES (VA 001 - 005) ]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("podcasts")}
                className={`px-6 py-3 sm:px-7 sm:py-3.5 font-mono text-sm sm:text-base uppercase font-bold tracking-wider transition-all duration-200 ${
                  activeTab === "podcasts"
                    ? "border border-red-600 bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                    : "border border-white/20 bg-black/60 text-white/80 hover:border-white hover:text-white hover:bg-white/5"
                }`}
              >
                {"[ PODCAST'S ]"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("demodrop")}
                className={`px-6 py-3 sm:px-7 sm:py-3.5 font-mono text-sm sm:text-base uppercase font-bold tracking-wider transition-all duration-200 ${
                  activeTab === "demodrop"
                    ? "border border-red-600 bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                    : "border border-white/20 bg-black/60 text-white/80 hover:border-white hover:text-white hover:bg-white/5"
                }`}
              >
                [ DEMO DROP // ENVIAR ]
              </button>
            </div>
          </div>
        </section>

        {/* 1. Subsection Releases (VA 005 - VA 001) */}
        {activeTab === "releases" && (
          <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="border-b-2 border-raveRed pb-4 mb-10">
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// COMPILADOS OFICIALES VARIOUS ARTISTS"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  SERIE VA // DISCOGRAFÍA
                </h2>
              </div>

              {/* Quick Jump Selector for Compilations */}
              <div className="flex flex-wrap gap-2 mb-10">
                {releases.map((release) => (
                  <a
                    key={release.id}
                    href={`#${release.id}`}
                    className="border border-raveBorder bg-panel/60 text-neutral-300 hover:border-raveRed hover:text-white px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all"
                  >
                    {release.catalogNumber}
                  </a>
                ))}
              </div>

              {/* Compilations List Descending (VA 005 to VA 001) */}
              <div className="space-y-12">
                {releases.map((release, index) => (
                  <article
                    key={release.id}
                    id={release.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-raveBorder bg-panel/40 p-6 sm:p-10 hover:border-white/20 transition-all scroll-mt-24"
                  >
                    {/* Left Column: Square Cover Art (1:1) and Spotify Button */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                      <div className="relative aspect-square w-full overflow-hidden border-2 border-raveRed bg-black">
                        <Image
                          src={release.coverImage}
                          alt={`${release.catalogNumber} - ${release.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover p-2"
                          priority={index === 0}
                        />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-raveRed font-bold tracking-wider">
                          {`[ ${release.catalogNumber} // ${release.year} ]`}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                          {release.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <a
                          href={release.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Escuchar ${release.title} en Spotify`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase border border-red-500 text-white hover:bg-red-500/20 transition-colors"
                        >
                          ESCUCHAR EN SPOTIFY ↗
                        </a>
                        <a
                          href={release.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Comprar ${release.title} en ${release.buyLabel}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase border border-white/20 text-white/80 hover:border-white hover:text-white transition-colors"
                        >
                          COMPRAR EN {release.buyLabel} ↗
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Monospace Tracklist */}
                    <div className="lg:col-span-8 flex flex-col justify-between">
                      <div>
                        <div className="border-b border-raveBorder pb-2 mb-4 flex items-center justify-between font-mono text-xs text-raveTextMuted">
                          <span># TRACKLIST OFICIAL</span>
                          <span>DETALLE</span>
                        </div>
                        <div className="space-y-1 mt-3">
                          {release.tracklist.map((track, idx) => (
                            <a
                              key={`${track.artist}-${track.title}-${idx}`}
                              href={track.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Escuchar ${track.artist} - ${track.title} en Spotify`}
                              className="group flex items-center justify-between text-xs font-mono py-1.5 px-2 rounded hover:bg-white/5 transition-colors"
                            >
                              <span className="text-white/70 group-hover:text-white transition-colors">
                                <span className="text-red-500 mr-2">[{String(idx + 1).padStart(2, '0')}]</span>
                                {track.artist} — {track.title}
                              </span>
                              <span className="text-[10px] text-white/30 group-hover:text-red-500 uppercase transition-colors">
                                ESCUCHAR ↗
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 border-t border-raveBorder/60 pt-4 font-mono text-xs text-neutral-400 flex items-center justify-between">
                        <span>FORMATO: DIGITAL LOSSLESS</span>
                        <span className="text-raveRed font-bold">145-165 BPM</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 2. Subsection Podcasts (IG MIX 001 - 004) */}
        {activeTab === "podcasts" && (
          <section id="podcasts" className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="border-b-2 border-raveRed pb-4 mb-10">
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// SOURCED AUDIO & CURATED SETS // PODCAST SERIES"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  INDUSTRIAL GIRLS PODCAST
                </h2>
                <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
                  Sesiones de estudio y directos exclusivos que exploran la crudeza y el tempo acelerado de nuestra comunidad.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {podcasts.map((episode) => (
                  <article
                    key={episode.id}
                    className="border border-raveBorder bg-panel/60 p-6 flex flex-col justify-between hover:border-raveRed transition-all"
                  >
                    <div>
                      {/* Cover Image (16:9 MaxRes HD) */}
                      <div className="group relative aspect-video w-full overflow-hidden border border-white/10 bg-black mb-4">
                        <Image
                          src={episode.coverImage}
                          alt={episode.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                          quality={90}
                          className="w-full h-full object-cover object-center contrast-[1.05] brightness-95 group-hover:brightness-105 group-hover:scale-[1.02] transition-all duration-300"
                        />
                      </div>

                      {/* Metadata Badge */}
                      <div className="flex items-center justify-between border-b border-raveBorder pb-2 mb-3 font-mono text-xs">
                        <span className="font-mono text-xs text-raveRed font-bold tracking-wider">
                          {`[ IG MIX ${episode.seriesNumber} ]`}
                        </span>
                      </div>

                      {/* Artist Name & Title */}
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                        {episode.artist}
                      </h3>
                      <p className="font-mono text-xs text-neutral-300 mt-1">
                        {episode.title}
                      </p>
                    </div>

                    {/* Action Buttons: SoundCloud Primary, YouTube Secondary */}
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-raveBorder/40">
                      {/* BOTÓN PRIMARIO SOUNDCLOUD */}
                      <a
                        href={episode.soundcloudUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Escuchar sesión de ${episode.artist} en SoundCloud`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase bg-red-600/90 text-white hover:bg-red-500 border border-red-500 transition-colors"
                      >
                        <span>ESCUCHAR EN SOUNDCLOUD</span>
                        <span>↗</span>
                      </a>

                      {/* BOTÓN SECUNDARIO YOUTUBE */}
                      <a
                        href={episode.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver sesión de ${episode.artist} en YouTube`}
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono uppercase border border-white/20 text-white/70 hover:border-white hover:text-white transition-colors"
                      >
                        <span>VER EN YOUTUBE</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. Subsection Demo Drop */}
        <section id="demo-drop" className="w-full border-b border-raveBorder bg-panel/40 py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="border-2 border-raveRed bg-black p-6 sm:p-10 shadow-rave">
              <div className="border-b border-raveBorder pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// CANAL DE CURADURÍA & LANZAMIENTOS"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  {demoDropSpecs.title}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-raveRed mb-2">
                    [ FORMATOS ACEPTADOS ]
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-white">
                    {demoDropSpecs.acceptedFormats.map((fmt) => (
                      <li key={fmt} className="border border-raveBorder bg-panel p-2 text-center">
                        {fmt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-raveRed mb-2">
                    [ PROVEEDORES AUTORIZADOS ]
                  </h4>
                  <ul className="space-y-1 font-mono text-xs text-neutral-300">
                    {demoDropSpecs.allowedProviders.map((prov) => (
                      <li key={prov} className="border-l-2 border-raveRed pl-3">
                        {prov}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-raveRed mb-2">
                    [ REGLAS DE ENVÍO & CURADURÍA ]
                  </h4>
                  <ul className="space-y-2 font-mono text-xs text-neutral-300">
                    {demoDropSpecs.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-raveRed font-bold">0{idx + 1}.</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-raveBorder pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-raveTextMuted block">CORREO DIRECTO DE ESCUCHA:</span>
                    <a
                      href={"mailto:" + demoDropSpecs.contactEmail}
                      className="font-mono text-sm font-bold text-white hover:text-raveRed underline decoration-raveRed transition-colors"
                    >
                      {demoDropSpecs.contactEmail}
                    </a>
                  </div>
                  <a
                    href={"mailto:" + demoDropSpecs.contactEmail}
                    aria-label={`Enviar demo musical a ${demoDropSpecs.contactEmail} vía correo electrónico`}
                  >
                    <TactileButton
                      variant="primary"
                      size="md"
                      aria-label={`Enviar demo musical a ${demoDropSpecs.contactEmail} vía correo electrónico`}
                    >
                      <span>[ ENVIAR DEMO VÍA CORREO ]</span>
                    </TactileButton>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingSoundBar isSoundActive={isSoundEnabled} onToggleSound={toggleSound} />
      <Footer />
    </div>
  );
}
