/**
 * @file apps/web/src/app/musica/page.tsx
 * @description Layer 1: Presentation - Music Catalog & Audio Vault Route Entrypoint (/musica).
 * Server Component exporting canonical route metadata and rendering the interactive MusicaView.
 */

import React from "react";
import type { Metadata } from "next";
import { ROUTE_METADATA } from "@/lib/infrastructure/route-metadata";
import { MusicaView } from "./musica-view";

/**
 * Route-level metadata export for the Music Catalog page.
 * Defines title, description, keywords, Open Graph, and Twitter Cards for search crawlers.
 */
export const metadata: Metadata = ROUTE_METADATA.musica;

/**
 * Music catalog server component for Industrial Girls Records.
 *
 * @returns {React.ReactElement} The rendered MusicaView client component.
 */
export default function MusicaPage(): React.ReactElement {
  // Step 1: Render interactive client music catalog view
  return <MusicaView />;
}
