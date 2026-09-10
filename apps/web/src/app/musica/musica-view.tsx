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
  getCompilations,
  getPodcasts,
  getDemoDropSpecs,
} from "@/lib/infrastructure/music-catalog";

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
  const compilations = getCompilations();
  const podcasts = getPodcasts();
  const demoDropSpecs = getDemoDropSpecs();

  // Step 4: Maintain active tab filter and selected compilation state
  const [activeTab, setActiveTab] = useState<"releases" | "podcasts" | "demodrop">("releases");
  const [selectedCompId, setSelectedCompId] = useState<string>("va-001");

  // Step 5: Resolve current featured compilation entity
  const activeComp = compilations.find((c) => c.id === selectedCompId) || compilations[0];

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
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              CATÁLOGO SONORO & <br />
              <span className="text-raveRed drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">
                ARCHIVO DE AUDIO
              </span>
            </h1>
            <p className="mt-4 font-mono text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Discografía en vinilo y digital, sesiones de club en podcast y canal directo de recepción para producciones inéditas.
            </p>

            {/* Quick Filter Selector Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("releases")}
                className={`border px-4 py-2 font-mono text-xs uppercase font-bold tracking-wider transition-all ${
                  activeTab === "releases"
                    ? "border-raveRed bg-raveRed text-black"
                    : "border-raveBorder bg-panel/60 text-white hover:border-white/40"
                }`}
              >
                [ 01. RELEASES (VA 001 - 005) ]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("podcasts")}
                className={`border px-4 py-2 font-mono text-xs uppercase font-bold tracking-wider transition-all ${
                  activeTab === "podcasts"
                    ? "border-raveRed bg-raveRed text-black"
                    : "border-raveBorder bg-panel/60 text-white hover:border-white/40"
                }`}
              >
                [ 02. PODCASTS (IG MIX) ]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("demodrop")}
                className={`border px-4 py-2 font-mono text-xs uppercase font-bold tracking-wider transition-all ${
                  activeTab === "demodrop"
                    ? "border-raveRed bg-raveRed text-black"
                    : "border-raveBorder bg-panel/60 text-white hover:border-white/40"
                }`}
              >
                [ 03. DEMO DROP // ENVIAR ]
              </button>
            </div>
          </div>
        </section>

        {/* 1. Subsection Releases (VA 001 - VA 005) */}
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

              {/* Selector Pills for Compilations */}
              <div className="flex flex-wrap gap-2 mb-8">
                {compilations.map((comp) => (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setSelectedCompId(comp.id)}
                    className={`border px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
                      comp.id === activeComp.id
                        ? "border-raveRed bg-raveRed/10 text-white"
                        : "border-raveBorder bg-panel/60 text-neutral-400 hover:border-white/30"
                    }`}
                  >
                    {comp.catalogCode}
                  </button>
                ))}
              </div>

              {/* Featured Active Compilation View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-raveBorder bg-panel/40 p-6 sm:p-10">
                {/* Cover Art and Direct Action */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="relative aspect-square w-full overflow-hidden border-2 border-raveRed bg-black">
                    <Image
                      src={activeComp.coverImage}
                      alt={activeComp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover p-2"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-raveRed font-bold">
                      {activeComp.catalogCode} {"//"} {activeComp.year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                      {activeComp.title}
                    </h3>
                    <p className="font-mono text-xs text-raveTextMuted mt-1">
                      {activeComp.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <a
                      href={activeComp.links.bandcamp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                      aria-label={`Comprar y escuchar ${activeComp.title} en Bandcamp`}
                    >
                      <TactileButton variant="primary" size="sm" className="w-full">
                        <span>[ BANDCAMP STREAM / BUY ]</span>
                      </TactileButton>
                    </a>
                    <a
                      href={activeComp.links.beatport}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                      aria-label={`Comprar ${activeComp.title} exclusivo en Beatport Pro`}
                    >
                      <TactileButton variant="outline" size="sm" className="w-full">
                        <span>[ BEATPORT PRO EXCLUSIVE ]</span>
                      </TactileButton>
                    </a>
                  </div>
                </div>

                {/* Tracklist Table */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-raveBorder pb-2 mb-4 flex items-center justify-between font-mono text-xs text-raveTextMuted">
                      <span># TRACKLIST OFICIAL</span>
                      <span>DURACIÓN</span>
                    </div>
                    <div className="divide-y divide-raveBorder/40">
                      {activeComp.tracks.map((track) => (
                        <div
                          key={track.position}
                          className="py-3 flex items-center justify-between font-mono hover:bg-white/5 px-2 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-raveRed">{track.position}</span>
                            <div>
                              <span className="text-sm font-bold text-white block">{track.artist}</span>
                              <span className="text-xs text-neutral-400">{track.title}</span>
                            </div>
                          </div>
                          <span className="text-xs text-neutral-400">{track.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-raveBorder/60 pt-4 font-mono text-xs text-neutral-400 flex items-center justify-between">
                    <span>FORMATO: VINIL 12&quot; 180G + DIGITAL LOSSLESS</span>
                    <span className="text-raveRed font-bold">145-160 BPM</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. Subsection Podcasts (IG MIX 001 - 004) */}
        {activeTab === "podcasts" && (
          <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="border-b-2 border-raveRed pb-4 mb-10">
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// SESIONES OFICIALES DE CLUB"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  SERIE DE PODCASTS // IG MIX
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {podcasts.map((pod) => (
                  <div
                    key={pod.id}
                    className="border border-raveBorder bg-panel/60 p-6 flex flex-col justify-between hover:border-raveRed transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-raveBorder pb-3 mb-4 font-mono text-xs">
                        <span className="font-bold text-raveRed">{pod.code}</span>
                        <span className="text-neutral-400">{pod.date} &bull; {pod.duration}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                        {pod.artist}
                      </h3>
                      <p className="font-mono text-xs text-raveTextMuted mt-1">
                        BASE: {pod.origin}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mt-3 mb-5">
                        {pod.trackHighlights.map((tag) => (
                          <span
                            key={tag}
                            className="border border-white/10 bg-black px-2 py-0.5 font-mono text-[10px] text-neutral-300"
                          >
                            &bull; {tag}
                          </span>
                        ))}
                      </div>

                      {/* SoundCloud Player Embed */}
                      <div className="border border-raveBorder overflow-hidden bg-black mb-4">
                        <iframe
                          width="100%"
                          height="120"
                          scrolling="no"
                          frameBorder="no"
                          allow="autoplay"
                          src={pod.soundCloudEmbedUrl}
                          title={pod.code + " SoundCloud"}
                        />
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-3 border-t border-raveBorder/40 flex items-center justify-between font-mono text-xs">
                      <a
                        href={"https://www.youtube.com/watch?v=" + pod.youtubeEmbedId}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-raveRed transition-colors"
                        aria-label={`Ver videostream de ${pod.artist} (${pod.code}) en YouTube`}
                      >
                        &gt; VER VIDEOSTREAM EN YOUTUBE
                      </a>
                      <span className="text-raveRed font-bold">155+ BPM</span>
                    </div>
                  </div>
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
