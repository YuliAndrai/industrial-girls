/**
 * @file apps/web/src/components/landing/residents-section.tsx
 * @description Layer 1: Presentation - Resident Artists Section.
 * Clones the Exhale Residents roster block with monochrome styling, bios, sound roles, and artist links.
 */

import React from "react";
import { getResidents } from "@/lib/infrastructure/label-catalog";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Residents section showcasing the core collective DJs and sound designers.
 *
 * @returns {React.ReactElement} The rendered residents block.
 */
export function ResidentsSection(): React.ReactElement {
  const residents = getResidents();

  return (
    <section id="residents" className="w-full border-b border-raveBorder bg-black py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-raveRed pb-6 mb-10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
              {"// SOUND ARCHITECTS & CURATORS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              LABEL <br className="hidden sm:inline" />
              <span className="text-raveRed">RESIDENTS</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-raveTextMuted">
            RESIDENT DJ ROSTER &bull; 2026 CIRCUIT
          </span>
        </div>

        {/* Residents Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {residents.map((resident, idx) => (
            <div
              key={resident.id}
              className="group flex flex-col border border-raveBorder bg-panel/40 p-6 transition-all duration-300 hover:border-raveRed hover:shadow-rave"
            >
              {/* Moniker Header & Index */}
              <div className="flex items-center justify-between border-b border-raveBorder pb-3">
                <span className="font-mono text-xs text-raveRed font-bold">
                  [RES-00{idx + 1}]
                </span>
                <span className="font-mono text-[10px] uppercase text-neutral-400">
                  {resident.role}
                </span>
              </div>

              {/* Artist Moniker */}
              <div className="my-6">
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white group-hover:text-raveRed transition-colors">
                  {resident.moniker}
                </h3>
                <span className="font-mono text-xs text-raveTextMuted block mt-1">
                  {"// "}{resident.name}
                </span>
              </div>

              {/* Bio & Aesthetic snippet */}
              <p className="font-mono text-xs leading-relaxed text-neutral-300 flex-1 border-t border-raveBorder/60 pt-4">
                {resident.bio}
              </p>

              {/* Social Channels / Soundcloud Actions */}
              <div className="mt-8 flex items-center gap-3 pt-4 border-t border-raveBorder">
                {resident.soundcloudUrl && (
                  <a
                    href={resident.soundcloudUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 focus:outline-none"
                  >
                    <TactileButton variant="outline" size="sm" className="w-full">
                      <span className="flex items-center justify-center gap-2">
                        <span>[ SOUNDCLOUD ]</span>
                        <span className="text-xs">&rarr;</span>
                      </span>
                    </TactileButton>
                  </a>
                )}
                {resident.instagramUrl && (
                  <a
                    href={resident.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 focus:outline-none"
                  >
                    <TactileButton variant="primary" size="sm" className="w-full">
                      <span className="flex items-center justify-center gap-2">
                        <span>[ INSTAGRAM ]</span>
                      </span>
                    </TactileButton>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
