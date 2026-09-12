/**
 * @file apps/web/src/lib/community-journal.test.ts
 * @description Phase 2a (Structural) & Phase 5 (Behavioral RED): Comprehensive Test Suite for Community Journal Module (IGW-006).
 *
 * Domain Contracts Verified:
 * 1. Layer 4 Catalog Integrity:
 *    - Exactly 5 specialized articles on music technology, sound design, and rave culture.
 *    - All articles authored by "Industrial Girls Editorial".
 *    - Canonical sequence of 5 exact titles.
 *    - Valid archival Wikimedia Commons image URLs matching each article.
 *    - Non-empty debate questions on each article (`debateQuestion`).
 *    - Historical and technical keywords in `contentParagraphs`: Delia Derbyshire, Suzanne Ciani,
 *      Hedy Lamarr, Laurie Spiegel, Eurorack wavefolding.
 * 2. Layer 3 Validation Pipeline:
 *    - `validateCommentSubmission` enforces email format, minimum 2 characters for author, 5 to 1000 chars for commentText.
 *    - Restricts `role` strictly to the 4 permitted scene roles:
 *      "Productora / Live Act", "DJ / Selector", "Ingeniera de Sonido", "Melómana / Asistente".
 *    - Rejects invalid roles, malformed emails, and invalid target articles.
 * 3. Layer 2 State Store:
 *    - `addArticleComment` records comments including role and optional parentId for nested replies.
 *    - Correctly persists and retrieves comments across articles and threads.
 * 4. Configuration & Next.js Image Security:
 *    - `next.config.ts` includes `upload.wikimedia.org` in `images.remotePatterns` for secure archival imagery.
 * 5. Layer 1 Page Integration:
 *    - `apps/web/src/app/comunidad/page.tsx` imports and orchestrates `CommunityHero`, `ArticleCard`,
 *      `DiscussionConsole`, and `CommunitySubscription`.
 *
 * @spec IGW-006-COMMUNITY-JOURNAL
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

// Layer 4: Infrastructure Imports
import {
  JOURNAL_ARTICLES,
  INITIAL_COMMENTS,
  getJournalArticles,
  getArticleBySlug,
  getArticleComments,
  type JournalArticle,
  type ArticleComment,
} from "./infrastructure/community-catalog";
import {
  COMMUNITY_HERO_COPY,
  COMMUNITY_DISCUSSION_COPY,
  COMMUNITY_CHANNELS_COPY,
} from "./infrastructure/community-copy";

// Layer 3: Domain / Pipelines Imports
import {
  validateCommentSubmission,
  type CommentSubmissionInput,
} from "./pipelines/community-comment-pipeline";

// Layer 2: Application / State Imports
import {
  getCommentsForArticle,
  addArticleComment,
} from "./state/community-comments-store";

/**
 * Extended journal article interface reflecting Phase 5 archival metadata contracts.
 */
interface ExtendedJournalArticle extends Partial<JournalArticle> {
  slug?: string;
  title?: string;
  author?: string;
  imageUrl?: string;
  debateQuestion?: string;
  contentParagraphs?: string[];
}

/**
 * Extended comment submission payload with email and community scene role.
 */
interface ExtendedCommentSubmissionInput extends CommentSubmissionInput {
  email?: string;
  role?: string;
}

/**
 * Extended article comment entity with scene role and optional parentId.
 */
interface ExtendedArticleComment extends ArticleComment {
  role?: string;
  parentId?: string;
}

/**
 * Canonical 4 scene participant roles allowed in technical debates.
 */
const CANONICAL_SCENE_ROLES = [
  "Productora / Live Act",
  "DJ / Selector",
  "Ingeniera de Sonido",
  "Melómana / Asistente",
] as const;

/**
 * Canonical sequence of 5 editorial article titles.
 */
const CANONICAL_TITLES = [
  "Pioneras del Voltaje: De la Música Concreta a la Resonancia Modular",
  "La Huella de Silicio: Las Mentes Femeninas detrás de los Chips y Circuitos",
  "Espectro Ensanchado y Telecomunicaciones: El Vínculo Científico de Hedy Lamarr",
  "Arquitectura de Software: De las Tarjetas Perforadas a la Democratización del Beat",
  "Arquitectura del Hard Techno: Distorsión Armónica y Resistencia Sónica",
] as const;

/**
 * Historical and technical keywords required per article.
 */
const REQUIRED_HISTORICAL_KEYWORDS = [
  { index: 0, title: CANONICAL_TITLES[0], keyword: "Delia Derbyshire" },
  { index: 1, title: CANONICAL_TITLES[1], keyword: "Suzanne Ciani" },
  { index: 2, title: CANONICAL_TITLES[2], keyword: "Hedy Lamarr" },
  { index: 3, title: CANONICAL_TITLES[3], keyword: "Laurie Spiegel" },
  { index: 4, title: CANONICAL_TITLES[4], keyword: "Eurorack wavefolding" },
] as const;

/* =========================================================================
 * PHASE 2a: STRUCTURAL ARCHITECTURE & EXPORT CONTRACTS
 * ========================================================================= */

describe("Community Journal Module — Phase 2a: Structural Verification (IGW-006)", () => {
  describe("Layer 4: Infrastructure — community-catalog.ts", () => {
    it("should physically exist on disk at apps/web/src/lib/infrastructure/community-catalog.ts", () => {
      // Arrange: Resolve absolute path to infrastructure catalog file
      const filePath = path.resolve(
        process.cwd(),
        "apps/web/src/lib/infrastructure/community-catalog.ts"
      );

      // Act: Check physical presence on disk
      const fileExists = fs.existsSync(filePath);

      // Assert: File must exist as the foundation of Layer 4
      // Edge Case / Negative Invariant: Missing file halts catalog access for upper layers
      expect(fileExists, `Infrastructure file missing at: ${filePath}`).toBe(true);
    });

    it("should provide basic exports for editorial articles, initial comments, and query methods", () => {
      // Arrange: Reference imported Layer 4 infrastructure definitions
      const articles = JOURNAL_ARTICLES;
      const comments = INITIAL_COMMENTS;

      // Act: Inspect exported data structures and query functions
      const isArticlesArray = Array.isArray(articles);
      const isCommentsArray = Array.isArray(comments);

      // Assert: Export contract invariants
      // Edge Case / Negative Invariant: Exports must be defined functions/arrays, never undefined or null
      expect(isArticlesArray, "JOURNAL_ARTICLES must be an array").toBe(true);
      expect(articles.length, "JOURNAL_ARTICLES should contain articles").toBeGreaterThan(0);
      expect(isCommentsArray, "INITIAL_COMMENTS must be an array").toBe(true);
      expect(typeof getJournalArticles, "getJournalArticles must be a function").toBe("function");
      expect(typeof getArticleBySlug, "getArticleBySlug must be a function").toBe("function");
      expect(typeof getArticleComments, "getArticleComments must be a function").toBe("function");
    });

    it("should certify that INITIAL_COMMENTS is completely purged of mock comments and fabricated testimonials", () => {
      // Step 1: Invariant check - No fake or simulated user comments exist in catalog
      expect(INITIAL_COMMENTS).toHaveLength(0);

      // Step 2: Querying comments for any article returns an empty collection
      JOURNAL_ARTICLES.forEach((article) => {
        const comments = getArticleComments(article.slug);
        expect(comments).toHaveLength(0);
      });

      // Step 3: Verify zero fabricated user handles exist in community catalog source
      const catalogSource = fs.readFileSync(
        path.resolve(process.cwd(), "apps/web/src/lib/infrastructure/community-catalog.ts"),
        "utf-8"
      );
      expect(catalogSource).not.toMatch(/VANE_LIVE/);
      expect(catalogSource).not.toMatch(/ModularKicks/);
      expect(catalogSource).not.toMatch(/AUDIO_ING_BOG/);
      expect(catalogSource).not.toMatch(/BogotaUnderground/);
      expect(catalogSource).not.toMatch(/PROD_DIRECT_DEMO/);
    });
  });

  describe("Layer 3: Domain / Pipelines — community-comment-pipeline.ts", () => {
    it("should physically exist on disk at apps/web/src/lib/pipelines/community-comment-pipeline.ts", () => {
      // Arrange: Resolve absolute path to domain pipeline file
      const filePath = path.resolve(
        process.cwd(),
        "apps/web/src/lib/pipelines/community-comment-pipeline.ts"
      );

      // Act: Check physical presence on disk
      const fileExists = fs.existsSync(filePath);

      // Assert: File must exist as domain validation boundary in Layer 3
      // Edge Case / Negative Invariant: Missing pipeline disables form sanitization and validation
      expect(fileExists, `Domain pipeline file missing at: ${filePath}`).toBe(true);
    });

    it("should export validateCommentSubmission domain validation pipeline function", () => {
      // Arrange & Act: Inspect exported validation function from Layer 3
      const validatorFn = validateCommentSubmission;

      // Assert: Invariant - validateCommentSubmission must be an executable function
      // Edge Case / Negative Invariant: Must handle empty or malformed inputs predictably
      expect(typeof validatorFn, "validateCommentSubmission must be exported as a function").toBe("function");
    });
  });

  describe("Layer 2: Application / State — community-comments-store.ts", () => {
    it("should physically exist on disk at apps/web/src/lib/state/community-comments-store.ts", () => {
      // Arrange: Resolve absolute path to application state store file
      const filePath = path.resolve(
        process.cwd(),
        "apps/web/src/lib/state/community-comments-store.ts"
      );

      // Act: Check physical presence on disk
      const fileExists = fs.existsSync(filePath);

      // Assert: File must exist as Layer 2 client-side state store
      // Edge Case / Negative Invariant: State mutations cannot occur without store implementation
      expect(fileExists, `Application store file missing at: ${filePath}`).toBe(true);
    });

    it("should export getCommentsForArticle and addArticleComment store methods", () => {
      // Arrange & Act: Inspect exported state accessors and mutators
      const getter = getCommentsForArticle;
      const mutator = addArticleComment;

      // Assert: Store interface contracts
      // Edge Case / Negative Invariant: Missing store methods breaks reactivity in discussion console
      expect(typeof getter, "getCommentsForArticle must be a function").toBe("function");
      expect(typeof mutator, "addArticleComment must be a function").toBe("function");
    });
  });

  describe("Layer 1: Presentation Components — apps/web/src/components/community/", () => {
    it("should physically exist as the community components directory", () => {
      // Arrange: Resolve target directory for Layer 1 Presentation components
      const dirPath = path.resolve(
        process.cwd(),
        "apps/web/src/components/community"
      );

      // Act: Check physical presence of directory on disk
      const dirExists = fs.existsSync(dirPath);

      // Assert: Component directory must exist before individual components can be mounted
      // Edge Case / Negative Invariant: Component mounting fails if directory structure is absent
      expect(dirExists, `Layer 1 community components directory missing at: ${dirPath}`).toBe(true);
    });

    it("should physically exist on disk and export CommunityHero (apps/web/src/components/community/community-hero.tsx)", async () => {
      // Arrange: Target file path for CommunityHero component
      const filePath = path.resolve(
        process.cwd(),
        "apps/web/src/components/community/community-hero.tsx"
      );

      // Act: Verify physical existence on disk
      const fileExists = fs.existsSync(filePath);

      // Assert: File existence verification
      expect(fileExists, `Presentation component missing at: ${filePath}`).toBe(true);

      // Act & Assert: Verify export contract if file exists
      const heroModule = await import("@/components/community/community-hero");
      expect(
        heroModule.CommunityHero || heroModule.default,
        "Expected CommunityHero or default export to be defined"
      ).toBeDefined();
    });

    it("should physically exist on disk and export ArticleCard (apps/web/src/components/community/article-card.tsx)", async () => {
      // Arrange: Target file path for ArticleCard component
      const filePath = path.resolve(
        process.cwd(),
        "apps/web/src/components/community/article-card.tsx"
      );

      // Act: Verify physical existence on disk
      const fileExists = fs.existsSync(filePath);

      // Assert: File existence verification
      expect(fileExists, `Presentation component missing at: ${filePath}`).toBe(true);

      // Act & Assert: Verify export contract if file exists
      const cardModule = await import("@/components/community/article-card");
      expect(
        cardModule.ArticleCard || cardModule.default,
        "Expected ArticleCard or default export to be defined"
      ).toBeDefined();
    });

    it("should physically exist on disk and export DiscussionConsole (apps/web/src/components/community/discussion-console.tsx)", async () => {
      // Arrange: Target file path for DiscussionConsole component
      const filePath = path.resolve(
        process.cwd(),
        "apps/web/src/components/community/discussion-console.tsx"
      );

      // Act: Verify physical existence on disk
      const fileExists = fs.existsSync(filePath);

      // Assert: File existence verification
      expect(fileExists, `Presentation component missing at: ${filePath}`).toBe(true);

      // Act & Assert: Verify export contract if file exists
      const consoleModule = await import("@/components/community/discussion-console");
      expect(
        consoleModule.DiscussionConsole || consoleModule.default,
        "Expected DiscussionConsole or default export to be defined"
      ).toBeDefined();
    });

    it("should physically exist on disk and export CommunitySubscription (apps/web/src/components/community/community-subscription.tsx)", async () => {
      // Arrange: Target file path for CommunitySubscription component
      const filePath = path.resolve(
        process.cwd(),
        "apps/web/src/components/community/community-subscription.tsx"
      );

      // Act: Verify physical existence on disk
      const fileExists = fs.existsSync(filePath);

      // Assert: File existence verification
      expect(fileExists, `Presentation component missing at: ${filePath}`).toBe(true);

      // Act & Assert: Verify export contract if file exists
      const subModule = await import("@/components/community/community-subscription");
      expect(
        subModule.CommunitySubscription || subModule.default,
        "Expected CommunitySubscription or default export to be defined"
      ).toBeDefined();
    });

    it("should physically exist on disk and export TelegramCommunityBanner (apps/web/src/components/community/telegram-community-banner.tsx)", async () => {
      // Arrange: Target file path for TelegramCommunityBanner component
      const filePath = path.resolve(
        process.cwd(),
        "apps/web/src/components/community/telegram-community-banner.tsx"
      );

      // Act: Verify physical existence on disk
      const fileExists = fs.existsSync(filePath);

      // Assert: File existence verification
      expect(fileExists, `Presentation component missing at: ${filePath}`).toBe(true);

      // Act & Assert: Verify export contract if file exists
      const bannerModule = await import("@/components/community/telegram-community-banner");
      expect(
        bannerModule.TelegramCommunityBanner || bannerModule.default,
        "Expected TelegramCommunityBanner or default export to be defined"
      ).toBeDefined();
    });
  });
});

/* =========================================================================
 * PHASE 5: BEHAVIORAL RED TEST SUITE (TDD)
 * ========================================================================= */

describe("Community Journal Module — Phase 5: Behavioral Domain Logic & Catalog Integrity (IGW-006)", () => {
  /* -----------------------------------------------------------------------
   * 1. Layer 4 Catalog Integrity
   * ----------------------------------------------------------------------- */
  describe("1. Layer 4 Catalog Integrity (JOURNAL_ARTICLES)", () => {
    it("should contain exactly 5 articles authored by 'Industrial Girls Editorial'", () => {
      // Arrange: Retrieve articles from catalog
      const articles = JOURNAL_ARTICLES as ExtendedJournalArticle[];

      // Act: Inspect catalog size and authors
      const totalCount = articles.length;
      const authors = articles.map((a) => a.author);

      // Assert: Catalog size invariant (must be exactly 5 articles)
      expect(totalCount, "JOURNAL_ARTICLES must contain exactly 5 editorial articles").toBe(5);

      // Assert: Author invariant (all must be Industrial Girls Editorial)
      // Edge Case / Negative Invariant: Editorial pieces must not carry placeholder or individual author strings
      authors.forEach((author, idx) => {
        expect(
          author,
          `Article at index ${idx} must be authored by 'Industrial Girls Editorial', found: '${author}'`
        ).toBe("Industrial Girls Editorial");
      });
    });

    it("should have the exact canonical titles in canonical order", () => {
      // Arrange: Extract actual titles from catalog
      const actualTitles = JOURNAL_ARTICLES.map((a) => a.title);

      // Act & Assert: Match against exact 5 canonical titles
      // Edge Case / Negative Invariant: Discrepancies in editorial titles break deep links, SEO, and TOC navigation
      expect(actualTitles).toEqual(CANONICAL_TITLES);
    });

    it("should provide valid Wikimedia Commons archival image URLs for all 5 articles", () => {
      // Arrange: Retrieve articles from catalog
      const articles = JOURNAL_ARTICLES as ExtendedJournalArticle[];

      // Act & Assert: Inspect imageUrl property for each article
      // Edge Case / Negative Invariant: Missing or non-Wikimedia URLs fail Next.js image domain whitelist and compromise visual archive
      articles.forEach((article, idx) => {
        expect(
          article.imageUrl,
          `Article at index ${idx} ('${article.title}') must define an 'imageUrl'`
        ).toBeDefined();

        expect(
          typeof article.imageUrl,
          `Article at index ${idx} imageUrl must be a string`
        ).toBe("string");

        expect(
          article.imageUrl,
          `Article at index ${idx} imageUrl must point to upload.wikimedia.org`
        ).toMatch(/^https:\/\/upload\.wikimedia\.org\/.+/);
      });
    });

    it("should define non-empty debate questions (debateQuestion) on every article", () => {
      // Arrange: Retrieve articles from catalog
      const articles = JOURNAL_ARTICLES as ExtendedJournalArticle[];

      // Act & Assert: Verify presence and meaningful length of debateQuestion
      // Edge Case / Negative Invariant: Empty debate questions fail the brutalist technical discussion terminal
      articles.forEach((article, idx) => {
        expect(
          article.debateQuestion,
          `Article at index ${idx} ('${article.title}') must define a 'debateQuestion'`
        ).toBeDefined();

        expect(
          typeof article.debateQuestion,
          `Article at index ${idx} debateQuestion must be a string`
        ).toBe("string");

        expect(
          article.debateQuestion?.trim().length,
          `Article at index ${idx} debateQuestion must not be empty`
        ).toBeGreaterThan(10);
      });
    });

    it("should include historical and technical keywords in contentParagraphs", () => {
      // Arrange: Target keywords per article specification
      const articles = JOURNAL_ARTICLES as ExtendedJournalArticle[];

      // Act & Assert: Check each article content paragraphs for its required historical/technical anchor
      // Edge Case / Negative Invariant: Articles lacking core historical figures fail cultural curriculum requirements
      REQUIRED_HISTORICAL_KEYWORDS.forEach(({ index, keyword, title }) => {
        const article = articles[index];
        expect(article, `Article at index ${index} must exist`).toBeDefined();

        const combinedParagraphs = (article?.contentParagraphs ?? []).join(" ");
        const containsKeyword = combinedParagraphs.includes(keyword);

        expect(
          containsKeyword,
          `Article #${index + 1} ('${title}') contentParagraphs must mention required keyword: '${keyword}'`
        ).toBe(true);
      });
    });
  });

  /* -----------------------------------------------------------------------
   * 2. Layer 3 Validation Pipeline
   * ----------------------------------------------------------------------- */
  describe("2. Layer 3 Validation Pipeline (validateCommentSubmission)", () => {
    it("should accept valid submission satisfying all email, author, role, and length invariants", () => {
      // Arrange: Valid payload matching domain contracts
      const targetSlug = JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje";
      const validPayload: ExtendedCommentSubmissionInput = {
        articleId: targetSlug,
        author: "Eva Rostova",
        email: "eva.rostova@industrialgirls.org",
        role: "Productora / Live Act",
        commentText: "El análisis sobre modulación en anillo y síntesis modular es históricamente riguroso.",
      };

      // Act: Execute domain validation pipeline
      const result = validateCommentSubmission(validPayload as any);

      // Assert: Must be valid with zero validation errors
      // Edge Case / Negative Invariant: False positive rejection halts community participation
      expect(result.isValid, "Valid comment submission must pass validation").toBe(true);
      expect(result.errors).toEqual({});
    });

    it("should reject invalid email formats and require email to be present", () => {
      // Arrange: List of malformed email strings
      const malformedEmails = [
        "",
        "   ",
        "plainaddress",
        "missingatsign.com",
        "user@",
        "@domain.com",
        "user@.com",
        "user@domain..com",
      ];

      // Act & Assert: Validate each malformed email against pipeline
      // Edge Case / Negative Invariant: Non-RFC compliant emails compromise newsletter dispatch & anti-spam integrity
      malformedEmails.forEach((badEmail) => {
        const payload: ExtendedCommentSubmissionInput = {
          articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
          author: "Valeria Sound",
          email: badEmail,
          role: "DJ / Selector",
          commentText: "Aporte técnico sobre sidechain y frecuencias graves.",
        };

        const result = validateCommentSubmission(payload as any);
        expect(
          result.isValid,
          `Email '${badEmail}' should be rejected by validation pipeline`
        ).toBe(false);
        expect(
          result.errors.email,
          `Expected validation error on email field for '${badEmail}'`
        ).toBeDefined();
      });
    });

    it("should reject author names shorter than 2 characters", () => {
      // Arrange: Invalid author strings (empty, whitespace, 1 character)
      const invalidAuthors = ["", " ", "a", " X "];

      // Act & Assert: Validate author boundary constraint
      // Edge Case / Negative Invariant: Single character handles allow anonymous trolling in brutalist forum
      invalidAuthors.forEach((author) => {
        const payload: ExtendedCommentSubmissionInput = {
          articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
          author,
          email: "valid@industrialgirls.org",
          role: "Ingeniera de Sonido",
          commentText: "Reflexión técnica sobre filtros paso-bajo analógicos.",
        };

        const result = validateCommentSubmission(payload as any);
        expect(
          result.isValid,
          `Author '${author}' (length < 2) must be rejected`
        ).toBe(false);
        expect(result.errors.author).toBeDefined();
      });

      // Act & Assert: Boundary value of exactly 2 characters must be accepted
      const boundaryPayload: ExtendedCommentSubmissionInput = {
        articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
        author: "DJ",
        email: "valid@industrialgirls.org",
        role: "DJ / Selector",
        commentText: "Comentario válido de longitud suficiente.",
      };
      const boundaryResult = validateCommentSubmission(boundaryPayload as any);
      expect(boundaryResult.errors.author).toBeUndefined();
    });

    it("should enforce commentText length between 5 and 1000 characters", () => {
      // Arrange: Under-boundary payloads (< 5 characters)
      const shortTexts = ["", "Hi", "1234", " ... "];

      // Act & Assert: Rejection of short inputs
      shortTexts.forEach((shortText) => {
        const payload: ExtendedCommentSubmissionInput = {
          articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
          author: "TechnoResearcher",
          email: "valid@industrialgirls.org",
          role: "Melómana / Asistente",
          commentText: shortText,
        };

        const result = validateCommentSubmission(payload as any);
        expect(result.isValid, `Short comment '${shortText}' must be rejected`).toBe(false);
        expect(result.errors.commentText).toBeDefined();
      });

      // Arrange: Over-boundary payload (> 1000 characters)
      const oversizedText = "A".repeat(1001);
      const oversizedPayload: ExtendedCommentSubmissionInput = {
        articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
        author: "TechnoResearcher",
        email: "valid@industrialgirls.org",
        role: "Melómana / Asistente",
        commentText: oversizedText,
      };

      // Act & Assert: Rejection of oversized inputs
      // Edge Case / Negative Invariant: Uncapped text blocks risk UI breakage in discussion feed
      const overResult = validateCommentSubmission(oversizedPayload as any);
      expect(overResult.isValid, "Comment exceeding 1000 chars must be rejected").toBe(false);
      expect(overResult.errors.commentText).toBeDefined();

      // Act & Assert: Exact boundary acceptance (5 chars and 1000 chars)
      const minValidPayload: ExtendedCommentSubmissionInput = {
        articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
        author: "TechnoResearcher",
        email: "valid@industrialgirls.org",
        role: "Melómana / Asistente",
        commentText: "12345",
      };
      expect(validateCommentSubmission(minValidPayload as any).errors.commentText).toBeUndefined();

      const maxValidPayload: ExtendedCommentSubmissionInput = {
        articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
        author: "TechnoResearcher",
        email: "valid@industrialgirls.org",
        role: "Melómana / Asistente",
        commentText: "A".repeat(1000),
      };
      expect(validateCommentSubmission(maxValidPayload as any).errors.commentText).toBeUndefined();
    });

    it("should strictly validate that role is one of the 4 exact options and reject invalid roles", () => {
      // Arrange & Act: Test each canonical role option individually
      CANONICAL_SCENE_ROLES.forEach((validRole) => {
        const payload: ExtendedCommentSubmissionInput = {
          articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
          author: "Residente Club",
          email: "residente@techno.berlin",
          role: validRole,
          commentText: `Aporte técnico presentado desde el rol ${validRole}.`,
        };

        const result = validateCommentSubmission(payload as any);
        expect(
          result.errors.role,
          `Canonical role '${validRole}' must be accepted without error`
        ).toBeUndefined();
      });

      // Arrange: Non-canonical, missing, or spoofed roles
      const invalidRoles = [
        "",
        "Promoter",
        "Label Manager",
        "Infiltrada",
        "Fan",
        "Unknown Role",
      ];

      // Act & Assert: Reject all unlisted roles
      // Edge Case / Negative Invariant: Community integrity requires verified scene roles for discussion triage
      invalidRoles.forEach((badRole) => {
        const payload: ExtendedCommentSubmissionInput = {
          articleId: JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje",
          author: "Residente Club",
          email: "residente@techno.berlin",
          role: badRole,
          commentText: "Comentario con rol no permitido.",
        };

        const result = validateCommentSubmission(payload as any);
        expect(
          result.isValid,
          `Invalid role '${badRole}' must be rejected by validation pipeline`
        ).toBe(false);
        expect(
          result.errors.role,
          `Expected role validation error for '${badRole}'`
        ).toBeDefined();
      });
    });

    it("should reject submissions targeting non-existent articles in catalog", () => {
      // Arrange: Unknown article slug
      const payload: ExtendedCommentSubmissionInput = {
        articleId: "articulo-inexistente-404",
        author: "Sintetista",
        email: "sintetista@rave.org",
        role: "Productora / Live Act",
        commentText: "Comentario dirigido a slug no catalogado.",
      };

      // Act: Execute validation
      const result = validateCommentSubmission(payload as any);

      // Assert: Foreign key integrity constraint
      // Edge Case / Negative Invariant: Comments must not orphan without a parent article
      expect(result.isValid).toBe(false);
      expect(result.errors.articleId).toBeDefined();
    });
  });

  /* -----------------------------------------------------------------------
   * 3. Layer 2 State Store
   * ----------------------------------------------------------------------- */
  describe("3. Layer 2 State Store (addArticleComment & getCommentsForArticle)", () => {
    it("should record comments with scene role and optional parentId for nested replies", () => {
      // Arrange: Define target article slug and root comment data
      const targetSlug = JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje";
      const rootAuthor = "Camila Modular";
      const rootContent = "El diseño del filtro OTA en el Korg MS-20 define la agresividad del género.";
      const rootRole = "Productora / Live Act";

      // Act: Add root comment to state store
      const rootComment = (addArticleComment as any)(
        targetSlug,
        rootAuthor,
        rootContent,
        rootRole
      ) as ExtendedArticleComment;

      // Assert: Inspect created root comment properties
      expect(rootComment).toBeDefined();
      expect(rootComment.author).toBe(rootAuthor);
      expect(rootComment.content).toBe(rootContent);
      expect(rootComment.role, "Created comment must store scene role").toBe(rootRole);
      // Edge Case / Negative Invariant: Root comment parentId must be undefined or null
      expect(rootComment.parentId, "Root comment parentId should be undefined").toBeUndefined();

      // Arrange: Define nested reply referencing rootComment.id
      const replyAuthor = "Diana Sound";
      const replyContent = "Totalmente de acuerdo, la saturación armónica es irremplazable por software.";
      const replyRole = "Ingeniera de Sonido";
      const replyParentId = rootComment.id;

      // Act: Add nested reply with parentId
      const replyComment = (addArticleComment as any)(
        targetSlug,
        replyAuthor,
        replyContent,
        replyRole,
        replyParentId
      ) as ExtendedArticleComment;

      // Assert: Inspect nested reply properties
      expect(replyComment).toBeDefined();
      expect(replyComment.author).toBe(replyAuthor);
      expect(replyComment.role, "Reply comment must store scene role").toBe(replyRole);
      expect(
        replyComment.parentId,
        "Nested reply must preserve parent comment ID for threading"
      ).toBe(replyParentId);

      // Act: Retrieve comments for article from store
      const allComments = getCommentsForArticle(targetSlug) as ExtendedArticleComment[];

      // Assert: Both comments exist in store with preserved role and parentId
      const storedRoot = allComments.find((c) => c.id === rootComment.id);
      const storedReply = allComments.find((c) => c.id === replyComment.id);

      expect(storedRoot, "Root comment must be retrievable from state store").toBeDefined();
      expect(storedRoot?.role).toBe(rootRole);

      expect(storedReply, "Reply comment must be retrievable from state store").toBeDefined();
      expect(storedReply?.role).toBe(replyRole);
      expect(storedReply?.parentId).toBe(replyParentId);
    });

    it("should support isPublic visibility flag allowing pending moderation comments to be filtered from the public feed", () => {
      // Arrange: Target article and payload for visitor contribution
      const targetSlug = JOURNAL_ARTICLES[0]?.slug ?? "pioneras-del-voltaje";
      const visitorAuthor = "DirectEditorialContact";
      const visitorContent = "Mensaje confidencial de consulta técnica para el equipo editorial.";
      const visitorRole = "Ingeniera de Sonido";

      // Act: Add comment with default visitor status (isPublic: false for moderation)
      const pendingComment = (addArticleComment as any)(
        targetSlug,
        visitorAuthor,
        visitorContent,
        visitorRole,
        undefined,
        "direct@editorial.org"
      );

      // Assert: Visitor comment records isPublic === false by default
      expect(pendingComment).toBeDefined();
      expect(pendingComment.isPublic).toBe(false);

      // Act: Add administratively approved comment with explicit isPublic: true
      const approvedComment = (addArticleComment as any)(
        targetSlug,
        "PublicContributor",
        "Aporte abierto sobre circuitos analógicos.",
        "Productora / Live Act",
        undefined,
        "approved@community.org",
        true
      );

      // Assert: Explicitly approved comment is public
      expect(approvedComment.isPublic).toBe(true);

      // Act: Simulate feed moderation filtering (only isPublic === true rendered in public forum)
      const allComments = getCommentsForArticle(targetSlug);
      const publicFeed = allComments.filter((c) => c.isPublic === true);

      // Assert: Public feed includes approvedComment and excludes pendingComment
      expect(publicFeed.some((c) => c.id === approvedComment.id)).toBe(true);
      expect(publicFeed.some((c) => c.id === pendingComment.id)).toBe(false);
    });
  });

  /* -----------------------------------------------------------------------
   * 4. Configuration & Next.js Image Security
   * ----------------------------------------------------------------------- */
  describe("4. Configuration & Next.js Image Security (next.config.ts)", () => {
    it("should include upload.wikimedia.org in images.remotePatterns", async () => {
      // Arrange: Resolve path to root next.config.ts
      const nextConfigPath = path.resolve(process.cwd(), "next.config.ts");
      expect(fs.existsSync(nextConfigPath), `next.config.ts must exist at: ${nextConfigPath}`).toBe(true);

      // Act: Read file content and verify static configuration string
      const fileContent = fs.readFileSync(nextConfigPath, "utf-8");

      // Assert 1: Static file text must contain wikimedia hostname configuration
      // Edge Case / Negative Invariant: Next.js Image component crashes at runtime on unlisted hostnames
      expect(
        fileContent,
        "next.config.ts must declare upload.wikimedia.org in remotePatterns"
      ).toMatch(/upload\.wikimedia\.org/);

      // Act 2: Dynamically inspect exported nextConfig object
      const nextConfigModule = await import("../../../../next.config");
      const nextConfig = nextConfigModule.default || nextConfigModule;
      const remotePatterns = nextConfig.images?.remotePatterns ?? [];

      // Assert 2: Configuration object must contain hostname pattern matching upload.wikimedia.org
      const hasWikimediaPattern = remotePatterns.some(
        (pattern: { hostname?: string; protocol?: string }) =>
          pattern.hostname === "upload.wikimedia.org"
      );

      expect(
        hasWikimediaPattern,
        "nextConfig.images.remotePatterns must include an entry with hostname 'upload.wikimedia.org'"
      ).toBe(true);
    });
  });

  /* -----------------------------------------------------------------------
   * 5. Layer 1 Page Integration
   * ----------------------------------------------------------------------- */
  describe("5. Layer 1 Page Integration (apps/web/src/app/comunidad/page.tsx)", () => {
    it("should import CommunityHero, ArticleCard, DiscussionConsole, and CommunitySubscription", () => {
      // Arrange: Resolve path to /comunidad route page component
      const pagePath = path.resolve(
        process.cwd(),
        "apps/web/src/app/comunidad/page.tsx"
      );
      expect(fs.existsSync(pagePath), `Comunidad page missing at: ${pagePath}`).toBe(true);

      // Act: Read page component source code
      const pageContent = fs.readFileSync(pagePath, "utf-8");

      // Assert: Verify import declarations for all 4 presentation components
      // Edge Case / Negative Invariant: Inlined HTML blocks violate modular presentation layer boundary
      expect(
        pageContent,
        "comunidad/page.tsx must import CommunityHero"
      ).toMatch(/import\s+.*CommunityHero.*from\s+["']@\/components\/community\/community-hero["']/);

      expect(
        pageContent,
        "comunidad/page.tsx must import ArticleCard"
      ).toMatch(/import\s+.*ArticleCard.*from\s+["']@\/components\/community\/article-card["']/);

      expect(
        pageContent,
        "comunidad/page.tsx must import DiscussionConsole"
      ).toMatch(/import\s+.*DiscussionConsole.*from\s+["']@\/components\/community\/discussion-console["']/);

      expect(
        pageContent,
        "comunidad/page.tsx must import CommunitySubscription"
      ).toMatch(/import\s+.*CommunitySubscription.*from\s+["']@\/components\/community\/community-subscription["']/);
    });

    it("should instantiate and render CommunityHero, ArticleCard, DiscussionConsole, and CommunitySubscription in JSX", () => {
      // Arrange: Resolve path to /comunidad route page component
      const pagePath = path.resolve(
        process.cwd(),
        "apps/web/src/app/comunidad/page.tsx"
      );

      // Act: Read page component source code
      const pageContent = fs.readFileSync(pagePath, "utf-8");

      // Assert: Verify JSX invocation of all 4 components in page template
      // Edge Case / Negative Invariant: Unused imports leave dead code and unmounted UI components
      expect(
        pageContent,
        "comunidad/page.tsx must render <CommunityHero"
      ).toMatch(/<CommunityHero\b/);

      expect(
        pageContent,
        "comunidad/page.tsx must render <ArticleCard"
      ).toMatch(/<ArticleCard\b/);

      expect(
        pageContent,
        "comunidad/page.tsx must render <DiscussionConsole"
      ).toMatch(/<DiscussionConsole\b/);

      expect(
        pageContent,
        "comunidad/page.tsx must render <CommunitySubscription"
      ).toMatch(/<CommunitySubscription\b/);
    });

    it("should ensure DiscussionConsole renders clean debate box and has purged mock comment feeds", () => {
      // Arrange: Resolve absolute path to DiscussionConsole presentation component
      const consolePath = path.resolve(
        process.cwd(),
        "apps/web/src/components/community/discussion-console.tsx"
      );

      // Act: Read component source
      const consoleSource = fs.readFileSync(consolePath, "utf-8");

      // Assert: Verify debate box heading is present
      expect(consoleSource).toContain("DEBATE, DÉJANOS TU COMENTARIO.");

      // Assert: Verify mock comments feed and fabricated thread elements have been completely purged
      expect(consoleSource).not.toContain("// HILO ACTIVO //");
      expect(consoleSource).not.toContain("COMENTARIOS REGISTRADOS");
      expect(consoleSource).not.toContain("VANE_LIVE");
      expect(consoleSource).not.toContain("ModularKicks");
      expect(consoleSource).not.toContain("AUDIO_ING_BOG");
    });
  });

  /* -----------------------------------------------------------------------
   * 6. Community Copy Dictionary & Hero Invariants
   * ----------------------------------------------------------------------- */
  describe("6. Layer 4 Community Copy Dictionary & Hero Invariants", () => {
    it("should export COMMUNITY_HERO_COPY with exact canonical metadata", () => {
      // Assert: Top badge invariant
      expect(COMMUNITY_HERO_COPY.topBadge).toBe("// ARCHIVO EDITORIAL & NOTICIAS // EDICIÓN 01");

      // Assert: Headline structure
      expect(COMMUNITY_HERO_COPY.headline.prefix).toBe("NOTICIAS, MEMORIA &");
      expect(COMMUNITY_HERO_COPY.headline.accent).toBe("CULTURA");
      expect(COMMUNITY_HERO_COPY.headline.suffix).toBe("UNDERGROUND");

      // Assert: Exactly 3 paragraphs
      expect(COMMUNITY_HERO_COPY.paragraphs).toHaveLength(3);

      // Assert: Exact content of each paragraph
      expect(COMMUNITY_HERO_COPY.paragraphs[0]).toBe(
        "Exploramos el impacto histórico y contemporáneo de las mujeres en la música electrónica, la arquitectura de hardware, la ingeniería de software y la innovación sonora."
      );
      expect(COMMUNITY_HERO_COPY.paragraphs[1]).toBe(
        "Mantente al día con las últimas noticias, entrevistas y perfiles de DJs, productoras, artistas live y proyectos híbridos que están transformando el circuito internacional a través de su técnica, creatividad y trayectoria."
      );
      expect(COMMUNITY_HERO_COPY.paragraphs[2]).toBe(
        "Este espacio está dedicado a visibilizar el talento que impulsa la evolución de la cultura electrónica a nivel global."
      );

      // Assert: 5 canonical thematic badges
      expect(COMMUNITY_HERO_COPY.thematicBadges).toEqual([
        "#MEMORIA&HISTORIA",
        "#PRODUCTORAS&DJS",
        "#LIVES&HYBRIDS",
        "#HARDWARE&SÍNTESIS",
        "#SOFTWARE&DAW",
      ]);
    });

    it("should ensure CommunityHero presentation component consumes centralized copy without hardcoded drift", () => {
      const heroPath = path.resolve(
        process.cwd(),
        "apps/web/src/components/community/community-hero.tsx"
      );
      const heroSource = fs.readFileSync(heroPath, "utf-8");

      // Assert: CommunityHero imports COMMUNITY_HERO_COPY
      expect(heroSource).toMatch(/import\s+.*COMMUNITY_HERO_COPY.*from\s+["']@\/lib\/infrastructure\/community-copy["']/);

      // Assert: Renders paragraphs dynamically via .map
      expect(heroSource).toMatch(/COMMUNITY_HERO_COPY\.paragraphs\.map/);

      // Assert: Uses centralized badges
      expect(heroSource).toMatch(/COMMUNITY_HERO_COPY\.thematicBadges/);
    });

    it("should export COMMUNITY_DISCUSSION_COPY and COMMUNITY_CHANNELS_COPY with exact canonical metadata", () => {
      expect(COMMUNITY_DISCUSSION_COPY.heading).toBe("DEBATE, DÉJANOS TU COMENTARIO.");
      expect(COMMUNITY_DISCUSSION_COPY.feedbackSubmitted).toBe(
        "Aporte enviado. Será publicado tras la moderación y verificación editorial."
      );
      expect(COMMUNITY_CHANNELS_COPY.badge).toBe(
        "// RADAR DIRECTO // Alertas de convocatorias, drops de música y eventos en tiempo real."
      );
    });
  });
});
