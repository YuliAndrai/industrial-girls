/**
 * @file apps/web/src/lib/infrastructure/footer.test.ts
 * @description Layer 1 Presentation Test Suite - Minimal Industrial Footer Contract.
 * Validates the ultra-streamlined single-row technical footer layout,
 * copyright declaration, compact official social links, and security attributes.
 *
 * @spec IGW-013-MINIMAL-FOOTER
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Minimal Industrial Footer Architecture — Test Suite (@spec IGW-013)", () => {
  const footerPath = path.resolve(__dirname, "../../components/layout/footer.tsx");

  it("verifies footer component source exists and is non-empty", () => {
    expect(fs.existsSync(footerPath), "footer.tsx must exist").toBe(true);
    const content = fs.readFileSync(footerPath, "utf-8");
    expect(content.length).toBeGreaterThan(0);
  });

  it("certifies complete purge of legacy bulky 4-column blocks and mock merchandise", () => {
    // Step 1: Read footer component source
    const content = fs.readFileSync(footerPath, "utf-8");

    // Step 2: Assert absence of Column 1 (logo grid, long description, Berlin/Bogota tag)
    expect(content).not.toContain("industrial-girls-logo-grid.png");
    expect(content).not.toContain("Plataforma de infraestructura cultural");
    expect(content).not.toContain("TRANSMITIENDO DESDE BERLÍN & BOGOTÁ");

    // Step 3: Assert absence of Column 2 (duplicated master sections)
    expect(content).not.toContain("5 SECCIONES MAESTRAS");

    // Step 4: Assert absence of Column 3 (demo drop & merch modal trigger)
    expect(content).not.toContain("DEMO DROP & MERCH");
    expect(content).not.toContain("145-165 BPM");
    expect(content).not.toContain("MerchWaitlistModal");
    expect(content).not.toContain("Merch (Coming Soon)");

    // Step 5: Assert absence of Column 4 (legacy frequencies header and Bandcamp)
    expect(content).not.toContain("FRECUENCIAS OFICIALES");
    expect(content).not.toContain("bandcamp.com");
    expect(content).not.toContain("Industrial Girls Wax");
  });

  it("validates ultra-minimal single-row layout classes and styling", () => {
    // Step 1: Read footer component source
    const content = fs.readFileSync(footerPath, "utf-8");

    // Step 2: Assert single-row wrapper classes
    expect(content).toContain("border-t border-white/10");
    expect(content).toContain("bg-black");
    expect(content).toContain("py-6 px-4");
    expect(content).toContain("max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500");
  });

  it("validates left copyright branding text", () => {
    // Step 1: Read footer component source
    const content = fs.readFileSync(footerPath, "utf-8");

    // Step 2: Assert exact copyright text
    expect(content).toContain("© 2026 INDUSTRIAL GIRLS // ALL RIGHTS RESERVED.");
  });

  it("validates right in-line compact official networks and security attributes", () => {
    // Step 1: Read footer component source
    const content = fs.readFileSync(footerPath, "utf-8");

    // Step 2: Assert all 6 network labels exist in exact format
    expect(content).toContain("[ SOUNDCLOUD ]");
    expect(content).toContain("[ BEATPORT ]");
    expect(content).toContain("[ SPOTIFY ]");
    expect(content).toContain("[ YOUTUBE ]");
    expect(content).toContain("[ INSTAGRAM ]");
    expect(content).toContain("[ TELEGRAM ]");

    // Step 3: Assert canonical URLs
    expect(content).toContain("https://soundcloud.com/industrial_girls");
    expect(content).toContain("https://www.beatport.com/es/label/industrial-girls/106032");
    expect(content).toContain("https://open.spotify.com");
    expect(content).toContain("https://youtube.com");
    expect(content).toContain("https://instagram.com");
    expect(content).toContain("https://t.me/industrialgirls");

    // Step 4: Assert security attributes
    expect(content).toContain('target="_blank"');
    expect(content).toContain('rel="noopener noreferrer"');
    expect(content).toContain("aria-label=");
  });
});
