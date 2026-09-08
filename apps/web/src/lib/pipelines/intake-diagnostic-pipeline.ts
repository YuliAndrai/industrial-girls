/**
 * @file apps/web/src/lib/pipelines/intake-diagnostic-pipeline.ts
 * @description Layer 3: Domain / Pipeline - Validation and Processing Pipeline for Artist Diagnostic Intake.
 * Enforces field presence, valid email format, URL validity, and service selection invariants.
 */

/**
 * Payload interface submitted through the Diagnostic Intake Form.
 */
export interface DiagnosticSubmissionInput {
  /** Artist legal name or alias */
  artistName: string;
  /** Contact email address */
  email: string;
  /** Country and City of residence */
  location: string;
  /** Links to streaming tracks (SoundCloud, Spotify, Bandcamp) */
  musicLinks: string;
  /** Array of pillar IDs of interest */
  selectedServices: string[];
  /** Artist background, objectives, and specific requests */
  goalsMessage: string;
}

/**
 * Structured validation result from the intake diagnostic pipeline.
 */
export interface DiagnosticValidationResult {
  /** True if input passed all business invariants */
  isValid: boolean;
  /** Map of field names to specific error messages */
  errors: Record<string, string>;
}

/**
 * Validates diagnostic form submission input against domain invariants.
 *
 * @param {DiagnosticSubmissionInput} input - The submitted intake payload.
 * @returns {DiagnosticValidationResult} Invariant check result.
 */
export function validateDiagnosticSubmission(
  input: DiagnosticSubmissionInput
): DiagnosticValidationResult {
  const errors: Record<string, string> = {};

  // Step 1: Validate Artist Name
  if (!input.artistName || input.artistName.trim().length < 2) {
    errors.artistName = "El nombre o alias artístico es obligatorio (mínimo 2 caracteres).";
  }

  // Step 2: Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = "Ingresa un correo electrónico corporativo o personal válido.";
  }

  // Step 3: Validate Location
  if (!input.location || input.location.trim().length < 2) {
    errors.location = "Indica tu país y ciudad de base.";
  }

  // Step 4: Validate Music Links
  if (!input.musicLinks || input.musicLinks.trim().length < 5) {
    errors.musicLinks = "Proporciona al menos un enlace a tu música (SoundCloud, Spotify, etc.).";
  }

  // Step 5: Validate Selected Services (at least one pillar selected)
  if (!input.selectedServices || input.selectedServices.length === 0) {
    errors.selectedServices = "Selecciona al menos una de las áreas de servicio de interés.";
  }

  // Step 6: Validate Goals Message
  if (!input.goalsMessage || input.goalsMessage.trim().length < 10) {
    errors.goalsMessage = "Describe brevemente tus objetivos o requerimientos (mínimo 10 caracteres).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
