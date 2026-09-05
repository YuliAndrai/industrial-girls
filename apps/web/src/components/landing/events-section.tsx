/**
 * @file apps/web/src/components/landing/events-section.tsx
 * @description Layer 1: Presentation - Next Events Section.
 * Clones the Exhale Music events block with high-contrast tactile brutality, dates, venues, lineups, and ticket triggers.
 */

import React from "react";
import { getUpcomingEvents } from "@/lib/infrastructure/label-catalog";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Events section displaying upcoming live showcases and club dates.
 *
 * @returns {React.ReactElement} The rendered events block.
 */
export function EventsSection(): React.ReactElement {
  // Step 1: Retrieve upcoming events from infrastructure catalog
  const events = getUpcomingEvents();

  return (
    <section id="events" className="w-full border-b border-raveBorder bg-black py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header with Exhale Layout (Title left, See all right) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-raveRed pb-6 mb-10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
              {"// TOUR DATES & WAREHOUSE CIRCS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              NEXT <br className="hidden sm:inline" />
              <span className="text-raveRed">EVENTS</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-raveTextMuted">
              {events.length} UPCOMING DATES CONFIRMED
            </span>
          </div>
        </div>

        {/* Step 2: Event Cards / Table */}
        <div className="grid grid-cols-1 divide-y divide-raveBorder border-t border-raveBorder">
          {events.map((event) => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).toUpperCase();

            return (
              <div
                key={event.id}
                className="group flex flex-col py-6 transition-colors hover:bg-panel/60 sm:flex-row sm:items-center sm:justify-between sm:px-4"
              >
                {/* Date & City Badge */}
                <div className="flex items-start gap-4 sm:items-center sm:w-1/3">
                  <div className="border border-raveRed/40 bg-black px-3 py-2 text-center min-w-[90px] group-hover:border-raveRed group-hover:shadow-raveGlow transition-all">
                    <span className="block font-mono text-[10px] text-raveTextMuted">DATE</span>
                    <span className="block font-mono text-xs font-bold text-white tracking-wider">
                      {formattedDate}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-black uppercase text-white group-hover:text-raveRed transition-colors">
                        {event.city}
                      </span>
                      <span className="font-mono text-xs text-raveTextMuted">
                        [{event.country}]
                      </span>
                    </div>
                    <span className="font-mono text-xs text-neutral-400">
                      @ {event.venue}
                    </span>
                  </div>
                </div>

                {/* Lineup Section */}
                <div className="my-4 sm:my-0 sm:w-1/3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-raveTextMuted block mb-1">
                    CONFIRMED LINEUP
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {event.lineup.map((artist) => (
                      <span
                        key={artist}
                        className="border border-raveBorder bg-black/60 px-2 py-0.5 font-mono text-[11px] text-neutral-300"
                      >
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tickets Action */}
                <div className="flex items-center justify-end sm:w-1/4">
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto focus:outline-none"
                  >
                    <TactileButton variant="primary" size="md" className="w-full sm:w-auto">
                      <span className="flex items-center justify-center gap-2">
                        <span>[ GET TICKETS ]</span>
                        <span className="text-xs">&rarr;</span>
                      </span>
                    </TactileButton>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
