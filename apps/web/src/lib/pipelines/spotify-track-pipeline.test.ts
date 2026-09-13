/**
 * @file apps/web/src/lib/pipelines/spotify-track-pipeline.test.ts
 * @description Layer 3 Domain Tests - Spotify Track Identification and Embed Generation Pipeline.
 * Validates extraction, validation, embed URL generation, and error handling for Spotify audio tracks.
 *
 * @spec IGW-014-PIPELINE
 */

import { describe, it, expect } from "vitest";
import {
  parseSpotifyTrackId,
  validateSpotifyId,
  buildSpotifyEmbedUrl,
  executeSpotifyTrackPipeline,
} from "./spotify-track-pipeline";

describe("Spotify Track Identification & Validation Pipeline (@spec IGW-014-PIPELINE)", () => {
  const VALID_TRACK_ID = "4cOdK2wGLETKBW3PvgPWqT"; // 22-char base62
  const ANOTHER_VALID_ID = "11dFghVXANMlKmJXsNCbNl";

  describe("1. validateSpotifyId", () => {
    it("should return true for a canonical 22-character base62 Spotify ID", () => {
      // Step 1: Arrange
      const candidate = VALID_TRACK_ID;

      // Step 2: Act
      const isValid = validateSpotifyId(candidate);

      // Step 3: Assert
      expect(isValid).toBe(true);
    });

    it("should return false for IDs with invalid lengths or characters", () => {
      // Step 1: Arrange
      const tooShort = "4cOdK2wGLETKBW3Pv";
      const tooLong = "4cOdK2wGLETKBW3PvgPWqT999";
      const withSpecialChars = "4cOdK2wGLETKBW3-vgPWq!";
      const emptyString = "";

      // Step 2: Act & Assert
      expect(validateSpotifyId(tooShort)).toBe(false);
      expect(validateSpotifyId(tooLong)).toBe(false);
      expect(validateSpotifyId(withSpecialChars)).toBe(false);
      expect(validateSpotifyId(emptyString)).toBe(false);
    });
  });

  describe("2. parseSpotifyTrackId", () => {
    it("should extract track ID from a standard Spotify track web URL", () => {
      // Step 1: Arrange
      const url = `https://open.spotify.com/track/${VALID_TRACK_ID}`;

      // Step 2: Act
      const extracted = parseSpotifyTrackId(url);

      // Step 3: Assert
      expect(extracted).toBe(VALID_TRACK_ID);
    });

    it("should extract track ID from a Spotify web URL containing query parameters and trailing slash", () => {
      // Step 1: Arrange
      const urlWithParams = `https://open.spotify.com/track/${VALID_TRACK_ID}?si=abcdef123456&context=spotify%3Aalbum%3Axyz/`;

      // Step 2: Act
      const extracted = parseSpotifyTrackId(urlWithParams);

      // Step 3: Assert
      expect(extracted).toBe(VALID_TRACK_ID);
    });

    it("should extract track ID from a canonical Spotify URI (spotify:track:...)", () => {
      // Step 1: Arrange
      const uri = `spotify:track:${ANOTHER_VALID_ID}`;

      // Step 2: Act
      const extracted = parseSpotifyTrackId(uri);

      // Step 3: Assert
      expect(extracted).toBe(ANOTHER_VALID_ID);
    });

    it("should return the ID directly when passed a raw valid 22-character string", () => {
      // Step 1: Arrange
      const rawId = VALID_TRACK_ID;

      // Step 2: Act
      const extracted = parseSpotifyTrackId(rawId);

      // Step 3: Assert
      expect(extracted).toBe(VALID_TRACK_ID);
    });

    it("should return null when given malicious input, empty strings or non-track URLs", () => {
      // Step 1: Arrange
      const nonTrackUrl = "https://open.spotify.com/artist/4cOdK2wGLETKBW3PvgPWqT";
      const scriptInjection = "<script>alert('xss')</script>";
      const malformed = "spotify:album:4cOdK2wGLETKBW3PvgPWqT";

      // Step 2: Act & Assert
      expect(parseSpotifyTrackId(nonTrackUrl)).toBeNull();
      expect(parseSpotifyTrackId(scriptInjection)).toBeNull();
      expect(parseSpotifyTrackId(malformed)).toBeNull();
      expect(parseSpotifyTrackId("")).toBeNull();
    });
  });

  describe("3. buildSpotifyEmbedUrl", () => {
    it("should construct a secure Spotify embed iframe URL with default dark theme (theme=0)", () => {
      // Step 1: Arrange
      const trackId = VALID_TRACK_ID;

      // Step 2: Act
      const embedUrl = buildSpotifyEmbedUrl(trackId);

      // Step 3: Assert
      expect(embedUrl).toBe(
        `https://open.spotify.com/embed/track/${VALID_TRACK_ID}?utm_source=generator&theme=0`
      );
    });

    it("should respect explicit theme override when provided", () => {
      // Step 1: Arrange
      const trackId = VALID_TRACK_ID;

      // Step 2: Act
      const embedUrl = buildSpotifyEmbedUrl(trackId, { theme: "1" });

      // Step 3: Assert
      expect(embedUrl).toBe(
        `https://open.spotify.com/embed/track/${VALID_TRACK_ID}?utm_source=generator&theme=1`
      );
    });

    it("should throw an error when attempting to build embed URL with an invalid track ID", () => {
      // Step 1: Arrange
      const invalidId = "invalid-track-id";

      // Step 2: Act & Assert
      expect(() => buildSpotifyEmbedUrl(invalidId)).toThrowError(
        /Invalid Spotify Track ID/i
      );
    });
  });

  describe("4. executeSpotifyTrackPipeline", () => {
    it("should successfully execute pipeline and return success with trackId and embedUrl", () => {
      // Step 1: Arrange
      const input = `https://open.spotify.com/track/${VALID_TRACK_ID}?si=123`;

      // Step 2: Act
      const result = executeSpotifyTrackPipeline(input);

      // Step 3: Assert
      expect(result.success).toBe(true);
      expect(result.trackId).toBe(VALID_TRACK_ID);
      expect(result.embedUrl).toBe(
        `https://open.spotify.com/embed/track/${VALID_TRACK_ID}?utm_source=generator&theme=0`
      );
      expect(result.error).toBeUndefined();
    });

    it("should return failure result with explicit error message for unresolvable inputs", () => {
      // Step 1: Arrange
      const badInput = "random-garbage-text";

      // Step 2: Act
      const result = executeSpotifyTrackPipeline(badInput);

      // Step 3: Assert
      expect(result.success).toBe(false);
      expect(result.trackId).toBeUndefined();
      expect(result.embedUrl).toBeUndefined();
      expect(result.error).toMatch(/Unable to resolve a valid Spotify Track ID/i);
    });
  });
});
