/**
 * @file apps/web/src/components/landing/records-section.tsx
 * @description Layer 1: Presentation - Records Catalog Section.
 * Clones the Exhale Records grid block with vinyl art, catalog numbers, format tags, and Bandcamp links.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getReleases, ReleaseFormat } from "@/lib/infrastructure/label-catalog";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Records section showcasing vinyl and digital releases.
 *
 * @returns {React.ReactElement} The rendered records block.
 */
export function RecordsSection(): React.ReactElement {
  const allReleases = getReleases();
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL");

  // Step 1: Filter releases based on user selection
  const filteredReleases = allReleases.filter((r) => {
    if (selectedFormat === "ALL") return true;
    if (selectedFormat === "VINYL") return r.format.includes("Vinyl");
    if (selectedFormat === "DIGITAL") return r.format.includes("Digital");
    return true;
  });

  return (
    <section id="records" className="w-full border-b border-raveBorder bg-panel/80 py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-raveRed pb-6 mb-10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
              {"// DISCOGRAPHY & WAX VAULT"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              INDUSTRIAL GIRLS <br className="hidden sm:inline" />
              <span className="text-raveRed">RECORDS</span>
            </h2>
          </div>

          {/* Format Filter Pills */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {(["ALL", "VINYL", "DIGITAL"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setSelectedFormat(fmt)}
                className={`border px-3 py-1 font-bold uppercase transition-all focus:outline-none ${
                  selectedFormat === fmt
                    ? "border-raveRed bg-raveRed text-black shadow-tactileRed"
                    : "border-raveBorder bg-black text-neutral-400 hover:border-neutral-500 hover:text-white"
                }`}
              >
                [{fmt}]
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Releases Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredReleases.map((release) => (
            <div
              key={release.id}
              className="group flex flex-col border border-raveBorder bg-black p-4 transition-all duration-300 hover:border-raveRed hover:shadow-rave"
            >
              {/* Vinyl Artwork / Cover Frame */}
              <div className="relative aspect-square w-full overflow-hidden border border-raveBorder/60 bg-neutral-900">
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 p-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full border border-raveRed/40 bg-black">
                      <Image
                        src="/assets/images/industrial-girls-badge-mask.jpg"
                        alt="Emblem"
                        fill
                        sizes="64px"
                        className="object-cover opacity-80"
                      />
                    </div>
                    <span className="font-mono text-xl font-black tracking-widest text-raveRed">
                      [{release.catalogNumber}]
                    </span>
                    <span className="mt-1 font-mono text-xs uppercase text-neutral-300">
                      {release.artist}
                    </span>
                    <span className="mt-1 text-sm font-bold text-white">
                      {release.title}
                    </span>
                    {release.bpm && (
                      <span className="mt-2 border border-raveRed/40 bg-raveRed/10 px-2 py-0.5 font-mono text-[10px] text-raveRed">
                        {release.bpm} BPM // {release.format}
                      </span>
                    )}
                  </div>
                </div>

                {/* Corner crosshairs */}
                <div className="pointer-events-none absolute top-1 left-1 font-mono text-[9px] text-raveRed/60">+</div>
                <div className="pointer-events-none absolute top-1 right-1 font-mono text-[9px] text-raveRed/60">+</div>
                <div className="pointer-events-none absolute bottom-1 left-1 font-mono text-[9px] text-raveRed/60">+</div>
                <div className="pointer-events-none absolute bottom-1 right-1 font-mono text-[9px] text-raveRed/60">+</div>
              </div>

              {/* Release Metadata */}
              <div className="mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-raveTextMuted">
                    <span>CAT: {release.catalogNumber}</span>
                    <span>{release.releaseDate}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-black uppercase text-white group-hover:text-raveRed transition-colors">
                    {release.title}
                  </h3>
                  <p className="font-mono text-xs text-neutral-300">
                    by {release.artist}
                  </p>

                  {/* Tracklist Preview */}
                  <div className="mt-3 border-t border-raveBorder/60 pt-2 font-mono text-[11px] text-raveTextMuted">
                    <ul className="space-y-0.5">
                      {release.tracklist.slice(0, 3).map((track, i) => (
                        <li key={i} className="truncate">
                          {track}
                        </li>
                      ))}
                      {release.tracklist.length > 3 && (
                        <li className="text-[10px] text-neutral-500 italic">
                          + {release.tracklist.length - 3} more tracks...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Purchase / Stream Button */}
                <div className="mt-6 pt-3 border-t border-raveBorder">
                  <a
                    href={release.bandcampUrl || "https://bandcamp.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none"
                  >
                    <TactileButton variant="outline" size="sm" className="w-full">
                      <span className="flex items-center justify-center gap-2">
                        <span>[ BANDCAMP / VINYL ]</span>
                        <span className="text-xs">&rarr;</span>
                      </span>
                    </TactileButton>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
