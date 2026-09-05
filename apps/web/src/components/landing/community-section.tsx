/**
 * @file apps/web/src/components/landing/community-section.tsx
 * @description Layer 1: Presentation - Underground Community Gallery Section.
 * Clones the Exhale Community masonry grid displaying rave crowd moments, sweat, strobe silhouettes, and culture.
 */

import React from "react";
import Image from "next/image";

/**
 * Community gallery section displaying crowd snapshots and rave atmosphere.
 *
 * @returns {React.ReactElement} The rendered community block.
 */
export function CommunitySection(): React.ReactElement {
  const photos = [
    { id: "c1", city: "BERLIN // TRESOR", caption: "SWEAT & SUB-BASS REBELLION", ratio: "aspect-square" },
    { id: "c2", city: "LONDON // FOLD", caption: "SUNRISE INDUSTRIAL PROTOCOL", ratio: "aspect-[4/5]" },
    { id: "c3", city: "BOGOTÁ // WAREHOUSE", caption: "DANCERS UNDER STROBE VOLTAGE", ratio: "aspect-square" },
    { id: "c4", city: "AMSTERDAM // SHELTER", caption: "BASEMENT ECHOES", ratio: "aspect-[4/3]" },
    { id: "c5", city: "BERLIN // RAVE DRILL", caption: "MASKED COLLECTIVE ENERGY", ratio: "aspect-[4/5]" },
    { id: "c6", city: "WORLDWIDE FREQUENCIES", caption: "ADVOCATES OF THE RAW SOUND", ratio: "aspect-square" },
  ];

  return (
    <section id="community" className="w-full border-b border-raveBorder bg-panel/60 py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-raveRed pb-6 mb-10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
              {"// REBELLION & COLLECTIVE MEMORY"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              COMMUNITY <br className="hidden sm:inline" />
              <span className="text-raveRed">ARCHIVE</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-raveTextMuted">
            TAG #INDUSTRIALGIRLS TO SUBMIT DOCUMENTATION
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden border border-raveBorder bg-black transition-all hover:border-raveRed hover:shadow-rave"
            >
              <div className={`relative ${photo.ratio} w-full bg-neutral-900 overflow-hidden`}>
                {/* Visual Placeholder Texture representing analog dark rave photography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950 to-neutral-900 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between font-mono text-[9px] text-raveRed">
                    <span>[RECORDED]</span>
                    <span>{photo.city}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-raveRed/30 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <Image
                        src="/assets/images/industrial-girls-badge-mask.jpg"
                        alt="Archive"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="border-t border-raveBorder/60 pt-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-white group-hover:text-raveRed transition-colors">
                      {photo.caption}
                    </span>
                  </div>
                </div>

                {/* Corner Crosshairs */}
                <div className="pointer-events-none absolute top-1 left-1 font-mono text-[8px] text-raveRed/60">+</div>
                <div className="pointer-events-none absolute top-1 right-1 font-mono text-[8px] text-raveRed/60">+</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
