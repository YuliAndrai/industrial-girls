/**
 * @file apps/web/src/components/landing/floating-sound-bar.tsx
 * @description Layer 1: Presentation - Floating Tactile Sound Bar.
 * Anchored bottom pill bar presenting the interactive SOUND [ON/OFF] |||· toggle with tactile feedback.
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSoundFx } from "@/lib/hooks/use-sound-fx";

/**
 * Props supported by the FloatingSoundBar component.
 */
export interface FloatingSoundBarProps {
  /** Optional custom CSS class name */
  className?: string;
  /** Explicit sound status override if controlled externally */
  isSoundActive?: boolean;
  /** Optional callback invoked on sound state toggle */
  onToggleSound?: () => void;
}

/**
 * Floating tactile sound control pill component.
 * Stays fixed above the bottom screen margin and reflects current audio/synth state.
 */
export function FloatingSoundBar({
  className,
  isSoundActive,
  onToggleSound,
}: FloatingSoundBarProps): React.JSX.Element {
  // Step 1: Initialize local audio hook for procedural click feedback and state
  const {
    isSoundEnabled: internalSoundEnabled,
    toggleSound: internalToggle,
    visualizerPattern,
  } = useSoundFx();

  // Step 2: Harmonize external controlled state with internal fallback
  const isEnabled = isSoundActive ?? internalSoundEnabled;

  const handleToggle = () => {
    if (onToggleSound) {
      onToggleSound();
    } else {
      internalToggle();
    }
  };

  // Step 3: Render brutalist floating pill
  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50",
        "pointer-events-auto",
        className
      )}
      role="region"
      aria-label="Ambient sound controller"
    >
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-3 px-5 py-2.5 rounded-full border-2",
          "font-mono text-xs font-bold uppercase tracking-widest transition-all duration-100",
          "shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md",
          isEnabled
            ? "bg-white text-black border-white hover:bg-black hover:text-white"
            : "bg-black/90 text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
        )}
        aria-pressed={isEnabled}
        aria-label={isEnabled ? "Desactivar efectos de sonido ambientales" : "Activar efectos de sonido ambientales"}
      >
        <span
          className={cn(
            "w-2 h-2 rounded-full",
            isEnabled ? "bg-red-600 animate-pulse shadow-[0_0_8px_#dc2626]" : "bg-neutral-600"
          )}
          aria-hidden="true"
        />
        <span>
          SOUND [{isEnabled ? "ON" : "OFF"}]
        </span>
        <span
          className={cn(
            "font-mono font-black text-xs transition-opacity",
            isEnabled ? "opacity-100 text-red-500" : "opacity-40 text-neutral-500"
          )}
          aria-hidden="true"
        >
          {visualizerPattern}
        </span>
      </button>
    </div>
  );
}
