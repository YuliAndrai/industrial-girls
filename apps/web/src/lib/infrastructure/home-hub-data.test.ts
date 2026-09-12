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
    it("ensures HOME_HUB_CARDS exports exactly 6 ecosystem destination cards", () => {
      // Step 1: Validate length
      expect(HOME_HUB_CARDS).toHaveLength(6);
      expect(getHomeHubCards()).toHaveLength(6);
    });

    it("verifies sequential codes '01' through '06' across all hub cards", () => {
      // Step 1: Validate sequential two-digit codes
      const codes = HOME_HUB_CARDS.map((c) => c.code);
      expect(codes).toEqual(["01", "02", "03", "04", "05", "06"]);
    });

    it("verifies exact canonical destination targets and order for all 6 cards", () => {
      // Step 1: Match expected routing destinations in exact order
      const expectedCatalog = [
        {
          code: "01",
          id: "hub-agency",
          title: "CAMPAÑA DE LANZAMIENTO & AGENCIA",
          subtitle: "Estrategia integral de estreno, pitch editorial, registro y desarrollo 360°",
          href: "/desarrollo-artistico#servicios",
          badge: "FLAGSHIP",
          isFlagship: true,
        },
        {
          code: "02",
          id: "hub-events",
          title: "EVENTOS",
          subtitle: "Showcases, carteles anteriores y radar de preventas por ciudad",
          href: "/eventos",
        },
        {
          code: "03",
          id: "hub-music",
          title: "MÚSICA",
          subtitle: "Catálogo de lanzamientos VA 001 - 005, podcasts y demo drop",
          href: "/musica",
        },
        {
          code: "04",
          id: "hub-archive",
          title: "ARCHIVO",
          subtitle: "Directorio de más de 30 artistas, fototeca y registros en video",
          href: "/archivo",
        },
        {
          code: "05",
          id: "hub-community",
          title: "COMUNIDAD",
          subtitle: "Magazine editorial, investigación de vanguardia y debate",
          href: "/comunidad",
        },
        {
          code: "06",
          id: "hub-telegram",
          title: "GRUPO TELEGRAM",
          subtitle: "Canal oficial y acceso prioritario a la red directa",
          href: "https://t.me/industrialgirls",
          badge: "COMMUNITY",
          isExternal: true,
        },
      ];

      HOME_HUB_CARDS.forEach((card, idx) => {
        const expected = expectedCatalog[idx];
        expect(card.code).toBe(expected.code);
        expect(card.id).toBe(expected.id);
        expect(card.title).toBe(expected.title);
        expect(card.subtitle).toBe(expected.subtitle);
        expect(card.href).toBe(expected.href);
        if (expected.badge) {
          expect(card.badge).toBe(expected.badge);
        }
        if (expected.isFlagship) {
          expect(card.isFlagship).toBe(true);
        }
        if (expected.isExternal) {
          expect(card.isExternal).toBe(true);
        }
      });
    });

    it("validates Card 01 as Flagship Primary Service (Campaña de Lanzamiento & Agencia)", () => {
      // Step 1: Find card 01
      const flagshipCard = HOME_HUB_CARDS.find((c) => c.code === "01");
      expect(flagshipCard).toBeDefined();
      expect(flagshipCard?.isFlagship).toBe(true);
      expect(flagshipCard?.badge).toBe("FLAGSHIP");
      expect(flagshipCard?.title).toBe("CAMPAÑA DE LANZAMIENTO & AGENCIA");
      expect(flagshipCard?.href).toBe("/desarrollo-artistico#servicios");
    });

    it("validates Card 06 as External Community Telegram Channel", () => {
      // Step 1: Find card 06
      const telegramCard = HOME_HUB_CARDS.find((c) => c.code === "06");
      expect(telegramCard).toBeDefined();
      expect(telegramCard?.isExternal).toBe(true);
      expect(telegramCard?.badge).toBe("COMMUNITY");
      expect(telegramCard?.title).toBe("GRUPO TELEGRAM");
      expect(telegramCard?.href).toBe("https://t.me/industrialgirls");
      expect(telegramCard?.href).not.toContain("[");
      expect(telegramCard?.href).not.toContain("]");
    });

    it("ensures other cards (02-06) are not flagged as flagship", () => {
      // Step 1: Validate flagship exclusivity
      const nonFlagshipCards = HOME_HUB_CARDS.filter((c) => c.code !== "01");
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

    it("ensures BentoCommandCenter renders vertical stacked layout with max-w-xl container", () => {
      // Step 1: Read component
      const content = fs.readFileSync(bentoFilePath, "utf-8");

      expect(content).toContain("max-w-xl");
      expect(content).toContain("space-y-3");
      expect(content).toContain("border-red-600/70");
      expect(content).toContain("rounded-none");
    });

    it("ensures BentoCommandCenter renders internal Next.js Links and external anchors", () => {
      // Step 1: Read component
      const content = fs.readFileSync(bentoFilePath, "utf-8");

      expect(content).toContain("<Link");
      expect(content).toContain('target="_blank"');
      expect(content).toContain('rel="noopener noreferrer"');
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
