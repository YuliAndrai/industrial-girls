/**
 * @file apps/web/src/lib/hooks/use-sound-fx.ts
 * @description Layer 2: Application / Consumption - Sound FX & Mechanical Toggle Hook.
 * Manages client-side audio micro-interactions (clicks, ticks, brutalist hums) and the global SOUND toggle state.
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Sound effect configuration options.
 */
export interface SoundFxOptions {
  /** Initial enabled state for ambient/tactile sound */
  initialEnabled?: boolean;
  /** Master volume multiplier (0.0 to 1.0) */
  volume?: number;
}

/**
 * Return contract for the useSoundFx hook.
 */
export interface SoundFxReturn {
  /** Current active state of global sound */
  isSoundEnabled: boolean;
  /** Toggles sound between ON and OFF */
  toggleSound: () => void;
  /** Emits a sharp mechanical button click sound */
  playClick: () => void;
  /** Emits a short industrial interface tick */
  playTick: () => void;
  /** Visualizer ASCII indicator representing current sound state */
  visualizerPattern: string;
}

/**
 * Audio synthesizer for procedural brutalist sound micro-interactions.
 * Generates low-latency synthetic clicks using the Web Audio API.
 */
class SynthesizedAudio {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public click(volume: number = 0.2): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio playback silently suppressed if browser security blocks autoplay
    }
  }

  public tick(volume: number = 0.15): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.015);
    } catch {
      // Audio playback silently suppressed
    }
  }
}

/**
 * Custom React hook providing sound controls and tactile micro-interactions.
 *
 * @param {SoundFxOptions} [options] - Sound FX initial configuration.
 * @returns {SoundFxReturn} State flags and trigger methods.
 */
export function useSoundFx(options?: SoundFxOptions): SoundFxReturn {
  // Step 1: Initialize sound toggle state with fallback
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(
    options?.initialEnabled ?? false
  );

  const synthRef = useRef<SynthesizedAudio | null>(null);

  // Step 2: Lazy-initialize audio synth client-side only
  useEffect(() => {
    synthRef.current = new SynthesizedAudio();
  }, []);

  // Step 3: Mechanical click trigger
  const playClick = useCallback(() => {
    if (!isSoundEnabled) return;
    synthRef.current?.click(options?.volume ?? 0.2);
  }, [isSoundEnabled, options?.volume]);

  // Step 4: Interface tick trigger
  const playTick = useCallback(() => {
    if (!isSoundEnabled) return;
    synthRef.current?.tick(options?.volume ?? 0.15);
  }, [isSoundEnabled, options?.volume]);

  // Step 5: Master toggle handler with mechanical feedback
  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        synthRef.current?.click(0.3);
      }
      return next;
    });
  }, []);

  // Step 6: ASCII visualizer state
  const visualizerPattern = isSoundEnabled ? "|||·" : "····";

  return {
    isSoundEnabled,
    toggleSound,
    playClick,
    playTick,
    visualizerPattern,
  };
}
