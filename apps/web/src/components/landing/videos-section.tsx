/**
 * @file apps/web/src/components/landing/videos-section.tsx
 * @description Layer 1: Presentation - Warehouse Videos & Transmissions Section.
 * Clones the Exhale Videos block with dark rave aftermovies and live boiler-room sessions.
 */

import React from "react";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Videos and transmissions section for rave aftermovies and live recordings.
 *
 * @returns {React.ReactElement} The rendered transmissions block.
 */
export function VideosSection(): React.ReactElement {
  const transmissions = [
    {
      id: "vid-001",
      title: "INDUSTRIAL GIRLS @ TRESOR BERLIN (AFTERMOVIE)",
      duration: "04:15",
      recordedAt: "BERLIN // 2026",
      thumbnailNote: "VAULT PROTOCOL LIVE",
    },
    {
      id: "vid-002",
      title: "VANE B2B PAULA TEMPLE // WAREHOUSE SPECIAL",
      duration: "01:22:40",
      recordedAt: "LONDON // FOLD",
      thumbnailNote: "150 BPM CLOSING",
    },
    {
      id: "vid-003",
      title: "DISTORTA LIVE MODULAR HARDWARE SET",
      duration: "45:10",
      recordedAt: "AMSTERDAM // SHELTER",
      thumbnailNote: "RAW ANALOG DISTORTION",
    },
    {
      id: "vid-004",
      title: "BOGOTÁ SECRET WAREHOUSE // UNDERGROUND STREAM",
      duration: "58:30",
      recordedAt: "BOGOTÁ // ZONE 04",
      thumbnailNote: "LATIN HARD TECHNO",
    },
  ];

  return (
    <section id="videos" className="w-full border-b border-raveBorder bg-black py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-raveRed pb-6 mb-10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
              {"// TRANSMISSIONS & ARCHIVES"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              LIVE <br className="hidden sm:inline" />
              <span className="text-raveRed">VIDEOS</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-raveTextMuted">
            AUDIO-VISUAL RECOVERY ARCHIVE
          </span>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {transmissions.map((video) => (
            <div
              key={video.id}
              className="group flex flex-col border border-raveBorder bg-panel/50 p-4 transition-all duration-300 hover:border-raveRed hover:shadow-rave"
            >
              {/* Fake Video Player Frame */}
              <div className="relative aspect-video w-full overflow-hidden border border-raveBorder bg-neutral-950 flex flex-col items-center justify-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-raveRed bg-black text-raveRed shadow-raveGlow transition-transform group-hover:scale-110">
                  <span className="ml-1 text-sm">&#9658;</span>
                </div>
                <span className="mt-3 font-mono text-[9px] uppercase tracking-widest text-raveRed">
                  {video.thumbnailNote}
                </span>
                <span className="absolute bottom-2 right-2 border border-black/80 bg-black/90 px-1.5 py-0.5 font-mono text-[9px] text-white">
                  {video.duration}
                </span>
              </div>

              {/* Video Info */}
              <div className="mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-raveTextMuted block">
                    {video.recordedAt}
                  </span>
                  <h3 className="mt-1 text-sm font-bold uppercase text-white group-hover:text-raveRed transition-colors">
                    {video.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-raveBorder">
                  <TactileButton variant="outline" size="sm" className="w-full">
                    <span className="flex items-center justify-center gap-1 font-mono text-[11px]">
                      <span>[ WATCH TRANSMISSION ]</span>
                    </span>
                  </TactileButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
