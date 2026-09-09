/**
 * @file apps/web/src/components/common/merch-waitlist-modal.tsx
 * @description Layer 1: Presentation - Merch (Coming Soon) Priority Waitlist Modal.
 * Tactile modal dialog allowing fans to subscribe for priority access to upcoming physical drops.
 */

"use client";

import React, { useState, useEffect } from "react";
import { TactileButton } from "@/components/ui/tactile-button";
import { validateMerchWaitlist } from "@/lib/pipelines/merch-waitlist-pipeline";

/**
 * Props for the MerchWaitlistModal component.
 */
export interface MerchWaitlistModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
}

/**
 * Tactical modal dialog capturing priority waitlist emails for upcoming merchandise.
 *
 * @param {MerchWaitlistModalProps} props - Component properties.
 * @returns {React.ReactElement | null} Rendered modal dialog or null.
 */
export function MerchWaitlistModal({
  isOpen,
  onClose,
}: MerchWaitlistModalProps): React.ReactElement | null {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateMerchWaitlist({ email });
    if (!result.isValid) {
      setError(result.error || "Email inválido");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleReset = () => {
    setEmail("");
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Merch Priority Waitlist"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg border-2 border-raveRed bg-black p-6 sm:p-8 shadow-rave text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-raveBorder pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-raveRed animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-raveRed">
              [ OFFICIAL MERCH // COMING SOON ]
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            [ ESC / X ]
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-raveRed bg-raveRed/10 text-raveRed font-mono text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white">
              ACCESO PRIORITARIO CONFIRMADO
            </h3>
            <p className="mt-3 font-mono text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
              Te hemos agregado al despacho VIP para <span className="text-raveRed font-bold">{email}</span>. Recibirás el código de compra 2 horas antes del lanzamiento público.
            </p>
            <div className="mt-6">
              <TactileButton variant="primary" size="sm" onClick={handleReset}>
                [ ENTENDIDO / CERRAR ]
              </TactileButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                LISTA DE ESPERA PRIORITARIA
              </h3>
              <p className="mt-2 font-mono text-xs text-neutral-300 leading-relaxed">
                Nuestras tiradas de <span className="text-white font-bold">Balaclavas bordadas</span>, <span className="text-white font-bold">Heavyweight Hoodies</span> y cajas de vinilo son de edición ultra-limitada (100 unidades por drop).
              </p>
            </div>

            <div className="pt-2">
              <label htmlFor="merchEmail" className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
                Ingresa tu Correo Electrónico <span className="text-raveRed">*</span>
              </label>
              <input
                id="merchEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rave@industrialgirls.com"
                className="w-full border border-raveBorder bg-panel px-4 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
              />
              {error && (
                <p className="mt-1.5 font-mono text-xs text-raveRed">{error}</p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <TactileButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto flex-1"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "[ REGISTRANDO... ]" : "[ ASEGURAR ACCESO PRIORITARIO ]"}</span>
              </TactileButton>
              <TactileButton
                type="button"
                variant="outline"
                size="md"
                onClick={onClose}
              >
                <span>[ CANCELAR ]</span>
              </TactileButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
