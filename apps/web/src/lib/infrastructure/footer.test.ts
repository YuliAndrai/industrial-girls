/**
 * @file apps/web/src/lib/infrastructure/footer.test.ts
 * @description Layer 1 Presentation Test Suite - Minimal Industrial Footer Contract.
 * Validates the ultra-streamlined single-row technical footer layout,
 * copyright declaration, 6 verified vector social icons, and security attributes.
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

    // Step 5: Assert absence of Column 4 (legacy frequencies header and mock label)
    expect(content).not.toContain("FRECUENCIAS OFICIALES");
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

  it("validates right in-line 6 vector social icons, purge of bracketed text, and security attributes", () => {
    // Step 1: Read footer component source
    const content = fs.readFileSync(footerPath, "utf-8");

    // Step 2: Assert purge of bracketed textual labels
    expect(content).not.toContain("[ SOUNDCLOUD ]");
    expect(content).not.toContain("[ BEATPORT ]");
    expect(content).not.toContain("[ SPOTIFY ]");
    expect(content).not.toContain("[ YOUTUBE ]");
    expect(content).not.toContain("[ INSTAGRAM ]");
    expect(content).not.toContain("[ TELEGRAM ]");

    // Step 3: Assert horizontal icon layout, premium scale and microinteraction styling
    expect(content).toContain("gap-4 md:gap-5 flex items-center justify-center flex-wrap");
    expect(content).toContain("w-6 h-6");
    expect(content).toContain("p-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm");
    expect(content).toContain("hover:scale-115 hover:opacity-100");
    expect(content).toContain("hover:text-red-500 hover:border-red-600/70 hover:bg-red-950/20");
    expect(content).toContain("hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]");

    // Step 4: Assert security attributes
    expect(content).toContain('target="_blank"');
    expect(content).toContain('rel="noopener noreferrer"');
    expect(content).toContain("aria-label=");
  });
});
