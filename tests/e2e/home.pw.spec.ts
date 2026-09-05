/**
 * @file tests/e2e/home.pw.spec.ts
 * @description Layer 1: Presentation & E2E Validation - Playwright Test Suite for Industrial Girls Landing Page.
 * Verifies end-to-end rendering of brutalist sections, title, navigation, and critical page elements.
 */

import { test, expect } from "@playwright/test";

test.describe("Industrial Girls Landing Page E2E Test Suite", () => {
  test("home page loads successfully and renders all brutalist sections", async ({ page }) => {
    // Step 1: Navigate to the root landing page
    await page.goto("/");

    // Step 2: Verify title and branding
    await expect(page).toHaveTitle(/INDUSTRIAL GIRLS/i);
    await expect(page.locator("h1")).toBeVisible();

    // Step 3: Verify core brutalist landing sections are present in DOM
    await expect(page.locator("#events")).toBeVisible();
    await expect(page.locator("#records")).toBeVisible();
    await expect(page.locator("#residents")).toBeVisible();
    await expect(page.locator("#shop")).toBeVisible();
    await expect(page.locator("#videos")).toBeVisible();
    await expect(page.locator("#community")).toBeVisible();
  });
});

