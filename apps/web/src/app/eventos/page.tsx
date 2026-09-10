/**
 * @file apps/web/src/app/eventos/page.tsx
 * @description Layer 1: Presentation - Events & Showcases Route Entrypoint (/eventos).
 * Server Component exporting canonical route metadata and rendering the interactive EventosView.
 */

import React from "react";
import type { Metadata } from "next";
import { ROUTE_METADATA } from "@/lib/infrastructure/route-metadata";
import { EventosView } from "./eventos-view";

/**
 * Route-level metadata export for the Events & Showcases page.
 * Defines title, description, keywords, Open Graph, and Twitter Cards for search crawlers.
 */
export const metadata: Metadata = ROUTE_METADATA.eventos;

/**
 * Events and showcases server component for Industrial Girls.
 *
 * @returns {React.ReactElement} The rendered EventosView client component.
 */
export default function EventosPage(): React.ReactElement {
  // Step 1: Render interactive client events view
  return <EventosView />;
}
