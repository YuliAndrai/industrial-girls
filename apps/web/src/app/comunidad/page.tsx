/**
 * @file apps/web/src/app/comunidad/page.tsx
 * @description Layer 1: Presentation - Community & Editorial Journal Route (/comunidad).
 * Displays the 5 specialized sound culture articles, interactive reader comments/debate, and community subscription.
 */

"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { CommunityHero } from "@/components/community/community-hero";
import { ArticleCard } from "@/components/community/article-card";
import { DiscussionConsole, DiscussionParticipantRole } from "@/components/community/discussion-console";
import { CommunitySubscription } from "@/components/community/community-subscription";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";
import { getJournalArticles, JournalArticle } from "@/lib/infrastructure/community-catalog";
import {
  getCommentsForArticle,
  addArticleComment,
} from "@/lib/state/community-comments-store";
import { validateCommentSubmission } from "@/lib/pipelines/community-comment-pipeline";

/**
 * Community and Editorial Journal route page.
 *
 * @returns {React.ReactElement} Rendered Comunidad page.
 */
export default function ComunidadPage(): React.ReactElement {
  // Step 1: Initialize navigation and sound hooks
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();
  const { isSoundEnabled, toggleSound } = useSoundFx();

  // Step 2: Retrieve editorial articles and track active filter/selection
  const articles: JournalArticle[] = getJournalArticles();
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>(
    articles[0]?.slug ?? "pioneras-del-voltaje"
  );
  const [, setRefreshKey] = useState<number>(0);

  // Step 3: Filter articles based on active tag if present
  const displayedArticles = activeFilter
    ? articles.filter((art) =>
        art.tags.some((t) => t.toLowerCase() === activeFilter.replace("#", "").toLowerCase())
      )
    : articles;

  const currentArticle =
    articles.find((a) => a.slug === selectedArticleSlug) || articles[0];
  const comments = getCommentsForArticle(currentArticle?.slug ?? "");

  // Step 4: Handle posting contributions via domain validation pipeline
  const handlePostContribution = (data: {
    author: string;
    email: string;
    role: DiscussionParticipantRole;
    content: string;
  }) => {
    const validation = validateCommentSubmission({
      articleId: currentArticle.slug,
      author: data.author,
      email: data.email,
      role: data.role,
      commentText: data.content,
    });

    if (!validation.isValid) {
      return;
    }

    addArticleComment(
      currentArticle.slug,
      data.author,
      data.content,
      data.role,
      undefined,
      data.email
    );
    setRefreshKey((k) => k + 1);
  };

  const handleSelectFilter = (tag: string) => {
    setActiveFilter((prev) => (prev === tag ? undefined : tag));
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      {/* Step 5: Global Header and Navigation Drawer */}
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      <main className="flex-1 w-full">
        {/* Step 6: Community Hero Banner with Display H1 & Thematic Badges */}
        <CommunityHero
          activeFilter={activeFilter}
          onSelectFilter={handleSelectFilter}
          articleCount={articles.length}
        />

        {/* Step 7: Editorial Articles Interactive Grid */}
        <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="border-b-2 border-raveRed pb-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                {"// PUBLICACIONES EDITORIALES // INVESTIGACIÓN SONORA"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                ENSAYOS DE HARDWARE, DSP & CULTURA
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  triggerQuestion={article.debateQuestion}
                  imageUrl={article.imageUrl}
                  isSelected={article.slug === currentArticle?.slug}
                  onSelectArticle={(slug) => {
                    setSelectedArticleSlug(slug);
                    const el = document.getElementById("foro-tecnico");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Step 8: Active Reading Container & Tactical Discussion Console */}
        <section id="foro-tecnico" className="w-full border-b border-raveBorder bg-black py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl space-y-12">
            {/* Active Article Full Reader */}
            {currentArticle && (
              <div className="border border-raveBorder bg-panel/30 p-6 sm:p-10 shadow-rave">
                <div className="border-b border-raveBorder pb-6 mb-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {currentArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-raveRed/40 bg-raveRed/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-raveRed uppercase"
                      >
                        &bull; {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    {currentArticle.title}
                  </h3>
                  <p className="mt-2 font-mono text-sm sm:text-base text-raveTextMuted">
                    {currentArticle.subtitle}
                  </p>
                  <div className="mt-4 font-mono text-xs text-neutral-400">
                    <span>POR {currentArticle.author.toUpperCase()}</span>
                    <span className="mx-2">&bull;</span>
                    <span>{currentArticle.date}</span>
                    <span className="mx-2">&bull;</span>
                    <span className="text-raveRed">{currentArticle.readingTime}</span>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="border-l-2 border-raveRed pl-4 italic font-mono text-sm text-neutral-300 mb-8 leading-relaxed">
                  &ldquo;{currentArticle.excerpt}&rdquo;
                </div>

                {/* Paragraphs */}
                <div className="space-y-6 font-mono text-sm text-neutral-300 leading-relaxed">
                  {currentArticle.contentParagraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Discussion Console */}
            <DiscussionConsole
              articleSlug={currentArticle?.slug}
              articleTitle={currentArticle?.title}
              comments={comments}
              onSubmitContribution={handlePostContribution}
            />
          </div>
        </section>

        {/* Step 9: Geographic Community Network Subscription */}
        <CommunitySubscription />
      </main>

      {/* Step 10: Persistent Elements */}
      <FloatingSoundBar isSoundActive={isSoundEnabled} onToggleSound={toggleSound} />
      <Footer />
    </div>
  );
}
