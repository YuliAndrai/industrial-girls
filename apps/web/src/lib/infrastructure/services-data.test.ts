/**
 * @file apps/web/src/lib/infrastructure/services-data.test.ts
 * @description Unit Test Suite for Artist Development Technical Services Catalog (Option 3 Architecture).
 * Validates 5-service catalog integrity, flagship primary flag, purge of ghost / pilares,
 * and presentation contract in services-grid.tsx.
 *
 * @spec IGW-003-SERVICES-CATALOG
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  SERVICES_CATALOG,
  getServicesCatalog,
  getServiceById,
  ServiceItem,
} from "./services-data";

describe("Artist Development Technical Services (Option 3) — Unit Test Suite", () => {
  describe("1. Layer 4: Services Catalog Contract & Integrity (@spec IGW-003-SERVICES-CATALOG)", () => {
    it("should provide exactly 6 technical services in SERVICES_CATALOG", () => {
      // Step 1: Arrange & Act
      const services = getServicesCatalog();

      // Step 2: Assert exactly 6 services
      expect(services).toHaveLength(6);
      expect(SERVICES_CATALOG).toHaveLength(6);

      const expectedIds = [
        "campana-lanzamiento",
        "plan-artistico-360",
        "legal-contratos",
        "audio-mastering",
        "infraestructura-digital",
        "flujos-estudio",
      ];
      const expectedCodes = ["01", "02", "03", "04", "05", "06"];

      services.forEach((service, index) => {
        expect(service.id).toBe(expectedIds[index]);
        expect(service.code).toBe(expectedCodes[index]);
        expect(service.title).toBeTruthy();
        expect(service.description).toBeTruthy();
        expect(service.features.length).toBeGreaterThanOrEqual(3);
      });
    });

    it("should verify that flujos-estudio is defined with code 06 and complete features", () => {
      // Step 1: Query flujos-estudio service
      const flujos = getServiceById("flujos-estudio");

      // Step 2: Assert properties
      expect(flujos).toBeDefined();
      expect(flujos?.code).toBe("06");
      expect(flujos?.title).toBe("MIGRACIÓN DE SOFTWARE & FLUJOS DE TRABAJO EN ESTUDIO");
      expect(flujos?.subtitle).toBe("Infraestructura técnica para el entorno de producción musical");
      expect(flujos?.description).toContain("Optimización y transición de DAWs");
      expect(flujos?.features).toHaveLength(4);
      expect(flujos?.features[0]).toContain("Transición y configuración avanzada entre DAWs");
    });

    it("should verify that campana-lanzamiento is designated as the flagship primary service", () => {
      // Step 1: Query flagship service
      const flagship = getServiceById("campana-lanzamiento");

      // Step 2: Assert flagship properties
      expect(flagship).toBeDefined();
      expect(flagship?.isPrimary).toBe(true);
      expect(flagship?.badge).toBe("SERVICIO INSIGNIA // FLAGSHIP");
      expect(flagship?.code).toBe("01");
      expect(flagship?.title).toBe("CAMPAÑA DE LANZAMIENTO");
      expect(flagship?.features).toContain("Estrategia de lanzamiento y cronograma de estreno");
    });

    it("should ensure that non-primary services do not have isPrimary set to true", () => {
      // Step 1: Query other services
      const secondaryServices = SERVICES_CATALOG.filter((s) => s.id !== "campana-lanzamiento");

      // Step 2: Assert isPrimary is undefined or false
      secondaryServices.forEach((service) => {
        expect(service.isPrimary).not.toBe(true);
      });
    });

    it("should strictly ensure NO entity contains the substring 'ghost' or 'pilares'", () => {
      // Step 1: Iterate through each service entity and its nested strings
      SERVICES_CATALOG.forEach((service: ServiceItem) => {
        const fullEntityText = [
          service.id,
          service.code,
          service.title,
          service.badge ?? "",
          service.description,
          ...service.features,
        ]
          .join(" ")
          .toLowerCase();

        // Step 2: Assert absence of purged terms
        expect(fullEntityText).not.toContain("ghost");
        expect(fullEntityText).not.toContain("pilares");
      });
    });

    it("should correctly find services by id and return undefined for unknown ids", () => {
      // Step 1: Find existing service
      const service = getServiceById("audio-mastering");
      expect(service).toBeDefined();
      expect(service?.code).toBe("04");

      // Step 2: Query non-existent service
      const nonExistent = getServiceById("unknown-service");
      expect(nonExistent).toBeUndefined();
    });
  });

  describe("2. Layer 1: Presentation Services Grid Console Contract (@spec IGW-003-SERVICES-UI)", () => {
    it("should render technical console header and asymmetric grid structure without purged terms", () => {
      // Step 1: Read component source
      const gridPath = path.resolve(__dirname, "../../components/artist-development/services-grid.tsx");
      const content = fs.readFileSync(gridPath, "utf-8");

      // Step 2: Assert section anchor and header copy
      expect(content).toContain('id="servicios"');
      expect(content).toContain("// INFRAESTRUCTURA B2B & CREATIVE HUB // SERVICIOS ESPECIALIZADOS");
      expect(content).toContain("CATÁLOGO DE");
      expect(content).toContain("SERVICIOS TÉCNICOS");
      expect(content).toContain(
        "Herramientas de aceleración, ingeniería de audio, soporte legal y estrategia diseñadas para productoras y selectors de la vanguardia electrónica."
      );

      // Step 3: Assert flagship styling and badge
      expect(content).toContain("[ FLAGSHIP // SERVICIO INSIGNIA ]");

      // Step 4: Assert deep-link anchor support
      expect(content).toContain("id={service.id}");

      // Step 4: Assert absolute purge of 'ghost' and 'pilares' from the component
      const lowerContent = content.toLowerCase();
      expect(lowerContent).not.toContain("ghost");
      expect(lowerContent).not.toContain("pilares");
    });
  });
});
