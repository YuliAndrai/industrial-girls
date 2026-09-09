/**
 * @file apps/web/src/lib/state/community-comments-store.ts
 * @description Layer 2: Application - Client State Store for Journal Article Comments.
 * Manages reactive comment additions alongside initial catalog comments.
 */

import { ArticleComment, INITIAL_COMMENTS } from "../infrastructure/community-catalog";

/**
 * State store interface for community discussions.
 */
export interface CommunityCommentsState {
  /** Map of articleId to comments array */
  commentsByArticle: Record<string, ArticleComment[]>;
}

// In-memory module state initialized with catalog comments
const state: CommunityCommentsState = {
  commentsByArticle: {},
};

// Step 1: Populate initial state with catalog comments
INITIAL_COMMENTS.forEach((comment) => {
  if (!state.commentsByArticle[comment.articleId]) {
    state.commentsByArticle[comment.articleId] = [];
  }
  state.commentsByArticle[comment.articleId].push(comment);
});

/**
 * Retrieves comments for a given article.
 *
 * @param {string} articleId - Article slug identifier.
 * @returns {ArticleComment[]} Comments list.
 */
export function getCommentsForArticle(articleId: string): ArticleComment[] {
  // Step 1: Return stored comments or empty array
  return state.commentsByArticle[articleId] || [];
}

/**
 * Adds a new comment to the in-memory store.
 *
 * @param {string} articleId - Target article slug.
 * @param {string} author - Author alias.
 * @param {string} content - Comment body.
 * @returns {ArticleComment} The created comment.
 */
export function addArticleComment(
  articleId: string,
  author: string,
  content: string
): ArticleComment {
  // Step 1: Construct new comment entity
  const newComment: ArticleComment = {
    id: "comm-" + Date.now(),
    articleId,
    author: author.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };

  // Step 2: Append to article comments
  if (!state.commentsByArticle[articleId]) {
    state.commentsByArticle[articleId] = [];
  }
  state.commentsByArticle[articleId].unshift(newComment);

  return newComment;
}
