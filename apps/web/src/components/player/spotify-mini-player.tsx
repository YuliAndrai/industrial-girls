/**
 * @file apps/web/src/components/player/spotify-mini-player.tsx
 * @description Layer 1: Presentation - Persistent Brutalist Spotify Mini Player.
 * Floating dock widget displaying embedded Spotify iframe with responsive collapse/expand controls.
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSpotifyPlayer } from "@/lib/hooks/use-spotify-player";

/**
 * SpotifyMiniPlayer component properties.
 */
export interface SpotifyMiniPlayerProps {
  /** Optional custom CSS className for outer positioning wrapper */
  className?: string;
}

/**
 * Floating Spotify Mini Player component with brutalist industrial design.
 *
 * @param {SpotifyMiniPlayerProps} props - Component configuration options.
 * @returns {React.JSX.Element | null} The rendered player component or null.
 */
export function SpotifyMiniPlayer({ className }: SpotifyMiniPlayerProps): React.JSX.Element | null {
  // Step 1: Subscribe to global Spotify player reactive state from Layer 2
  const {
    currentTrack,
    embedUrl,
    isOpen,
    isMinimized,
    togglePlayer,
    minimizePlayer,
    expandPlayer,
    closePlayer,
  } = useSpotifyPlayer();

  // Step 3: Render discreet launcher pill if player is closed
  if (!isOpen) {
    return (
      <div
        className={cn(
          "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 pointer-events-auto",
          className
        )}
      >
        <button
          type="button"
          onClick={togglePlayer}
          aria-label="Abrir reproductor de Spotify"
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-full border-2",
            "bg-black/95 text-neutral-300 border-neutral-700 hover:border-white hover:text-white",
            "font-mono text-xs font-bold uppercase tracking-widest transition-all duration-150",
            "shadow-[0_8px_32px_rgba(0,0,0,0.85)] backdrop-blur-md"
          )}
        >
          <span
            className="w-2 h-2 rounded-full bg-raveRed animate-pulse shadow-[0_0_8px_#dc2626]"
            aria-hidden="true"
          />
          <span>SPOTIFY // PLAYER</span>
        </button>
      </div>
    );
  }

  // Step 4: Render compact status pill if player is in minimized state
  if (isMinimized) {
    return (
      <div
        className={cn(
          "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 pointer-events-auto",
          className
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-full border-2",
            "bg-black/95 text-white border-neutral-700 shadow-[0_8px_32px_rgba(0,0,0,0.9)] backdrop-blur-md"
          )}
        >
          <span
            className="w-2 h-2 rounded-full bg-raveRed animate-pulse shadow-[0_0_8px_#dc2626]"
            aria-hidden="true"
          />
          <span className="font-mono text-xs font-bold truncate max-w-[140px] sm:max-w-[200px]">
            {currentTrack?.artist} - {currentTrack?.title}
          </span>
          <button
            type="button"
            onClick={expandPlayer}
            aria-label="Expandir reproductor"
            className="font-mono text-xs text-neutral-400 hover:text-white px-1.5 py-0.5 rounded transition-colors"
          >
            [ ↗ ]
          </button>
          <button
            type="button"
            onClick={closePlayer}
            aria-label="Cerrar reproductor"
            className="font-mono text-xs text-neutral-500 hover:text-raveRed px-1.5 py-0.5 rounded transition-colors"
          >
            [ ✕ ]
          </button>
        </div>
      </div>
    );
  }

  // Step 5: Render expanded brutalist player card with official embedded iframe
  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[360px] max-w-[calc(100vw-2rem)]",
        "bg-black/95 text-white border-2 border-neutral-800 rounded-2xl",
        "shadow-[0_16px_48px_rgba(0,0,0,0.95)] backdrop-blur-xl p-3 overflow-hidden pointer-events-auto",
        className
      )}
      role="region"
      aria-label="Reproductor oficial de Spotify"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-raveRed animate-pulse shadow-[0_0_8px_#dc2626]"
            aria-hidden="true"
          />
          <span className="font-mono text-xs font-black tracking-widest text-neutral-300">
            SPOTIFY VAULT // MINI PLAYER
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={minimizePlayer}
            aria-label="Minimizar reproductor"
            className="text-neutral-400 hover:text-white px-2 py-0.5 font-mono text-sm transition-colors"
            title="Minimizar"
          >
            —
          </button>
          <button
            type="button"
            onClick={closePlayer}
            aria-label="Cerrar reproductor"
            className="text-neutral-400 hover:text-raveRed px-2 py-0.5 font-mono text-sm transition-colors"
            title="Cerrar"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Embedded Spotify official iframe */}
      {embedUrl ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Reproductor de Spotify"
          className="rounded-xl border border-neutral-900 bg-neutral-950"
        />
      ) : (
        <div className="h-[152px] flex items-center justify-center font-mono text-xs text-neutral-500">
          <span>{"// NO TRACK SELECTED //"}</span>
        </div>
      )}

      {/* Footer info banner */}
      <div className="mt-2 pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span>PREVIEW: 30S DISPONIBLE</span>
        <span className="text-neutral-400 font-bold">{currentTrack?.releaseCatalogCode}</span>
      </div>
    </div>
  );
}
