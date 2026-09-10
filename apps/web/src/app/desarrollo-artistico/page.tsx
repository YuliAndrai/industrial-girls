/**
 * @file apps/web/src/app/desarrollo-artistico/page.tsx
 * @description Layer 1: Presentation - Artist Development 360° Agency Route Entrypoint (/desarrollo-artistico).
 * Server Component exporting canonical route metadata and rendering the interactive ArtistDevelopmentView.
 */

import React from "react";
import type { Metadata } from "next";
import { ROUTE_METADATA } from "@/lib/infrastructure/route-metadata";
import { ArtistDevelopmentView } from "./artist-development-view";

/**
 * Route-level metadata export for the Artist Development 360° Agency page.
 * Defines title, description, keywords, Open Graph, and Twitter Cards for search crawlers.
 */
export const metadata: Metadata = ROUTE_METADATA.desarrolloArtistico;

/**
 * Artist development agency server component for Industrial Girls.
 *
 * @returns {React.ReactElement} The rendered ArtistDevelopmentView client component.
 */
export default function ArtistDevelopmentPage(): React.ReactElement {
  // Step 1: Render interactive client artist development view
  return <ArtistDevelopmentView />;
}
