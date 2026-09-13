/**
 * @file apps/web/src/components/landing/home-view.tsx
 * @description Layer 1: Presentation - Home View Client Component.
 * Encapsulates client interactivity (drawer toggle, audio sound effects) and assembles
 * the Tactile Brutalism landing page sections for Industrial Girls.
 */

"use client";

import React from "react";
import { Header } from "@/components/layout/header";
import { NavigationDrawer } from "@/components/layout/navigation-drawer";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FloatingSoundBar } from "@/components/landing/floating-sound-bar";
import { useDrawer } from "@/lib/hooks/use-drawer";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";

/**
 * Client interactive landing page view for Industrial Girls Records.
 *
 * @returns {React.ReactElement} The fully composed landing page view.
 */
export function HomeView(): React.ReactElement {
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

      {/* Main Sections Assembly - Exclusive Minimalist Hero & Bento Command Center */}
      <main className="flex-1 w-full">
        {/* Minimalist Hero Section with Bento Command Center & Social Dock */}
        <HeroSection />
      </main>

      {/* Floating Tactical Sound Bar (SOUND [ON/OFF] |||·) */}
      <FloatingSoundBar isSoundActive={isSoundEnabled} onToggleSound={toggleSound} />

      {/* Industrial Footer */}
      <Footer />
    </div>
  );
}

