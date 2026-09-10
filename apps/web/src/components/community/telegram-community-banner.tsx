/**
 * @file apps/web/src/components/community/telegram-community-banner.tsx
 * @description Layer 1: Presentation - Direct Telegram Channel & Groups Callout Banner.
 * Displays brutalist direct access block to specialized Telegram community groups.
 */

"use client";

import React, { useState } from "react";

/**
 * Props for TelegramCommunityBanner component.
 */
export interface TelegramCommunityBannerProps {
  /** Target Telegram group/channel invitation URL (defaults to '#' until live) */
  telegramGroupUrl?: string;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Brutalist Telegram Community Banner connecting readers to city and production chat groups.
 *
 * @param {TelegramCommunityBannerProps} props - Component properties.
 * @returns {React.ReactElement} Rendered Telegram access banner.
 */
export function TelegramCommunityBanner({
  telegramGroupUrl = "#",
  className = "",
}: TelegramCommunityBannerProps = {}): React.ReactElement {
  // Step 1: Track interaction state for inactive/placeholder links
  const [showTooltip, setShowTooltip] = useState(false);
  const isPlaceholder = !telegramGroupUrl || telegramGroupUrl === "#";

  // Step 2: Handle click on inactive link with informative feedback
  const handleClick = (e: React.MouseEvent) => {
    if (isPlaceholder) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3500);
    }
  };

  // Step 3: Render brutalist container with subtle raveRed accents
  return (
    <div
      className={`relative mt-8 border border-raveBorder bg-neutral-950/80 p-5 font-mono text-white shadow-rave sm:p-6 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Step 4: Textual description and status indicator */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 bg-raveRed animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-raveRed">
              {"// CANAL & GRUPOS TELEGRAM //"}
            </span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed sm:text-[13px]">
            Próximamente habilitaremos el acceso directo a los grupos especializados por ciudades, producción y circuito.
          </p>
        </div>

        {/* Step 5: Action CTA Button or Link */}
        <div className="relative shrink-0 w-full sm:w-auto">
          {isPlaceholder ? (
            <button
              type="button"
              onClick={handleClick}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-raveBorder bg-panel/70 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 transition-all hover:border-raveRed hover:text-white active:translate-y-0.5"
              aria-label="Unirse a Telegram (Enlace próximamente)"
            >
              [ UNIRSE A TELEGRAM (ENLACE PRÓXIMAMENTE) ]
            </button>
          ) : (
            <a
              href={telegramGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-raveRed bg-raveRed/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-raveRed hover:text-black hover:shadow-rave active:translate-y-0.5"
            >
              [ UNIRSE A TELEGRAM ]
            </a>
          )}

          {/* Step 6: Informative transient tooltip when placeholder clicked */}
          {showTooltip && (
            <div className="absolute top-full right-0 mt-2 z-20 whitespace-nowrap border border-raveRed bg-black px-3 py-1.5 text-[10px] font-bold text-raveRed shadow-rave animate-in fade-in duration-200">
              &gt; Canales y grupos en configuración. Enlace disponible próximamente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TelegramCommunityBanner;
