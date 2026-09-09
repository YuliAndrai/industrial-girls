/**
 * @file apps/web/src/components/ui/tactile-button.tsx
 * @description Layer 1: Presentation - Tactile Brutalist Action Button Component.
 * Implements high-contrast color inversion, tactile press depression, and optional mechanical sound triggers.
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Visual variants for tactile buttons.
 */
export type TactileButtonVariant = "primary" | "solid" | "outline" | "inverted" | "danger";

/**
 * Dimension sizing modifiers for tactile buttons.
 */
export type TactileButtonSize = "sm" | "md" | "lg";

/**
 * Props supported by the TactileButton component.
 */
export interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual appearance styling variant */
  variant?: TactileButtonVariant;
  /** Size dimension modifier */
  size?: TactileButtonSize;
  /** Optional visual tactile indicator dot/symbol */
  showIndicator?: boolean;
  /** Active state for tactile indicator */
  indicatorActive?: boolean;
  /** Optional callback invoked to trigger a mechanical click sound */
  onTactileSound?: () => void;
}

/**
 * Brutalist tactile button featuring sharp borders, immediate color inversion,
 * and mechanical feedback.
 */
export const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "md",
      showIndicator = false,
      indicatorActive = false,
      onTactileSound,
      onClick,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Step 1: Compute base brutalist container styling
    const baseClasses =
      "inline-flex items-center justify-center font-mono uppercase tracking-wider font-bold transition-all duration-75 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 active:translate-y-px active:scale-[0.99]";

    // Step 2: Resolve variant high-contrast styles
    const variantClasses: Record<TactileButtonVariant, string> = {
      primary:
        "bg-raveRed text-black border-2 border-raveRed hover:bg-black hover:text-raveRed focus-visible:ring-raveRed shadow-tactileRed",
      solid:
        "bg-white text-black border-2 border-white hover:bg-black hover:text-white focus-visible:ring-white",
      outline:
        "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black focus-visible:ring-white",
      inverted:
        "bg-black text-white border-2 border-white hover:bg-white hover:text-black focus-visible:ring-white",
      danger:
        "bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700 focus-visible:ring-red-500",
    };

    // Step 3: Resolve size dimensions
    const sizeClasses: Record<TactileButtonSize, string> = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-14 px-8 text-base gap-3",
    };

    // Step 4: Handle click with combined tactile sound triggering
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onTactileSound?.();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {showIndicator && (
          <span
            className={cn(
              "inline-block w-2 h-2 rounded-full transition-colors",
              indicatorActive ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-neutral-500"
            )}
            aria-hidden="true"
          />
        )}
        <span>{children}</span>
      </button>
    );
  }
);

TactileButton.displayName = "TactileButton";
