/**
 * @file apps/web/src/lib/infrastructure/footer-data.test.ts
 * @description Unit & Contract Tests for Official Social Networks & Minimal Footer Architecture.
 * Validates Layer 4 data contracts, verified social platforms, exact URLs,
 * and Layer 1 presentation requirements for vector icons and layout.
 *
 * @spec IGW-014-FOOTER-SOCIAL-ICONS
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  OFFICIAL_SOCIAL_LINKS,
  getOfficialSocialLinks,
  type SocialLinkItem,
} from "./footer-data";

describe("Layer 4 & Layer 1: Footer Official Social Links Contract (@spec IGW-014)", () => {
  const footerPath = path.resolve(__dirname, "../../components/layout/footer.tsx");

  describe("1. Layer 4 Infrastructure: Data Integrity & Verified URLs", () => {
    it("verifies OFFICIAL_SOCIAL_LINKS contains exactly 6 official platforms", () => {
      // Step 1: Assert collection length
      expect(OFFICIAL_SOCIAL_LINKS.length).toBe(6);
    });

    it("validates exact platforms, IDs, icons and canonical URLs in exact order", () => {
      // Step 1: Expected 6 verified channels
      const expectedLinks: readonly SocialLinkItem[] = [
        {
          id: "social-instagram",
          name: "Instagram",
          href: "https://www.instagram.com/industrialgirlsmusic/",
          icon: "instagram",
          ariaLabel: "Seguir a Industrial Girls en Instagram",
        },
        {
          id: "social-soundcloud",
          name: "SoundCloud",
          href: "https://soundcloud.com/industrial_girls",
          icon: "soundcloud",
          ariaLabel: "Escuchar Industrial Girls en SoundCloud",
        },
        {
          id: "social-youtube",
          name: "YouTube",
          href: "https://www.youtube.com/@industrialgirls4388",
          icon: "youtube",
          ariaLabel: "Ver Industrial Girls en YouTube",
        },
        {
          id: "social-facebook",
          name: "Facebook",
          href: "https://www.facebook.com/Industrialgirlsmusic.col/",
          icon: "facebook",
          ariaLabel: "Seguir a Industrial Girls en Facebook",
        },
        {
          id: "social-beatport",
          name: "Beatport",
          href: "https://www.beatport.com/es/label/industrial-girls/106032",
          icon: "beatport",
          ariaLabel: "Catálogo de Industrial Girls en Beatport",
        },
        {
          id: "social-bandcamp",
          name: "Bandcamp",
          href: "https://industrialgirls.bandcamp.com/music",
          icon: "bandcamp",
          ariaLabel: "Comprar música en Industrial Girls Bandcamp",
        },
      ];

      // Step 2: Assert each platform strictly matches
      expectedLinks.forEach((expected, index) => {
        const actual = OFFICIAL_SOCIAL_LINKS[index];
        expect(actual.id).toBe(expected.id);
        expect(actual.name).toBe(expected.name);
        expect(actual.href).toBe(expected.href);
        expect(actual.icon).toBe(expected.icon);
        expect(actual.ariaLabel).toBe(expected.ariaLabel);
      });
    });

    it("verifies all external URLs are pure raw strings without markdown link brackets", () => {
      // Step 1: Iterate over all links and check format
      OFFICIAL_SOCIAL_LINKS.forEach((item) => {
        expect(item.href.startsWith("https://")).toBe(true);
        expect(item.href).not.toContain("[");
        expect(item.href).not.toContain("]");
        expect(item.href).not.toContain("(");
        expect(item.href).not.toContain(")");
      });
    });

    it("verifies getOfficialSocialLinks returns a defensive copy", () => {
      // Step 1: Retrieve links copy
      const links = getOfficialSocialLinks();
      expect(links.length).toBe(6);

      // Step 2: Mutate copy and verify original is unaffected
      links.pop();
      expect(links.length).toBe(5);
      expect(getOfficialSocialLinks().length).toBe(6);
    });
  });

  describe("2. Layer 1 Presentation: Minimal Footer UI & Vector Icons Contract", () => {
    it("verifies footer component source exists and imports footer-data", () => {
      expect(fs.existsSync(footerPath), "footer.tsx must exist").toBe(true);
      const content = fs.readFileSync(footerPath, "utf-8");
      expect(content).toContain("getOfficialSocialLinks");
    });

    it("certifies complete purge of bracketed textual labels in social links", () => {
      // Step 1: Read footer component source
      const content = fs.readFileSync(footerPath, "utf-8");

      // Step 2: Assert absence of bracketed text
      expect(content).not.toContain("[ SOUNDCLOUD ]");
      expect(content).not.toContain("[ BEATPORT ]");
      expect(content).not.toContain("[ SPOTIFY ]");
      expect(content).not.toContain("[ YOUTUBE ]");
      expect(content).not.toContain("[ INSTAGRAM ]");
      expect(content).not.toContain("[ TELEGRAM ]");
    });

    it("validates vector icon layout container classes (gap-4 md:gap-5 flex items-center justify-center flex-wrap)", () => {
      // Step 1: Read footer component source
      const content = fs.readFileSync(footerPath, "utf-8");

      // Step 2: Assert container layout classes
      expect(content).toContain("gap-4 md:gap-5 flex items-center justify-center flex-wrap");
    });

    it("validates upgraded icon scale (w-6 h-6) and padded interactive circular container", () => {
      // Step 1: Read footer component source
      const content = fs.readFileSync(footerPath, "utf-8");

      // Step 2: Assert icon sizing and padded interactive container classes
      expect(content).toContain("w-6 h-6");
      expect(content).toContain("p-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm");
      expect(content).toContain("text-neutral-300 opacity-80 transition-all duration-300 ease-out");
    });

    it("validates premium hover microinteractions with brand red glow", () => {
      // Step 1: Read footer component source
      const content = fs.readFileSync(footerPath, "utf-8");

      // Step 2: Assert hover states
      expect(content).toContain("hover:scale-115 hover:opacity-100");
      expect(content).toContain("hover:text-red-500 hover:border-red-600/70 hover:bg-red-950/20");
      expect(content).toContain("hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]");
    });

    it("validates all 6 platforms contain target='_blank', rel='noopener noreferrer' and aria-label", () => {
      // Step 1: Read footer component source
      const content = fs.readFileSync(footerPath, "utf-8");

      // Step 2: Assert mandatory security attributes
      expect(content).toContain('target="_blank"');
      expect(content).toContain('rel="noopener noreferrer"');
      expect(content).toContain("aria-label=");
    });

    it("validates left copyright text is strictly preserved", () => {
      // Step 1: Read footer component source
      const content = fs.readFileSync(footerPath, "utf-8");

      // Step 2: Assert exact copyright branding
      expect(content).toContain("© 2026 INDUSTRIAL GIRLS // ALL RIGHTS RESERVED.");
    });
  });
});
