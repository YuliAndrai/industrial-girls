// @vitest-environment jsdom
/**
 * @file apps/web/src/lib/hooks/use-spotify-player.test.tsx
 * @description Layer 2 Application Tests - Spotify Player Context and Hook.
 * Validates global playback state transitions, track selection, and player visibility controls.
 *
 * @spec IGW-014-HOOK
 */

import React from "react";
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  SpotifyPlayerProvider,
  useSpotifyPlayer,
} from "./use-spotify-player";
import {
  SPOTIFY_FEATURED_TRACKS,
  getDefaultSpotifyTrack,
} from "../infrastructure/spotify-catalog";

describe("Spotify Player Hook & State Management (@spec IGW-014-HOOK)", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SpotifyPlayerProvider>{children}</SpotifyPlayerProvider>
  );

  it("should throw an error when useSpotifyPlayer is used outside SpotifyPlayerProvider", () => {
    // Step 1: Arrange & Act & Assert
    expect(() => renderHook(() => useSpotifyPlayer())).toThrowError(
      /useSpotifyPlayer must be used within a SpotifyPlayerProvider/i
    );
  });

  it("should provide initial state with default track loaded and player closed", () => {
    // Step 1: Arrange & Act
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });

    // Step 2: Assert
    expect(result.current.currentTrack).toEqual(getDefaultSpotifyTrack());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.isMinimized).toBe(false);
  });

  it("should update currentTrack and open the player when playTrack is called with a track item", () => {
    // Step 1: Arrange
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });
    const targetTrack = SPOTIFY_FEATURED_TRACKS[1];

    // Step 2: Act
    act(() => {
      result.current.playTrack(targetTrack);
    });

    // Step 3: Assert
    expect(result.current.currentTrack).toEqual(targetTrack);
    expect(result.current.isOpen).toBe(true);
    expect(result.current.isMinimized).toBe(false);
  });

  it("should update currentTrack when playTrack is called with a raw Spotify track ID", () => {
    // Step 1: Arrange
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });
    const targetTrack = SPOTIFY_FEATURED_TRACKS[2];

    // Step 2: Act
    act(() => {
      result.current.playTrack(targetTrack.spotifyTrackId);
    });

    // Step 3: Assert
    expect(result.current.currentTrack?.spotifyTrackId).toBe(targetTrack.spotifyTrackId);
    expect(result.current.isOpen).toBe(true);
  });

  it("should correctly toggle player open and closed state", () => {
    // Step 1: Arrange
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });
    expect(result.current.isOpen).toBe(false);

    // Step 2: Act - toggle open
    act(() => {
      result.current.togglePlayer();
    });
    expect(result.current.isOpen).toBe(true);

    // Step 3: Act - toggle closed
    act(() => {
      result.current.togglePlayer();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should correctly minimize and expand the player", () => {
    // Step 1: Arrange
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });

    // Step 2: Act - open player then minimize
    act(() => {
      result.current.expandPlayer();
      result.current.minimizePlayer();
    });
    expect(result.current.isMinimized).toBe(true);

    // Step 3: Act - expand again
    act(() => {
      result.current.expandPlayer();
    });
    expect(result.current.isMinimized).toBe(false);
  });

  it("should close the player when closePlayer is called", () => {
    // Step 1: Arrange
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });

    act(() => {
      result.current.togglePlayer();
    });
    expect(result.current.isOpen).toBe(true);

    // Step 2: Act
    act(() => {
      result.current.closePlayer();
    });

    // Step 3: Assert
    expect(result.current.isOpen).toBe(false);
  });

  it("should provide a sanitized embedUrl that reacts to track changes", () => {
    // Step 1: Arrange
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });
    expect(result.current.embedUrl).toContain("open.spotify.com/embed/track/");

    // Step 2: Act
    const target = SPOTIFY_FEATURED_TRACKS[1];
    act(() => {
      result.current.playTrack(target);
    });

    // Step 3: Assert
    expect(result.current.embedUrl).toContain(target.spotifyTrackId);
  });

  it("should resolve a track by release code when string input matches a compilation", () => {
    // Step 1: Arrange
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });

    // Step 2: Act
    act(() => {
      result.current.playTrack("VA 005");
    });

    // Step 3: Assert
    expect(result.current.currentTrack?.releaseCatalogCode).toBe("VA 005");
    expect(result.current.embedUrl).toContain(result.current.currentTrack?.spotifyTrackId ?? "");
  });

  it("should fallback gracefully to default track when an unresolvable string is passed", () => {
    // Step 1: Arrange
    const { result } = renderHook(() => useSpotifyPlayer(), { wrapper });

    // Step 2: Act
    act(() => {
      result.current.playTrack("https://open.spotify.com/search/INVALID%20QUERY");
    });

    // Step 3: Assert
    expect(result.current.currentTrack).toEqual(getDefaultSpotifyTrack());
    expect(result.current.embedUrl).toBeDefined();
    expect(result.current.embedUrl.length).toBeGreaterThan(0);
  });
});
