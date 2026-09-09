/**
 * @file apps/web/src/lib/pipelines/merch-waitlist-pipeline.ts
 * @description Layer 3: Domain / Pipeline - Merch Priority Waitlist Validation Pipeline.
 * Enforces email syntax and non-empty invariants for the coming-soon merch pre-release.
 */

/**
 * Merch waitlist form input.
 */
export interface MerchWaitlistInput {
  /** Customer email address */
  email: string;
}

/**
 * Waitlist validation result.
 */
export interface MerchWaitlistValidationResult {
  /** True if email is valid */
  isValid: boolean;
  /** Error message if invalid */
  error?: string;
}

/**
 * Validates merch waitlist email submission.
 *
 * @param {MerchWaitlistInput} input - Form input.
 * @returns {MerchWaitlistValidationResult} Validation outcome.
 */
export function validateMerchWaitlist(
  input: MerchWaitlistInput
): MerchWaitlistValidationResult {
  // Step 1: Check format via RFC regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    return {
      isValid: false,
      error: "Ingresa un correo electrónico válido para registrarte en la lista prioritaria de Merch.",
    };
  }

  return {
    isValid: true,
  };
}
