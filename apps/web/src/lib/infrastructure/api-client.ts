/**
 * @file apps/web/src/lib/infrastructure/api-client.ts
 * @description Layer 4: Infrastructure - Clean REST API Configuration & HTTP Helpers.
 * Manages base API endpoint resolution and sanitized request execution.
 */

/**
 * Default base URL for internal and external API routes.
 */
export const DEFAULT_API_BASE_URL = "http://localhost:3001/api";

/**
 * Resolves the active base API URL with fallback.
 *
 * @returns {string} The active base URL for API communication.
 */
export function getApiBaseUrl(): string {
  // Step 1: Check environment variable override
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL;
  if (configuredUrl && configuredUrl.trim().length > 0) {
    return configuredUrl.trim().replace(/\/+$/, "");
  }

  // Step 2: Fall back to default local API base URL
  return DEFAULT_API_BASE_URL;
}

/**
 * Generic API response contract.
 */
export interface ApiResponse<T> {
  /** Indicates whether the request succeeded */
  success: boolean;
  /** Response payload data */
  data?: T;
  /** Error message if request failed */
  error?: string;
  /** HTTP status code */
  status: number;
}

/**
 * Executes a sanitized fetch request against the configured base API.
 *
 * @template T
 * @param {string} endpoint - API path relative to base URL (e.g. '/health').
 * @param {RequestInit} [options] - Standard Fetch Request options.
 * @returns {Promise<ApiResponse<T>>} Structured API response wrapper.
 */
export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  // Step 1: Build sanitized full request URL
  const baseUrl = getApiBaseUrl();
  const sanitizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const targetUrl = `${baseUrl}${sanitizedEndpoint}`;

  try {
    // Step 2: Execute network fetch request with timeout support
    const response = await fetch(targetUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    // Step 3: Handle non-2xx HTTP responses
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: `HTTP error ${response.status}: ${response.statusText}`,
      };
    }

    // Step 4: Parse and return structured JSON payload
    const data = (await response.json()) as T;
    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (err: unknown) {
    // Step 5: Catch and isolate network or parsing exceptions
    const message = err instanceof Error ? err.message : "Unknown network error";
    return {
      success: false,
      status: 0,
      error: message,
    };
  }
}
