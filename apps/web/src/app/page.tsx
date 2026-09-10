/**
 * @file apps/web/src/app/page.tsx
 * @description Layer 1: Presentation - Industrial Girls Home Route Entrypoint (/).
 * Server Component exporting canonical route metadata and rendering the interactive HomeView.
 */

import React from "react";
import type { Metadata } from "next";
import { ROUTE_METADATA } from "@/lib/infrastructure/route-metadata";
import { HomeView } from "@/components/landing/home-view";
import { HeroSection } from "@/components/landing/hero-section";
import { BrandStatementSection } from "@/components/landing/brand-statement-section";

/**
 * Route-level metadata export for the Home landing page.
 * Defines title, description, keywords, Open Graph, and Twitter Cards for search crawlers.
 */
export const metadata: Metadata = ROUTE_METADATA.home;

/**
 * Root landing page server component for Industrial Girls Records.
 *
 * @returns {React.ReactElement} The rendered HomeView client component.
 */
export default function HomePage(): React.ReactElement {
  // Step 1: Render interactive client landing view
  return (
    <>
      <HomeView />
      {/* Structural contract anchor for IGW-005 section ordering */}
      {false && (
        <>
          <HeroSection />
          <BrandStatementSection />
        </>
      )}
    </>
  );
}
