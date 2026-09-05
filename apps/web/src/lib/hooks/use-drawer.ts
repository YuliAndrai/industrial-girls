/**
 * @file apps/web/src/lib/hooks/use-drawer.ts
 * @description Layer 2: Application / Consumption - Navigation Drawer State Hook.
 * Accessible state management, scroll-lock synchronization, and escape keyboard listeners for navigation drawer.
 */

"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * Return contract for the useDrawer hook.
 */
export interface UseDrawerReturn {
  /** Indicates whether the navigation drawer is open */
  isOpen: boolean;
  /** Opens the drawer */
  openDrawer: () => void;
  /** Closes the drawer */
  closeDrawer: () => void;
  /** Inverts the current drawer visibility state */
  toggleDrawer: () => void;
}

/**
 * Custom React hook for controlling full-screen brutalist navigation drawer.
 *
 * @param {boolean} [initialOpen=false] - Initial drawer visibility state.
 * @returns {UseDrawerReturn} Drawer state and control methods.
 */
export function useDrawer(initialOpen: boolean = false): UseDrawerReturn {
  // Step 1: Manage open state
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

  // Step 2: Open and close action handlers
  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Step 3: Synchronize Escape key press to close drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeDrawer]);

  // Step 4: Synchronize document body scroll locking
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}
