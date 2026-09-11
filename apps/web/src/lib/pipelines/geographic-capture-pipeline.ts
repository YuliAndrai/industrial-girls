/**
 * @file apps/web/src/lib/pipelines/geographic-capture-pipeline.ts
 * @description Layer 3: Domain / Pipeline - Geographic Data Capture Validation Pipeline.
 * Validates subscriber information for touring alerts (/eventos) and community alerts (/comunidad).
 */

import { STANDARD_COUNTRIES } from "../infrastructure/events-catalog";

/**
 * Payload interface for geographical subscription form.
 */
export interface GeographicCaptureInput {
  /** Subscriber contact email */
  email: string;
  /** Subscriber full name or rave alias */
  name: string;
  /** Selected country from catalog */
  country: string;
  /** Specific city of residence */
  city: string;
  /** Optional subscriber mobile / WhatsApp / Telegram contact */
  phone?: string;
  /** Source of capture ('events' or 'community') */
  source: "events" | "community";
}

/**
 * Validation result interface.
 */
export interface GeographicValidationResult {
  /** True if input satisfies domain invariants */
  isValid: boolean;
  /** Field-specific error messages */
  errors: Record<string, string>;
}

/**
 * Validates geographic subscription payload.
 *
 * @param {GeographicCaptureInput} input - Submission payload.
 * @returns {GeographicValidationResult} Validation outcome.
 */
export function validateGeographicCapture(
  input: GeographicCaptureInput
): GeographicValidationResult {
  const errors: Record<string, string> = {};

  // Step 1: Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido para recibir alertas.";
  }

  // Step 2: Validate Name
  if (!input.name || input.name.trim().length < 2) {
    errors.name = "El nombre o alias debe contener al menos 2 caracteres.";
  }

  // Step 3: Validate Country
  if (!input.country || !STANDARD_COUNTRIES.includes(input.country)) {
    errors.country = "Selecciona un país de la lista autorizada.";
  }

  // Step 4: Validate City
  if (!input.city || input.city.trim().length < 2) {
    errors.city = "Indica la ciudad donde resides (mínimo 2 caracteres).";
  }

  // Step 5: Validate Phone or Telegram Handle (Optional)
  if (input.phone && input.phone.trim().length > 0) {
    const trimmedContact = input.phone.trim();
    const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
    const telegramRegex = /^@?[a-zA-Z0-9_]{4,32}$/;
    if (!phoneRegex.test(trimmedContact) && !telegramRegex.test(trimmedContact)) {
      errors.phone = "Ingresa un número telefónico o usuario de Telegram válido, o déjalo en blanco.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
