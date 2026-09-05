/**
 * @file apps/web/src/lib/landing.test.ts
 * @description Master TDD Test Suite for Feature-001 Industrial Girls Landing Page.
 * Verifies catalog data integrity, query functions, and initial client state.
 *
 * @spec BRI-001-LANDING-PAGE
 */

import { describe, it, expect } from "vitest";
import {
  getReleases,
  getReleaseByCatalogNumber,
  getEvents,
  getUpcomingEvents,
  getResidents,
  getMerchProducts,
  RELEASES_CATALOG,
  EVENTS_CATALOG,
  RESIDENTS_CATALOG,
  MERCH_CATALOG,
} from "./infrastructure/label-catalog";
import { INITIAL_LANDING_STATE } from "./state/landing-state";

describe("Industrial Girls Landing Page — TDD Test Suite", () => {
  describe("1. Infrastructure Layer: Releases Catalog (@spec BRI-001-RELEASES)", () => {
    it("should provide an immutable list of releases with valid catalog numbers", () => {
      // Step 1: Arrange & Act
      const releases = getReleases();

      // Step 2: Assert
      expect(releases.length).toBeGreaterThanOrEqual(6);
      releases.forEach((release) => {
        expect(release.id).toBeDefined();
        expect(release.catalogNumber).toMatch(/^IG\d{3}$/);
        expect(release.title).toBeTruthy();
        expect(release.artist).toBeTruthy();
        expect(release.tracklist.length).toBeGreaterThan(0);
        expect(release.coverImage).toBeTruthy();
      });
    });

    it("should find releases by exact or case-insensitive catalog code", () => {
      // Step 1: Arrange
      const targetCode = "IG001";

      // Step 2: Act
      const foundUpper = getReleaseByCatalogNumber(targetCode);
      const foundLower = getReleaseByCatalogNumber("ig001");
      const notFound = getReleaseByCatalogNumber("IG999");

      // Step 3: Assert
      expect(foundUpper).toBeDefined();
      expect(foundUpper?.title).toBe("Subterránea EP");
      expect(foundLower).toEqual(foundUpper);
      expect(notFound).toBeUndefined();
    });
  });

  describe("2. Infrastructure Layer: Events & Showcases Catalog (@spec BRI-001-EVENTS)", () => {
    it("should return valid upcoming tour events with venue, city, and ticket URLs", () => {
      // Step 1: Arrange & Act
      const upcoming = getUpcomingEvents();

      // Step 2: Assert
      expect(upcoming.length).toBeGreaterThan(0);
      upcoming.forEach((evt) => {
        expect(evt.status).toBe("upcoming");
        expect(evt.venue).toBeTruthy();
        expect(evt.city).toBeTruthy();
        expect(evt.ticketUrl).toMatch(/^https?:\/\//);
        expect(evt.lineup.length).toBeGreaterThan(0);
      });
    });

    it("should ensure all events in catalog have ISO-valid dates", () => {
      // Step 1: Arrange & Act
      const events = getEvents();

      // Step 2: Assert
      events.forEach((evt) => {
        const parsedEpoch = Date.parse(evt.date);
        expect(Number.isNaN(parsedEpoch)).toBe(false);
      });
    });
  });

  describe("3. Infrastructure Layer: Residents & Artists Catalog (@spec BRI-001-RESIDENTS)", () => {
    it("should list label residents with monikers and sound roles", () => {
      // Step 1: Arrange & Act
      const residents = getResidents();

      // Step 2: Assert
      expect(residents.length).toBeGreaterThanOrEqual(3);
      residents.forEach((res) => {
        expect(res.moniker).toBeTruthy();
        expect(res.role).toBeTruthy();
        expect(res.bio).toBeTruthy();
        expect(res.avatarUrl).toBeTruthy();
      });
    });
  });

  describe("4. Infrastructure Layer: Merch Catalog (@spec BRI-001-MERCH)", () => {
    it("should expose official merchandise items including the Balaclava and Hoodie", () => {
      // Step 1: Arrange & Act
      const products = getMerchProducts();

      // Step 2: Assert
      expect(products.length).toBeGreaterThanOrEqual(3);
      const balaclava = products.find((p) => p.name.toLowerCase().includes("balaclava"));
      const hoodie = products.find((p) => p.name.toLowerCase().includes("hoodie"));

      expect(balaclava).toBeDefined();
      expect(balaclava?.category).toBe("accessories");
      expect(balaclava?.price).toBeGreaterThan(0);

      expect(hoodie).toBeDefined();
      expect(hoodie?.category).toBe("apparel");
    });
  });

  describe("5. Application State: Initial Landing State Invariants (@spec BRI-001-STATE)", () => {
    it("should initialize with sound inactive (muted by default) and drawer closed", () => {
      // Step 1: Assert initial invariants
      expect(INITIAL_LANDING_STATE.isSoundActive).toBe(false);
      expect(INITIAL_LANDING_STATE.isDrawerOpen).toBe(false);
      expect(INITIAL_LANDING_STATE.activeFilter).toBe("all");
    });
  });
});
