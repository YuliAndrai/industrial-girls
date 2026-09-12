/**
 * @file apps/web/src/app/archivo/page.tsx
 * @description Layer 1: Presentation - Archive & Artists Roster Route Entrypoint (/archivo).
 * Server Component exporting canonical route metadata and rendering the interactive ArchivoView.
 */

import React from "react";
import type { Metadata } from "next";
import { ROUTE_METADATA } from "@/lib/infrastructure/route-metadata";
import { ArchivoView } from "./archivo-view";

/**
 * Route-level metadata export for the Archive & Artists Roster page.
 * Defines title, description, keywords, Open Graph, and Twitter Cards for search crawlers.
 */
export const metadata: Metadata = ROUTE_METADATA.archivo;

/**
 * Archive and artists roster server component for Industrial Girls.
 *
 * @returns {React.ReactElement} The rendered ArchivoView client component.
 */
export default function ArchivoPage(): React.ReactElement {
  // Step 1: Render interactive client archive view
  return <ArchivoView />;
}
