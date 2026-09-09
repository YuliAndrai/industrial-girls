/**
 * @file apps/web/src/components/layout/header.tsx
 * @description Layer 1: Presentation - Main Top Navigation Header.
 * Displays the Gothic Industrial Girls logo, the 5 master routes, the quick action [ DEMO DROP ] CTA, and the menu drawer trigger.
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Props for the Header component.
 */
export interface HeaderProps {
  /** Whether the full-screen drawer menu is currently visible */
  isDrawerOpen: boolean;
  /** Callback to toggle drawer menu open/closed state */
  onToggleDrawer: () => void;
}

/**
 * Top sticky navigation bar with 5 master routes and Demo Drop quick CTA.
 *
 * @param {HeaderProps} props - Component properties.
 * @returns {React.ReactElement} The rendered header bar.
 */
export function Header({ isDrawerOpen, onToggleDrawer }: HeaderProps): React.ReactElement {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-raveBorder bg-bg/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Step 1: Brand Logo Anchor with Gothic Cage Artwork */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-85 focus:outline-none"
        >
          <div className="relative h-10 w-16 overflow-hidden rounded-sm border border-raveRed/40 bg-black/80 transition-transform group-hover:scale-105">
            <Image
              src="/assets/images/industrial-girls-logo-grid.png"
              alt="Industrial Girls Records Logo"
              fill
              sizes="64px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-widest text-white group-hover:text-raveRed transition-colors">
              INDUSTRIAL GIRLS
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-raveTextMuted">
              UNDERGROUND RECORD LABEL
            </span>
          </div>
        </Link>

        {/* Step 2: Global 5 Master Routes Navigation */}
        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          <Link
            href="/musica"
            className="font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-raveRed transition-colors"
          >
            Música
          </Link>
          <Link
            href="/desarrollo-artistico"
            className="font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-raveRed transition-colors"
          >
            Desarrollo Artístico
          </Link>
          <Link
            href="/eventos"
            className="font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-raveRed transition-colors"
          >
            Eventos
          </Link>
          <Link
            href="/archivo"
            className="font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-raveRed transition-colors"
          >
            Archivo
          </Link>
          <Link
            href="/comunidad"
            className="font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-raveRed transition-colors"
          >
            Comunidad
          </Link>
        </nav>

        {/* Step 3: Fast Action [ DEMO DROP ] & Tactile Drawer Trigger */}
        <div className="flex items-center gap-3">
          <Link href="/musica#demo-drop" className="hidden sm:inline-block focus:outline-none">
            <TactileButton variant="outline" size="sm" className="border-raveRed text-white hover:bg-raveRed hover:text-black">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-raveRed animate-pulse" />
                <span>[ DEMO DROP ]</span>
              </span>
            </TactileButton>
          </Link>

          <TactileButton
            variant={isDrawerOpen ? "outline" : "primary"}
            size="sm"
            onClick={onToggleDrawer}
            aria-expanded={isDrawerOpen}
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          >
            <span className="flex items-center gap-2">
              <span className="inline-block font-mono text-xs font-bold">
                {isDrawerOpen ? "[ CLOSE X ]" : "[ MENU // ]"}
              </span>
            </span>
          </TactileButton>
        </div>
      </div>
    </header>
  );
}
