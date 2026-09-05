/**
 * @file apps/web/src/lib/utils.ts
 * @description Layer 4: Infrastructure & Shared Utilities.
 * Common helper functions for class name concatenation and string truncation.
 */

/**
 * Merges conditional class names into a single clean string.
 *
 * @param inputs - List of class names, booleans, undefined, or null values.
 * @returns Combined class names string.
 */
export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  // Step 1: Filter out falsy values and join with a single whitespace
  return inputs.filter(Boolean).join(" ");
}

/**
 * Truncates a long text string with ellipsis for compact UI presentation.
 *
 * @param {string | null | undefined} text - Input text string or null/undefined.
 * @param {number} [chars=4] - Number of characters to retain at the start and end.
 * @returns {string} Truncated string (e.g., "abcd...wxyz") or original/empty string.
 */
export function truncateText(text: string | null | undefined, chars: number = 4): string {
  // Step 1: Validate input existence and length constraint
  if (!text) return "";
  if (text.length <= chars * 2) return text;

  // Step 2: Slice head and tail segments around ellipsis
  const prefix = text.slice(0, chars);
  const suffix = text.slice(-chars);
  return `${prefix}...${suffix}`;
}
