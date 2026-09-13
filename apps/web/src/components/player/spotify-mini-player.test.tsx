// @vitest-environment jsdom
/**
 * @file apps/web/src/components/player/spotify-mini-player.test.tsx
 * @description Layer 1 Presentation Tests - Spotify Mini Player and Trigger Components.
 * Validates DOM rendering, collapse/expand states, iframe embedding, and trigger clicks.
 *
 * @spec IGW-014-UI-PLAYER
 */

import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SpotifyMiniPlayer } from "./spotify-mini-player";
import { SpotifyTrackTrigger } from "./spotify-track-trigger";
import { SpotifyPlayerProvider, type SpotifyTrackItem } from "@/lib/hooks/use-spotify-player";

describe("Spotify Mini Player Component (@spec IGW-014-UI-PLAYER)", () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<SpotifyPlayerProvider>{ui}</SpotifyPlayerProvider>);
  };

  it("should render a discreet floating launcher pill when the player is closed", () => {
    // Step 1: Arrange & Act
    renderWithProvider(<SpotifyMiniPlayer />);

    // Step 2: Assert - closed pill button exists
    const launcherButton = screen.getByRole("button", { name: /abrir reproductor de spotify/i });
    expect(launcherButton).toBeDefined();
    expect(screen.getByText(/SPOTIFY \/\/ PLAYER/i)).toBeDefined();
  });

  it("should open the full mini player card when clicking the launcher pill", () => {
    // Step 1: Arrange
    renderWithProvider(<SpotifyMiniPlayer />);
    const launcherButton = screen.getByRole("button", { name: /abrir reproductor de spotify/i });

    // Step 2: Act
    fireEvent.click(launcherButton);

    // Step 3: Assert
    expect(screen.getByText(/SPOTIFY VAULT \/\/ MINI PLAYER/i)).toBeDefined();
    const iframe = screen.getByTitle(/reproductor de spotify/i) as HTMLIFrameElement;
    expect(iframe).toBeDefined();
    expect(iframe.src).toContain("https://open.spotify.com/embed/track/");
    expect(iframe.getAttribute("height")).toBe("152");
    expect(iframe.getAttribute("loading")).toBe("lazy");
    expect(iframe.getAttribute("allow")).toContain("autoplay; clipboard-write; encrypted-media");
    expect(iframe.getAttribute("allow")).toContain("fullscreen; picture-in-picture");
  });

  it("should minimize to compact pill when clicking the minimize button", () => {
    // Step 1: Arrange
    renderWithProvider(<SpotifyMiniPlayer />);
    const launcherButton = screen.getByRole("button", { name: /abrir reproductor de spotify/i });
    fireEvent.click(launcherButton);

    // Step 2: Act - click minimize button
    const minimizeButton = screen.getByRole("button", { name: /minimizar reproductor/i });
    fireEvent.click(minimizeButton);

    // Step 3: Assert - compact pill is rendered
    expect(screen.getByRole("button", { name: /expandir reproductor/i })).toBeDefined();
    expect(screen.queryByText(/SPOTIFY VAULT \/\/ MINI PLAYER/i)).toBeNull();
  });

  it("should close completely when clicking the close button", () => {
    // Step 1: Arrange
    renderWithProvider(<SpotifyMiniPlayer />);
    const launcherButton = screen.getByRole("button", { name: /abrir reproductor de spotify/i });
    fireEvent.click(launcherButton);

    // Step 2: Act - click close button
    const closeButton = screen.getByRole("button", { name: /cerrar reproductor/i });
    fireEvent.click(closeButton);

    // Step 3: Assert - back to closed launcher pill
    expect(screen.getByRole("button", { name: /abrir reproductor de spotify/i })).toBeDefined();
  });

  it("should dispatch track playback and open player when SpotifyTrackTrigger is clicked", () => {
    // Step 1: Arrange
    const targetTrack: SpotifyTrackItem = {
      id: "test-track-02",
      title: "Invasión Neón",
      artist: "VANE",
      spotifyTrackId: "11dFghVXANMlKmJXsNCbNl",
      releaseCatalogCode: "VA 001",
      duration: "06:12",
    };
    renderWithProvider(
      <>
        <SpotifyTrackTrigger track={targetTrack} data-testid="test-trigger">
          Escuchar Invasión Neón
        </SpotifyTrackTrigger>
        <SpotifyMiniPlayer />
      </>
    );

    // Step 2: Act
    const trigger = screen.getByText("Escuchar Invasión Neón");
    fireEvent.click(trigger);

    // Step 3: Assert - Player should be open and display target track
    expect(screen.getByText(/SPOTIFY VAULT \/\/ MINI PLAYER/i)).toBeDefined();
    const iframe = screen.getByTitle(/reproductor de spotify/i) as HTMLIFrameElement;
    expect(iframe.src).toContain(targetTrack.spotifyTrackId);
  });

  it("should display empty track placeholder when active track ID is empty", () => {
    // Step 1: Arrange
    const emptyTrack: SpotifyTrackItem = {
      id: "empty-track-00",
      title: "Silent Signal",
      artist: "Underground",
      spotifyTrackId: "",
      releaseCatalogCode: "VA 001",
      duration: "00:00",
    };
    renderWithProvider(
      <>
        <SpotifyTrackTrigger track={emptyTrack}>Trigger Silent Track</SpotifyTrackTrigger>
        <SpotifyMiniPlayer />
      </>
    );

    // Step 2: Act
    const trigger = screen.getByText("Trigger Silent Track");
    fireEvent.click(trigger);

    // Step 3: Assert - fallback text node is visible
    expect(screen.getByText("// NO TRACK SELECTED //")).toBeDefined();
  });
});
