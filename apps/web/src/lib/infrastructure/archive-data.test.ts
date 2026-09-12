/**
 * @file apps/web/src/lib/infrastructure/archive-data.test.ts
 * @description Layer 4 / Tests: Master TDD test suite for Archive Section - Artists Roster Architecture (@spec IGW-012).
 *
 * ARCHITECTURAL BOUNDARY & TEST TARGETS:
 * - Layer 4 (Infrastructure & Data): Validates ARTISTS_ROSTER exact 30 artists, absence of subgenre, type contracts, and getter functions.
 * - Layer 1 (Presentation): Validates semantic HTML invariants (single <h1>) and hero copy contracts on /archivo.
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  ARTISTS_ROSTER,
  getArtistsRoster,
  ArtistProfile,
} from "./archive-data";

describe("Archive Section - Artists Roster Architecture — TDD Test Suite (@spec IGW-012)", () => {
  describe("1. Layer 4 (Infrastructure): ARTISTS_ROSTER 30 Artists & Zero-Genre Invariants", () => {
    it("validates that ARTISTS_ROSTER contains exactly 30 artists", () => {
      // Step 1: Verify catalog array exists and has exact required length
      expect(Array.isArray(ARTISTS_ROSTER)).toBe(true);
      expect(ARTISTS_ROSTER.length).toBe(30);
    });

    it("validates that NO artist element contains the subgenre property", () => {
      // Step 1: Assert absence of subgenre property across all 30 entities
      ARTISTS_ROSTER.forEach((artist) => {
        expect(artist).not.toHaveProperty("subgenre");
        expect("subgenre" in artist).toBe(false);
      });
    });

    it("ensures every artist entity satisfies ArtistProfile contract with valid links", () => {
      // Step 1: Validate entity fields for every record in the catalog
      ARTISTS_ROSTER.forEach((artist: ArtistProfile) => {
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

        expect(artist.links).toBeDefined();
        expect(typeof artist.links).toBe("object");

        // Validate that at least one direct profile link is provided
        const hasAtLeastOneLink = Boolean(
          artist.links.spotify ||
          artist.links.soundcloud ||
          artist.links.residentAdvisor ||
          artist.links.instagram ||
          artist.links.bandcamp
        );
        expect(hasAtLeastOneLink).toBe(true);
      });
    });

    it("verifies prominent international scene artists are present in the catalog", () => {
      // Step 1: Define key artists across different regions
      const sampleArtists = [
        { id: "clara-cuve", name: "Clara Cuvé", countryCode: "DE" },
        { id: "otta", name: "Øtta", countryCode: "PT" },
        { id: "parfait", name: "Parfait", countryCode: "FR" },
        { id: "lessss", name: "Lessss", countryCode: "FR" },
        { id: "wallis", name: "Wallis", countryCode: "DE" },
        { id: "ayako-mori", name: "Ayako Mori", countryCode: "JP" },
        { id: "lady-maru", name: "Lady Maru", countryCode: "IT" },
        { id: "somniac-one", name: "Somniac One", countryCode: "NL" },
        { id: "andhray", name: "Andhray", countryCode: "CO" },
        { id: "juliana-yamasaki", name: "Juliana Yamasaki", countryCode: "BR" },
      ];

      // Step 2: Assert each sample artist exists in ARTISTS_ROSTER
      sampleArtists.forEach((expected) => {
        const found = ARTISTS_ROSTER.find((a) => a.id === expected.id);
        expect(found).toBeDefined();
        expect(found?.name).toBe(expected.name);
        expect(found?.countryCode).toBe(expected.countryCode);
      });
    });

    it("ensures getArtistsRoster() returns a protected copy of the catalog", () => {
      // Step 1: Retrieve roster copy via getter
      const rosterCopy = getArtistsRoster();

      // Step 2: Assert parity and reference independence
      expect(rosterCopy.length).toBe(30);
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

    it("verifies that archivo-view.tsx has zero rendering of genres or subgenres", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 2: Ensure subgenre property access does not exist in rendering logic
      expect(content.includes("artist.subgenre")).toBe(false);
      expect(content.includes("a.subgenre")).toBe(false);
    });

    it("ensures the artists roster block header renders the updated eyebrow and title", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 2: Verify block eyebrow and block title
      expect(
        content.includes("// ARCHIVO // EDICIONES PASADAS"),
        "archivo-view.tsx must render // ARCHIVO // EDICIONES PASADAS block eyebrow"
      ).toBe(true);

      expect(
        content.includes("ARTISTAS EN NUESTROS EVENTOS"),
        "archivo-view.tsx must render ARTISTAS EN NUESTROS EVENTOS block title"
      ).toBe(true);
    });

    it("ensures roster table rows enforce two-column grid, compact density, and aligned links", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 2: Verify two-column responsive grid container
      expect(
        content.includes("grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0 items-start"),
        "Roster directory must implement 2-column responsive layout"
      ).toBe(true);

      // Step 3: Verify row compact vertical padding and border
      expect(content.includes("py-2.5 sm:py-3"), "Rows must apply compact py-2.5 sm:py-3 vertical padding").toBe(true);
      expect(content.includes("border-b border-white/10"), "Rows must apply border-b border-white/10").toBe(true);

      // Step 4: Verify button compact padding, nowrap, and alignment
      expect(content.includes("sm:ml-auto"), "Profile links must be aligned to the right").toBe(true);
      expect(content.includes("px-2 py-0.5"), "Buttons must have compact px-2 py-0.5 padding").toBe(true);
      expect(content.includes("whitespace-nowrap"), "Buttons must not wrap").toBe(true);
      expect(content.includes("text-white/40"), "Index numbering must have attenuated opacity").toBe(true);
    });
  });
});
