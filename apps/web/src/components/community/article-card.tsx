/**
 * @file apps/web/src/components/community/article-card.tsx
 * @description Layer 1: Presentation - Interactive Editorial Article Card.
 * Displays archival imagery with grayscale-to-color transition, research metadata, trigger question, and debate CTA.
 */

"use client";

import React from "react";
import Image from "next/image";
import { TactileButton } from "@/components/ui/tactile-button";
import type { JournalArticle } from "@/lib/infrastructure/community-catalog";

/**
 * Props for ArticleCard presentation component.
 */
export interface ArticleCardProps {
  /** Editorial journal article entity */
  article?: JournalArticle;
  /** Optional debate trigger question */
  triggerQuestion?: string;
  /** Archival image URL */
  imageUrl?: string;
  /** Whether the card is currently selected */
  isSelected?: boolean;
  /** Callback triggered when user clicks to read and debate */
  onSelectArticle?: (slug: string) => void;
}

/**
 * Interactive article card with brutalist hover treatment and debate trigger.
 *
 * @param {ArticleCardProps} props - Component properties.
 * @returns {React.ReactElement} Rendered article card element.
 */
export function ArticleCard({
  article,
  triggerQuestion,
  imageUrl,
  isSelected = false,
  onSelectArticle,
}: ArticleCardProps = {}): React.ReactElement {
  // Step 1: Resolve metadata with resilient fallbacks
  const title = article?.title ?? "Investigación Sonora de Archivo";
  const slug = article?.slug ?? "articulo-editorial";
  const readingTime = article?.readingTime ?? "5 min";
  const date = article?.date ?? "2025-01-01";
  const author = article?.author ?? "Industrial Girls Editorial";
  const tags = article?.tags ?? ["HARDWARE", "SÍNTESIS"];
  const excerpt = article?.excerpt ?? "Investigación crítica sobre los fundamentos del sonido electrónico.";
  const resolvedImage =
    imageUrl ??
    article?.imageUrl ??
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop";
  const [hasError, setHasError] = React.useState(false);
  const displayImage = hasError
    ? "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"
    : resolvedImage;

  const question =
    triggerQuestion ??
    "¿De qué manera este desarrollo técnico transformó tu comprensión de la producción de vanguardia?";

  // Step 2: Render brutalist card shell with tactile borders
  return (
    <article
      className={`group relative flex flex-col justify-between border bg-black transition-colors ${
        isSelected ? "border-raveRed shadow-rave" : "border-raveBorder hover:border-raveRed/60"
      }`}
    >
      {/* Step 3: Archival image container with grayscale-to-color transition */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-raveBorder bg-neutral-900">
        <Image
          src={displayImage}
          alt={title}
          fill
          unoptimized
          referrerPolicy="no-referrer"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
          onError={() => {
            setHasError(true);
          }}
        />
        <div className="absolute top-2 right-2 border border-raveRed bg-black/80 px-2 py-0.5 font-mono text-[10px] font-bold text-raveRed">
          {readingTime}
        </div>
      </div>

      {/* Step 4: Metadata tags & publication header */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-raveRed/40 bg-raveRed/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-raveRed"
            >
              &bull; {tag}
            </span>
          ))}
        </div>

        {/* Step 5: Article headline & excerpt */}
        <h3 className="font-mono text-lg font-bold uppercase tracking-tight text-white transition-colors group-hover:text-raveRed">
          {title}
        </h3>

        <div className="mt-2 font-mono text-[11px] text-neutral-400">
          <span>POR {author.toUpperCase()}</span>
          <span className="mx-2">&bull;</span>
          <span>{date}</span>
        </div>

        <p className="mt-3 font-mono text-xs leading-relaxed text-neutral-300 line-clamp-3">
          {excerpt}
        </p>

        {/* Step 6: Debate trigger question */}
        <div className="mt-4 border-l-2 border-raveRed/60 bg-panel/40 p-3 font-mono text-xs italic text-neutral-300">
          <span className="font-bold not-italic text-raveRed block mb-1">
            {"// PREGUNTA DETONADORA:"}
          </span>
          &ldquo;{question}&rdquo;
        </div>
      </div>

      {/* Step 7: Action CTA button */}
      <div className="border-t border-raveBorder p-4">
        <TactileButton
          type="button"
          variant="outline"
          size="sm"
          className="w-full justify-center"
          onClick={() => onSelectArticle?.(slug)}
        >
          <span>[ Leer Artículo &amp; Debatir ]</span>
        </TactileButton>
      </div>
    </article>
  );
}

export default ArticleCard;
