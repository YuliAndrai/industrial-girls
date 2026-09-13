/**
 * @file apps/web/src/components/layout/footer.tsx
 * @description Layer 1: Presentation - Minimal Industrial Footer.
 * Ultra-streamlined technical single-row footer bar displaying copyright
 * and 6 verified official social channels as monochromatic vector icons.
 */

import React from "react";
import { getOfficialSocialLinks, type SocialLinkItem } from "@/lib/infrastructure/footer-data";

/**
 * Renders the clean vector SVG icon corresponding to the social platform.
 *
 * @param {object} props - Component properties.
 * @param {SocialLinkItem["icon"]} props.icon - Icon identifier.
 * @returns {React.ReactElement} The vector SVG element.
 */
function SocialIcon({ icon }: { icon: SocialLinkItem["icon"] }): React.ReactElement {
  // Step 1: Render platform-specific monochromatic vector icon (w-5 h-5)
  switch (icon) {
    case "instagram":
      return (
        <svg
          className="w-5 h-5 text-neutral-400 hover:text-red-500 transition-colors duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "soundcloud":
      return (
        <svg
          className="w-5 h-5 text-neutral-400 hover:text-red-500 transition-colors duration-200"
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
          className="w-5 h-5 text-neutral-400 hover:text-red-500 transition-colors duration-200"
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
          className="w-5 h-5 text-neutral-400 hover:text-red-500 transition-colors duration-200"
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
          className="w-5 h-5 text-neutral-400 hover:text-red-500 transition-colors duration-200"
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
          className="w-5 h-5 text-neutral-400 hover:text-red-500 transition-colors duration-200"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" />
        </svg>
      );
    default:
      return <span className="w-5 h-5" aria-hidden="true" />;
  }
}

/**
 * Minimal technical footer bar for Industrial Girls.
 *
 * @returns {React.ReactElement} The rendered minimal footer.
 */
export function Footer(): React.ReactElement {
  // Step 1: Retrieve official verified social links from Layer 4 Infrastructure
  const socialLinks = getOfficialSocialLinks();

  // Step 2: Render minimalist technical single-row bar
  return (
    <footer className="w-full border-t border-white/10 bg-black py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        {/* Left: Copyright text */}
        <div>
          <span>© 2026 INDUSTRIAL GIRLS // ALL RIGHTS RESERVED.</span>
        </div>

        {/* Right: 6 Verified Social Vector Icons in horizontal row */}
        <nav
          aria-label="Redes oficiales de Industrial Girls"
          className="flex items-center gap-5"
        >
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="inline-flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <SocialIcon icon={social.icon} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
