/**
 * @file apps/web/src/components/layout/navigation-drawer.tsx
 * @description Layer 1: Presentation - Fullscreen Brutalist Navigation Drawer.
 * Slide-out dark rave menu structured strictly with the 5 master routes and Demo Drop access.
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Props for the NavigationDrawer component.
 */
export interface NavigationDrawerProps {
  /** Whether the drawer overlay is active and visible */
  isOpen: boolean;
  /** Callback to dismiss the drawer */
  onClose: () => void;
}

/**
 * Fullscreen rave slide-out navigation overlay.
 *
 * @param {NavigationDrawerProps} props - Component properties.
 * @returns {React.ReactElement | null} The rendered drawer or null if inactive.
 */
export function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps): React.ReactElement | null {
  if (!isOpen) return null;

  // Step 1: Nav items definition mapping to the 5 master routes
  const navItems = [
    { number: "01", label: "MÚSICA", href: "/musica", note: "CATÁLOGO VA 001-005, PODCASTS & DEMO DROP" },
    { number: "02", label: "DESARROLLO ARTÍSTICO", href: "/desarrollo-artistico", note: "AGENCIA 360° // INFRAESTRUCTURA & GESTIÓN" },
    { number: "03", label: "EVENTOS", href: "/eventos", note: "CALENDARIO DE GIRAS, ALERTA GEOGRÁFICA & SHOWCASES" },
    { number: "04", label: "ARCHIVO", href: "/archivo", note: "ROSTER DE MÁS DE 30 ARTISTAS & REGISTRO VISUAL" },
    { number: "05", label: "COMUNIDAD", href: "/comunidad", note: "JOURNAL EDITORIAL, DEBATE TÉCNICO & SUSCRIPCIÓN" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl text-white rave-scanlines overflow-y-auto"
    >
      {/* Step 2: Drawer Top Bar with Close Action */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-raveBorder px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-14 overflow-hidden rounded-sm border border-raveRed/40 bg-black">
            <Image
              src="/assets/images/industrial-girls-logo-grid.png"
              alt="Industrial Girls Logo"
              fill
              sizes="56px"
              className="object-contain p-1"
            />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
            DISPATCH INDEX // 5 SECCIONES MAESTRAS
          </span>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="group flex items-center gap-2 rounded-none border border-raveRed bg-raveRed px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-raveRed focus:outline-none"
        >
          [ ESC / CLOSE X ]
        </button>
      </div>

      {/* Step 3: High-Impact Navigation Links */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12">
        <nav className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.number}
              href={item.href}
              onClick={onClose}
              className="group flex flex-col border-b border-raveBorder/60 pb-4 transition-all hover:border-raveRed focus:outline-none"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-raveRed group-hover:translate-x-1 transition-transform">
                  /{item.number}
                </span>
                <span className="text-2xl font-extrabold uppercase tracking-tight text-white group-hover:text-raveRed transition-colors sm:text-4xl">
                  {item.label}
                </span>
              </div>
              <span className="mt-1 font-mono text-[10px] tracking-wider text-raveTextMuted group-hover:text-neutral-300">
                {item.note}
              </span>
            </Link>
          ))}

          {/* Quick Demo Drop item in drawer */}
          <Link
            href="/musica#demo-drop"
            onClick={onClose}
            className="group flex flex-col border border-raveRed/50 bg-raveRed/10 p-4 transition-all hover:border-raveRed hover:bg-raveRed/20 focus:outline-none"
            aria-label="Ir a reglas de Demo Drop y envío de tracks inéditos"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-raveRed animate-ping" />
              <span className="font-mono text-sm font-black uppercase tracking-wider text-white group-hover:text-raveRed">
                [ DEMO DROP // ENVIAR PISTA ]
              </span>
            </div>
            <span className="mt-1 font-mono text-[10px] text-neutral-300">
              RECEPCIÓN DE TRACKS INÉDITOS VÍA SOUNDCLOUD / DROPBOX
            </span>
          </Link>
        </nav>

        {/* Step 4: Footer Info & Social Links */}
        <div className="mt-16 border-t border-raveBorder pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-raveTextMuted">
            <div>
              <span>LABEL HEADQUARTERS: BERLIN // BOGOTÁ</span>
              <span className="mx-2">&bull;</span>
              <span>INQUIRIES: DEMOS@INDUSTRIALGIRLS.COM</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://soundcloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-raveRed transition-colors"
                aria-label="SoundCloud de Industrial Girls"
              >
                SOUNDCLOUD
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-raveRed transition-colors"
                aria-label="Canal de YouTube de Industrial Girls"
              >
                YOUTUBE
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-raveRed transition-colors"
                aria-label="Perfil de Instagram de Industrial Girls"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
