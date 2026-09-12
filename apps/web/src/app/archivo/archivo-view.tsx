/**
 * @file apps/web/src/app/archivo/archivo-view.tsx
 * @description Layer 1: Presentation - Interactive Archive, Artists Roster Directory & Audiovisual Registry View (/archivo).
 *
 * ARCHITECTURAL LAYER SPECIFICATION:
 * - Layer: Layer 1 (Presentation)
 * - Responsibility: Client Component rendering the interactive artists roster directory with tactical brutalist styling,
 *   monospace typography, balanced two-column responsive density, reactive search filtering, clean interactive profile links,
 *   and the Media Archive audiovisual gallery with content filtering and modal lightbox / player.
 * - Invariant: Exactly one semantic H1 element per route. Zero raw fetch or database access;
 *   consumes immutable datasets from Layer 4 Infrastructure (archive-data).
 * - Invariant: Two-column layout on large viewports (grid-cols-1 lg:grid-cols-2) with 15 artists per column.
 * - Invariant: Zero musical genre or subgenre badges or columns displayed.
 */

"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  getMediaArchiveItems,
  MediaArchiveItem,
} from "@/lib/infrastructure/archive-data";

/**
 * Interactive Client Component for the Archive Section, Artists Roster, and Media Registry.
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

  // Step 5: Load curated media archive entries from Layer 4 Infrastructure
  const mediaItems = useMemo(() => getMediaArchiveItems(), []);

  // Step 5.1: Reactive filter state for media items ('all' | 'photo' | 'video')
  const [selectedMediaType, setSelectedMediaType] = useState<"all" | "photo" | "video">("all");

  // Step 5.2: State for active media modal lightbox / video player
  const [selectedMediaModal, setSelectedMediaModal] = useState<MediaArchiveItem | null>(null);

  // Step 5.3: Filter media items according to selected media type
  const filteredMediaItems = useMemo(() => {
    if (selectedMediaType === "all") return mediaItems;
    return mediaItems.filter((item) => item.type === selectedMediaType);
  }, [mediaItems, selectedMediaType]);

  // Step 5.4: Count totals for photo and video items for filter buttons
  const photoCount = useMemo(() => mediaItems.filter((i) => i.type === "photo").length, [mediaItems]);
  const videoCount = useMemo(() => mediaItems.filter((i) => i.type === "video").length, [mediaItems]);

  // Step 5.5: Keyboard ESC listener to close media modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMediaModal(null);
      }
    };
    if (selectedMediaModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMediaModal]);

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

        {/* Step 8: Media Archive & Registro Audiovisual Section */}
        <section className="w-full border-b border-raveBorder bg-black py-16 px-4 sm:px-6 relative">
          <div className="mx-auto max-w-7xl">
            {/* Section Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-raveBorder pb-4 mb-10 gap-4">
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
                  [ TODOS ({mediaItems.length}) ]
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
                  [ FOTOGRAFÍA ({photoCount}) ]
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
                  [ VIDEO ({videoCount}) ]
                </button>
              </div>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMediaItems.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col border border-raveBorder bg-panel/30 transition-all duration-200 hover:border-raveRed hover:bg-black/90 overflow-hidden"
                >
                  {/* Thumbnail / Media Preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black border-b border-raveBorder">
                    <Image
                      src={item.type === "video" && item.thumbnailUrl ? item.thumbnailUrl : item.mediaUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider z-10">
                      <span
                        className={`px-2 py-0.5 font-bold ${
                          item.type === "video" ? "bg-raveRed text-black" : "bg-white/90 text-black"
                        }`}
                      >
                        {item.type === "video" ? "VIDEO" : "FOTO"}
                      </span>
                      <span className="bg-black/80 text-white/80 px-2 py-0.5 border border-white/20">
                        {item.date}
                      </span>
                    </div>

                    {/* Duration Badge for Videos */}
                    {item.duration && (
                      <div className="absolute bottom-2 right-2 font-mono text-[10px] bg-black/90 text-raveRed px-2 py-0.5 border border-raveRed/40 z-10">
                        {item.duration}
                      </div>
                    )}

                    {/* Play / Inspect Overlay Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedMediaModal(item)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                      aria-label={
                        item.type === "video"
                          ? "Reproducir video de " + item.title
                          : "Ver fotografía en alta resolución de " + item.title
                      }
                    >
                      <span className="border border-raveRed bg-black/90 px-3 py-1 font-mono text-xs text-raveRed font-bold uppercase tracking-widest group-hover:scale-105 transition-transform">
                        {item.type === "video" ? "[ REPRODUCIR VIDEO ▶ ]" : "[ EXPANDIR FOTO ⤢ ]"}
                      </span>
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-raveRed font-bold mb-1">
                        <span>{"[ " + item.location.toUpperCase() + " ]"}</span>
                      </div>
                      <h3 className="text-base font-bold uppercase tracking-tight text-white group-hover:text-raveRed transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
                      <button
                        type="button"
                        onClick={() => setSelectedMediaModal(item)}
                        className="text-white hover:text-raveRed transition-colors uppercase tracking-wider"
                      >
                        {item.type === "video" ? "> VER TRANSMISIÓN" : "> VER CAPTURA HD"}
                      </button>
                      <span className="text-white/40">
                        {item.type === "video" ? "MULTICÁMARA" : "35MM / RAW"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Step 9: Interactive Media Lightbox & Video Player Modal */}
      {selectedMediaModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedMediaModal.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setSelectedMediaModal(null)}
        >
          <div
            className="relative w-full max-w-4xl border border-raveBorder bg-panel p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-raveBorder pb-3 mb-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-raveRed">
                <span className="font-bold">
                  {"[ " + selectedMediaModal.location.toUpperCase() + " ]"}
                </span>
                <span className="text-white/40">&bull;</span>
                <span className="text-white/70">{selectedMediaModal.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMediaModal(null)}
                className="px-2 py-0.5 border border-raveBorder text-neutral-400 hover:text-black hover:bg-raveRed hover:border-raveRed transition-all uppercase"
                aria-label="Cerrar modal"
              >
                [ CERRAR ✕ ]
              </button>
            </div>

            {/* Modal Media Body */}
            {selectedMediaModal.type === "video" ? (
              <div className="relative aspect-video w-full bg-black border border-raveBorder overflow-hidden">
                <iframe
                  src={
                    selectedMediaModal.mediaUrl.includes("watch?v=")
                      ? "https://www.youtube-nocookie.com/embed/" +
                        selectedMediaModal.mediaUrl.split("watch?v=")[1] +
                        "?autoplay=1"
                      : selectedMediaModal.mediaUrl
                  }
                  title={selectedMediaModal.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full flex items-center justify-center bg-black border border-raveBorder overflow-hidden">
                <Image
                  src={selectedMediaModal.mediaUrl}
                  alt={selectedMediaModal.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}

            {/* Modal Footer Caption */}
            <div className="mt-4 pt-3 border-t border-raveBorder">
              <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                {selectedMediaModal.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-neutral-400">
                {selectedMediaModal.caption}
              </p>
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
