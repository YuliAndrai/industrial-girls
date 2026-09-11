/**
 * @file apps/web/src/lib/infrastructure/events-catalog.test.ts
 * @description Layer 4 / Tests: Master TDD test suite for Events Hero Refactor & Curated Dates Architecture.
 *
 * Architectural Boundaries & Layer Roles:
 * - Layer 4 (Infrastructure): Validates CALENDAR_STATUS copy invariants (topBadge, headline, curatorialNote, statusCallout).
 * - Layer 3 (Domain / Pipelines): Validates validateGeographicCapture pipeline handling of optional phone contact data.
 * - Layer 1 (Presentation): Validates single semantic H1 and hero copy bindings on /eventos route view.
 *
 * @spec IGW-010-EVENTS-HERO-CURATED-DATES
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import {
  CALENDAR_STATUS,
  getEventCalendarStatus,
  EventCalendarStatus,
} from "./events-catalog";
import {
  validateGeographicCapture,
  GeographicCaptureInput,
} from "../pipelines/geographic-capture-pipeline";

describe("Events Hero & Curated Dates Architecture — TDD Test Suite (@spec IGW-010)", () => {
  describe("1. Layer 4 (Infrastructure): CALENDAR_STATUS Copy Invariants", () => {
    it("exports canonical curated dates copy in CALENDAR_STATUS constant", () => {
      // Step 1: Reference status constant
      const status: EventCalendarStatus = CALENDAR_STATUS;

      // Step 2: Verify topBadge invariant
      expect(status.topBadge).toBe("// SELECTIVE DATES & CLUB SESSIONS //");

      // Step 3: Verify headline invariant
      expect(status.headline).toBe("SHOWCASES & FECHAS SELECCIONADAS");

      // Step 4: Verify curatorialNote invariant
      expect(status.curatorialNote).toBe(
        "Conexiones entre cabinas, clubs y residencias underground en desarrollo. Curadurías directas para la pista de baile."
      );

      // Step 5: Verify statusCallout invariant
      expect(status.statusCallout).toBe(
        "[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]"
      );
    });

    it("returns consistent status object via getEventCalendarStatus provider", () => {
      // Step 1: Retrieve calendar status through accessor function
      const status: EventCalendarStatus = getEventCalendarStatus();

      // Step 2: Assert parity with constant exports
      expect(status.headline).toBe("SHOWCASES & FECHAS SELECCIONADAS");
      expect(status.topBadge).toBe("// SELECTIVE DATES & CLUB SESSIONS //");
      expect(status.statusCallout).toBe(
        "[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]"
      );
    });
  });

  describe("2. Layer 3 (Domain / Pipelines): validateGeographicCapture with Optional Phone", () => {
    it("validates successfully when optional phone is omitted", () => {
      // Step 1: Prepare valid input without phone
      const input: GeographicCaptureInput = {
        email: "distorta@industrialgirls.com",
        name: "DISTORTA",
        country: "Colombia",
        city: "Bogotá",
        source: "events",
      };

      // Step 2: Execute validation pipeline
      const result = validateGeographicCapture(input);

      // Step 3: Assert valid state with empty error map
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it("validates successfully when valid international phone is provided", () => {
      // Step 1: Prepare valid input with formatted phone number
      const input: GeographicCaptureInput = {
        email: "resident@industrialgirls.com",
        name: "CLARA CUVÉ",
        country: "Alemania",
        city: "Berlín",
        source: "events",
        phone: "+4915123456789",
      };

      // Step 2: Execute validation pipeline
      const result = validateGeographicCapture(input);

      // Step 3: Assert valid state without phone errors
      expect(result.isValid).toBe(true);
      expect(result.errors.phone).toBeUndefined();
    });

    it("fails validation when an invalid phone number format is supplied", () => {
      // Step 1: Prepare payload with malformed phone string
      const input: GeographicCaptureInput = {
        email: "clubber@industrialgirls.com",
        name: "RAVE ATTENDEE",
        country: "España",
        city: "Madrid",
        source: "events",
        phone: "invalid-phone-string",
      };

      // Step 2: Execute validation pipeline
      const result = validateGeographicCapture(input as GeographicCaptureInput);

      // Step 3: Assert validation rejection and field-level error message
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBeDefined();
    });
  });

  describe("3. Layer 1 (Presentation): Route View /eventos Semantic & Hero Invariants", () => {
    const eventosViewPath = path.resolve(
      __dirname,
      "../../app/eventos/eventos-view.tsx"
    );

    it("ensures exactly one semantic <h1> element exists in /eventos presentation view", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(eventosViewPath, "utf8");

      // Step 2: Scan for <h1> tags
      const h1Matches = content.match(/<h1[\s>]/g) || [];

      // Step 3: Enforce single H1 rule for SEO and accessibility
      expect(h1Matches.length).toBe(1);
    });

    it("ensures /eventos view binds to the curated dates hero copy elements", () => {
      // Step 1: Read view component source file
      const content = fs.readFileSync(eventosViewPath, "utf8");

      // Step 2: Verify hero top badge binds to selective dates copy or property
      const hasTopBadge =
        content.includes("// SELECTIVE DATES & CLUB SESSIONS //") ||
        content.includes("calendarStatus.topBadge");
      expect(
        hasTopBadge,
        "eventos-view.tsx must render '// SELECTIVE DATES & CLUB SESSIONS //' or calendarStatus.topBadge"
      ).toBe(true);

      // Step 3: Verify status callout badge binds to active season copy or property
      const hasStatusCallout =
        content.includes("[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]") ||
        content.includes("calendarStatus.statusCallout");
      expect(
        hasStatusCallout,
        "eventos-view.tsx must render '[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]' or calendarStatus.statusCallout"
      ).toBe(true);

      // Step 4: Verify geographic form subtitle communicates selective dates notification
      const hasPresaleSubtitle =
        content.includes("Notificarme de nuevas fechas y preventas exclusivas en mi ciudad") ||
        content.includes("alertas secretas de locación y accesos de preventa");
      expect(
        hasPresaleSubtitle,
        "eventos-view.tsx must configure GeographicForm with curated city notification subtitle"
      ).toBe(true);
    });
  });
});
