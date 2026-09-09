/**
 * @file apps/web/src/components/layout/footer.tsx
 * @description Layer 1: Presentation - Brutalist Underground Footer.
 * Aligned with the 5 master routes, official socials (SoundCloud, YouTube, Instagram),
 * and interactive "Merch (Coming Soon)" waitlist modal trigger.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MerchWaitlistModal } from "@/components/common/merch-waitlist-modal";

/**
 * Footer component providing label manifesto, 5 master section links, socials, and Merch waitlist.
 *
 * @returns {React.ReactElement} The rendered footer layout.
 */
export function Footer(): React.ReactElement {
  const [isMerchModalOpen, setIsMerchModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full border-t-2 border-raveRed bg-black text-white relative z-10">
        {/* Top Banner with Slogan */}
        <div className="border-b border-raveBorder bg-panel/60 py-3 px-4 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[11px] uppercase tracking-widest text-raveTextMuted">
            <span>{"// INDUSTRIAL GIRLS RECORDINGS • EST. 2026"}</span>
            <span className="hidden sm:inline">NO WEAK KICKS &bull; PURE UNDERGROUND SOUND</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-12 pb-28 sm:px-6 sm:pt-16 sm:pb-32">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Brand & Logo */}
            <div className="flex flex-col gap-4">
              <div className="relative h-14 w-24 overflow-hidden rounded-sm border border-raveRed/50 bg-black">
                <Image
                  src="/assets/images/industrial-girls-logo-grid.png"
                  alt="Industrial Girls Recordings"
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                />
              </div>
              <p className="font-mono text-xs leading-relaxed text-raveTextMuted">
                Plataforma de infraestructura cultural y sonora dedicada al hard techno industrial, la cultura de almacén y la vanguardia electrónica.
              </p>
              <div className="flex items-center gap-2 font-mono text-[10px] text-raveRed">
                <span className="h-1.5 w-1.5 rounded-full bg-raveRed animate-pulse" />
                TRANSMITIENDO DESDE BERLÍN & BOGOTÁ
              </div>
            </div>

            {/* Column 2: 5 Master Sections */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-raveRed">
                [ 5 SECCIONES MAESTRAS ]
              </h4>
              <nav className="flex flex-col gap-2 font-mono text-xs text-neutral-300">
                <Link href="/musica" className="hover:text-raveRed transition-colors">
                  &gt; 01. Música (Releases & Podcasts)
                </Link>
                <Link href="/desarrollo-artistico" className="hover:text-raveRed transition-colors">
                  &gt; 02. Desarrollo Artístico (Agencia 360°)
                </Link>
                <Link href="/eventos" className="hover:text-raveRed transition-colors">
                  &gt; 03. Eventos & Showcases
                </Link>
                <Link href="/archivo" className="hover:text-raveRed transition-colors">
                  &gt; 04. Archivo & Roster
                </Link>
                <Link href="/comunidad" className="hover:text-raveRed transition-colors">
                  &gt; 05. Comunidad & Journal
                </Link>
              </nav>
            </div>

            {/* Column 3: Demo Policy & Merch Waitlist Action */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-raveRed">
                [ DEMO DROP & MERCH ]
              </h4>
              <p className="font-mono text-xs text-raveTextMuted">
                Recepción de pistas terminadas (145-165 BPM) vía SoundCloud privado o Dropbox.
              </p>
              <Link
                href="/musica#demo-drop"
                className="font-mono text-xs font-bold text-white hover:text-raveRed underline decoration-raveRed underline-offset-4 transition-colors"
              >
                &gt; IR A REGLAS DE DEMO DROP
              </Link>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsMerchModalOpen(true)}
                  className="border border-white/30 bg-panel px-3 py-1.5 font-mono text-xs text-white hover:border-raveRed hover:text-raveRed transition-all text-left w-full"
                >
                  <span className="text-raveRed font-bold mr-1">&bull;</span>
                  Merch (Coming Soon) &rarr;
                </button>
              </div>
            </div>

            {/* Column 4: Official Frequencies */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-raveRed">
                [ FRECUENCIAS OFICIALES ]
              </h4>
              <div className="flex flex-col gap-2 font-mono text-xs text-neutral-300">
                <a
                  href="https://soundcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-raveRed transition-colors"
                >
                  &bull; SoundCloud // Industrial Girls
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-raveRed transition-colors"
                >
                  &bull; YouTube // Industrial Girls TV
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-raveRed transition-colors"
                >
                  &bull; Instagram // @industrialgirls_ofc
                </a>
                <a
                  href="https://bandcamp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-raveRed transition-colors"
                >
                  &bull; Bandcamp // Industrial Girls Wax
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="mt-12 flex flex-col items-center justify-between border-t border-raveBorder/80 pt-6 sm:flex-row gap-4">
            <p className="font-mono text-[11px] text-neutral-500">
              &copy; 2026 Industrial Girls Records. All rights reserved. Tactile Brutalism Edition.
            </p>
            <div className="flex items-center gap-6 font-mono text-[11px] text-neutral-500">
              <span className="hover:text-raveRed cursor-pointer">PRIVACY POLICY</span>
              <span>&bull;</span>
              <span className="hover:text-raveRed cursor-pointer">TERMS OF SERVICE</span>
              <span>&bull;</span>
              <span className="text-raveRed font-bold">ALL UNDERGROUND FREQUENCIES</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Merch Waitlist Modal */}
      <MerchWaitlistModal
        isOpen={isMerchModalOpen}
        onClose={() => setIsMerchModalOpen(false)}
      />
    </>
  );
}
