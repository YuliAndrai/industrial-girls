/**
 * @file apps/web/src/app/desarrollo-artistico/artist-development-view.tsx
 * @description Layer 1: Presentation - Artist Development 360° Agency Route Entrypoint.
 * Assembles the Hero, Technical Services Console Grid, Diagnostic Intake Form, Floating Sound Bar, Header, and Footer.
 */

"use client";

import React from "react";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { ArtistDevHero } from "@/components/artist-development/artist-dev-hero";
import { ServicesGrid } from "@/components/artist-development/services-grid";
import { IntakeDiagnosticForm } from "@/components/artist-development/intake-diagnostic-form";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";

/**
 * Route page view for Artist Development Agency module.
 *
 * @returns {React.ReactElement} The composed Artist Development page.
 */
export function ArtistDevelopmentView(): React.ReactElement {
  // Step 1: Manage drawer menu state through hook
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();

  // Step 2: Manage global audio and tactile sound interactions
  const { isSoundEnabled, toggleSound } = useSoundFx();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-neutral-100 selection:bg-raveRed selection:text-black">
      {/* Top Fixed Header with Gothic Cage Logo & Drawer Trigger */}
      <Header isDrawerOpen={isOpen} onToggleDrawer={toggleDrawer} />

      {/* Fullscreen Brutalist Navigation Drawer Overlay */}
      <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />

      {/* Main Sections Assembly */}
      <main className="flex-1 w-full">
        {/* 1. Hero & Value Proposition */}
        <ArtistDevHero />

        {/* 2. Technical Services Console Grid */}
        <ServicesGrid />

        {/* 3. Intake & Diagnostic Form */}
        <IntakeDiagnosticForm />
      </main>

      {/* Floating Tactical Sound Bar */}
      <FloatingSoundBar isSoundActive={isSoundEnabled} onToggleSound={toggleSound} />

      {/* Industrial Footer */}
      <Footer />
    </div>
  );
}
