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
import { GeographicForm } from "@/components/common/geographic-form";
import { TactileButton } from "@/components/ui/tactile-button";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";
import { getJournalArticles } from "@/lib/infrastructure/community-catalog";
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
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();
  const { isSoundEnabled, toggleSound } = useSoundFx();

  const articles = getJournalArticles();
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>("pioneras-de-la-sintesis");

  const activeArticle = articles.find((a) => a.slug === selectedArticleSlug) || articles[0];

  // Comment state
  const [authorInput, setAuthorInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [commentErrors, setCommentErrors] = useState<Record<string, string>>({});
  const [, setRefreshState] = useState(0);

  const comments = getCommentsForArticle(activeArticle.slug);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCommentSubmission({
      articleId: activeArticle.slug,
      author: authorInput,
      commentText: commentInput,
    });

    if (!validation.isValid) {
      setCommentErrors(validation.errors);
      return;
    }

    addArticleComment(activeArticle.slug, authorInput, commentInput);
    setAuthorInput("");
    setCommentInput("");
    setCommentErrors({});
    setRefreshState((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      <main className="flex-1 w-full">
        {/* Community Hero */}
        <section className="relative flex min-h-[45vh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-raveRed bg-black px-4 py-16 text-center rave-scanlines">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(255,0,0,0.22),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="border border-raveRed/60 bg-raveRed/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-raveRed">
              {"// ENSAYOS & DEBATE TÉCNICO // 5 ARTÍCULOS"}
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              JOURNAL & <span className="text-raveRed">COMUNIDAD</span>
            </h1>
            <p className="mt-4 font-mono text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Investigación sobre tecnología de sintetizadores, acústica industrial, evolución de DAWs y la cultura de resistencia en la pista de baile.
            </p>
          </div>
        </section>

        {/* 1. Subsection: Journal Articles Grid & Reader */}
        <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="border-b-2 border-raveRed pb-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                {"// PUBLICACIONES EDITORIALES"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                ENSAYOS DE CULTURA & HARDWARE
              </h2>
            </div>

            {/* Articles List / Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
              {articles.map((art) => (
                <button
                  key={art.slug}
                  type="button"
                  onClick={() => setSelectedArticleSlug(art.slug)}
                  className={`border p-4 text-left font-mono transition-all ${
                    art.slug === activeArticle.slug
                      ? "border-raveRed bg-raveRed/10 text-white"
                      : "border-raveBorder bg-panel/40 text-neutral-400 hover:border-white/30"
                  }`}
                >
                  <span className="text-[10px] text-raveRed block font-bold">
                    {art.readingTime} &bull; {art.date}
                  </span>
                  <h4 className="text-xs font-bold uppercase text-white mt-1 line-clamp-2">
                    {art.title}
                  </h4>
                </button>
              ))}
            </div>

            {/* Active Article Reading Container */}
            <div className="border border-raveBorder bg-black p-6 sm:p-12 shadow-rave">
              <div className="border-b border-raveBorder pb-6 mb-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  {activeArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-raveRed/40 bg-raveRed/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-raveRed uppercase"
                    >
                      &bull; {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  {activeArticle.title}
                </h3>
                <p className="mt-2 font-mono text-sm sm:text-base text-raveTextMuted">
                  {activeArticle.subtitle}
                </p>
                <div className="mt-4 font-mono text-xs text-neutral-400">
                  <span>POR {activeArticle.author.toUpperCase()}</span>
                  <span className="mx-2">&bull;</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              {/* Excerpt */}
              <div className="border-l-2 border-raveRed pl-4 italic font-mono text-sm text-neutral-300 mb-8 leading-relaxed">
                &ldquo;{activeArticle.excerpt}&rdquo;
              </div>

              {/* Paragraphs */}
              <div className="space-y-6 font-mono text-sm text-neutral-300 leading-relaxed max-w-4xl">
                {activeArticle.contentParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* 2. Subsection: Reader Comments & Discussion */}
              <div className="mt-14 border-t-2 border-raveRed pt-8">
                <div className="border-b border-raveBorder pb-3 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
                    {"// DISCUSIÓN DE COMUNIDAD // " + comments.length + " APORTES"}
                  </span>
                  <h4 className="text-xl font-black uppercase text-white mt-1">
                    DEBATE TÉCNICO & COMENTARIOS
                  </h4>
                </div>

                {/* Comments List */}
                <div className="space-y-4 mb-8">
                  {comments.map((comm) => (
                    <div key={comm.id} className="border border-raveBorder bg-panel/60 p-4 font-mono">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-raveRed font-bold">&gt; {comm.author}</span>
                        <span className="text-[10px] text-neutral-500">
                          {new Date(comm.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-200 leading-relaxed">
                        {comm.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handlePostComment} className="border border-raveBorder bg-panel/40 p-5 space-y-4">
                  <span className="font-mono text-xs uppercase font-bold text-white block">
                    PUBLICAR EN ESTE HILO:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={authorInput}
                        onChange={(e) => setAuthorInput(e.target.value)}
                        placeholder="Tu alias / nombre..."
                        className="w-full border border-raveBorder bg-black px-3 py-2 font-mono text-xs text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
                      />
                      {commentErrors.author && (
                        <p className="mt-1 font-mono text-xs text-raveRed">{commentErrors.author}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Escribe tu punto de vista sobre este ensayo (mínimo 5 caracteres)..."
                      className="w-full border border-raveBorder bg-black px-3 py-2 font-mono text-xs text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
                    />
                    {commentErrors.commentText && (
                      <p className="mt-1 font-mono text-xs text-raveRed">{commentErrors.commentText}</p>
                    )}
                  </div>

                  <div>
                    <TactileButton type="submit" variant="primary" size="sm">
                      <span>[ PUBLICAR COMENTARIO ]</span>
                    </TactileButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Subsection: Community Subscription Form */}
        <section className="w-full border-b border-raveBorder bg-bg py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <GeographicForm
              source="community"
              title="UNIRME AL DESPACHO DE COMUNIDAD"
              subtitle="Recibe nuevos ensayos de audio, reportes de hardware y convocatorias de debate directamente en tu buzón."
              buttonText="[ SUSCRIBIRME AL JOURNAL DE COMUNIDAD ]"
            />
          </div>
        </section>
      </main>

      <FloatingSoundBar isSoundActive={isSoundEnabled} onToggleSound={toggleSound} />
      <Footer />
    </div>
  );
}
