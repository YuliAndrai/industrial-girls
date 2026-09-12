/**
 * @file apps/web/src/lib/infrastructure/home-hub-data.test.ts
 * @description Layer 4 / Tests: Home Hub Bento Data Catalog and Presentation Invariants Test Suite.
 * Validates the 7 canonical ecosystem routing cards, flagship card 02 attributes,
 * clean social channel URLs, and Hero purges (zero descriptive paragraphs).
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  HOME_HUB_CARDS,
  HOME_SOCIAL_LINKS,
  getHomeHubCards,
  getHomeSocialLinks,
} from "./home-hub-data";

describe("Home Page Minimalist Hero & Bento Command Center Suite", () => {
  const webSrcDir = path.resolve(__dirname, "../..");

  describe("1. Layer 4: Home Hub Catalog Data Integrity", () => {
    it("ensures HOME_HUB_CARDS exports exactly 7 ecosystem destination cards", () => {
      // Step 1: Validate length
      expect(HOME_HUB_CARDS).toHaveLength(7);
      expect(getHomeHubCards()).toHaveLength(7);
    });

    it("verifies sequential codes '01' through '07' across all hub cards", () => {
      // Step 1: Validate sequential two-digit codes
      const codes = HOME_HUB_CARDS.map((c) => c.code);
      expect(codes).toEqual(["01", "02", "03", "04", "05", "06", "07"]);
    });

    it("verifies exact canonical destination targets for all 7 cards", () => {
      // Step 1: Match expected routing destinations
      const expectedRoutes: Record<string, string> = {
        "01": "/musica#releases",
        "02": "/desarrollo-artistico#servicios",
        "03": "/musica#podcasts",
        "04": "/musica#demo-drop",
        "05": "/eventos",
        "06": "/archivo",
        "07": "/comunidad",
      };

      HOME_HUB_CARDS.forEach((card) => {
        expect(card.href).toBe(expectedRoutes[card.code]);
        expect(card.title.length).toBeGreaterThan(0);
        expect(card.subtitle.length).toBeGreaterThan(0);
      });
    });

    it("validates Card 02 as Flagship Primary Service (Campaña de Lanzamiento)", () => {
      // Step 1: Find card 02
      const flagshipCard = HOME_HUB_CARDS.find((c) => c.code === "02");
      expect(flagshipCard).toBeDefined();
      expect(flagshipCard?.isFlagship).toBe(true);
      expect(flagshipCard?.badge).toBe("SERVICIO INSIGNIA");
      expect(flagshipCard?.title).toBe("CAMPAÑA DE LANZAMIENTO & AGENCIA");
      expect(flagshipCard?.href).toBe("/desarrollo-artistico#servicios");
    });

    it("ensures other cards (01, 03-07) are not flagged as flagship", () => {
      // Step 1: Validate flagship exclusivity
      const nonFlagshipCards = HOME_HUB_CARDS.filter((c) => c.code !== "02");
      nonFlagshipCards.forEach((card) => {
        expect(card.isFlagship).toBeFalsy();
      });
    });

    it("verifies getHomeHubCards returns a defensive copy of the catalog", () => {
      // Step 1: Check reference independence
      const cards1 = getHomeHubCards();
      const cards2 = getHomeHubCards();
      expect(cards1).not.toBe(cards2);
      expect(cards1).toEqual(cards2);
    });
  });

  describe("2. Layer 4: Social Channels and Clean URLs", () => {
    it("ensures HOME_SOCIAL_LINKS contains the 5 official channels", () => {
      // Step 1: Validate labels
      const labels = HOME_SOCIAL_LINKS.map((s) => s.label);
      expect(labels).toEqual([
        "SOUNDCLOUD",
        "BEATPORT",
        "SPOTIFY",
        "YOUTUBE",
        "INSTAGRAM",
      ]);
    });

    it("verifies all social links have pure URLs without markdown brackets", () => {
      // Step 1: Invariant - No markdown wrappers
      HOME_SOCIAL_LINKS.forEach((link) => {
        expect(link.href.startsWith("https://")).toBe(true);
        expect(link.href).not.toContain("[");
        expect(link.href).not.toContain("]");
        expect(link.href).not.toContain("(");
        expect(link.href).not.toContain(")");
      });
    });

    it("verifies getHomeSocialLinks returns a defensive copy", () => {
      // Step 1: Check reference independence
      const links1 = getHomeSocialLinks();
      const links2 = getHomeSocialLinks();
      expect(links1).not.toBe(links2);
      expect(links1).toEqual(links2);
    });
  });

  describe("3. Layer 1: Hero Section Minimalist Purge Invariants", () => {
    const heroFilePath = path.join(webSrcDir, "components/landing/hero-section.tsx");

    it("ensures HeroSection source code completely purges descriptive paragraphs", () => {
      // Step 1: Read hero component
      const content = fs.readFileSync(heroFilePath, "utf-8");

      // Verify elimination of the descriptive paragraph
      expect(content).not.toContain("Raw uncompromising beats");
      expect(content).not.toContain("warehouse sonic architecture");
      expect(content).not.toContain("future of hard industrial electronics");
    });

    it("ensures HeroSection source code completely purges legacy action buttons", () => {
      // Step 1: Read hero component
      const content = fs.readFileSync(heroFilePath, "utf-8");

      // Verify elimination of legacy hero CTAs
      expect(content).not.toContain("EXPLORE RAVES & EVENTS");
      expect(content).not.toContain("AGENCIA DE DIRECCIÓN CREATIVA");
    });

    it("ensures HeroSection preserves balaclava logo, hashtags, and single <h1> slogan", () => {
      // Step 1: Read hero component
      const content = fs.readFileSync(heroFilePath, "utf-8");

      // Verify balaclava emblem and radar ring
      expect(content).toContain("industrial-girls-badge-mask.jpg");
      expect(content).toContain("Industrial Girls Balaclava Emblem");

      // Verify the 3 official hashtags
      expect(content).toContain("#IndustrialGirls");
      expect(content).toContain("#TechnoGirls");
      expect(content).toContain("#HardGirls");

      // Verify exact slogan
      expect(content).toContain("TALENTO, IDENTIDAD");
      expect(content).toContain("REVOLUCIÓN SONORA");

      // Invariant: Exactly one <h1>
      const h1Count = (content.match(/<h1[\s>]/g) || []).length;
      expect(h1Count).toBe(1);
    });

    it("ensures HeroSection mounts BentoCommandCenter directly underneath the slogan", () => {
      // Step 1: Read hero component
      const content = fs.readFileSync(heroFilePath, "utf-8");

      // Verify mount of BentoCommandCenter
      expect(content).toContain("BentoCommandCenter");
      expect(content).toMatch(new RegExp("<h1[\\s\\S]*?<\\/h1>[\\s\\S]*?<BentoCommandCenter"));
    });
  });

  describe("4. Layer 1: Bento Command Center UI Presentation", () => {
    const bentoFilePath = path.join(webSrcDir, "components/landing/bento-command-center.tsx");

    it("ensures BentoCommandCenter renders responsive grid with max-w-5xl container", () => {
      // Step 1: Read component
      const content = fs.readFileSync(bentoFilePath, "utf-8");

      expect(content).toContain("max-w-5xl");
      expect(content).toContain("grid grid-cols-1 md:grid-cols-2");
      expect(content).toContain("md:col-span-2");
      expect(content).toContain("border-red-600");
    });

    it("ensures BentoCommandCenter renders external social links with security attributes", () => {
      // Step 1: Read component
      const content = fs.readFileSync(bentoFilePath, "utf-8");

      expect(content).toContain('target="_blank"');
      expect(content).toContain('rel="noopener noreferrer"');
      expect(content).toContain("aria-label=");
      expect(content).toContain("FRECUENCIAS // OFICIALES");
    });
  });

  describe("5. Layer 1: Home View Runtime Integrity", () => {
    const homeViewFilePath = path.join(webSrcDir, "components/landing/home-view.tsx");

    it("ensures HomeView does NOT render BrandStatementSection in runtime JSX", () => {
      // Step 1: Read home view component
      const content = fs.readFileSync(homeViewFilePath, "utf-8");

      // Should not contain active JSX rendering of BrandStatementSection
      expect(content).not.toMatch(new RegExp("<BrandStatementSection\\s*\/>"));
    });
  });
});
