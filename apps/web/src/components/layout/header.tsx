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

import { getMainNavItems } from "@/lib/infrastructure/navigation-data";

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
  // Step 1.1: Retrieve typed master routes and subsections
  const navItems = getMainNavItems();

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

        {/* Step 2: Global 5 Master Routes Navigation with Interactive Dropdowns */}
        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <div key={item.href} className="relative group py-2">
              <Link
                href={item.href}
                className="font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-raveRed transition-colors flex items-center gap-1 focus:outline-none focus:text-raveRed"
              >
                <span>{item.label}</span>
                <span className="text-[9px] text-neutral-500 group-hover:text-raveRed transition-transform duration-200 group-hover:rotate-180">
                  ▾
                </span>
              </Link>

              {/* Flyout Menu for Subsections */}
              {item.subSections.length > 0 && (
                <div className="absolute top-full left-0 mt-1 min-w-[240px] hidden group-hover:flex group-focus-within:flex flex-col bg-black/95 border border-white/15 p-2 backdrop-blur-md shadow-2xl z-50 pointer-events-auto">
                  {item.subSections.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="text-xs font-mono tracking-wider px-3 py-2 text-neutral-300 hover:bg-red-600/20 hover:text-white hover:border-l-2 hover:border-red-600 transition-all block"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Step 3: Fast Action [ ENVIAR DEMO ] & Tactile Drawer Trigger */}
        <div className="flex items-center gap-3">
          <Link href="/musica#demo-drop" className="hidden sm:inline-block focus:outline-none" aria-label="Enviar demo musical">
            <TactileButton variant="outline" size="sm" className="border-raveRed text-white hover:bg-raveRed hover:text-black">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-raveRed animate-pulse" />
                <span>[ ENVIAR DEMO ]</span>
              </span>
            </TactileButton>
          </Link>

          {/* Step 3.2: Mobile Menu Trigger (Hidden on desktop >= 1024px) */}
          <TactileButton
            variant={isDrawerOpen ? "outline" : "primary"}
            size="sm"
            onClick={onToggleDrawer}
            aria-expanded={isDrawerOpen}
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
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
