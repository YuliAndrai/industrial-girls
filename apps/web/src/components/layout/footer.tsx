/**
 * @file apps/web/src/components/layout/footer.tsx
 * @description Layer 1: Presentation - Brutalist Underground Footer.
 * Displays label dispatch contacts, demo submission information, legal notices, and social channels.
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Footer component providing label manifesto, demo links, and copyright notices.
 *
 * @returns {React.ReactElement} The rendered footer layout.
 */
export function Footer(): React.ReactElement {
  return (
    <footer className="w-full border-t-2 border-raveRed bg-black text-white relative z-10">
      {/* Top Banner with Slogan */}
      <div className="border-b border-raveBorder bg-panel/60 py-3 px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[11px] uppercase tracking-widest text-raveTextMuted">
          <span>{"// INDUSTRIAL GIRLS RECORDINGS • EST. 2026"}</span>
          <span className="hidden sm:inline">NO WEAK KICKS &bull; PURE UNDERGROUND SOUND</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
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
              Dedicated to high-velocity industrial techno, warehouse culture, and non-conforming electronic body music.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-raveRed">
              <span className="h-1.5 w-1.5 rounded-full bg-raveRed animate-pulse" />
              TRANSMITTING FROM BERLIN & BOGOTÁ
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-raveRed">
              [ DIRECTORY ]
            </h4>
            <nav className="flex flex-col gap-2 font-mono text-xs text-neutral-300">
              <Link href="#events" className="hover:text-raveRed transition-colors">
                &gt; Next Events & Raves
              </Link>
              <Link href="#records" className="hover:text-raveRed transition-colors">
                &gt; Release Vault (Vinyl & Digital)
              </Link>
              <Link href="#residents" className="hover:text-raveRed transition-colors">
                &gt; Resident Artists
              </Link>
              <Link href="#shop" className="hover:text-raveRed transition-colors">
                &gt; Official Merchandise
              </Link>
              <Link href="#videos" className="hover:text-raveRed transition-colors">
                &gt; Transmissions / Sessions
              </Link>
            </nav>
          </div>

          {/* Column 3: Demo Submission Policy */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-raveRed">
              [ DEMO POLICY ]
            </h4>
            <p className="font-mono text-xs text-raveTextMuted">
              We accept private Soundcloud links with downloadable WAVs (145-160 BPM only). No attachments.
            </p>
            <a
              href="mailto:demos@industrialgirls.com"
              className="inline-block font-mono text-xs font-bold text-white hover:text-raveRed underline decoration-raveRed underline-offset-4 transition-colors"
            >
              DEMOS@INDUSTRIALGIRLS.COM
            </a>
            <span className="font-mono text-[10px] text-neutral-500">
              BOOKINGS: MANAGEMENT@INDUSTRIALGIRLS.COM
            </span>
          </div>

          {/* Column 4: Channels & Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-raveRed">
              [ FREQUENCIES ]
            </h4>
            <div className="flex flex-col gap-2 font-mono text-xs text-neutral-300">
              <a
                href="https://soundcloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-raveRed transition-colors"
              >
                &bull; SoundCloud // IndustrialGirls
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
              <a
                href="https://residentadvisor.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-raveRed transition-colors"
              >
                &bull; Resident Advisor // Label Profile
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
  );
}
