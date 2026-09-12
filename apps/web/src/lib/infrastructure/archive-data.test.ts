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
  MEDIA_ARCHIVE,
  getMediaArchiveItems,
  MediaArchiveItem,
  TOTAL_UNIQUE_PHOTOS,
  ARCHIVE_PHOTOS,
  getArchivePhotos,
  ArchivePhoto,
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
        content.includes("ARTISTAS EN NUESTROS EVENTOS & LABEL"),
        "archivo-view.tsx must render ARTISTAS EN NUESTROS EVENTOS & LABEL block title"
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

  describe("3. Layer 4 (Infrastructure): MEDIA_ARCHIVE Dataset & getMediaArchiveItems() Invariants", () => {
    it("validates that MEDIA_ARCHIVE contains curated showcase records", () => {
      // Step 1: Verify catalog array exists and has at least 3 records
      expect(Array.isArray(MEDIA_ARCHIVE)).toBe(true);
      expect(MEDIA_ARCHIVE.length).toBeGreaterThanOrEqual(3);
    });

    it("ensures media entries contain both photo and video record types", () => {
      // Step 1: Verify presence of photo records
      const hasPhoto = MEDIA_ARCHIVE.some((item) => item.type === "photo");
      expect(hasPhoto, "MEDIA_ARCHIVE must include photographic records").toBe(true);

      // Step 2: Verify presence of video records
      const hasVideo = MEDIA_ARCHIVE.some((item) => item.type === "video");
      expect(hasVideo, "MEDIA_ARCHIVE must include audiovisual/video records").toBe(true);
    });

    it("ensures every media entry satisfies the MediaArchiveItem interface contract", () => {
      // Step 1: Validate entity fields for every record in the media catalog
      MEDIA_ARCHIVE.forEach((item: MediaArchiveItem) => {
        expect(item.id).toBeDefined();
        expect(typeof item.id).toBe("string");
        expect(item.id.trim().length).toBeGreaterThan(0);

        expect(item.title).toBeDefined();
        expect(typeof item.title).toBe("string");
        expect(item.title.trim().length).toBeGreaterThan(0);

        expect(item.date).toBeDefined();
        expect(typeof item.date).toBe("string");
        expect(item.date.trim().length).toBeGreaterThan(0);

        expect(item.location).toBeDefined();
        expect(typeof item.location).toBe("string");
        expect(item.location.trim().length).toBeGreaterThan(0);

        expect(item.type).toBeDefined();
        expect(["photo", "video"].includes(item.type)).toBe(true);

        expect(item.mediaUrl).toBeDefined();
        expect(typeof item.mediaUrl).toBe("string");
        expect(item.mediaUrl.trim().length).toBeGreaterThan(0);

        expect(item.caption).toBeDefined();
        expect(typeof item.caption).toBe("string");
        expect(item.caption.trim().length).toBeGreaterThan(0);
      });
    });

    it("ensures getMediaArchiveItems() returns a protected copy of the media catalog", () => {
      // Step 1: Retrieve media copy via getter
      const mediaCopy = getMediaArchiveItems();

      // Step 2: Assert parity and reference independence
      expect(mediaCopy.length).toBe(MEDIA_ARCHIVE.length);
      expect(mediaCopy).not.toBe(MEDIA_ARCHIVE);
    });
  });

  describe("4. Layer 1 (Presentation): Media Archive & Audiovisual Registry Gallery Invariants", () => {
    const archivoViewPath = path.resolve(
      __dirname,
      "../../app/archivo/archivo-view.tsx"
    );

    it("ensures archivo-view.tsx renders the Media Archive block eyebrow and title as H2", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 2: Verify block eyebrow
      expect(
        content.includes("// REGISTRO & MEMORIA // ARCHIVO AUDIOVISUAL"),
        "archivo-view.tsx must render // REGISTRO & MEMORIA // ARCHIVO AUDIOVISUAL eyebrow"
      ).toBe(true);

      // Step 3: Verify block H2 title
      expect(
        content.includes("REGISTRO AUDIOVISUAL & SHOWCASES"),
        "archivo-view.tsx must render REGISTRO AUDIOVISUAL & SHOWCASES block title"
      ).toBe(true);

      // Step 4: Verify that the block title is rendered as an H2 (single H1 invariant preserved)
      expect(
        /<h2[\s\S]*?REGISTRO AUDIOVISUAL & SHOWCASES[\s\S]*?<\/h2>/.test(content),
        "REGISTRO AUDIOVISUAL & SHOWCASES must be rendered inside an <h2> tag"
      ).toBe(true);
    });

    it("verifies that single H1 invariant remains strictly preserved across the entire route", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 2: Count <h1> tags in file
      const h1Matches = content.match(/<h1[\s>]/g) || [];

      // Step 3: Exactly 1 H1 headline allowed
      expect(h1Matches.length).toBe(1);
    });

    it("ensures media filter controls and responsive gallery grid are rendered", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 2: Verify filter button controls
      expect(content.includes("[ TODOS"), "Must render [ TODOS ] filter button").toBe(true);
      expect(content.includes("[ FOTOGRAFÍA"), "Must render [ FOTOGRAFÍA ] filter button").toBe(true);
      expect(content.includes("[ VIDEO"), "Must render [ VIDEO ] filter button").toBe(true);

      // Step 3: Verify media grid container
      expect(
        content.includes("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3") ||
        content.includes("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6") ||
        content.includes("grid-cols-1 md:grid-cols-2 lg:grid-cols-3"),
        "Must render responsive media grid with 1 to 3 columns"
      ).toBe(true);
    });

    it("ensures archivo-view.tsx integrates the photographic compact gallery terminal with dynamic telemetry", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 2: Verify consumption of getArchivePhotos
      expect(content.includes("getArchivePhotos"), "Must consume getArchivePhotos from Layer 4").toBe(true);

      // Step 3: Verify console HUD and dynamic mode controls
      expect(
        content.includes("VISOR DE FOTOGRAMAS // {archivePhotos.length} CAPTURAS") ||
        content.includes("VISOR DE FOTOGRAMAS"),
        "Must render dynamic visor header"
      ).toBe(true);
      expect(content.includes("[ MODO MATRIZ (${archivePhotos.length}) ]") || content.includes("MODO MATRIZ"), "Must render dynamic matrix mode button").toBe(true);
      expect(content.includes("REEL DE {archivePhotos.length} FOTOGRAMAS") || content.includes("REEL DE"), "Must render dynamic filmstrip reel").toBe(true);
      expect(content.includes("VISUAL REEL"), "Must render visual reel dynamic telemetry").toBe(true);
    });

    it("ensures archivo-view.tsx implements GPU acceleration, content containment, and async image decoding", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(archivoViewPath, "utf8");

      // Step 2: Verify GPU acceleration class
      expect(content.includes("transform-gpu"), "Must include transform-gpu hardware acceleration").toBe(true);

      // Step 3: Verify content containment for smooth scrolling
      expect(content.includes('contentVisibility: "auto"'), "Must include contentVisibility: auto").toBe(true);
      expect(content.includes("containIntrinsicSize:"), "Must include containIntrinsicSize for rendering containment").toBe(true);

      // Step 4: Verify async decoding and lazy loading
      expect(content.includes('decoding="async"'), "Must configure decoding=async on images").toBe(true);
      expect(content.includes('loading="lazy"'), "Must configure loading=lazy on thumbnail images").toBe(true);

      // Step 5: Verify overscroll containment on horizontal filmstrip
      expect(content.includes("overscroll-x-contain"), "Must configure overscroll-x-contain").toBe(true);

      // Step 6: Verify heavy backdrop filters are eliminated for 60 FPS performance
      expect(content.includes("backdrop-blur"), "Must eliminate backdrop-blur to prevent GPU composite lag").toBe(false);
    });
  });

  describe("5. Layer 4 (Infrastructure): ARCHIVE_PHOTOS Unique Photo Catalog Invariants", () => {
    it("validates that ARCHIVE_PHOTOS contains exactly the deduplicated unique items (37)", () => {
      // Step 1: Verify catalog array exists and has length TOTAL_UNIQUE_PHOTOS
      expect(Array.isArray(ARCHIVE_PHOTOS)).toBe(true);
      expect(TOTAL_UNIQUE_PHOTOS).toBe(37);
      expect(ARCHIVE_PHOTOS.length).toBe(37);
    });

    it("ensures every photo satisfies the ArchivePhoto interface contract and sequential paths", () => {
      // Step 1: Validate entity fields for all 37 unique photo records
      ARCHIVE_PHOTOS.forEach((photo: ArchivePhoto, index) => {
        const expectedIndex = String(index + 1).padStart(2, "0");
        expect(photo.id).toBe(`photo-${expectedIndex}`);
        expect(photo.url).toBe(`/images/archive/photo-${expectedIndex}.jpg`);
        expect(photo.alt).toBe(`Industrial Girls Archive Visual Frame ${expectedIndex}`);
      });
    });

    it("ensures getArchivePhotos() returns a protected copy of the unique photo catalog", () => {
      // Step 1: Retrieve photos copy via getter
      const photosCopy = getArchivePhotos();

      // Step 2: Assert parity and reference independence
      expect(photosCopy.length).toBe(37);
      expect(photosCopy).not.toBe(ARCHIVE_PHOTOS);
    });

    it("verifies physical files for all unique photos exist on disk", () => {
      // Step 1: Check presence of every photo on disk in public directory
      const archiveDir = path.resolve(__dirname, "../../../public/images/archive");
      for (let i = 1; i <= TOTAL_UNIQUE_PHOTOS; i++) {
        const fileName = `photo-${String(i).padStart(2, "0")}.jpg`;
        const filePath = path.join(archiveDir, fileName);
        expect(fs.existsSync(filePath), `File ${fileName} must exist on disk`).toBe(true);
      }
    });
  });
});

