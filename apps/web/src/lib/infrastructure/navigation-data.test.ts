/**
 * @file apps/web/src/lib/infrastructure/navigation-data.test.ts
 * @description Layer 4 & Layer 1 Test Suite - Master Navigation Architecture & Subsection Anchors.
 * Validates the typed navigation catalog, 5 master routes, deep-link anchor contracts,
 * and presentation integration in Header and NavigationDrawer.
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  MAIN_NAV_ITEMS,
  getMainNavItems,
  NavItem,
  SubNavItem,
} from "./navigation-data";
import { SERVICES_CATALOG } from "./services-data";

describe("Layer 4: Master Navigation Data Catalog Contract", () => {
  // Step 1: Validate master items count and integrity
  it("contains exactly 5 master platform navigation items", () => {
    expect(MAIN_NAV_ITEMS).toHaveLength(5);
    expect(getMainNavItems()).toHaveLength(5);
  });

  it("contains all 5 canonical routes in correct hierarchy", () => {
    const expectedRoutes = [
      "/musica",
      "/desarrollo-artistico",
      "/eventos",
      "/archivo",
      "/comunidad",
    ];

    const actualRoutes = MAIN_NAV_ITEMS.map((item) => item.href);
    expect(actualRoutes).toEqual(expectedRoutes);
  });

  // Step 2: Validate route 01 - Música
  it("validates /musica section label and deep-link subsections", () => {
    const musica = MAIN_NAV_ITEMS.find((item) => item.href === "/musica");
    expect(musica).toBeDefined();
    expect(musica?.label).toBe("MÚSICA");
    expect(musica?.subSections).toEqual([
      { label: "RELEASES & VA'S", href: "/musica#releases" },
      { label: "PODCAST'S", href: "/musica#podcasts" },
      { label: "DEMO DROP // ENVIAR", href: "/musica#demo-drop" },
    ]);
  });

  // Step 3: Validate route 02 - Desarrollo Artístico
  it("validates /desarrollo-artistico section label and deep-link subsections", () => {
    const dev = MAIN_NAV_ITEMS.find((item) => item.href === "/desarrollo-artistico");
    expect(dev).toBeDefined();
    expect(dev?.label).toBe("DESARROLLO ARTÍSTICO");
    expect(dev?.subSections).toEqual([
      { label: "CATÁLOGO DE SERVICIOS", href: "/desarrollo-artistico#servicios" },
      { label: "MIGRACIÓN & ESTUDIO", href: "/desarrollo-artistico#flujos-estudio" },
      { label: "DIAGNÓSTICO ARTÍSTICO", href: "/desarrollo-artistico#diagnostico" },
    ]);
  });

  // Step 4: Validate route 03 - Eventos
  it("validates /eventos section label and deep-link subsections", () => {
    const eventos = MAIN_NAV_ITEMS.find((item) => item.href === "/eventos");
    expect(eventos).toBeDefined();
    expect(eventos?.label).toBe("EVENTOS");
    expect(eventos?.subSections).toEqual([
      { label: "CALENDARIO & SHOWCASES", href: "/eventos#calendario" },
      { label: "PREVENTAS & ALERTAS POR CIUDAD", href: "/eventos#radar" },
    ]);
  });

  // Step 5: Validate route 04 - Archivo
  it("validates /archivo section label and deep-link subsections", () => {
    const archivo = MAIN_NAV_ITEMS.find((item) => item.href === "/archivo");
    expect(archivo).toBeDefined();
    expect(archivo?.label).toBe("ARCHIVO");
    expect(archivo?.subSections).toEqual([
      { label: "ARTISTAS EN EVENTOS & LABEL", href: "/archivo#roster" },
      { label: "GALERÍA VISUAL", href: "/archivo#galeria" },
      { label: "VIDEOS & REGISTRO MULTICÁMARA", href: "/archivo#videos" },
    ]);
  });

  // Step 6: Validate route 05 - Comunidad
  it("validates /comunidad section label and deep-link subsections", () => {
    const comunidad = MAIN_NAV_ITEMS.find((item) => item.href === "/comunidad");
    expect(comunidad).toBeDefined();
    expect(comunidad?.label).toBe("COMUNIDAD");
    expect(comunidad?.subSections).toEqual([
      { label: "JOURNAL & INVESTIGACIÓN", href: "/comunidad#journal" },
      { label: "DEBATE & FORO TÉCNICO", href: "/comunidad#foro" },
      { label: "RED GLOBAL & TELEGRAM", href: "/comunidad#red" },
    ]);
  });
});

describe("Layer 1: View Anchors & Deep-Link Destination Verification", () => {
  const rootSrc = path.resolve(__dirname, "../..");

  // Step 7: Verify anchor IDs on /musica
  it("verifies /musica view contains #releases, #podcasts, and #demo-drop target IDs", () => {
    const musicaFile = path.join(rootSrc, "app/musica/musica-view.tsx");
    const content = fs.readFileSync(musicaFile, "utf-8");

    expect(content).toContain('id="releases"');
    expect(content).toContain('id="podcasts"');
    expect(content).toContain('id="demo-drop"');
  });

  // Step 8: Verify anchor IDs on /desarrollo-artistico
  it("verifies /desarrollo-artistico components contain #servicios, #flujos-estudio, and #diagnostico target IDs", () => {
    const servicesFile = path.join(rootSrc, "components/artist-development/services-grid.tsx");
    const diagnosticFile = path.join(rootSrc, "components/artist-development/intake-diagnostic-form.tsx");

    const servicesContent = fs.readFileSync(servicesFile, "utf-8");
    const diagnosticContent = fs.readFileSync(diagnosticFile, "utf-8");

    expect(servicesContent).toContain('id="servicios"');
    expect(servicesContent).toContain("id={service.id}");
    expect(SERVICES_CATALOG.some((service) => service.id === "flujos-estudio")).toBe(true);
    expect(diagnosticContent).toContain('id="diagnostico"');
  });

  // Step 9: Verify anchor IDs on /eventos
  it("verifies /eventos view contains #calendario and #radar target IDs", () => {
    const eventosFile = path.join(rootSrc, "app/eventos/eventos-view.tsx");
    const content = fs.readFileSync(eventosFile, "utf-8");

    expect(content).toContain('id="calendario"');
    expect(content).toContain('id="radar"');
  });

  // Step 10: Verify anchor IDs on /archivo
  it("verifies /archivo view contains #roster, #galeria, and #videos target IDs", () => {
    const archivoFile = path.join(rootSrc, "app/archivo/archivo-view.tsx");
    const content = fs.readFileSync(archivoFile, "utf-8");

    expect(content).toContain('id="roster"');
    expect(content).toContain('id="galeria"');
    expect(content).toContain('id="videos"');
  });

  // Step 11: Verify anchor IDs on /comunidad
  it("verifies /comunidad view contains #journal, #foro, and #red target IDs", () => {
    const comunidadFile = path.join(rootSrc, "app/comunidad/comunidad-view.tsx");
    const subscriptionFile = path.join(rootSrc, "components/community/community-subscription.tsx");

    const comunidadContent = fs.readFileSync(comunidadFile, "utf-8");
    const subscriptionContent = fs.readFileSync(subscriptionFile, "utf-8");

    expect(comunidadContent).toContain('id="journal"');
    expect(comunidadContent).toContain('id="foro"');
    expect(subscriptionContent).toContain('id="red"');
  });
});

describe("Layer 1: Header Dropdown & Drawer Accordion Presentation Contracts", () => {
  const rootSrc = path.resolve(__dirname, "../..");

  // Step 12: Verify Header dropdown implementation
  it("verifies Header component renders interactive dropdown flyout markup", () => {
    const headerFile = path.join(rootSrc, "components/layout/header.tsx");
    const content = fs.readFileSync(headerFile, "utf-8");

    expect(content).toContain("getMainNavItems");
    expect(content).toContain("relative group");
    expect(content).toContain("min-w-[240px]");
    expect(content).toContain("backdrop-blur-md");
  });

  // Step 13: Verify NavigationDrawer accordion implementation
  it("verifies NavigationDrawer renders collapsible accordion with aria-expanded and subsections", () => {
    const drawerFile = path.join(rootSrc, "components/layout/navigation-drawer.tsx");
    const content = fs.readFileSync(drawerFile, "utf-8");

    expect(content).toContain("getMainNavItems");
    expect(content).toContain("expandedSection");
    expect(content).toContain("aria-expanded={isExpanded}");
    expect(content).toContain("[ − ]");
    expect(content).toContain("[ + ]");
  });
});
