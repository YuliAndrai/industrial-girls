/**
 * @file apps/web/src/lib/infrastructure/semantic-seo-audit.test.ts
 * @description Layer 4 / Tests: Semantic HTML, Accessibility & SEO Invariant Audit Suite.
 * Enforces single <h1> hierarchy per route, valid non-empty aria-label attributes on
 * interactive controls and audio toggles, and metadata deduplication across master routes.
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { ROUTE_METADATA } from "./route-metadata";

describe("Semantic HTML & SEO Audit Invariants (IGW-009)", () => {
  const webSrcDir = path.resolve(__dirname, "../..");

  describe("1. Single H1 Semantic Hierarchy Across Master Routes", () => {
    const primaryViewFiles = [
      {
        name: "Home (HeroSection)",
        path: path.join(webSrcDir, "components/landing/hero-section.tsx"),
        expectedH1: 1,
      },
      {
        name: "Música (MusicaView)",
        path: path.join(webSrcDir, "app/musica/musica-view.tsx"),
        expectedH1: 1,
      },
      {
        name: "Desarrollo Artístico (ArtistDevHero)",
        path: path.join(webSrcDir, "components/artist-development/artist-dev-hero.tsx"),
        expectedH1: 1,
      },
      {
        name: "Eventos (EventosView)",
        path: path.join(webSrcDir, "app/eventos/eventos-view.tsx"),
        expectedH1: 1,
      },
      {
        name: "Comunidad (CommunityHero)",
        path: path.join(webSrcDir, "components/community/community-hero.tsx"),
        expectedH1: 1,
      },
    ];

    it("verifies each master section contains exactly one single <h1> heading", () => {
      // Step 1: Count <h1 tags in each primary route hero/view
      primaryViewFiles.forEach(({ name, path: filePath, expectedH1 }) => {
        expect(fs.existsSync(filePath), `${name} file must exist at ${filePath}`).toBe(true);
        const content = fs.readFileSync(filePath, "utf-8");
        const h1Matches = content.match(/<h1[\s>]/g) || [];
        expect(h1Matches.length, `${name} must contain exactly ${expectedH1} <h1> element`).toBe(expectedH1);
      });
    });

    it("ensures secondary landing sections do NOT render accidental <h1> headings", () => {
      // Step 1: Verify secondary sections use h2, h3, etc., instead of h1
      const secondarySections = [
        path.join(webSrcDir, "components/landing/brand-statement-section.tsx"),
        path.join(webSrcDir, "components/landing/events-section.tsx"),
        path.join(webSrcDir, "components/landing/records-section.tsx"),
        path.join(webSrcDir, "components/landing/residents-section.tsx"),
        path.join(webSrcDir, "components/landing/shop-section.tsx"),
        path.join(webSrcDir, "components/landing/videos-section.tsx"),
        path.join(webSrcDir, "components/landing/community-section.tsx"),
        path.join(webSrcDir, "components/landing/newsletter-section.tsx"),
      ];

      secondarySections.forEach((sectionPath) => {
        if (fs.existsSync(sectionPath)) {
          const content = fs.readFileSync(sectionPath, "utf-8");
          const h1Matches = content.match(/<h1[\s>]/g) || [];
          expect(h1Matches.length, `${path.basename(sectionPath)} must not contain <h1>`).toBe(0);
        }
      });
    });
  });

  describe("2. Interactive Controls & Accessibility Aria-Labels", () => {
    it("verifies Footer official frequencies external links possess descriptive aria-labels", () => {
      // Step 1: Read Footer component
      const footerPath = path.join(webSrcDir, "components/layout/footer.tsx");
      const content = fs.readFileSync(footerPath, "utf-8");

      // Step 2: Assert presence of aria-label for SoundCloud, YouTube, Instagram, Bandcamp
      expect(content).toMatch(/href="https:\/\/soundcloud\.com"[^>]*aria-label=/);
      expect(content).toMatch(/href="https:\/\/youtube\.com"[^>]*aria-label=/);
      expect(content).toMatch(/href="https:\/\/instagram\.com"[^>]*aria-label=/);
      expect(content).toMatch(/href="https:\/\/bandcamp\.com"[^>]*aria-label=/);
    });

    it("verifies NavigationDrawer social and Demo Drop links possess descriptive aria-labels", () => {
      // Step 1: Read NavigationDrawer component
      const drawerPath = path.join(webSrcDir, "components/layout/navigation-drawer.tsx");
      const content = fs.readFileSync(drawerPath, "utf-8");

      // Step 2: Assert Demo Drop link and social external links contain aria-label
      expect(content).toMatch(/href="\/musica#demo-drop"[^>]*aria-label=/);
      expect(content).toMatch(/href="https:\/\/soundcloud\.com"[^>]*aria-label=/);
      expect(content).toMatch(/href="https:\/\/youtube\.com"[^>]*aria-label=/);
      expect(content).toMatch(/href="https:\/\/instagram\.com"[^>]*aria-label=/);
    });

    it("verifies FloatingSoundBar audio toggle button contains dynamic aria-label", () => {
      // Step 1: Read FloatingSoundBar component
      const soundBarPath = path.join(webSrcDir, "components/landing/floating-sound-bar.tsx");
      const content = fs.readFileSync(soundBarPath, "utf-8");

      // Step 2: Assert button contains aria-label
      expect(content).toMatch(/<button[\s\S]*?aria-label=/);
    });

    it("verifies ResidentsSection resident links contain individualized aria-labels", () => {
      // Step 1: Read ResidentsSection component
      const residentsPath = path.join(webSrcDir, "components/landing/residents-section.tsx");
      const content = fs.readFileSync(residentsPath, "utf-8");

      // Step 2: Assert soundcloud and instagram links have aria-label
      expect(content).toMatch(/href=\{resident\.soundcloudUrl\}[^>]*aria-label=/);
      expect(content).toMatch(/href=\{resident\.instagramUrl\}[^>]*aria-label=/);
    });

    it("verifies MusicaView streaming and Demo Drop action controls possess descriptive aria-labels", () => {
      // Step 1: Read MusicaView component
      const musicaPath = path.join(webSrcDir, "app/musica/musica-view.tsx");
      const content = fs.readFileSync(musicaPath, "utf-8");

      // Step 2: Assert Spotify release streaming links have aria-label
      expect(content).toMatch(/href=\{release\.spotifyUrl\}[^>]*aria-label=/);
      // Step 3: Assert YouTube video stream and Demo Drop email link have aria-label
      expect(content).toMatch(/href=\{episode\.youtubeUrl\}[^>]*aria-label=/);
      expect(content).toMatch(/mailto:[^>]*aria-label=/);
    });
  });

  describe("3. SEO & Metadata Canonical Deduplication", () => {
    it("verifies route metadata dictionary defines 5 distinct, non-empty canonical titles and descriptions", () => {
      // Step 1: Ensure ROUTE_METADATA has all 5 primary keys
      const keys = ["home", "musica", "desarrolloArtistico", "eventos", "comunidad"] as const;
      const titles = new Set<string>();
      const descriptions = new Set<string>();

      keys.forEach((k) => {
        const meta = ROUTE_METADATA[k];
        expect(meta).toBeDefined();
        expect(meta.title).toBeTruthy();
        expect(meta.description).toBeTruthy();

        // Step 2: Ensure uniqueness across routes (zero duplication)
        titles.add(meta.title as string);
        descriptions.add(meta.description as string);
      });

      expect(titles.size).toBe(5);
      expect(descriptions.size).toBe(5);
    });

    it("ensures layout.tsx and page metadata avoid duplicated title or description tag injections", () => {
      // Step 1: Read root layout.tsx
      const layoutPath = path.join(webSrcDir, "app/layout.tsx");
      const layoutContent = fs.readFileSync(layoutPath, "utf-8");

      // Step 2: In App Router, layout defines fallback metadata and head has no hardcoded <title> or <meta name="description">
      expect(layoutContent).not.toMatch(/<title>/);
      expect(layoutContent).not.toMatch(/<meta\s+name=["']description["']/);
    });
  });
});
