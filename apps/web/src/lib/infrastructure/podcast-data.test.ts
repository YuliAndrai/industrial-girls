/**
 * @file apps/web/src/lib/infrastructure/podcast-data.test.ts
 * @description Layer 4 / Tests: Master TDD test suite for Official Podcast Series (IG MIX 001 - 004).
 *
 * ARCHITECTURAL BOUNDARY & TEST TARGETS:
 * - Layer 4 (Infrastructure & Data): Validates PODCASTS_CATALOG 4 episodes, descending order (004 to 001),
 *   cover images physical file existence on disk, and pure SoundCloud / YouTube URLs.
 * - Presentation Specification: Validates primary SoundCloud button, secondary YouTube button,
 *   eyebrow, H2 title, editorial bajada, and metadata badges.
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  PODCASTS_CATALOG,
  getPodcastsCatalog,
  getPodcastBySeries,
  PodcastEpisode,
} from "./podcast-data";

describe("Podcast Series (IG MIX 001 - 004) — TDD Test Suite", () => {
  describe("1. Layer 4 (Infrastructure): PODCASTS_CATALOG Contract & Invariants", () => {
    it("validates that getPodcastsCatalog returns exactly 4 podcast episodes", () => {
      // Step 1: Retrieve catalog via accessor
      const podcasts = getPodcastsCatalog();

      // Step 2: Assert catalog array exists and has exactly 4 items
      expect(Array.isArray(podcasts)).toBe(true);
      expect(podcasts.length).toBe(4);
      expect(PODCASTS_CATALOG.length).toBe(4);
    });

    it("verifies that podcast episodes are ordered chronologically descending (004 to 001)", () => {
      // Step 1: Retrieve catalog
      const podcasts = getPodcastsCatalog();

      // Step 2: Assert descending order by seriesNumber
      expect(podcasts[0]?.seriesNumber).toBe("004");
      expect(podcasts[1]?.seriesNumber).toBe("003");
      expect(podcasts[2]?.seriesNumber).toBe("002");
      expect(podcasts[3]?.seriesNumber).toBe("001");

      // Step 3: Assert corresponding artist sequence
      expect(podcasts[0]?.artist).toBe("MMELL");
      expect(podcasts[1]?.artist).toBe("TECHSIA");
      expect(podcasts[2]?.artist).toBe("DJ HOTMAIL");
      expect(podcasts[3]?.artist).toBe("ANNIE");
    });

    it("ensures every podcast episode satisfies PodcastEpisode contract with non-empty fields", () => {
      // Step 1: Iterate and validate every podcast entity
      const podcasts = getPodcastsCatalog();

      podcasts.forEach((episode: PodcastEpisode) => {
        expect(episode.id).toBeDefined();
        expect(typeof episode.id).toBe("string");
        expect(episode.id).toMatch(/^ig-mix-00[1-4]$/);

        expect(episode.seriesNumber).toBeDefined();
        expect(typeof episode.seriesNumber).toBe("string");
        expect(episode.seriesNumber).toMatch(/^00[1-4]$/);

        expect(episode.artist).toBeDefined();
        expect(typeof episode.artist).toBe("string");
        expect(episode.artist.trim().length).toBeGreaterThan(0);

        expect(episode.title).toBeDefined();
        expect(typeof episode.title).toBe("string");
        expect(episode.title.startsWith(episode.artist)).toBe(true);

        expect(episode.coverImage).toBeDefined();
        expect(typeof episode.coverImage).toBe("string");
        expect(episode.coverImage.startsWith("/images/podcasts/")).toBe(true);

        expect(episode.soundcloudUrl).toBeDefined();
        expect(typeof episode.soundcloudUrl).toBe("string");
        expect(episode.soundcloudUrl.startsWith("https://soundcloud.com/industrial_girls/")).toBe(true);
        expect(episode.soundcloudUrl).not.toContain("[");
        expect(episode.soundcloudUrl).not.toContain("]");

        expect(episode.youtubeUrl).toBeDefined();
        expect(typeof episode.youtubeUrl).toBe("string");
        expect(episode.youtubeUrl.startsWith("https://www.youtube.com/watch?v=")).toBe(true);
        expect(episode.youtubeUrl).not.toContain("[");
        expect(episode.youtubeUrl).not.toContain("]");
      });
    });

    it("validates that all 4 podcast cover image files physically exist on disk in apps/web/public/images/podcasts/", () => {
      // Step 1: Resolve base path to podcasts image directory
      const publicPodcastsDir = path.resolve(
        process.cwd(),
        "apps",
        "web",
        "public",
        "images",
        "podcasts"
      );

      // Step 2: Verify each episode cover image file exists on disk
      const podcasts = getPodcastsCatalog();
      podcasts.forEach((episode) => {
        const filename = path.basename(episode.coverImage);
        const fullDiskPath = path.join(publicPodcastsDir, filename);

        expect(
          fs.existsSync(fullDiskPath),
          `Expected cover art image "${filename}" to physically exist at "${fullDiskPath}"`
        ).toBe(true);
      });
    });

    it("validates that all 4 podcast cover image files are in MaxRes HD quality (1280x720)", () => {
      // Step 1: Helper to extract JPEG dimensions from SOF markers
      function getJpegDimensions(filePath: string): { width: number; height: number } | null {
        const buf = fs.readFileSync(filePath);
        let i = 2;
        while (i < buf.length) {
          if (buf[i] !== 0xff) return null;
          const marker = buf[i + 1];
          i += 2;
          if (marker === 0xc0 || marker === 0xc2) {
            const h = buf.readUInt16BE(i + 3);
            const w = buf.readUInt16BE(i + 5);
            return { width: w, height: h };
          }
          const len = buf.readUInt16BE(i);
          i += len;
        }
        return null;
      }

      // Step 2: Validate each file dimensions
      const publicPodcastsDir = path.resolve(
        process.cwd(),
        "apps",
        "web",
        "public",
        "images",
        "podcasts"
      );
      const podcasts = getPodcastsCatalog();
      podcasts.forEach((episode) => {
        const filename = path.basename(episode.coverImage);
        const fullDiskPath = path.join(publicPodcastsDir, filename);
        const dimensions = getJpegDimensions(fullDiskPath);

        expect(dimensions).not.toBeNull();
        expect(dimensions?.width).toBe(1280);
        expect(dimensions?.height).toBe(720);
      });
    });

    it("retrieves a specific podcast episode by series number or id using getPodcastBySeries", () => {
      // Step 1: Query by 3-digit series number
      const mix004 = getPodcastBySeries("004");
      expect(mix004).toBeDefined();
      expect(mix004?.artist).toBe("MMELL");

      // Step 2: Query by single digit series number
      const mix001 = getPodcastBySeries("1");
      expect(mix001).toBeDefined();
      expect(mix001?.artist).toBe("ANNIE");

      // Step 3: Query by id
      const mix002 = getPodcastBySeries("ig-mix-002");
      expect(mix002).toBeDefined();
      expect(mix002?.artist).toBe("DJ HOTMAIL");

      // Step 4: Query nonexistent series returns undefined
      const nonexistent = getPodcastBySeries("999");
      expect(nonexistent).toBeUndefined();
    });
  });

  describe("2. Layer 1 (Presentation): Podcasts UI Section & Priority SoundCloud Button Contract", () => {
    it("ensures /musica view contains exact podcast eyebrow, H2 title, and editorial bajada", () => {
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

      // Step 2: Validate eyebrow
      expect(content).toContain("// SOURCED AUDIO & CURATED SETS // PODCAST SERIES");

      // Step 3: Validate title
      expect(content).toContain("INDUSTRIAL GIRLS PODCAST");

      // Step 4: Validate editorial bajada
      expect(content).toContain(
        "Sesiones de estudio y directos exclusivos que exploran la crudeza y el tempo acelerado de nuestra comunidad."
      );
    });

    it("ensures /musica view renders SoundCloud as primary button and YouTube as secondary button", () => {
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

      // Step 2: Validate primary SoundCloud button text and styling
      expect(content).toContain("ESCUCHAR EN SOUNDCLOUD");
      expect(content).toContain("bg-red-600/90 text-white hover:bg-red-500 border border-red-500");

      // Step 3: Validate secondary YouTube button text and styling
      expect(content).toContain("VER EN YOUTUBE");
      expect(content).toContain("border border-white/20 text-white/70 hover:border-white hover:text-white");

      // Step 4: Validate metadata badge format
      expect(content).toContain("[ IG MIX");
    });

    it("ensures /musica view renders podcast covers with aspect-video, object-cover, and HD quality calibration", () => {
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

      // Step 2: Validate container geometry and visual overflow containment
      expect(content).toContain("aspect-video");
      expect(content).toContain("overflow-hidden");

      // Step 3: Validate image calibration and contrast/scale treatment
      expect(content).toContain("object-cover");
      expect(content).toContain("object-center");
      expect(content).toContain("contrast-[1.05]");
      expect(content).toContain("brightness-95");
      expect(content).toContain("group-hover:scale-[1.02]");
      expect(content).toContain("quality={90}");
    });
  });
});
