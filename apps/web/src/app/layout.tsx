/**
 * @file apps/web/src/app/layout.tsx
 * @description Layer 1: Presentation - Root Layout for Next.js App Router.
 * Configures base metadata, HTML shell, and global context providers.
 */

import type { Metadata } from "next";
import { Providers } from "./providers";
import { SpotifyMiniPlayer } from "@/components/player/spotify-mini-player";
import { ROOT_JSON_LD_SCHEMA } from "@/lib/infrastructure/seo-schema";
import "./globals.css";

export const metadata: Metadata = {
  title: "INDUSTRIAL GIRLS | Underground Techno Record Label",
  description: "Advocates for the industrial underground. High-velocity techno, warehouse showcases, vinyl catalog, and dark electronic body music.",
  icons: {
    icon: "/assets/images/industrial-girls-badge-mask.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Step 1: Wrap app contents in HTML shell with dark theme, head metadata/JSON-LD, providers, and persistent Spotify player
  return (
    <html lang="en" className="dark">
      <head>
        {/* Step 2: Inject Schema.org JSON-LD graph for global SEO and AI Knowledge Graph authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ROOT_JSON_LD_SCHEMA) }}
        />
      </head>
      <body className="bg-bg text-neutral-100 antialiased selection:bg-raveRed selection:text-black">
        <Providers>
          {children}
          {/* Step 3: Mount persistent Spotify Mini Player widget at root layout */}
          <SpotifyMiniPlayer />
        </Providers>
      </body>
    </html>
  );
}
