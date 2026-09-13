/**
 * @file apps/web/src/lib/infrastructure/spotify-catalog.test.ts
 * @description Layer 4 Infrastructure Tests - Static Verified Spotify Catalog.
 * Validates integrity, schema invariants, and selector functions for Industrial Girls Spotify tracks.
 *
 * @spec IGW-014-CATALOG
 */

import { describe, it, expect } from "vitest";
import {
  SPOTIFY_FEATURED_TRACKS,
  getSpotifyFeaturedTracks,
  getDefaultSpotifyTrack,
  getSpotifyTrackById,
  getSpotifyTrackByReleaseCode,
} from "./spotify-catalog";

describe("Industrial Girls Spotify Catalog Infrastructure (@spec IGW-014-CATALOG)", () => {
  it("should provide a curated catalog with at least 3 featured underground tracks", () => {
    // Step 1: Arrange & Act
    const catalog = getSpotifyFeaturedTracks();

    // Step 2: Assert
    expect(catalog.length).toBeGreaterThanOrEqual(3);
  });

  it("should ensure every track conforms to the SpotifyTrackItem schema invariants", () => {
    // Step 1: Arrange
    const catalog = getSpotifyFeaturedTracks();

    // Step 2: Act & Assert
    catalog.forEach((track) => {
      expect(track.id).toBeDefined();
      expect(track.id.trim().length).toBeGreaterThan(0);

      expect(track.title).toBeDefined();
      expect(track.title.trim().length).toBeGreaterThan(0);

      expect(track.artist).toBeDefined();
      expect(track.artist.trim().length).toBeGreaterThan(0);

      expect(track.releaseCatalogCode).toBeDefined();
      expect(track.releaseCatalogCode).toMatch(/^VA \d{3}$/);

      expect(track.duration).toBeDefined();
      expect(track.duration).toMatch(/^\d{2}:\d{2}$/);

      // Verify that the spotifyTrackId is a genuine 22-character string
      expect(track.spotifyTrackId).toBeDefined();
      expect(track.spotifyTrackId).toMatch(/^[a-zA-Z0-9]{22}$/);
    });
  });

  it("should return an immutable/readonly array copy from getSpotifyFeaturedTracks", () => {
    // Step 1: Arrange & Act
    const catalog1 = getSpotifyFeaturedTracks();
    const catalog2 = getSpotifyFeaturedTracks();

    // Step 2: Assert - structural equality and independent reference
    expect(catalog1).toEqual(catalog2);
    expect(catalog1).not.toBe(catalog2);
  });

  it("should return the first curated track as the default track via getDefaultSpotifyTrack", () => {
    // Step 1: Arrange
    const catalog = getSpotifyFeaturedTracks();

    // Step 2: Act
    const defaultTrack = getDefaultSpotifyTrack();

    // Step 3: Assert
    expect(defaultTrack).toEqual(catalog[0]);
    expect(defaultTrack.id).toBe(catalog[0].id);
  });

  it("should find and return the exact track by its unique catalog ID", () => {
    // Step 1: Arrange
    const catalog = getSpotifyFeaturedTracks();
    expect(catalog.length).toBeGreaterThan(0);
    const target = catalog[0];

    // Step 2: Act
    const found = getSpotifyTrackById(target.id);

    // Step 3: Assert
    expect(found).toBeDefined();
    expect(found?.id).toBe(target.id);
    expect(found?.title).toBe(target.title);
  });

  it("should return undefined when querying a non-existent track ID", () => {
    // Step 1: Arrange
    const nonExistentId = "non-existent-track-9999";

    // Step 2: Act
    const result = getSpotifyTrackById(nonExistentId);

    // Step 3: Assert
    expect(result).toBeUndefined();
  });

  it("should resolve a track by its release catalog code (e.g. 'VA 001', 'VA 005', 'IGVA005')", () => {
    // Step 1: Arrange
    const code = "IGVA005";

    // Step 2: Act
    const track = getSpotifyTrackByReleaseCode(code);

    // Step 3: Assert
    expect(track).toBeDefined();
    expect(track?.releaseCatalogCode).toBe("VA 005");
  });

  it("should return undefined when resolving an unknown or empty release catalog code", () => {
    // Step 1: Arrange & Act
    const invalid = getSpotifyTrackByReleaseCode("UNKNOWN-CODE-XYZ");
    const empty = getSpotifyTrackByReleaseCode("");

    // Step 2: Assert
    expect(invalid).toBeUndefined();
    expect(empty).toBeUndefined();
  });
});
