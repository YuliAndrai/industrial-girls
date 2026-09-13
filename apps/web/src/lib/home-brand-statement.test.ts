/**
 * @file apps/web/src/lib/home-brand-statement.test.ts
 * @description Unit and integration tests for Home Page Hero & Brand Statement Refactor (IGW-005).
 * Tests brand catalog data integrity, hashtag accuracy, route contracts, and file integration.
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  BRAND_HASHTAGS,
  BRAND_STATEMENT,
  QUICK_EXPLORATION_LINKS,
} from "./infrastructure/brand-catalog";

describe("Home Page Hero & Brand Statement Suite (IGW-005)", () => {
  describe("Layer 4: Brand Catalog Data Integrity", () => {
    it("should export exactly the 3 approved official hashtags", () => {
      expect(BRAND_HASHTAGS).toHaveLength(3);
      const tags = BRAND_HASHTAGS.map((h) => h.tag);
      expect(tags).toEqual(["#IndustrialGirls", "#TechnoGirls", "#HardGirls"]);
    });

    it("should confirm the heavy uppercase header was eliminated from the minimalist statement", () => {
      expect(BRAND_STATEMENT.subtitle).toBe("");
    });

    it("should export the exact two paragraphs for the minimalist brand statement", () => {
      expect(BRAND_STATEMENT.paragraphs).toHaveLength(2);
      expect(BRAND_STATEMENT.paragraphs[0]).toBe(
        "Industrial Girls Music es una plataforma de música electrónica, sello discográfico y serie de eventos especializada en techno, hard techno, hard dance, trance y cultura underground."
      );
      expect(BRAND_STATEMENT.paragraphs[1]).toBe(
        "A través de lanzamientos, podcasts, showcases y eventos, conecta artistas, público y comunidad dentro de la escena electrónica internacional."
      );
    });

    it("should export exactly the 3 quick exploration links with correct routes", () => {
      expect(QUICK_EXPLORATION_LINKS).toHaveLength(3);
      expect(QUICK_EXPLORATION_LINKS[0]).toEqual({
        label: "[ Explorar Música ]",
        href: "/musica",
        ariaLabel: "Navegar al catálogo de música y lanzamientos",
      });
      expect(QUICK_EXPLORATION_LINKS[1]).toEqual({
        label: "[ Desarrollo Artístico ]",
        href: "/desarrollo-artistico",
        ariaLabel: "Navegar al módulo de desarrollo artístico 360",
      });
      expect(QUICK_EXPLORATION_LINKS[2]).toEqual({
        label: "[ Archivo & Artistas ]",
        href: "/archivo",
        ariaLabel: "Navegar al archivo histórico y roster de artistas",
      });
    });
  });

  describe("Layer 1: Hero Section Code Contract", () => {
    it("should render updated hashtags in hero-section.tsx and remove obsolete hashtags", () => {
      const heroPath = path.resolve(
        process.cwd(),
        "apps/web/src/components/landing/hero-section.tsx"
      );
      const heroContent = fs.readFileSync(heroPath, "utf-8");

      // Verify new hashtags are present
      expect(heroContent).toContain("#IndustrialGirls");
      expect(heroContent).toContain("#TechnoGirls");
      expect(heroContent).toContain("#HardGirls");

      // Verify deprecated hashtags are removed
      expect(heroContent).not.toContain("#HARDTECHNO");
      expect(heroContent).not.toContain("#FUTURESOUNDSOFTECHNO");
    });

    it("should preserve the exact slogan text and styling in hero-section.tsx without changes", () => {
      const heroPath = path.resolve(
        process.cwd(),
        "apps/web/src/components/landing/hero-section.tsx"
      );
      const heroContent = fs.readFileSync(heroPath, "utf-8");

      // Invariant: Slogan and its exact styling classes must remain identical
      expect(heroContent).toContain("TALENTO, IDENTIDAD");
      expect(heroContent).toContain("REVOLUCIÓN SONORA");
      expect(heroContent).toContain(
        'className="max-w-5xl text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"'
      );
      expect(heroContent).toContain(
        'className="text-raveRed drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]"'
      );
    });
  });

  describe("Layer 1: Brand Statement Section Contract", () => {
    it("should eliminate heavy uppercase header and render balanced text-lg/text-xl typography with left red accent line", () => {
      const statementPath = path.resolve(
        process.cwd(),
        "apps/web/src/components/landing/brand-statement-section.tsx"
      );
      const content = fs.readFileSync(statementPath, "utf-8");

      // Verify removal of heavy all-caps header and old dense paragraphs
      expect(content).not.toContain("UNA PLATAFORMA CURADA QUE IMPULSA");
      expect(content).not.toContain("PLATAFORMA CURADA & MOVIMIENTO CULTURAL");

      // Verify removal of direct navigation row
      expect(content).not.toContain("NAVEGACIÓN DIRECTA");
      expect(content).not.toContain("QUICK_EXPLORATION_LINKS");

      // Verify optimized typography and vertical red accent line
      expect(content).toContain("text-lg sm:text-xl");
      expect(content).toContain("border-l-2 border-raveRed/60");
      expect(content).toContain("bg-black");
    });
  });

  describe("Layer 1: Header Responsive Navigation Contract", () => {
    it("should hide menu button on desktop (lg:hidden) and show 5 master routes on lg:flex", () => {
      const headerPath = path.resolve(
        process.cwd(),
        "apps/web/src/components/layout/header.tsx"
      );
      const content = fs.readFileSync(headerPath, "utf-8");

      // Verify menu trigger button is hidden on desktop (>= 1024px)
      expect(content).toContain('className="lg:hidden"');

      // Verify master routes are hidden on mobile and visible on desktop
      expect(content).toContain("hidden items-center gap-5 xl:gap-7 lg:flex");

      // Verify [ ENVIAR DEMO ] button is present
      expect(content).toContain("[ ENVIAR DEMO ]");
    });
  });

  describe("Layer 1: Home Page Integration Contract", () => {
    it("should mount BrandStatementSection in apps/web/src/app/page.tsx immediately after HeroSection", () => {
      const pagePath = path.resolve(
        process.cwd(),
        "apps/web/src/app/page.tsx"
      );
      const pageContent = fs.readFileSync(pagePath, "utf-8");

      expect(pageContent).toContain("BrandStatementSection");
      expect(pageContent).toMatch(/<HeroSection \/>[\s\S]*?<BrandStatementSection \/>/);
    });
  });
});
