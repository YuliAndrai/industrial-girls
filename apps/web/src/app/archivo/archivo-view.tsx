/**
 * @file apps/web/src/app/archivo/archivo-view.tsx
 * @description Layer 1: Presentation - Interactive Archive, Artists Roster Directory & Futuristic Audiovisual Gallery (/archivo).
 *
 * ARCHITECTURAL LAYER SPECIFICATION:
 * - Layer: Layer 1 (Presentation)
 * - Responsibility: Client Component rendering the interactive artists roster directory with tactical brutalist styling,
 *   monospace typography, balanced two-column responsive density, reactive search filtering, clean interactive profile links,
 *   and a futuristic compact photographic archive gallery terminal with Spotlight HUD, horizontal filmstrip, dense matrix view,
 *   and full-screen interactive lightbox modal.
 * - Invariant: Exactly one semantic H1 element per route. Zero raw fetch or database access;
 *   consumes immutable datasets from Layer 4 Infrastructure (archive-data).
 * - Invariant: Two-column layout on large viewports (grid-cols-1 lg:grid-cols-2) with 15 artists per column.
 * - Invariant: Zero musical genre or subgenre badges or columns displayed.
 */

"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";
import {
  getArtistsRoster,
  ArtistProfile,
  getArchiveVideos,
  ArchiveVideoItem,
  getArchivePhotos,
  ArchivePhoto,
} from "@/lib/infrastructure/archive-data";

/**
 * Interactive Client Component for the Archive Section, Artists Roster, and Photographic Visual Registry.
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

  // Step 4.1: Partition roster into two balanced columns (15 artists each by default)
  const { column1, column2 } = useMemo(() => {
    const midpoint = Math.ceil(filteredArtists.length / 2);
    return {
      column1: filteredArtists.slice(0, midpoint),
      column2: filteredArtists.slice(midpoint),
    };
  }, [filteredArtists]);

  // Step 5: Load visual frames and real YouTube videos from Layer 4
  const archivePhotos = useMemo(() => getArchivePhotos(), []);
  const archiveVideos = useMemo(() => getArchiveVideos(), []);

  // Step 5.1: Reactive filter state for media items ('all' | 'photo' | 'video')
  const [selectedMediaType, setSelectedMediaType] = useState<"all" | "photo" | "video">("all");

  // Step 5.2: State for active photo index in the futuristic spotlight HUD
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Step 5.3: Layout mode toggle for photo gallery: 'spotlight' (single monitor + filmstrip) vs 'matrix' (compact dense grid)
  const [galleryLayoutMode, setGalleryLayoutMode] = useState<"spotlight" | "matrix">("spotlight");

  // Step 5.4: State for full-screen photo lightbox modal
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number | null>(null);

  // Step 5.5: Navigation helpers for cycling photos
  const goToPrevPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : archivePhotos.length - 1));
  }, [archivePhotos.length]);

  const goToNextPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => (prev < archivePhotos.length - 1 ? prev + 1 : 0));
  }, [archivePhotos.length]);

  const goToModalPrev = useCallback(() => {
    setModalPhotoIndex((prev) => {
      if (prev === null) return 0;
      return prev > 0 ? prev - 1 : archivePhotos.length - 1;
    });
  }, [archivePhotos.length]);

  const goToModalNext = useCallback(() => {
    setModalPhotoIndex((prev) => {
      if (prev === null) return 0;
      return prev < archivePhotos.length - 1 ? prev + 1 : 0;
    });
  }, [archivePhotos.length]);

  // Step 5.6: Keyboard listener for ESC and arrow navigation in modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        if (modalPhotoIndex !== null) {
          goToModalPrev();
        } else {
          goToPrevPhoto();
        }
      } else if (e.key === "ArrowRight") {
        if (modalPhotoIndex !== null) {
          goToModalNext();
        } else {
          goToNextPhoto();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalPhotoIndex, goToModalPrev, goToModalNext, goToPrevPhoto, goToNextPhoto]);

  // Step 5.8: Currently active photo in spotlight HUD
  const activePhoto = archivePhotos[activePhotoIndex] || archivePhotos[0];

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      {/* Global Navigation Header */}
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />

      {/* Accessible Navigation Drawer */}
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      <main className="flex-1 w-full">
        {/* Step 6: Archive Hero Section */}
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

        {/* Step 7: Typographic Artists Roster Directory */}
        <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            {/* Directory Header & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-raveBorder pb-4 mb-10 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// ARCHIVO // EDICIONES PASADAS"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  ARTISTAS EN NUESTROS EVENTOS & LABEL
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

            {/* Step 7.1: Two-Column Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0 items-start">
              {/* Column 1: Primary / Established International Artists */}
              <div className="flex flex-col divide-y divide-white/10 border border-raveBorder bg-panel/30 mb-8 lg:mb-0">
                {column1.map((artist, colIndex) => {
                  const overallIndex = artists.findIndex((a) => a.id === artist.id);
                  const displayIndex = overallIndex !== -1 ? overallIndex : colIndex;
                  return (
                    <article
                      key={artist.id}
                      className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-2.5 sm:py-3 px-3.5 sm:px-4 border-b border-white/10 transition-all duration-200 hover:bg-black/90 hover:border-l-4 hover:border-l-raveRed"
                    >
                      {/* Left: Index, Name & Country Code */}
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span className="font-mono text-xs text-white/40 w-6 shrink-0">
                          {String(displayIndex + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-raveRed group-hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] transition-colors truncate">
                          {artist.name}
                        </h3>
                        <span className="ml-1.5 font-mono text-[11px] font-bold text-raveRed tracking-wider shrink-0">
                          {"[" + artist.countryCode + "]"}
                        </span>
                      </div>

                      {/* Right: Compact profile link buttons */}
                      {artist.links && (
                        <div className="mt-2 sm:mt-0 sm:ml-auto flex flex-wrap items-center gap-1.5 font-mono text-[10px] shrink-0">
                          {artist.links.spotify && (
                            <a
                              href={artist.links.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
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
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
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
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
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
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
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
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
                              aria-label={"Bandcamp de " + artist.name}
                            >
                              [ BC ]
                            </a>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* Column 2: Circuit / Emerging & Regional Artists */}
              <div className="flex flex-col divide-y divide-white/10 border border-raveBorder bg-panel/30">
                {column2.map((artist, colIndex) => {
                  const overallIndex = artists.findIndex((a) => a.id === artist.id);
                  const displayIndex = overallIndex !== -1 ? overallIndex : column1.length + colIndex;
                  return (
                    <article
                      key={artist.id}
                      className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-2.5 sm:py-3 px-3.5 sm:px-4 border-b border-white/10 transition-all duration-200 hover:bg-black/90 hover:border-l-4 hover:border-l-raveRed"
                    >
                      {/* Left: Index, Name & Country Code */}
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span className="font-mono text-xs text-white/40 w-6 shrink-0">
                          {String(displayIndex + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-raveRed group-hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] transition-colors truncate">
                          {artist.name}
                        </h3>
                        <span className="ml-1.5 font-mono text-[11px] font-bold text-raveRed tracking-wider shrink-0">
                          {"[" + artist.countryCode + "]"}
                        </span>
                      </div>

                      {/* Right: Compact profile link buttons */}
                      {artist.links && (
                        <div className="mt-2 sm:mt-0 sm:ml-auto flex flex-wrap items-center gap-1.5 font-mono text-[10px] shrink-0">
                          {artist.links.spotify && (
                            <a
                              href={artist.links.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
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
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
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
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
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
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
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
                              className="px-2 py-0.5 border border-raveBorder/60 text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase tracking-wider whitespace-nowrap"
                              aria-label={"Bandcamp de " + artist.name}
                            >
                              [ BC ]
                            </a>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
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

        {/* Step 8: Futuristic Compact Media Archive & Visual Registry Section */}
        <section className="w-full border-b border-raveBorder bg-black py-16 px-4 sm:px-6 relative">
          <div className="mx-auto max-w-7xl">
            {/* Section Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-raveBorder pb-4 mb-8 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                  {"// REGISTRO & MEMORIA // ARCHIVO AUDIOVISUAL"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  REGISTRO AUDIOVISUAL & SHOWCASES
                </h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 max-w-xl">
                  Documentación fotográfica y capturas en vivo de nuestras residencias, almacenes y sesiones de club.
                </p>
              </div>

              {/* Media Type Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedMediaType("all")}
                  className={`px-3 py-1.5 border transition-all uppercase tracking-wider ${
                    selectedMediaType === "all"
                      ? "border-raveRed bg-raveRed text-black font-bold"
                      : "border-raveBorder text-neutral-400 hover:text-white hover:border-white/40"
                  }`}
                >
                  [ TODOS ({archivePhotos.length + archiveVideos.length}) ]
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMediaType("photo")}
                  className={`px-3 py-1.5 border transition-all uppercase tracking-wider ${
                    selectedMediaType === "photo"
                      ? "border-raveRed bg-raveRed text-black font-bold"
                      : "border-raveBorder text-neutral-400 hover:text-white hover:border-white/40"
                  }`}
                >
                  [ FOTOGRAFÍA ({archivePhotos.length}) ]
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMediaType("video")}
                  className={`px-3 py-1.5 border transition-all uppercase tracking-wider ${
                    selectedMediaType === "video"
                      ? "border-raveRed bg-raveRed text-black font-bold"
                      : "border-raveBorder text-neutral-400 hover:text-white hover:border-white/40"
                  }`}
                >
                  [ VIDEO ({archiveVideos.length}) ]
                </button>
              </div>
            </div>

            {/* Step 8.1: Photographic Visual Archive Console */}
            {(selectedMediaType === "all" || selectedMediaType === "photo") && (
              <div className="mb-12 border border-raveBorder bg-panel/20 p-4 sm:p-6 relative">
                {/* Console Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-raveBorder/60 pb-3 mb-4 gap-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-raveRed animate-pulse" />
                    <span className="font-bold text-white uppercase tracking-wider">
                      VISOR DE FOTOGRAMAS // {archivePhotos.length} CAPTURAS
                    </span>
                    <span className="text-raveRed font-bold">
                      [ {String(activePhotoIndex + 1).padStart(2, "0")} / {archivePhotos.length} ] // VISUAL REEL
                    </span>
                  </div>

                  {/* Mode & Navigation Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryLayoutMode((prev) => (prev === "spotlight" ? "matrix" : "spotlight"))
                      }
                      className="px-2.5 py-1 border border-raveBorder bg-black text-neutral-300 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase text-[11px]"
                    >
                      {galleryLayoutMode === "spotlight" ? `[ MODO MATRIZ (${archivePhotos.length}) ]` : "[ MODO SPOTLIGHT ]"}
                    </button>
                    <button
                      type="button"
                      onClick={goToPrevPhoto}
                      className="px-2 py-1 border border-raveBorder bg-black text-neutral-400 hover:text-white hover:border-white/40 uppercase text-[11px]"
                      aria-label="Fotograma anterior"
                    >
                      &lt; PREV
                    </button>
                    <button
                      type="button"
                      onClick={goToNextPhoto}
                      className="px-2 py-1 border border-raveBorder bg-black text-neutral-400 hover:text-white hover:border-white/40 uppercase text-[11px]"
                      aria-label="Fotograma siguiente"
                    >
                      NEXT &gt;
                    </button>
                  </div>
                </div>

                {/* Spotlight HUD Monitor Mode */}
                {galleryLayoutMode === "spotlight" ? (
                  <div className="flex flex-col gap-4">
                    {/* Main Visual Monitor Frame */}
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black border border-raveBorder group transform-gpu">
                      <Image
                        src={activePhoto.url}
                        alt={activePhoto.alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02] transform-gpu group-hover:will-change-transform"
                        unoptimized
                        priority
                        decoding="async"
                      />

                      {/* Scanline CRT overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                      {/* HUD Top Corner Tags */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-white/80 bg-black/80 px-2 py-1 border border-white/10">
                        <span className="text-raveRed font-bold">FRAME</span>
                        <span>{activePhoto.id}</span>
                      </div>

                      <div className="absolute top-3 right-3 z-10 hidden sm:flex items-center gap-2 font-mono text-[10px] text-white/80 bg-black/80 px-2 py-1 border border-white/10">
                        <span>35MM RAW SCAN // 100% UNCOMPRESSED</span>
                      </div>

                      {/* Quick prev/next overlay zones */}
                      <button
                        type="button"
                        onClick={goToPrevPhoto}
                        className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/60 text-white font-mono text-xl z-20"
                        aria-label="Fotograma anterior"
                      >
                        &#9664;
                      </button>
                      <button
                        type="button"
                        onClick={goToNextPhoto}
                        className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/60 text-white font-mono text-xl z-20"
                        aria-label="Fotograma siguiente"
                      >
                        &#9654;
                      </button>

                      {/* Expand Action Button */}
                      <button
                        type="button"
                        onClick={() => setModalPhotoIndex(activePhotoIndex)}
                        className="absolute bottom-3 right-3 z-20 font-mono text-xs border border-raveRed bg-black/90 px-3 py-1 text-raveRed font-bold hover:bg-raveRed hover:text-black transition-all uppercase tracking-wider"
                      >
                        [ EXPANDIR HD ⤢ ]
                      </button>
                    </div>

                    {/* Filmstrip Reel (Scroller of unique frames) */}
                    <div className="border-t border-raveBorder/40 pt-3">
                      <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 mb-2">
                        <span>REEL DE {archivePhotos.length} FOTOGRAMAS // SELECCIÓN DIRECTA</span>
                        <span className="text-raveRed">DESPLAZA HORIZONTALMENTE &gt;&gt;</span>
                      </div>

                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin overscroll-x-contain transform-gpu">
                        {archivePhotos.map((photo, index) => {
                          const isCurrent = index === activePhotoIndex;
                          return (
                            <button
                              key={photo.id}
                              type="button"
                              onClick={() => setActivePhotoIndex(index)}
                              style={{
                                contentVisibility: "auto",
                                containIntrinsicSize: "96px 64px",
                              }}
                              className={`relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden border transition-transform duration-200 transform-gpu hover:will-change-transform ${
                                isCurrent
                                  ? "border-2 border-raveRed shadow-[0_0_12px_rgba(255,0,0,0.7)] scale-105 z-10"
                                  : "border-white/15 opacity-60 hover:opacity-100 hover:border-white/50 hover:scale-105"
                              }`}
                              aria-label={`Ver ${photo.alt}`}
                            >
                              <Image
                                src={photo.url}
                                alt={photo.alt}
                                fill
                                sizes="96px"
                                className="object-cover"
                                loading="lazy"
                                decoding="async"
                                unoptimized
                              />
                              <span className="absolute bottom-0 right-0 bg-black/85 px-1 font-mono text-[9px] text-white/90">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Dense Matrix Grid Mode (High-Density View) */
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-[460px] overflow-y-auto p-2 scrollbar-thin border border-white/10 bg-black/60 transform-gpu overscroll-contain">
                    {archivePhotos.map((photo, index) => {
                      const isCurrent = index === activePhotoIndex;
                      return (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => {
                            setActivePhotoIndex(index);
                            setModalPhotoIndex(index);
                          }}
                          style={{
                            contentVisibility: "auto",
                            containIntrinsicSize: "120px 120px",
                          }}
                          className={`group relative aspect-square w-full overflow-hidden border transition-transform duration-200 transform-gpu hover:will-change-transform ${
                            isCurrent
                              ? "border-2 border-raveRed shadow-[0_0_12px_rgba(255,0,0,0.7)] scale-105 z-10"
                              : "border-white/10 hover:border-raveRed hover:opacity-100 opacity-80 hover:scale-105"
                          }`}
                          aria-label={`Ampliar ${photo.alt}`}
                        >
                          <Image
                            src={photo.url}
                            alt={photo.alt}
                            fill
                            sizes="120px"
                            className="object-cover group-hover:scale-110 transition-transform duration-200 transform-gpu"
                            loading="lazy"
                            decoding="async"
                            unoptimized
                          />
                          <span className="absolute bottom-0 right-0 bg-black/85 px-1 font-mono text-[9px] text-white/90">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Step 8.2: Audiovisual Video Showcases Grid */}
            {(selectedMediaType === "all" || selectedMediaType === "video") && (
              <div>
                <div className="flex items-center gap-2 mb-6 font-mono text-xs text-raveRed font-bold">
                  <span>{"// VIDEOS & REGISTRO MULTICÁMARA EN VIVO"}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {archiveVideos.map((video) =>
                    video.type === "local" ? (
                      /* Native Local HTML5 Video Player Card */
                      <div
                        key={video.id}
                        style={{
                          contentVisibility: "auto",
                          containIntrinsicSize: "360px 240px",
                        }}
                        className="group flex flex-col border border-raveBorder bg-panel/30 transition-all duration-200 hover:border-raveRed hover:bg-black/90 overflow-hidden transform-gpu"
                      >
                        {/* Video Player Container */}
                        <div className="relative aspect-video w-full bg-black border-b border-raveBorder overflow-hidden">
                          <video
                            controls
                            preload="metadata"
                            className="w-full aspect-video rounded-xs border border-white/10 bg-black object-cover"
                            src={video.src}
                          >
                            <track kind="captions" />
                            Tu navegador no soporta reproducción de video HTML5.
                          </video>
                          {/* Top Badges */}
                          <div className="pointer-events-none absolute top-2 left-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider z-10">
                            <span className="px-2 py-0.5 font-bold bg-white/20 text-white border border-white/20">
                              LOCAL // MP4
                            </span>
                          </div>
                        </div>

                        {/* Card Details: Título monospace limpio en la parte inferior */}
                        <div className="p-4 flex flex-col flex-1 justify-between">
                          <h3 className="font-mono text-sm font-bold uppercase tracking-tight text-white transition-colors">
                            {video.title}
                          </h3>

                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
                            <span className="text-white/70 uppercase tracking-wider">
                              &gt; REPRODUCTOR LOCAL
                            </span>
                            <span className="text-white/40">REGISTRO DE CAMPO</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* External YouTube Video Showcase Card */
                      <a
                        key={video.id}
                        href={video.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          contentVisibility: "auto",
                          containIntrinsicSize: "360px 240px",
                        }}
                        className="group flex flex-col border border-raveBorder bg-panel/30 transition-all duration-200 hover:border-raveRed hover:bg-black/90 overflow-hidden transform-gpu"
                        aria-label={"Abrir en YouTube: " + video.title}
                      >
                        {/* Thumbnail / Media Preview */}
                        <div className="relative aspect-video w-full overflow-hidden bg-black border-b border-raveBorder">
                          {video.thumbnailUrl && (
                            <Image
                              src={video.thumbnailUrl}
                              alt={video.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                              unoptimized
                            />
                          )}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider z-10">
                            <span className="px-2 py-0.5 font-bold bg-raveRed text-black">
                              YOUTUBE
                            </span>
                          </div>

                          {/* Play Overlay Trigger Button / Icon */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <span className="border border-raveRed bg-black/90 px-3 py-1 font-mono text-xs text-raveRed font-bold uppercase tracking-widest group-hover:scale-105 transition-transform flex items-center gap-1.5">
                              <span className="text-raveRed">▶</span> REPRODUCIR EN YOUTUBE ↗
                            </span>
                          </div>
                        </div>

                        {/* Card Details: Título monospace limpio en la parte inferior */}
                        <div className="p-4 flex flex-col flex-1 justify-between">
                          <h3 className="font-mono text-sm font-bold uppercase tracking-tight text-white group-hover:text-raveRed transition-colors">
                            {video.title}
                          </h3>

                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
                            <span className="text-white hover:text-raveRed transition-colors uppercase tracking-wider">
                              &gt; ABRIR EN YOUTUBE
                            </span>
                            <span className="text-white/40">TRANSMISIÓN</span>
                          </div>
                        </div>
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Step 9: Interactive Photo Lightbox Modal */}
      {modalPhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={archivePhotos[modalPhotoIndex]?.alt || "Fotograma del archivo"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-6"
          onClick={() => setModalPhotoIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl border border-raveBorder bg-panel p-4 sm:p-6 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-raveBorder pb-3 mb-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-raveRed font-bold">
                <span>
                  {"[ FRAME " + String(modalPhotoIndex + 1).padStart(2, "0") + " / " + archivePhotos.length + " ]"}
                </span>
                <span className="text-white/40">&bull;</span>
                <span className="text-white/70">
                  {archivePhotos[modalPhotoIndex]?.id}.jpg
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalPhotoIndex(null)}
                className="px-2.5 py-1 border border-raveBorder text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase"
                aria-label="Cerrar modal"
              >
                [ CERRAR ✕ ]
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[70vh] bg-black border border-raveBorder overflow-hidden">
              <Image
                src={archivePhotos[modalPhotoIndex]?.url || ""}
                alt={archivePhotos[modalPhotoIndex]?.alt || ""}
                fill
                sizes="100vw"
                className="object-contain transform-gpu"
                unoptimized
                priority
                decoding="async"
              />

              {/* Prev / Next Modal Arrows */}
              <button
                type="button"
                onClick={goToModalPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 border border-raveBorder bg-black/80 px-3 py-2 text-white font-mono hover:bg-raveRed hover:text-black transition-all"
                aria-label="Fotograma anterior"
              >
                &#9664;
              </button>
              <button
                type="button"
                onClick={goToModalNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 border border-raveBorder bg-black/80 px-3 py-2 text-white font-mono hover:bg-raveRed hover:text-black transition-all"
                aria-label="Fotograma siguiente"
              >
                &#9654;
              </button>
            </div>

            {/* Modal Footer */}
            <div className="mt-4 pt-3 border-t border-raveBorder flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs text-neutral-400 gap-2">
              <p>{archivePhotos[modalPhotoIndex]?.alt}</p>
              <span className="text-raveRed uppercase tracking-wider text-[11px]">
                USA LAS FLECHAS &#8592; / &#8594; O TECLA ESC
              </span>
            </div>
          </div>
        </div>
      )}

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
