/**
 * @file apps/web/src/components/layout/footer.tsx
 * @description Layer 1: Presentation - Minimal Industrial Footer.
 * Ultra-streamlined technical single-row footer bar displaying copyright
 * and 6 verified official social channels as high-definition vector icons
 * with premium scale, circular interactive containers, and brand red glow.
 */

import React from "react";
import { getOfficialSocialLinks, type SocialLinkItem } from "@/lib/infrastructure/footer-data";

/**
 * Renders the high-definition monochromatic vector SVG icon corresponding to the platform.
 *
 * @param {object} props - Component properties.
 * @param {SocialLinkItem["icon"]} props.icon - Icon identifier.
 * @returns {React.ReactElement} The vector SVG element.
 */
function SocialIcon({ icon }: { icon: SocialLinkItem["icon"] }): React.ReactElement {
  // Step 1: Render platform-specific high-fidelity vector icon (w-6 h-6, fill="currentColor", viewBox="0 0 24 24")
  switch (icon) {
    case "instagram":
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "soundcloud":
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M1.175 12.225c-.092 0-.175.083-.175.175v4.2c0 .092.083.175.175.175s.175-.083.175-.175v-4.2c0-.092-.083-.175-.175-.175zm1.75-1.4c-.092 0-.175.083-.175.175v7c0 .092.083.175.175.175s.175-.083.175-.175v-7c0-.092-.083-.175-.175-.175zm1.75-.7c-.092 0-.175.083-.175.175v8.4c0 .092.083.175.175.175s.175-.083.175-.175v-8.4c0-.092-.083-.175-.175-.175zm1.75-.7c-.092 0-.175.083-.175.175v9.8c0 .092.083.175.175.175s.175-.083.175-.175v-9.8c0-.092-.083-.175-.175-.175zm1.75.35c-.092 0-.175.083-.175.175v9.1c0 .092.083.175.175.175s.175-.083.175-.175v-9.1c0-.092-.083-.175-.175-.175zm1.75-.7c-.092 0-.175.083-.175.175v9.8c0 .092.083.175.175.175s.175-.083.175-.175v-9.8c0-.092-.083-.175-.175-.175zm1.75-1.05c-.092 0-.175.083-.175.175v10.85c0 .092.083.175.175.175s.175-.083.175-.175V8.275c0-.092-.083-.175-.175-.175zm1.75-.7c-.092 0-.175.083-.175.175v12.25c0 .092.083.175.175.175s.175-.083.175-.175V7.575c0-.092-.083-.175-.175-.175zm2.1-.35c-.437 0-.857.087-1.225.245v12.005h8.4c2.127 0 3.85-1.723 3.85-3.85 0-2.03-1.575-3.693-3.57-3.833-.315-2.555-2.485-4.567-5.105-4.567h-.35z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "beatport":
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.02 8.71C17.02 5.01 14.01 2 10.31 2H3.75v20h6.56c3.7 0 6.71-3.01 6.71-6.71 0-1.66-.61-3.18-1.62-4.36 1.01-1.18 1.62-2.7 1.62-4.22zm-4.71 6.58c0 1.87-1.52 3.39-3.39 3.39H7.07v-6.78h1.85c1.87 0 3.39 1.52 3.39 3.39zm0-6.58c0 1.87-1.52 3.39-3.39 3.39H7.07V5.32h1.85c1.87 0 3.39 1.52 3.39 3.39z" />
        </svg>
      );
    case "bandcamp":
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" />
        </svg>
      );
    default:
      return <span className="w-6 h-6" aria-hidden="true" />;
  }
}

/**
 * Minimal technical footer bar for Industrial Girls with premium vector social icons.
 *
 * @returns {React.ReactElement} The rendered minimal footer.
 */
export function Footer(): React.ReactElement {
  // Step 1: Retrieve official verified social links from Layer 4 Infrastructure
  const socialLinks = getOfficialSocialLinks();

  // Step 2: Render minimalist technical single-row bar with premium interactions
  return (
    <footer className="w-full border-t border-white/10 bg-black py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        {/* Left: Copyright text */}
        <div>
          <span>© 2026 INDUSTRIAL GIRLS // ALL RIGHTS RESERVED.</span>
        </div>

        {/* Right: 6 Verified Premium Social Vector Icons */}
        <nav
          aria-label="Redes oficiales de Industrial Girls"
          className="gap-4 md:gap-5 flex items-center justify-center flex-wrap"
        >
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-neutral-300 opacity-80 transition-all duration-300 ease-out hover:scale-115 hover:opacity-100 hover:text-red-500 hover:border-red-600/70 hover:bg-red-950/20 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.6)] focus:outline-none focus:ring-1 focus:ring-red-500 inline-flex items-center justify-center"
            >
              <SocialIcon icon={social.icon} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
