/**
 * @file apps/web/src/components/landing/newsletter-section.tsx
 * @description Layer 1: Presentation - Visual Newsletter / Underground Dispatch Box.
 * Pure front-end brutalist subscription element preserving Exhale design parity without heavy backend pipelines.
 */

"use client";

import React, { useState } from "react";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Visual newsletter/dispatch subscription component with client-side brutalist feedback.
 *
 * @returns {React.ReactElement} The rendered newsletter block.
 */
export function NewsletterSection(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
  };

  return (
    <section className="w-full border-b-2 border-raveRed bg-black py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Subtle Red Radial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.12),transparent_70%)]" />

      <div className="mx-auto max-w-4xl border-2 border-raveRed bg-panel p-8 sm:p-12 relative z-10 shadow-rave">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-raveRed mb-2">
          <span className="h-2 w-2 bg-raveRed animate-pulse" />
          <span>[ UNDERGROUND DISPATCH // DIRECT WIRE ]</span>
        </div>

        <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          SUBSCRIBE TO THE <br />
          <span className="text-raveRed">UNDERGROUND</span>
        </h3>

        <p className="mt-4 font-mono text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
          Receive secret warehouse location coordinates, pre-sale access to 12&quot; vinyl pressings, and private unreleased live recordings.
        </p>

        {isSubmitted ? (
          <div className="mt-8 border border-raveRed bg-black/90 p-4 font-mono text-xs text-raveRed flex items-center justify-between">
            <span>[ STATUS: ARCHIVE CONNECTED &bull; FREQUENCY VERIFIED ]</span>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
              className="text-[10px] text-white underline decoration-raveRed hover:text-raveRed"
            >
              RESET
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                id="newsletter-email-input"
                name="email"
                type="email"
                required
                aria-label="Enter your frequency email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR FREQUENCY (EMAIL)..."
                className="w-full border-2 border-raveBorder bg-black px-4 py-3 font-mono text-xs text-white placeholder-neutral-500 focus:border-raveRed focus:outline-none transition-colors"
              />
            </div>
            <TactileButton type="submit" variant="primary" size="md">
              <span className="flex items-center justify-center gap-2">
                <span>[ SUBSCRIBE ]</span>
                <span className="text-xs">&rarr;</span>
              </span>
            </TactileButton>
          </form>
        )}

        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-raveTextMuted">
          <span>STRICT PRIVACY &bull; NO CORPORATE TRACKING</span>
          <span>100% INDEPENDENT WAX</span>
        </div>
      </div>
    </section>
  );
}
