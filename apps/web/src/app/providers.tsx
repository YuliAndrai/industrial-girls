/**
 * @file apps/web/src/app/providers.tsx
 * @description Layer 1: Presentation - Application Root Context Providers.
 * Configures top-level client context providers (Motion and Theme).
 */

"use client";

import React from "react";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SpotifyPlayerProvider } from "@/lib/hooks/use-spotify-player";

/**
 * Root providers wrapper properties contract.
 */
export interface ProvidersProps {
  /** Nested child elements to be wrapped by providers */
  children: React.ReactNode;
}

/**
 * Client-side root provider bundle for the application.
 *
 * @param {ProvidersProps} props - Component properties containing children.
 * @returns {React.ReactElement} The wrapped provider hierarchy.
 */
export function Providers({ children }: ProvidersProps): React.ReactElement {
  // Step 1: Wrap application tree with Motion and Spotify Player context providers
  return (
    <MotionProvider>
      <SpotifyPlayerProvider>
        {children}
      </SpotifyPlayerProvider>
    </MotionProvider>
  );
}
