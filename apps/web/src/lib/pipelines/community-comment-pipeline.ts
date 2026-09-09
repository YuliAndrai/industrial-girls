/**
 * @file apps/web/src/lib/pipelines/community-comment-pipeline.ts
 * @description Layer 3: Domain / Pipeline - Article Comment Submission Validation Pipeline.
 * Enforces text length, valid article reference, author identity, and participant role invariants.
 */

import { JOURNAL_ARTICLES } from "../infrastructure/community-catalog";

/**
 * Allowed community participant roles in technical debates.
 */
export const ALLOWED_PARTICIPANT_ROLES = [
  "Productora / Live Act",
  "DJ / Selector",
  "Ingeniera de Sonido",
  "Melómana / Asistente",
] as const;

export type ParticipantRole = (typeof ALLOWED_PARTICIPANT_ROLES)[number];

/**
 * Input payload for posting a comment on an article.
 */
export interface CommentSubmissionInput {
  /** Slug of the target article */
  articleId: string;
  /** Author name or alias */
  author: string;
  /** Content of the comment */
  commentText: string;
  /** Subscriber email address (required, not published) */
  email?: string;
  /** Selected participant role */
  role?: string;
  /** Optional parent comment ID for threading */
  parentId?: string;
}

/**
 * Comment validation result.
 */
export interface CommentValidationResult {
  /** True if comment satisfies invariants */
  isValid: boolean;
  /** Specific error messages */
  errors: Record<string, string>;
}

/**
 * RFC 5322 compliant email regex validator.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates reader comment submission.
 *
 * @param {CommentSubmissionInput} input - Comment payload.
 * @returns {CommentValidationResult} Validation outcome.
 */
export function validateCommentSubmission(
  input: CommentSubmissionInput
): CommentValidationResult {
  const errors: Record<string, string> = {};

  // Step 1: Validate Article Exists
  const articleExists = JOURNAL_ARTICLES.some((a) => a.slug === input.articleId);
  if (!input.articleId || !articleExists) {
    errors.articleId = "El artículo especificado no existe en el catálogo editorial.";
  }

  // Step 2: Validate Author
  const trimmedAuthor = input.author ? input.author.trim() : "";
  if (!trimmedAuthor || trimmedAuthor.length < 2) {
    errors.author = "Indica tu alias o nombre (mínimo 2 caracteres).";
  }

  // Step 3: Validate Email
  const trimmedEmail = input.email ? input.email.trim() : "";
  if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  // Step 4: Validate Role
  if (!input.role || !ALLOWED_PARTICIPANT_ROLES.includes(input.role as ParticipantRole)) {
    errors.role = "Selecciona un rol válido dentro de la escena.";
  }

  // Step 5: Validate Comment Content Length
  const trimmedText = input.commentText ? input.commentText.trim() : "";
  if (trimmedText.length < 5) {
    errors.commentText = "El comentario debe tener al menos 5 caracteres.";
  } else if (trimmedText.length > 1000) {
    errors.commentText = "El comentario no puede exceder los 1000 caracteres.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
