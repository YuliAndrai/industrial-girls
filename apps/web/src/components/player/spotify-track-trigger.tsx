/**
 * @file apps/web/src/components/player/spotify-track-trigger.tsx
 * @description Layer 1: Presentation - Tactile Spotify Track Playback Trigger.
 * Interactive button that sends a specified track or track ID to the global Spotify mini player.
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSpotifyPlayer, type SpotifyTrackItem } from "@/lib/hooks/use-spotify-player";

/**
 * Properties contract for SpotifyTrackTrigger button.
 */
export interface SpotifyTrackTriggerProps {
  /** Target track item or 22-character Spotify track ID */
  track: SpotifyTrackItem | string;
  /** Optional custom child elements (defaults to tactile play button text) */
  children?: React.ReactNode;
  /** Optional CSS class overrides */
  className?: string;
}

/**
 * Tactile trigger component to dispatch tracks to the persistent Spotify player.
 *
 * @param {SpotifyTrackTriggerProps} props - Component properties.
 * @returns {React.JSX.Element} The rendered trigger button.
 */
export function SpotifyTrackTrigger({
  track,
  children,
  className,
}: SpotifyTrackTriggerProps): React.JSX.Element {
  // Step 1: Access global playTrack dispatcher from Spotify player hook
  const { playTrack } = useSpotifyPlayer();

  // Step 2: Handle tactile click event to launch track playback
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    playTrack(track);
  };

  // Step 3: Render tactile button with brutalist monospace styling
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border",
        "font-mono text-xs font-bold uppercase tracking-wider",
        "bg-neutral-900/80 text-neutral-300 border-neutral-700 hover:border-raveRed hover:text-white",
        "transition-all duration-150 active:scale-95",
        className
      )}
      aria-label="Reproducir pista en Spotify Mini Player"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-raveRed" aria-hidden="true" />
      <span>{children ?? "[ SPOTIFY PLAY ]"}</span>
    </button>
  );
}
