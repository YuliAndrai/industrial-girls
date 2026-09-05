import { test, expect } from "@playwright/test";

test.describe("Next.js App Router Smoke Test", () => {
  test("home page loads successfully and renders title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Industrial Girls/);
    await expect(page.locator("h1")).toBeVisible();
  });
});
