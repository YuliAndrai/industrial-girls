/**
 * @file apps/web/src/lib/hooks/use-spotify-player.tsx
 * @description Layer 2: Application / Consumption - Spotify Player Context and Reactive Hook.
 * Manages global playback state, track selection, and minimize/expand controls across Next.js routes.
 */

"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import {
  SpotifyTrackItem,
  getDefaultSpotifyTrack,
  getSpotifyTrackById,
  getSpotifyTrackByReleaseCode,
  SPOTIFY_FEATURED_TRACKS,
} from "../infrastructure/spotify-catalog";
import {
  parseSpotifyTrackId,
  validateSpotifyId,
  buildSpotifyEmbedUrl,
} from "../pipelines/spotify-track-pipeline";

export type { SpotifyTrackItem };

/**
 * Spotify player context state contract.
 */
export interface SpotifyPlayerContextValue {
  /** Currently active Spotify track item */
  currentTrack: SpotifyTrackItem | null;
  /** Encapsulated sanitized Spotify embed URL for iframe presentation */
  embedUrl: string;
  /** Whether the mini-player widget is visibly open */
  isOpen: boolean;
  /** Whether the player is in minimized compact pill mode */
  isMinimized: boolean;
  /** Starts playback of specified track or track ID */
  playTrack: (trackOrId: SpotifyTrackItem | string) => void;
  /** Toggles open / closed status of player */
  togglePlayer: () => void;
  /** Minimizes player to compact status pill */
  minimizePlayer: () => void;
  /** Expands player to full card with iframe */
  expandPlayer: () => void;
  /** Completely closes and hides player */
  closePlayer: () => void;
}

const SpotifyPlayerContext = createContext<SpotifyPlayerContextValue | undefined>(undefined);

/**
 * Provider component wrapping application tree with Spotify Player reactive state.
 *
 * @param {object} props - Component props.
 * @param {ReactNode} props.children - Child elements to wrap.
 * @returns {React.JSX.Element} The rendered context provider.
 */
export function SpotifyPlayerProvider({ children }: { children: ReactNode }): React.JSX.Element {
  // Step 1: Initialize currentTrack with the canonical default track from catalog
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrackItem | null>(() => {
    try {
      return getDefaultSpotifyTrack();
    } catch {
      return null;
    }
  });

  // Step 2: Initialize open and minimize state flags
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Step 3: Compute sanitized embed URL for currently active track or album
  const activeTrackId = currentTrack?.spotifyTrackId;
  const resourceType = currentTrack?.type ?? "track";
  const embedUrl = useMemo(() => {
    if (!activeTrackId) {
      return "";
    }
    try {
      return buildSpotifyEmbedUrl(activeTrackId, { theme: "0", type: resourceType });
    } catch {
      return "";
    }
  }, [activeTrackId, resourceType]);

  // Step 4: Action to play a track item or raw Spotify track ID/URI
  const playTrack = useCallback((trackOrId: SpotifyTrackItem | string) => {
    if (typeof trackOrId === "string") {
      const trimmed = trackOrId.trim();

      // 4a. Search first in static curated catalog by catalog ID
      const byId = getSpotifyTrackById(trimmed);
      if (byId) {
        setCurrentTrack(byId);
      } else {
        // 4b. Check if string matches any release catalog code (e.g. 'VA 001', 'VA 005', 'IGVA005')
        const byRelease = getSpotifyTrackByReleaseCode(trimmed);
        if (byRelease) {
          setCurrentTrack(byRelease);
        } else {
          // 4c. Attempt to parse Spotify Resource from URI, URL, or plain ID
          const parsed = parseSpotifyTrackId(trimmed) ?? (validateSpotifyId(trimmed) ? trimmed : null);

          if (parsed && validateSpotifyId(parsed)) {
            const bySpotifyId = SPOTIFY_FEATURED_TRACKS.find(
              (t) => t.spotifyTrackId === parsed
            );

            if (bySpotifyId) {
              setCurrentTrack(bySpotifyId);
            } else {
              setCurrentTrack({
                id: `custom-${parsed}`,
                title: "Industrial Girls Underground",
                artist: "Various Artists",
                spotifyTrackId: parsed,
                releaseCatalogCode: "COMPILATION",
                duration: "05:00",
              });
            }
          } else {
            // 4d. Fallback gracefully to default track if unresolvable
            try {
              setCurrentTrack(getDefaultSpotifyTrack());
            } catch {
              // No-op if empty
            }
          }
        }
      }
    } else {
      // 4e. If object provided without a valid track ID (undefined), resolve by release code or default
      if (trackOrId.spotifyTrackId === undefined) {
        try {
          const fallback = getSpotifyTrackByReleaseCode(trackOrId.releaseCatalogCode) ?? getDefaultSpotifyTrack();
          setCurrentTrack({
            ...trackOrId,
            spotifyTrackId: fallback.spotifyTrackId,
          });
        } catch {
          setCurrentTrack(trackOrId);
        }
      } else {
        setCurrentTrack(trackOrId);
      }
    }

    // Automatically reveal and expand the player on track selection
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  // Step 5: Action to toggle open/closed state
  const togglePlayer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Step 6: Action to minimize player to status pill
  const minimizePlayer = useCallback(() => {
    setIsMinimized(true);
  }, []);

  // Step 7: Action to expand player to full card view
  const expandPlayer = useCallback(() => {
    setIsMinimized(false);
    setIsOpen(true);
  }, []);

  // Step 8: Action to close and hide player
  const closePlayer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value: SpotifyPlayerContextValue = {
    currentTrack,
    embedUrl,
    isOpen,
    isMinimized,
    playTrack,
    togglePlayer,
    minimizePlayer,
    expandPlayer,
    closePlayer,
  };

  return (
    <SpotifyPlayerContext.Provider value={value}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
}

/**
 * Hook to consume the Spotify Player application state.
 *
 * @returns {SpotifyPlayerContextValue} Current player state and dispatch actions.
 * @throws {Error} If consumed outside of SpotifyPlayerProvider.
 */
export function useSpotifyPlayer(): SpotifyPlayerContextValue {
  const context = useContext(SpotifyPlayerContext);
  if (!context) {
    throw new Error("useSpotifyPlayer must be used within a SpotifyPlayerProvider");
  }
  return context;
}
