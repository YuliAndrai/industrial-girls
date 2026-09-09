/**
 * @file apps/web/src/app/page.tsx
 * @description Layer 1: Presentation - Industrial Girls Landing Page Root.
 * Assembles the full Tactile Brutalism landing page with Exhale Music structure:
 * Header, Drawer, Hero, Events, Records, Residents, Shop, Videos, Community, Newsletter, Floating Sound Bar, and Footer.
 */

"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { EventsSection } from "@/components/landing/events-section";
import { RecordsSection } from "@/components/landing/records-section";
import { ResidentsSection } from "@/components/landing/residents-section";
import { ShopSection } from "@/components/landing/shop-section";
import { VideosSection } from "@/components/landing/videos-section";
import { CommunitySection } from "@/components/landing/community-section";
import { NewsletterSection } from "@/components/landing/newsletter-section";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";

/**
 * Root landing page component for Industrial Girls Records.
 *
 * @returns {React.ReactElement} The fully composed landing page view.
 */
export default function HomePage(): React.ReactElement {
  // Step 1: Manage drawer menu state through application hook
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();

  // Step 2: Manage global audio and tactile sound interactions
  const { isSoundEnabled, toggleSound } = useSoundFx();

  return (
    <div id="top" className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      {/* Top Fixed Header with Gothic Cage Logo & Drawer Trigger */}
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />

      {/* Fullscreen Brutalist Navigation Drawer Overlay */}
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      {/* Main Sections Assembly */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Next Events Section */}
        <EventsSection />

        {/* 3. Records Catalog Section */}
        <RecordsSection />

        {/* 4. Resident DJs & Artists Section */}
        <ResidentsSection />

        {/* 5. Official Merch & Vinyl Shop */}
        <ShopSection />

        {/* 6. Live Videos & Transmissions */}
        <VideosSection />

        {/* 7. Community Photo Archive */}
        <CommunitySection />

        {/* 8. Visual Underground Dispatch / Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* Floating Tactical Sound Bar (SOUND [ON/OFF] |||·) */}
      <FloatingSoundBar isSoundActive={isSoundEnabled} onToggleSound={toggleSound} />

      {/* Industrial Footer */}
      <Footer />
    </div>
  );
}
