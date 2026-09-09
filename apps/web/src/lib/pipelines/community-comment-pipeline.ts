/**
 * @file apps/web/src/lib/pipelines/community-comment-pipeline.ts
 * @description Layer 3: Domain / Pipeline - Article Comment Submission Validation Pipeline.
 * Enforces text length, valid article reference, and author identity invariants.
 */

import { JOURNAL_ARTICLES } from "../infrastructure/community-catalog";

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
  if (!input.author || input.author.trim().length < 2) {
    errors.author = "Indica tu alias o nombre (mínimo 2 caracteres).";
  }

  // Step 3: Validate Comment Content Length
  const trimmed = input.commentText ? input.commentText.trim() : "";
  if (trimmed.length < 5) {
    errors.commentText = "El comentario debe tener al menos 5 caracteres.";
  } else if (trimmed.length > 1000) {
    errors.commentText = "El comentario no puede exceder los 1000 caracteres.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
