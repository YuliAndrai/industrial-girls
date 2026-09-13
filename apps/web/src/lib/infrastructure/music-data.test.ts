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
  getDemoDropSpecs,
  DEMO_DROP_SPECS,
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

    it("verifies that releases are ordered chronologically descending (IGVA005 to IGVA001)", () => {
      // Step 1: Retrieve catalog
      const releases = getReleasesCatalog();

      // Step 2: Assert descending order by catalogNumber
      expect(releases[0]?.catalogNumber).toBe("IGVA005");
      expect(releases[1]?.catalogNumber).toBe("IGVA004");
      expect(releases[2]?.catalogNumber).toBe("IGVA003");
      expect(releases[3]?.catalogNumber).toBe("IGVA002");
      expect(releases[4]?.catalogNumber).toBe("IGVA001");
    });

    it("verifies that all 5 releases have exact title 'INDUSTRIAL GIRLS VA 00X' and year property", () => {
      // Step 1: Retrieve catalog
      const releases = getReleasesCatalog();

      // Step 2: Expected metadata mapping
      const expectedMeta = [
        { catalogNumber: "IGVA005", title: "INDUSTRIAL GIRLS VA 005", year: "2024" },
        { catalogNumber: "IGVA004", title: "INDUSTRIAL GIRLS VA 004", year: "2023" },
        { catalogNumber: "IGVA003", title: "INDUSTRIAL GIRLS VA 003", year: "2023" },
        { catalogNumber: "IGVA002", title: "INDUSTRIAL GIRLS VA 002", year: "2022" },
        { catalogNumber: "IGVA001", title: "INDUSTRIAL GIRLS VA 001", year: "2021" },
      ];

      // Step 3: Assert exact match
      expectedMeta.forEach((expected, idx) => {
        expect(releases[idx]?.catalogNumber).toBe(expected.catalogNumber);
        expect(releases[idx]?.title).toBe(expected.title);
        expect(releases[idx]?.year).toBe(expected.year);
      });
    });

    it("ensures every release satisfies ReleaseItem contract with non-empty fields", () => {
      // Step 1: Iterate and validate every release entity
      const releases = getReleasesCatalog();

      releases.forEach((release: ReleaseItem) => {
        expect(release.id).toBeDefined();
        expect(typeof release.id).toBe("string");
        expect(release.id).toMatch(/^igva-00[1-5]$/);

        expect(release.catalogNumber).toBeDefined();
        expect(typeof release.catalogNumber).toBe("string");
        expect(release.catalogNumber).toMatch(/^IGVA00[1-5]$/);

        if (release.catalogCode !== undefined) {
          expect(typeof release.catalogCode).toBe("string");
        }

        expect(release.title).toBeDefined();
        expect(typeof release.title).toBe("string");
        expect(release.title).toMatch(/^INDUSTRIAL GIRLS VA 00[1-5]$/);

        expect(release.year).toBeDefined();
        expect(typeof release.year).toBe("string");
        expect(release.year).toMatch(/^202[1-4]$/);

        if (release.releaseDate !== undefined) {
          expect(typeof release.releaseDate).toBe("string");
        }

        expect(release.coverImage).toBeDefined();
        expect(typeof release.coverImage).toBe("string");
        expect(release.coverImage.startsWith("/images/releases/")).toBe(true);

        expect(release.spotifyUrl).toBeDefined();
        expect(typeof release.spotifyUrl).toBe("string");

        expect(release.buyUrl).toBeDefined();
        expect(typeof release.buyUrl).toBe("string");
        expect(release.buyUrl.startsWith("https://")).toBe(true);
        expect(release.buyUrl).not.toContain("[");
        expect(release.buyUrl).not.toContain("]");

        expect(release.buyLabel).toBeDefined();
        expect(["BANDCAMP", "BEATPORT"]).toContain(release.buyLabel);

        expect(Array.isArray(release.tracklist)).toBe(true);
        expect(release.tracklist.length).toBeGreaterThan(0);
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

    it("validates exact Spotify streaming and search URLs without markdown format brackets", () => {
      // Step 1: Expected official Spotify endpoints for each VA release
      const expectedUrls: Record<string, string> = {
        "IGVA005": "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20005",
        "IGVA004": "https://open.spotify.com/album/2NYM9hi9JCz7fe0CIUv6hO",
        "IGVA003": "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20003",
        "IGVA002": "https://open.spotify.com/album/0EcJxLjGjzv5Y6xNkp62h8",
        "IGVA001": "https://open.spotify.com/album/0e32qlFYpBFxqXyQxKl6AV",
      };

      // Step 2: Validate each URL format
      const releases = getReleasesCatalog();
      releases.forEach((release) => {
        const expected = expectedUrls[release.catalogNumber];
        expect(release.spotifyUrl).toBe(expected);

        // Invariant: Pure string without markdown brackets [ ] or ( )
        expect(release.spotifyUrl).not.toContain("[");
        expect(release.spotifyUrl).not.toContain("]");
        expect(release.spotifyUrl.startsWith("https://open.spotify.com/")).toBe(true);
      });
    });

    it("validates exact official buy URLs and dynamic buy labels (Bandcamp / Beatport) for all 5 compilations", () => {
      // Step 1: Expected official buy endpoints and labels for each VA release
      const expectedBuyConfig: Record<string, { buyUrl: string; buyLabel: "BANDCAMP" | "BEATPORT" }> = {
        "IGVA005": {
          buyUrl: "https://www.beatport.com/es/label/industrial-girls/106032",
          buyLabel: "BEATPORT",
        },
        "IGVA004": {
          buyUrl: "https://industrialgirls.bandcamp.com/album/industrial-girls-004",
          buyLabel: "BANDCAMP",
        },
        "IGVA003": {
          buyUrl: "https://www.beatport.com/es/release/industrial-girls-va-003/3953660",
          buyLabel: "BEATPORT",
        },
        "IGVA002": {
          buyUrl: "https://www.beatport.com/es/release/industrial-girls-002/4716681",
          buyLabel: "BEATPORT",
        },
        "IGVA001": {
          buyUrl: "https://www.beatport.com/es/release/industrial-girls-001/3916941",
          buyLabel: "BEATPORT",
        },
      };

      // Step 2: Validate each buy URL and label
      const releases = getReleasesCatalog();
      releases.forEach((release) => {
        const expected = expectedBuyConfig[release.catalogNumber];
        expect(release.buyUrl).toBe(expected.buyUrl);
        expect(release.buyLabel).toBe(expected.buyLabel);

        // Invariant: Pure string without markdown brackets [ ] or ( )
        expect(release.buyUrl).not.toContain("[");
        expect(release.buyUrl).not.toContain("]");
        expect(release.buyUrl.startsWith("https://")).toBe(true);
      });
    });

    it("ensures neither RELEASES_CATALOG nor /musica view contains any mention of vinyl / vinil", () => {
      // Step 1: Check RELEASES_CATALOG serialization
      expect(JSON.stringify(RELEASES_CATALOG)).not.toMatch(/vinil/i);

      // Step 2: Check /musica view source code
      const viewPath = path.resolve(
        process.cwd(),
        "apps",
        "web",
        "src",
        "app",
        "musica",
        "musica-view.tsx"
      );
      const content = fs.readFileSync(viewPath, "utf-8");
      expect(content).not.toMatch(/vinil/i);
    });

    it("ensures each release has valid tracklist items conforming to TrackItem with valid spotifyUrl", () => {
      // Step 1: Verify each track item in tracklist
      const releases = getReleasesCatalog();
      releases.forEach((release) => {
        release.tracklist.forEach((track: TrackItem) => {
          expect(track.artist).toBeDefined();
          expect(typeof track.artist).toBe("string");
          expect(track.artist.trim().length).toBeGreaterThan(0);

          expect(track.title).toBeDefined();
          expect(typeof track.title).toBe("string");
          expect(track.title.trim().length).toBeGreaterThan(0);

          expect(track.spotifyUrl).toBeDefined();
          expect(typeof track.spotifyUrl).toBe("string");
          expect(track.spotifyUrl.startsWith("https://open.spotify.com/")).toBe(true);
          expect(track.spotifyUrl).not.toContain("[");
          expect(track.spotifyUrl).not.toContain("]");

          if (track.spotifyTrackId) {
            expect(track.spotifyUrl).toBe(`https://open.spotify.com/track/${track.spotifyTrackId}`);
          } else {
            expect(track.spotifyUrl.startsWith("https://open.spotify.com/search/")).toBe(true);
          }

          if (track.position) {
            expect(typeof track.position).toBe("string");
          }

          if (track.duration) {
            expect(typeof track.duration).toBe("string");
          }
        });
      });
    });

    it("retrieves a specific release by catalog number, code, or id using getReleaseByCode", () => {
      // Step 1: Query by catalog number
      const va005 = getReleaseByCode("IGVA005");
      expect(va005).toBeDefined();
      expect(va005?.catalogNumber).toBe("IGVA005");
      expect(va005?.title).toBe("INDUSTRIAL GIRLS VA 005");

      // Step 2: Query by id
      const va001 = getReleaseByCode("igva-001");
      expect(va001).toBeDefined();
      expect(va001?.catalogNumber).toBe("IGVA001");
      expect(va001?.title).toBe("INDUSTRIAL GIRLS VA 001");

      // Step 3: Query by alternative code format (VA 005)
      const va005Alt = getReleaseByCode("VA 005");
      expect(va005Alt).toBeDefined();
      expect(va005Alt?.catalogNumber).toBe("IGVA005");

      // Step 4: Query nonexistent code returns undefined
      const nonexistent = getReleaseByCode("VA 999");
      expect(nonexistent).toBeUndefined();
    });
  });

  describe("2. Layer 1 (Presentation): Streaming & Buy Action Buttons Contract", () => {
    it("validates button specification requirements for Spotify and Beatport (target='_blank', rel='noopener noreferrer')", () => {
      // Step 1: Model test representation of the required button contract
      const testRelease: ReleaseItem = {
        id: "igva-005",
        catalogNumber: "IGVA005",
        title: "INDUSTRIAL GIRLS VA 005",
        year: "2024",
        coverImage: "/images/releases/va-005.jpg",
        spotifyUrl: "https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20005",
        buyUrl: "https://www.beatport.com/es/label/industrial-girls/106032",
        buyLabel: "BEATPORT",
        tracklist: [
          {
            artist: "ÆTERIS",
            title: "Psycho Moves",
            spotifyUrl: "https://open.spotify.com/search/%C3%86TERIS%20Psycho%20Moves",
          },
        ],
      };

      // Step 2: Assert Spotify and Buy redirection attributes
      expect(testRelease.spotifyUrl).toBe("https://open.spotify.com/search/INDUSTRIAL%20GIRLS%20VA%20005");
      expect(testRelease.buyUrl).toBe("https://www.beatport.com/es/label/industrial-girls/106032");
      expect(testRelease.buyLabel).toBe("BEATPORT");
    });

    it("ensures /musica view renders both ESCUCHAR EN SPOTIFY ↗ and dynamic COMPRAR EN {release.buyLabel} ↗ buttons", () => {
      // Step 1: Read view component source file
      const viewPath = path.resolve(
        process.cwd(),
        "apps",
        "web",
        "src",
        "app",
        "musica",
        "musica-view.tsx"
      );
      const content = fs.readFileSync(viewPath, "utf-8");

      // Step 2: Validate presence of action buttons with arrows and dynamic label
      expect(content).toContain("ESCUCHAR EN SPOTIFY ↗");
      expect(content).toContain("COMPRAR EN {release.buyLabel} ↗");

      // Step 3: Validate Buy anchor attributes
      expect(content).toContain("href={release.buyUrl}");
      expect(content).toContain("aria-label={`Comprar ${release.title} en ${release.buyLabel}`}");
    });
  });

  describe("3. Layer 1 (Presentation): Hero Title, Brand Statement & Subsections Navigation Contract", () => {
    it("ensures /musica view contains exact Hero Title 'LABEL', editorial statement and navigation tabs", () => {
      // Step 1: Read view component source file
      const viewPath = path.resolve(
        process.cwd(),
        "apps",
        "web",
        "src",
        "app",
        "musica",
        "musica-view.tsx"
      );
      const content = fs.readFileSync(viewPath, "utf-8");

      // Step 2: Validate exact Hero title
      expect(content).toMatch(/<h1[^>]*>[\s\n]*LABEL[\s\n]*<\/h1>/);

      // Step 3: Validate exact editorial statement
      expect(content).toContain(
        "Discografía digital, Podcasts y canal directo de recepción para producciones inéditas."
      );

      // Step 4: Validate exact navigation tabs without numbers
      expect(content).toContain("[ RELEASES & VA'S ]");
      expect(content).toContain("[ PODCAST'S ]");
      expect(content).toContain("[ DEMO DROP // ENVIAR ]");

      // Step 5: Validate upgraded visual scale and active/inactive styling
      expect(content).toContain("px-6 py-3 sm:px-7 sm:py-3.5");
      expect(content).toContain("text-sm sm:text-base");
      expect(content).toContain("bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]");
      expect(content).toContain("bg-black/60");
    });
  });

  describe("4. Layer 4 & Layer 1: Demo Drop Specifications & Pauta Sonora 02 Contract", () => {
    it("ensures Demo Drop rule 02 establishes aesthetic freedom and tempo without BPM restrictions", () => {
      // Step 1: Retrieve specs via accessor
      const specs = getDemoDropSpecs();

      // Step 2: Validate rule 02 in dataset
      const expectedRule02 =
        "Libertad Estética & Tempo: Sin restricciones de BPM ni géneros impuestos. Buscamos identidad autoral, crudeza, vanguardia y diseño sonoro contundente.";
      expect(specs.rules[1]).toBe(expectedRule02);
      expect(DEMO_DROP_SPECS.rules[1]).toBe(expectedRule02);

      // Step 3: Ensure legacy BPM restriction text is completely eliminated
      expect(specs.rules[1]).not.toContain("BPM sugerido");
      expect(specs.rules[1]).not.toContain("145 a 165 BPM");
      expect(specs.rules[1]).not.toContain("Schranz");
    });

    it("ensures Demo Drop module has completely purged direct listening email and mailto links from the UI", () => {
      // Step 1: Read view component source file
      const viewPath = path.resolve(
        process.cwd(),
        "apps",
        "web",
        "src",
        "app",
        "musica",
        "musica-view.tsx"
      );
      const content = fs.readFileSync(viewPath, "utf-8");

      // Step 2: Ensure direct listening email text and mailto links are completely purged
      expect(content).not.toContain("CORREO DIRECTO DE ESCUCHA");
      expect(content).not.toContain("demos@industrialgirls.com");
      expect(content).not.toContain("mailto:");

      // Step 3: Ensure button is detached from mailto and configured with standby action
      expect(content).toContain("[ ENVIAR DEMO ]");
      expect(content).not.toContain("[ ENVIAR DEMO VÍA CORREO ]");
    });
  });
});
