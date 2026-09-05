/**
 * @file apps/web/src/app/layout.tsx
 * @description Layer 1: Presentation - Root Layout for Next.js App Router.
 * Configures base metadata, HTML shell, and global context providers.
 */

import type { Metadata } from "next";
import { Providers } from "./providers";
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
  // Step 1: Wrap app contents in HTML shell with dark theme and providers
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-neutral-100 antialiased selection:bg-raveRed selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
