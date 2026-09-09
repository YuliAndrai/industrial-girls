/**
 * @file apps/web/src/lib/master-architecture.test.ts
 * @description Master Architecture TDD Test Suite (IGW-004).
 * Validates catalogs for Music (VA 001-005, IG MIX), Events (Status, Countries, Showcases),
 * Archive (30+ artists, media gallery), Community (5 articles, initial comments),
 * domain validation pipelines (geo-capture, comments, merch waitlist) and comments store.
 *
 * @spec IGW-004-MASTER-ARCHITECTURE
 */

import { describe, it, expect } from "vitest";
import {
  getCompilations,
  getCompilationByCode,
  getPodcasts,
  getDemoDropSpecs,
  COMPILATIONS_CATALOG,
  PODCASTS_CATALOG,
} from "./infrastructure/music-catalog";
import {
  getEventCalendarStatus,
  getStandardCountries,
  getPastShowcases,
} from "./infrastructure/events-catalog";
import {
  getArchiveArtists,
  getArtistBySlug,
  getMediaArchiveItems,
} from "./infrastructure/archive-catalog";
import {
  getJournalArticles,
  getArticleBySlug,
  getArticleComments,
} from "./infrastructure/community-catalog";
import {
  validateGeographicCapture,
  GeographicCaptureInput,
} from "./pipelines/geographic-capture-pipeline";
import {
  validateCommentSubmission,
  CommentSubmissionInput,
} from "./pipelines/community-comment-pipeline";
import {
  validateMerchWaitlist,
  MerchWaitlistInput,
} from "./pipelines/merch-waitlist-pipeline";
import {
  getCommentsForArticle,
  addArticleComment,
} from "./state/community-comments-store";

describe("Master Architecture (IGW-004) — TDD Test Suite", () => {
  describe("1. Music Section Infrastructure (@spec IGW-004-MUSIC)", () => {
    it("should provide exactly 5 VA compilations from VA 001 to VA 005 with valid tracklists", () => {
      // Step 1: Arrange & Act
      const compilations = getCompilations();

      // Step 2: Assert
      expect(compilations).toHaveLength(5);
      expect(compilations).toEqual(COMPILATIONS_CATALOG);

      const expectedCodes = ["VA 001", "VA 002", "VA 003", "VA 004", "VA 005"];
      compilations.forEach((comp, idx) => {
        expect(comp.catalogCode).toBe(expectedCodes[idx]);
        expect(comp.title).toBeTruthy();
        expect(comp.tracks.length).toBeGreaterThanOrEqual(4);
        expect(comp.links.bandcamp.startsWith("http")).toBe(true);
        expect(comp.links.beatport.startsWith("http")).toBe(true);

        comp.tracks.forEach((track) => {
          expect(track.artist).toBeTruthy();
          expect(track.title).toBeTruthy();
          expect(track.duration).toMatch(/^\d{2}:\d{2}$/);
        });
      });
    });

    it("should query compilations by catalog code case-insensitively", () => {
      // Step 1: Query existing compilation
      const found = getCompilationByCode("va 002");
      expect(found).toBeDefined();
      expect(found?.title).toBe("DISTORSIÓN SISTÉMICA");

      // Step 2: Query non-existent compilation
      const notFound = getCompilationByCode("va 999");
      expect(notFound).toBeUndefined();
    });

    it("should provide podcast sessions IG MIX 001 to IG MIX 004 with media embeds", () => {
      // Step 1: Arrange & Act
      const podcasts = getPodcasts();

      // Step 2: Assert
      expect(podcasts).toHaveLength(4);
      expect(podcasts).toEqual(PODCASTS_CATALOG);

      const expectedMixes = ["IG MIX 001", "IG MIX 002", "IG MIX 003", "IG MIX 004"];
      podcasts.forEach((podcast, idx) => {
        expect(podcast.code).toBe(expectedMixes[idx]);
        expect(podcast.artist).toBeTruthy();
        expect(podcast.soundCloudEmbedUrl).toContain("soundcloud.com");
        expect(podcast.youtubeEmbedId).toBeTruthy();
      });
    });

    it("should expose complete Demo Drop specifications and requirements", () => {
      // Step 1: Arrange & Act
      const specs = getDemoDropSpecs();

      // Step 2: Assert
      expect(specs.title).toBeTruthy();
      expect(specs.acceptedFormats.length).toBeGreaterThanOrEqual(2);
      expect(specs.allowedProviders.length).toBeGreaterThanOrEqual(2);
      expect(specs.rules.length).toBeGreaterThanOrEqual(3);
      expect(specs.contactEmail).toBe("demos@industrialgirls.com");
    });
  });

  describe("2. Events Section Infrastructure (@spec IGW-004-EVENTS)", () => {
    it("should provide calendar status indicating Season in Preparation", () => {
      // Step 1: Arrange & Act
      const status = getEventCalendarStatus();

      // Step 2: Assert
      expect(status.headline).toBe("PRÓXIMAS FECHAS — EN PREPARACIÓN");
      expect(status.statusLabel).toContain("TEMPORADA EN CURADURÍA");
      expect(status.curatorialNote).toBeTruthy();
      expect(status.announcementWindow).toBeTruthy();
    });

    it("should include a standardized list of countries for geographic alerts", () => {
      // Step 1: Arrange & Act
      const countries = getStandardCountries();

      // Step 2: Assert
      expect(countries.length).toBeGreaterThanOrEqual(10);
      expect(countries).toContain("Colombia");
      expect(countries).toContain("Alemania");
      expect(countries).toContain("Francia");
      expect(countries).toContain("Reino Unido");
      expect(countries).toContain("España");
    });

    it("should contain past showcase history entries with video embed identifiers", () => {
      // Step 1: Arrange & Act
      const showcases = getPastShowcases();

      // Step 2: Assert
      expect(showcases.length).toBeGreaterThanOrEqual(3);
      showcases.forEach((showcase) => {
        expect(showcase.venue).toBeTruthy();
        expect(showcase.location).toBeTruthy();
        expect(showcase.youtubeVideoId).toBeTruthy();
        expect(showcase.lineup.length).toBeGreaterThan(0);
      });
    });
  });

  describe("3. Archive Section Infrastructure (@spec IGW-004-ARCHIVE)", () => {
    it("should provide a roster containing more than 30 distinct artists with subgenres", () => {
      // Step 1: Arrange & Act
      const artists = getArchiveArtists();

      // Step 2: Assert
      expect(artists.length).toBeGreaterThanOrEqual(30);

      const expectedKeyArtists = [
        "Clara Cuvé",
        "Øtta",
        "Parfait",
        "Wallis",
        "Caravel",
        "Somniac One",
        "Lady Maru",
        "Cassie Raptor",
        "Cera Khin",
        "Anetha",
        "SPFDJ",
        "VTSS",
        "Daria Kolosova",
        "Paula Temple",
        "Stephanie Sykes",
        "Ellen Allien",
        "Rebekah",
        "Fatima Hajji",
        "Indira Paganotto",
        "SNTS",
        "Alignment",
        "Sara Landry",
        "I Hate Models",
        "Hector Oaks",
        "Klangkuenstler",
        "999999999",
        "Charlie Sparks",
        "Nico Moreno",
        "VANE",
        "DISTORTA",
        "HEX99",
      ];

      const artistNames = artists.map((a) => a.name);
      expectedKeyArtists.forEach((name) => {
        expect(artistNames).toContain(name);
      });

      artists.forEach((artist) => {
        expect(artist.slug).toBeTruthy();
        expect(artist.name).toBeTruthy();
        expect(artist.origin).toBeTruthy();
        expect(artist.subgenre).toBeTruthy();
        expect(artist.bio).toBeTruthy();
        expect(artist.soundCloudUrl.startsWith("http")).toBe(true);
      });
    });

    it("should query artists by slug correctly", () => {
      // Step 1: Query existing artist
      const artist = getArtistBySlug("paula-temple");
      expect(artist).toBeDefined();
      expect(artist?.name).toBe("Paula Temple");
      expect(artist?.origin).toBe("Reino Unido");

      // Step 2: Query unknown artist
      const unknown = getArtistBySlug("unknown-artist");
      expect(unknown).toBeUndefined();
    });

    it("should provide media archive gallery items with photos and videos", () => {
      // Step 1: Arrange & Act
      const items = getMediaArchiveItems();

      // Step 2: Assert
      expect(items.length).toBeGreaterThanOrEqual(3);
      expect(items.some((i) => i.type === "photo")).toBe(true);
      expect(items.some((i) => i.type === "video")).toBe(true);
    });
  });

  describe("4. Community Section Infrastructure & Journal (@spec IGW-004-COMMUNITY)", () => {
    it("should provide exactly 5 specialized editorial journal articles", () => {
      // Step 1: Arrange & Act
      const articles = getJournalArticles();

      // Step 2: Assert
      expect(articles).toHaveLength(5);
      articles.forEach((article) => {
        expect(article.slug).toBeTruthy();
        expect(article.title).toBeTruthy();
        expect(article.subtitle).toBeTruthy();
        expect(article.author).toBeTruthy();
        expect(article.readingTime).toBeTruthy();
        expect(article.tags.length).toBeGreaterThan(0);
        expect(article.contentParagraphs.length).toBeGreaterThanOrEqual(3);
      });
    });

    it("should query journal articles by slug", () => {
      // Step 1: Query article
      const article = getArticleBySlug("pioneras-del-voltaje");
      expect(article).toBeDefined();
      expect(article?.title).toContain("Pioneras del Voltaje");

      // Step 2: Query non-existent
      const nonExistent = getArticleBySlug("art-999");
      expect(nonExistent).toBeUndefined();
    });

    it("should retrieve initial comments linked to articles", () => {
      // Step 1: Query comments
      const comments = getArticleComments("pioneras-del-voltaje");
      expect(comments.length).toBeGreaterThan(0);
      expect(comments[0].author).toBe("VANE_LIVE");
    });
  });

  describe("5. Domain Validation Pipelines (@spec IGW-004-PIPELINES)", () => {
    describe("Geographic Capture Pipeline", () => {
      it("should accept valid subscriber payload for events or community", () => {
        // Step 1: Arrange
        const payload: GeographicCaptureInput = {
          email: "rave@industrialgirls.com",
          name: "DISTORTA FAN",
          country: "Colombia",
          city: "Bogotá",
          source: "events",
        };

        // Step 2: Act
        const result = validateGeographicCapture(payload);

        // Step 3: Assert
        expect(result.isValid).toBe(true);
        expect(Object.keys(result.errors)).toHaveLength(0);
      });

      it("should reject payload with missing or invalid fields", () => {
        // Step 1: Arrange
        const invalidPayload: GeographicCaptureInput = {
          email: "not-an-email",
          name: "A",
          country: "InvalidCountryName123",
          city: "",
          source: "community",
        };

        // Step 2: Act
        const result = validateGeographicCapture(invalidPayload);

        // Step 3: Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toBeDefined();
        expect(result.errors.name).toBeDefined();
        expect(result.errors.country).toBeDefined();
        expect(result.errors.city).toBeDefined();
      });
    });

    describe("Community Comment Pipeline", () => {
      it("should accept valid article comment submission", () => {
        // Step 1: Arrange
        const payload: CommentSubmissionInput = {
          articleId: "pioneras-del-voltaje",
          author: "AnalogExplorer",
          commentText: "Gran artículo sobre Daphne Oram y la técnica Oramics.",
          email: "analog@explorer.org",
          role: "Ingeniera de Sonido",
        };

        // Step 2: Act
        const result = validateCommentSubmission(payload);

        // Step 3: Assert
        expect(result.isValid).toBe(true);
        expect(Object.keys(result.errors)).toHaveLength(0);
      });

      it("should reject comments for non-existent articles or too short text", () => {
        // Step 1: Arrange
        const invalidPayload: CommentSubmissionInput = {
          articleId: "non-existent-article-slug",
          author: "",
          commentText: "hi",
        };

        // Step 2: Act
        const result = validateCommentSubmission(invalidPayload);

        // Step 3: Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.articleId).toBeDefined();
        expect(result.errors.author).toBeDefined();
        expect(result.errors.commentText).toBeDefined();
      });
    });

    describe("Merch Priority Waitlist Pipeline", () => {
      it("should accept valid email for waitlist", () => {
        // Step 1: Arrange & Act
        const result = validateMerchWaitlist({ email: "buyer@domain.com" });

        // Step 2: Assert
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should reject invalid email for waitlist", () => {
        // Step 1: Arrange & Act
        const result = validateMerchWaitlist({ email: "bad-email" });

        // Step 2: Assert
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });
  });

  describe("6. Community Comments Application State (@spec IGW-004-STATE)", () => {
    it("should allow querying and adding comments reactively", () => {
      // Step 1: Query initial comments count
      const articleId = "pioneras-del-voltaje";
      const initial = getCommentsForArticle(articleId);
      const initialCount = initial.length;

      // Step 2: Add new comment
      const added = addArticleComment(articleId, "SynthGeek", "Aportando un nuevo punto de vista a la discusión.");
      expect(added.id).toBeDefined();
      expect(added.author).toBe("SynthGeek");

      // Step 3: Verify count increment
      const updated = getCommentsForArticle(articleId);
      expect(updated.length).toBe(initialCount + 1);
      expect(updated[0].author).toBe("SynthGeek");
    });
  });
});
