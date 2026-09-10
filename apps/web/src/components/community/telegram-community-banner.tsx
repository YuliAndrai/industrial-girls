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
  /** Target WhatsApp channel invitation URL (defaults to '#' until live) */
  whatsappGroupUrl?: string;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Brutalist Direct Channels Banner connecting readers to Telegram & WhatsApp feeds.
 *
 * @param {TelegramCommunityBannerProps} props - Component properties.
 * @returns {React.ReactElement} Rendered direct channels banner.
 */
export function TelegramCommunityBanner({
  telegramGroupUrl = "#",
  whatsappGroupUrl = "#",
  className = "",
}: TelegramCommunityBannerProps = {}): React.ReactElement {
  // Step 1: Track interaction state for inactive/placeholder links
  const [activeTooltip, setActiveTooltip] = useState<"telegram" | "whatsapp" | null>(null);
  const isTelegramPlaceholder = !telegramGroupUrl || telegramGroupUrl === "#";
  const isWhatsappPlaceholder = !whatsappGroupUrl || whatsappGroupUrl === "#";

  // Step 2: Handle click on inactive link with informative feedback
  const handleTelegramClick = (e: React.MouseEvent) => {
    if (isTelegramPlaceholder) {
      e.preventDefault();
      setActiveTooltip("telegram");
      setTimeout(() => setActiveTooltip(null), 3500);
    }
  };

  const handleWhatsappClick = (e: React.MouseEvent) => {
    if (isWhatsappPlaceholder) {
      e.preventDefault();
      setActiveTooltip("whatsapp");
      setTimeout(() => setActiveTooltip(null), 3500);
    }
  };

  // Step 3: Render brutalist container with subtle raveRed accents
  return (
    <div
      className={`relative mt-8 border border-raveBorder bg-neutral-950/90 p-5 font-mono text-white shadow-rave sm:p-6 ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Step 4: Textual description and status indicator */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 bg-raveRed animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-raveRed">
              {"// RADAR DIRECTO // Alertas de convocatorias, drops de música y eventos en tiempo real."}
            </span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed sm:text-[13px]">
            Alertas de convocatorias, drops de música y eventos en tiempo real.
          </p>
        </div>

        {/* Step 5: Action CTA Buttons (Telegram & WhatsApp) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0 relative">
          {/* Telegram Channel Button */}
          <div className="relative">
            {isTelegramPlaceholder ? (
              <button
                type="button"
                onClick={handleTelegramClick}
                className="w-full sm:w-auto inline-flex items-center justify-center border border-raveBorder bg-panel/70 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 transition-all hover:border-raveRed hover:text-white active:translate-y-0.5"
                aria-label="Unirse al canal de Telegram (Próximamente)"
              >
                [ UNIRSE AL CANAL DE TELEGRAM (PRÓXIMAMENTE) ]
              </button>
            ) : (
              <a
                href={telegramGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-raveRed bg-raveRed/20 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-raveRed hover:text-black hover:shadow-rave active:translate-y-0.5"
              >
                [ UNIRSE AL CANAL DE TELEGRAM ]
              </a>
            )}

            {activeTooltip === "telegram" && (
              <div className="absolute top-full left-0 mt-2 z-20 whitespace-nowrap border border-raveRed bg-black px-3 py-1.5 text-[10px] font-bold text-raveRed shadow-rave animate-in fade-in duration-200">
                &gt; Canal de Telegram en configuración. Enlace disponible próximamente.
              </div>
            )}
          </div>

          {/* WhatsApp Channel Button */}
          <div className="relative">
            {isWhatsappPlaceholder ? (
              <button
                type="button"
                onClick={handleWhatsappClick}
                className="w-full sm:w-auto inline-flex items-center justify-center border border-raveBorder bg-panel/70 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 transition-all hover:border-raveRed hover:text-white active:translate-y-0.5"
                aria-label="Canal de novedades WhatsApp (Próximamente)"
              >
                [ CANAL DE NOVEDADES WHATSAPP (PRÓXIMAMENTE) ]
              </button>
            ) : (
              <a
                href={whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-raveRed bg-raveRed/20 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-raveRed hover:text-black hover:shadow-rave active:translate-y-0.5"
              >
                [ CANAL DE NOVEDADES WHATSAPP ]
              </a>
            )}

            {activeTooltip === "whatsapp" && (
              <div className="absolute top-full right-0 mt-2 z-20 whitespace-nowrap border border-raveRed bg-black px-3 py-1.5 text-[10px] font-bold text-raveRed shadow-rave animate-in fade-in duration-200">
                &gt; Canal de WhatsApp en configuración. Enlace disponible próximamente.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelegramCommunityBanner;
