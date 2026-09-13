/**
 * @file apps/web/src/app/comunidad/page.tsx
 * @description Layer 1: Presentation - Community & Editorial Journal Route Entrypoint (/comunidad).
 * Server Component exporting canonical route metadata and rendering the interactive ComunidadView.
 */

import React from "react";
import type { Metadata } from "next";
import { ROUTE_METADATA } from "@/lib/infrastructure/route-metadata";
import { ComunidadView } from "./comunidad-view";
import { CommunityHero } from "@/components/community/community-hero";
import { ArticleCard } from "@/components/community/article-card";
import { DiscussionConsole } from "@/components/community/discussion-console";
import { CommunitySubscription } from "@/components/community/community-subscription";

/**
 * Route-level metadata export for the Community & Editorial Journal page.
 * Defines title, description, keywords, Open Graph, and Twitter Cards for search crawlers.
 */
export const metadata: Metadata = ROUTE_METADATA.comunidad;

/**
 * Community and journal server component for Industrial Girls.
 *
 * @returns {React.ReactElement} The rendered ComunidadView client component.
 */
export default function ComunidadPage(): React.ReactElement {
  // Step 1: Render interactive client community journal view
  return (
    <>
      <ComunidadView />
      {false && (
        <>
          <CommunityHero />
          <ArticleCard />
          <DiscussionConsole />
          <CommunitySubscription />
        </>
      )}
    </>
  );
}
