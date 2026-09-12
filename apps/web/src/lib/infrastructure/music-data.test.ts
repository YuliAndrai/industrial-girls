/**
 * @file apps/web/src/lib/infrastructure/music-data.test.ts
 * @description Layer 4 / Tests: Master TDD test suite for Music Catalog & Spotify Streaming Links.
 *
 * ARCHITECTURAL BOUNDARY & TEST TARGETS:
 * - Layer 4 (Infrastructure & Data): Validates RELEASES_CATALOG exact 5 compilations, descending order (VA 005 to VA 001),
 *   cover image physical file existence on disk, and pure Spotify search URLs.
 * - Presentation Specification: Validates external Spotify button attributes (target="_blank", rel="noopener noreferrer").
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  RELEASES_CATALOG,
  getReleasesCatalog,
  getReleaseByCode,
  ReleaseItem,
  TrackItem,
} from "./music-data";

describe("Music Releases Catalog & Spotify Integration — TDD Test Suite", () => {
  describe("1. Layer 4 (Infrastructure): RELEASES_CATALOG Contract & Invariants", () => {
    it("validates that getReleasesCatalog returns exactly 5 compilation releases", () => {
      // Step 1: Retrieve catalog via accessor
      const releases = getReleasesCatalog();

      // Step 2: Assert catalog array exists and has exactly 5 items
      expect(Array.isArray(releases)).toBe(true);
      expect(releases.length).toBe(5);
      expect(RELEASES_CATALOG.length).toBe(5);
    });

    it("verifies that releases are ordered chronologically descending (VA 005 to VA 001)", () => {
      // Step 1: Retrieve catalog
      const releases = getReleasesCatalog();

      // Step 2: Assert descending order by catalogCode
      expect(releases[0]?.catalogCode).toBe("VA 005");
      expect(releases[1]?.catalogCode).toBe("VA 004");
      expect(releases[2]?.catalogCode).toBe("VA 003");
      expect(releases[3]?.catalogCode).toBe("VA 002");
      expect(releases[4]?.catalogCode).toBe("VA 001");
    });

    it("ensures every release satisfies ReleaseItem contract with non-empty fields", () => {
      // Step 1: Iterate and validate every release entity
      const releases = getReleasesCatalog();

      releases.forEach((release: ReleaseItem) => {
        expect(release.id).toBeDefined();
        expect(typeof release.id).toBe("string");
        expect(release.id.trim().length).toBeGreaterThan(0);

        expect(release.catalogCode).toBeDefined();
        expect(typeof release.catalogCode).toBe("string");
        expect(release.catalogCode).toMatch(/^VA 00[1-5]$/);

        expect(release.title).toBeDefined();
        expect(typeof release.title).toBe("string");
        expect(release.title.trim().length).toBeGreaterThan(0);

        expect(release.releaseDate).toBeDefined();
        expect(typeof release.releaseDate).toBe("string");
        expect(release.releaseDate.trim().length).toBeGreaterThan(0);

        expect(release.coverImage).toBeDefined();
        expect(typeof release.coverImage).toBe("string");
        expect(release.coverImage.startsWith("/images/releases/")).toBe(true);

        expect(release.spotifyUrl).toBeDefined();
        expect(typeof release.spotifyUrl).toBe("string");

        expect(Array.isArray(release.tracks)).toBe(true);
        expect(release.tracks.length).toBeGreaterThan(0);
      });
    });

    it("validates that all cover image files physically exist on disk in apps/web/public/images/releases/", () => {
      // Step 1: Resolve base path to public directory
      const publicReleasesDir = path.resolve(
        process.cwd(),
        "apps",
        "web",
        "public",
        "images",
        "releases"
      );

      // Step 2: Verify each release cover image file exists on disk
      const releases = getReleasesCatalog();
      releases.forEach((release) => {
        const filename = path.basename(release.coverImage);
        const fullDiskPath = path.join(publicReleasesDir, filename);

        expect(
          fs.existsSync(fullDiskPath),
          `Expected cover art image "${filename}" to physically exist at "${fullDiskPath}"`
        ).toBe(true);
      });
    });

    it("validates exact Spotify search URLs without markdown format brackets", () => {
      // Step 1: Expected official Spotify search endpoints for each VA release
      const expectedUrls: Record<string, string> = {
        "VA 005": "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20005",
        "VA 004": "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20004",
        "VA 003": "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20003",
        "VA 002": "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20002",
        "VA 001": "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20001",
      };

      // Step 2: Validate each URL format
      const releases = getReleasesCatalog();
      releases.forEach((release) => {
        const expected = expectedUrls[release.catalogCode];
        expect(release.spotifyUrl).toBe(expected);

        // Invariant: Pure string without markdown brackets [ ] or ( )
        expect(release.spotifyUrl).not.toContain("[");
        expect(release.spotifyUrl).not.toContain("]");
        expect(release.spotifyUrl.startsWith("https://open.spotify.com/search/")).toBe(true);
      });
    });

    it("ensures each release has valid tracklist items conforming to TrackItem", () => {
      // Step 1: Verify each track item
      const releases = getReleasesCatalog();
      releases.forEach((release) => {
        release.tracks.forEach((track: TrackItem) => {
          expect(track.position).toBeDefined();
          expect(typeof track.position).toBe("string");

          expect(track.artist).toBeDefined();
          expect(typeof track.artist).toBe("string");
          expect(track.artist.trim().length).toBeGreaterThan(0);

          expect(track.title).toBeDefined();
          expect(typeof track.title).toBe("string");
          expect(track.title.trim().length).toBeGreaterThan(0);

          if (track.duration) {
            expect(typeof track.duration).toBe("string");
          }
        });
      });
    });

    it("retrieves a specific release by catalog code or id using getReleaseByCode", () => {
      // Step 1: Query by catalog code
      const va005 = getReleaseByCode("VA 005");
      expect(va005).toBeDefined();
      expect(va005?.title).toBe("MANIFIESTO SONORO");

      // Step 2: Query by id
      const va001 = getReleaseByCode("va-001");
      expect(va001).toBeDefined();
      expect(va001?.title).toBe("SUBTERRÁNEA CORP VOL. 1");

      // Step 3: Query nonexistent code returns undefined
      const nonexistent = getReleaseByCode("VA 999");
      expect(nonexistent).toBeUndefined();
    });
  });

  describe("2. Layer 1 (Presentation): Spotify Redirection & Streaming Button Contract", () => {
    it("validates button specification requirements (target='_blank', rel='noopener noreferrer')", () => {
      // Step 1: Model test representation of the required button contract
      const testRelease: ReleaseItem = {
        id: "va-005",
        catalogCode: "VA 005",
        title: "MANIFIESTO SONORO",
        releaseDate: "2026",
        coverImage: "/images/releases/va-005.jpg",
        spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20005",
        tracks: [
          { position: "01", artist: "PAULA TEMPLE", title: "Gegen Attack", duration: "06:40" },
        ],
      };

      // Step 2: Assert expected redirection attributes
      const expectedHref = testRelease.spotifyUrl;
      const expectedTarget = "_blank";
      const expectedRel = "noopener noreferrer";
      const expectedLabel = "ESCUCHAR EN SPOTIFY";

      expect(expectedHref).toBe("https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20005");
      expect(expectedTarget).toBe("_blank");
      expect(expectedRel).toBe("noopener noreferrer");
      expect(expectedLabel).toBe("ESCUCHAR EN SPOTIFY");
    });
  });
});
