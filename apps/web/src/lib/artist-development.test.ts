/**
 * @file apps/web/src/lib/artist-development.test.ts
 * @description Unit Test Suite for Artist Development 360° Module.
 * Validates catalog data integrity, pillar queries, badges, and intake validation pipeline invariants.
 *
 * @spec IGW-003-ARTIST-DEVELOPMENT
 */

import { describe, it, expect } from "vitest";
import {
  getArtistDevPillars,
  getPillarById,
  ARTIST_DEV_PILLARS,
  ARTIST_DEV_BADGES,
} from "./infrastructure/artist-development-catalog";
import {
  validateDiagnosticSubmission,
  DiagnosticSubmissionInput,
} from "./pipelines/intake-diagnostic-pipeline";

describe("Artist Development Module — Unit Test Suite", () => {
  describe("1. Infrastructure Layer: Artist Development Catalog (@spec IGW-003-CATALOG)", () => {
    it("should provide exactly 4 distinct pillars with valid numbering and services", () => {
      // Step 1: Arrange & Act
      const pillars = getArtistDevPillars();

      // Step 2: Assert
      expect(pillars).toHaveLength(4);
      expect(pillars).toEqual(ARTIST_DEV_PILLARS);

      const expectedIndices = ["01", "02", "03", "04"];
      pillars.forEach((pillar, index) => {
        expect(pillar.id).toBeTruthy();
        expect(pillar.indexNumber).toBe(expectedIndices[index]);
        expect(pillar.title).toBeTruthy();
        expect(pillar.subtitle).toBeTruthy();
        expect(pillar.services.length).toBeGreaterThan(0);

        pillar.services.forEach((service) => {
          expect(service.id).toBeTruthy();
          expect(service.title).toBeTruthy();
          expect(service.description).toBeTruthy();
        });
      });
    });

    it("should query a pillar correctly by its id and return undefined for unknown ids", () => {
      // Step 1: Query existing pillar
      const pillar = getPillarById("strategy-diagnosis");
      expect(pillar).toBeDefined();
      expect(pillar?.title).toBe("ESTRATEGIA & DIAGNÓSTICO");
      expect(pillar?.indexNumber).toBe("01");

      // Step 2: Query non-existent pillar
      const nonExistent = getPillarById("non-existent-pillar");
      expect(nonExistent).toBeUndefined();
    });

    it("should contain all 5 required tactical badges in the Hero definition", () => {
      // Step 1: Verify badges array
      expect(ARTIST_DEV_BADGES).toHaveLength(5);
      expect(ARTIST_DEV_BADGES).toContain("Diagnóstico Nivel 1");
      expect(ARTIST_DEV_BADGES).toContain("Identidad & EPK");
      expect(ARTIST_DEV_BADGES).toContain("Ingeniería de Audio");
      expect(ARTIST_DEV_BADGES).toContain("Legal & Publishing");
      expect(ARTIST_DEV_BADGES).toContain("Soluciones Digitales");
    });
  });

  describe("2. Domain Pipeline Layer: Intake Diagnostic Validation (@spec IGW-003-PIPELINE)", () => {
    it("should validate a complete and correct submission payload", () => {
      // Step 1: Arrange valid payload
      const input: DiagnosticSubmissionInput = {
        artistName: "DISTORTA",
        email: "artist@industrialgirls.com",
        location: "Bogotá, Colombia",
        musicLinks: "https://soundcloud.com/distorta-live",
        selectedServices: ["strategy-diagnosis", "sound-engineering"],
        goalsMessage: "Consolidación de catálogo y lanzamiento internacional de EP.",
      };

      // Step 2: Act
      const result = validateDiagnosticSubmission(input);

      // Step 3: Assert
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it("should reject payload with missing or invalid fields", () => {
      // Step 1: Arrange invalid payload
      const invalidInput: DiagnosticSubmissionInput = {
        artistName: "",
        email: "invalid-email-address",
        location: "",
        musicLinks: "abc",
        selectedServices: [],
        goalsMessage: "short",
      };

      // Step 2: Act
      const result = validateDiagnosticSubmission(invalidInput);

      // Step 3: Assert
      expect(result.isValid).toBe(false);
      expect(result.errors.artistName).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.location).toBeDefined();
      expect(result.errors.musicLinks).toBeDefined();
      expect(result.errors.selectedServices).toBeDefined();
      expect(result.errors.goalsMessage).toBeDefined();
    });
  });
});
