/**
 * @file apps/web/src/components/layout/footer.tsx
 * @description Layer 1: Presentation - Minimal Industrial Footer.
 * Ultra-streamlined technical single-row footer bar displaying copyright
 * and compact official social channels.
 */

import React from "react";

/**
 * Minimal technical footer bar for Industrial Girls.
 *
 * @returns {React.ReactElement} The rendered minimal footer.
 */
export function Footer(): React.ReactElement {
  // Step 1: Render minimalist technical single-row bar
  return (
    <footer className="w-full border-t border-white/10 bg-black py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        {/* Left: Copyright text */}
        <div>
          <span>© 2026 INDUSTRIAL GIRLS // ALL RIGHTS RESERVED.</span>
        </div>

        {/* Right: Compact official networks in line */}
        <nav
          aria-label="Redes oficiales de Industrial Girls"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-neutral-400"
        >
          <a
            href="https://soundcloud.com/industrial_girls"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SoundCloud oficial de Industrial Girls"
            className="hover:text-white transition-colors"
          >
            [ SOUNDCLOUD ]
          </a>
          <span className="text-neutral-700">&bull;</span>
          <a
            href="https://www.beatport.com/es/label/industrial-girls/106032"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Beatport oficial de Industrial Girls"
            className="hover:text-white transition-colors"
          >
            [ BEATPORT ]
          </a>
          <span className="text-neutral-700">&bull;</span>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify oficial de Industrial Girls"
            className="hover:text-white transition-colors"
          >
            [ SPOTIFY ]
          </a>
          <span className="text-neutral-700">&bull;</span>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube oficial de Industrial Girls"
            className="hover:text-white transition-colors"
          >
            [ YOUTUBE ]
          </a>
          <span className="text-neutral-700">&bull;</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram oficial de Industrial Girls"
            className="hover:text-white transition-colors"
          >
            [ INSTAGRAM ]
          </a>
          <span className="text-neutral-700">&bull;</span>
          <a
            href="https://t.me/industrialgirls"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram oficial de Industrial Girls"
            className="hover:text-white transition-colors"
          >
            [ TELEGRAM ]
          </a>
        </nav>
      </div>
    </footer>
  );
}
