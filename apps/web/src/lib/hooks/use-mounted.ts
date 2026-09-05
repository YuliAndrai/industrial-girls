/**
 * @file apps/web/src/lib/hooks/use-mounted.ts
 * @description Layer 2: Application / Consumption - Client Mount State Hook.
 * Utilizes useSyncExternalStore to detect client hydration without cascading renders.
 */

"use client";

import { useSyncExternalStore } from "react";

/**
 * No-op subscription handler for static client store.
 */
const emptySubscribe = (): (() => void) => () => {};

/**
 * Custom React hook that indicates whether the component has mounted on the client.
 *
 * @returns {boolean} True if the component is mounted in the browser, false during SSR.
 */
export function useMounted(): boolean {
  // Step 1: Resolve client-only snapshot without triggering cascading setState re-renders
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
