/**
 * @file apps/web/src/lib/infrastructure/events-data.test.ts
 * @description Layer 4 & Layer 1 Test Suite - Recent Showcases & Visual Flyers Architecture.
 * Validates the RecentShowcase contract, physical existence of flyer files in public/images/events/,
 * accessor helpers, and presentation invariants in eventos-view.tsx.
 *
 * @spec IGW-010-EVENTS-SHOWCASES-FLYERS
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  RECENT_SHOWCASES,
  getRecentShowcases,
  getRecentShowcaseById,
  RecentShowcase,
} from "./events-data";

describe("Events Showcases Visual Flyers Architecture — Test Suite", () => {
  describe("1. Layer 4: RecentShowcases Catalog Contract & Integrity (@spec IGW-010)", () => {
    it("exports a non-empty RECENT_SHOWCASES array with 5 official flyers", () => {
      // Step 1: Arrange & Act
      const showcases = getRecentShowcases();

      // Step 2: Assert collection length
      expect(showcases).toHaveLength(5);
      expect(RECENT_SHOWCASES).toHaveLength(5);

      // Step 3: Validate each showcase item schema
      showcases.forEach((showcase: RecentShowcase, index: number) => {
        const expectedCode = String(index + 1).padStart(2, "0");
        expect(showcase.id).toBe(`showcase-${expectedCode}`);
        expect(showcase.flyerImage).toBe(`/images/events/showcase-${expectedCode}.jpg`);
        expect(showcase.alt).toBeTruthy();
      });
    });

    it("verifies physical file existence and valid byte size for every flyer on disk", () => {
      // Step 1: Resolve public events images directory
      const eventsDir = path.resolve(__dirname, "../../../public/images/events");

      // Step 2: Ensure directory exists
      expect(fs.existsSync(eventsDir)).toBe(true);

      // Step 3: Verify each flyer file exists with non-trivial size (> 50KB)
      RECENT_SHOWCASES.forEach((showcase) => {
        const filename = path.basename(showcase.flyerImage);
        const filePath = path.join(eventsDir, filename);

        expect(fs.existsSync(filePath), `Flyer file ${filename} must exist on disk`).toBe(true);
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(50000);
      });
    });

    it("queries showcases correctly by id and returns undefined for unknown ids", () => {
      // Step 1: Query existing showcase
      const showcase01 = getRecentShowcaseById("showcase-01");
      expect(showcase01).toBeDefined();
      expect(showcase01?.flyerImage).toBe("/images/events/showcase-01.jpg");

      // Step 2: Query non-existent showcase
      const nonExistent = getRecentShowcaseById("showcase-999");
      expect(nonExistent).toBeUndefined();
    });
  });

  describe("2. Layer 1: Presentation Eventos View Showcases Contract", () => {
    it("ensures /eventos view renders 'ÚLTIMOS SHOWCASES' and completely purges legacy YouTube CTA and text", () => {
      // Step 1: Read eventos-view component source
      const viewPath = path.resolve(__dirname, "../../app/eventos/eventos-view.tsx");
      const content = fs.readFileSync(viewPath, "utf-8");

      // Step 2: Assert updated module title
      expect(content).toContain("ÚLTIMOS SHOWCASES");

      // Step 3: Assert complete purge of legacy title
      expect(content).not.toContain("HISTORIAL DE SHOWCASES");

      // Step 4: Assert complete purge of YouTube link / button
      expect(content).not.toContain("VER REGISTRO EN YOUTUBE");
      expect(content).not.toContain("youtubeVideoId");

      // Step 5: Assert flyer container aspect ratio and styling
      expect(content).toContain("aspect-[3/4]");
      expect(content).toContain("border-white/10");
    });
  });
});
