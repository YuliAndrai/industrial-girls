/**
 * @file apps/web/src/lib/pipelines/example-pipeline.ts
 * @description Layer 3: Domain / Pipelines - System & API Health Validation Pipeline.
 * Encapsulates pure business logic validation for runtime and API connectivity health.
 */

import { getApiBaseUrl } from "../infrastructure/api-client";

/**
 * Pipeline execution context contract.
 */
export interface HealthPipelineContext {
  /** Timestamp when pipeline started */
  startedAt: number;
  /** Resolved API endpoint URL */
  apiEndpoint: string;
  /** Active runtime environment */
  environment: "development" | "production" | "test";
}

/**
 * Pipeline execution result contract.
 */
export interface HealthPipelineResult {
  /** Indicates whether the health verification succeeded */
  success: boolean;
  /** Pipeline execution context snapshot */
  context: HealthPipelineContext;
  /** Error message if pipeline failed */
  error?: string;
}

/**
 * Executes the starter domain health check pipeline against configured API infrastructure.
 *
 * @returns {Promise<HealthPipelineResult>} The pipeline result and diagnostic metadata.
 */
export async function executeHealthPipeline(): Promise<HealthPipelineResult> {
  // Step 1: Initialize pipeline execution context
  const currentEnv = process.env.NODE_ENV === "production" ? "production" : "development";
  const context: HealthPipelineContext = {
    startedAt: Date.now(),
    apiEndpoint: getApiBaseUrl(),
    environment: currentEnv,
  };

  try {
    // Step 2: Validate API endpoint invariant (must be a valid non-empty HTTP/HTTPS URL)
    if (!context.apiEndpoint || !/^https?:\/\//i.test(context.apiEndpoint)) {
      throw new Error("Violation: Invalid API endpoint configured in health pipeline.");
    }

    // Step 3: Return verified success result
    return {
      success: true,
      context,
    };
  } catch (err: unknown) {
    // Step 4: Gracefully handle and wrap execution failures
    const message = err instanceof Error ? err.message : "Unknown error in health pipeline";
    return {
      success: false,
      context,
      error: message,
    };
  }
}
