/**
 * @file apps/web/src/lib/infrastructure/archive-data.test.ts
 * @description Layer 4 / Tests: Master TDD test suite for Archive Section - Artists Roster Architecture (@spec IGW-012).
 *
 * ARCHITECTURAL BOUNDARY & TEST TARGETS:
 * - Layer 4 (Infrastructure & Data): Validates ARTISTS_ROSTER data integrity, type contracts, and getter functions.
 * - Layer 1 (Presentation): Validates semantic HTML invariants (single <h1>) and hero copy contracts on /archivo.
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  ARTISTS_ROSTER,
  getArtistsRoster,
  RosterArtistEntity,
} from "./archive-data";

describe("Archive Section - Artists Roster Architecture — TDD Test Suite (@spec IGW-012)", () => {
  describe("1. Layer 4 (Infrastructure): ARTISTS_ROSTER Data & Contract Invariants", () => {
    it("exports ARTISTS_ROSTER with at least 8 artists", () => {
      // Step 1: Verify catalog array exists and meets minimum required volume
      expect(Array.isArray(ARTISTS_ROSTER)).toBe(true);
      expect(ARTISTS_ROSTER.length).toBeGreaterThanOrEqual(8);
    });

    it("ensures every artist entity satisfies RosterArtistEntity contract", () => {
      // Step 1: Validate entity fields for every record in the catalog
      ARTISTS_ROSTER.forEach((artist: RosterArtistEntity) => {
        expect(artist.id).toBeDefined();
        expect(typeof artist.id).toBe("string");
        expect(artist.id.trim().length).toBeGreaterThan(0);

        expect(artist.name).toBeDefined();
        expect(typeof artist.name).toBe("string");
        expect(artist.name.trim().length).toBeGreaterThan(0);

        expect(artist.country).toBeDefined();
        expect(typeof artist.country).toBe("string");
        expect(artist.country.trim().length).toBeGreaterThan(0);

        expect(artist.countryCode).toBeDefined();
        expect(typeof artist.countryCode).toBe("string");
        expect(artist.countryCode.length).toBe(2);

        expect(artist.subgenre).toBeDefined();
        expect(typeof artist.subgenre).toBe("string");
        expect(artist.subgenre.trim().length).toBeGreaterThan(0);
      });
    });

    it("verifies all 8 required scene artists are present with valid metadata", () => {
      // Step 1: Define expected scene artists and their country codes
      const expectedArtists = [
        { name: "Clara Cuvé", countryCode: "DE", country: "Alemania" },
        { name: "Øtta", countryCode: "PT", country: "Portugal" },
        { name: "Parfait", countryCode: "FR", country: "Francia" },
        { name: "Wallis", countryCode: "DE", country: "Alemania" },
        { name: "Caravel", countryCode: "FR", country: "Francia" },
        { name: "Somniac One", countryCode: "NL", country: "Países Bajos" },
        { name: "Lady Maru", countryCode: "IT", country: "Italia" },
        { name: "Juliana Yamasaki", countryCode: "BR", country: "Brasil" },
      ];

      // Step 2: Assert each expected artist exists in ARTISTS_ROSTER
      expectedArtists.forEach((expected) => {
        const found = ARTISTS_ROSTER.find(
          (a) => a.name.toLowerCase() === expected.name.toLowerCase()
        );
        expect(found).toBeDefined();
        expect(found?.countryCode).toBe(expected.countryCode);
        expect(found?.country).toBe(expected.country);
      });
    });

    it("ensures getArtistsRoster() returns a protected copy of the catalog", () => {
      // Step 1: Retrieve roster copy via getter
      const rosterCopy = getArtistsRoster();

      // Step 2: Assert parity and reference independence
      expect(rosterCopy.length).toBe(ARTISTS_ROSTER.length);
      expect(rosterCopy).not.toBe(ARTISTS_ROSTER);
    });
  });

  describe("2. Layer 1 (Presentation): Route View /archivo Semantic & Hero Invariants", () => {
    const archivoViewPath = path.resolve(
      __dirname,
      "../../app/archivo/archivo-view.tsx"
    );

    it("ensures archivo-view.tsx exists and defines exactly one semantic <h1> element", () => {
      // Step 1: Assert view component file exists
      expect(fs.existsSync(archivoViewPath), "archivo-view.tsx must exist").toBe(true);

      // Step 2: Read file content and scan for <h1> tags
      const content = fs.readFileSync(archivoViewPath, "utf8");
      const h1Matches = content.match(/<h1[\s>]/g) || [];

      // Step 3: Enforce single H1 rule for SEO and accessibility
      expect(h1Matches.length).toBe(1);
    });

    it("ensures /archivo view binds to the specified Hero and Eyebrow copy elements", () => {
      // Step 1: Assert view component file exists
      expect(fs.existsSync(archivoViewPath), "archivo-view.tsx must exist").toBe(true);

      // Step 2: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 3: Verify eyebrow copy
      expect(
        content.includes("// HISTORIAL & REGISTRO // ARCHIVO GLOBAL"),
        "archivo-view.tsx must render // HISTORIAL & REGISTRO // ARCHIVO GLOBAL eyebrow"
      ).toBe(true);

      // Step 4: Verify H1 headline copy
      expect(
        content.includes("ROSTER DE ARTISTAS & MEMORIA VISUAL"),
        "archivo-view.tsx must render ROSTER DE ARTISTAS & MEMORIA VISUAL H1"
      ).toBe(true);

      // Step 5: Verify subtitle copy
      expect(
        content.includes(
          "Registro de DJs, productoras y directos que han formado parte del circuito sonoro de Industrial Girls."
        ),
        "archivo-view.tsx must render curated subtitle"
      ).toBe(true);
    });
  });
});
