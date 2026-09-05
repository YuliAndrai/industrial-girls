/**
 * @file tests/starter/starter.test.ts
 * @description Unit tests for starter utilities, API infrastructure, and pipeline execution.
 */

import { describe, test, expect } from "vitest";
import { cn, truncateText } from "@/lib/utils";
import { getApiBaseUrl, DEFAULT_API_BASE_URL } from "@/lib/infrastructure/api-client";
import { executeHealthPipeline } from "@/lib/pipelines/example-pipeline";

describe("Starter Utilities & Infrastructure", () => {
  describe("cn (class names)", () => {
    test("merges conditional class names correctly", () => {
      // Arrange & Act
      const result = cn("base", true && "active", false && "hidden", undefined, null, "custom");

      // Assert
      expect(result).toBe("base active custom");
    });
  });

  describe("truncateText", () => {
    test("formats long text into truncated representation with ellipsis", () => {
      // Arrange
      const text = "0123456789abcdefghijklmnopqrstuvwxyz";

      // Act
      const formatted = truncateText(text, 4);

      // Assert
      expect(formatted).toBe("0123...wxyz");
    });

    test("returns empty string or original if invalid or short", () => {
      expect(truncateText(null)).toBe("");
      expect(truncateText("short")).toBe("short");
    });
  });

  describe("API Infrastructure", () => {
    test("returns configured or default API base url", () => {
      const url = getApiBaseUrl();
      expect(url).toBeDefined();
      expect(typeof url).toBe("string");
      expect(url.length).toBeGreaterThan(0);
    });

    test("default API base URL points to local API route", () => {
      expect(DEFAULT_API_BASE_URL).toContain("http");
    });
  });

  describe("Domain Pipeline", () => {
    test("executes health pipeline successfully against configured environment", async () => {
      // Act
      const result = await executeHealthPipeline();

      // Assert
      expect(result.success).toBe(true);
      expect(result.context).toBeDefined();
      expect(result.context.apiEndpoint).toBeDefined();
    });
  });

  describe("Schema Validation (Zod & Valibot)", () => {
    test("validates schema with Zod v4", async () => {
      const { z } = await import("zod");
      const UserSchema = z.object({
        name: z.string(),
        apiUrl: z.string().url(),
      });

      const parsed = UserSchema.parse({
        name: "Admin User",
        apiUrl: "http://localhost:3001/api",
      });

      expect(parsed.name).toBe("Admin User");
      expect(parsed.apiUrl).toBe("http://localhost:3001/api");
    });

    test("validates schema with Valibot", async () => {
      const v = await import("valibot");
      const ConfigSchema = v.object({
        env: v.string(),
        enabled: v.boolean(),
      });

      const result = v.safeParse(ConfigSchema, {
        env: "development",
        enabled: true,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.output.env).toBe("development");
      }
    });
  });
});


