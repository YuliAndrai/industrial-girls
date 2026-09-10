/**
 * @file apps/web/src/components/community/community-subscription.tsx
 * @description Layer 1: Presentation - Geographic Community Subscription Module.
 * Renders the brutalist regional radar subscription block with country/city selectors and CTA.
 */

"use client";

import React, { useState } from "react";
import { TactileButton } from "@/components/ui/tactile-button";
import { STANDARD_COUNTRIES } from "@/lib/infrastructure/events-catalog";
import { TelegramCommunityBanner } from "./telegram-community-banner";

/**
 * Community subscription form input payload.
 */
export interface CommunitySubscriptionPayload {
  /** Subscriber email address */
  email: string;
  /** Subscriber alias / full name */
  name: string;
  /** Country of residence */
  country: string;
  /** City of residence */
  city: string;
}

/**
 * Props for CommunitySubscription presentation component.
 */
export interface CommunitySubscriptionProps {
  /** Optional section heading */
  title?: string;
  /** Optional explanatory subtitle */
  subtitle?: string;
  /** Optional Telegram community channel/group URL */
  telegramGroupUrl?: string;
  /** Callback invoked on successful community registration */
  onSubscribe?: (payload: CommunitySubscriptionPayload) => void;
}

/**
 * Brutalist geographic subscription section connecting global community nodes.
 *
 * @param {CommunitySubscriptionProps} props - Component properties.
 * @returns {React.ReactElement} Rendered community subscription element.
 */
export function CommunitySubscription({
  title = "RED COMUNITARIA INDUSTRIAL GIRLS",
  subtitle = "Recibe invitaciones a conversatorios, convocatorias de producción, drops de artículos y anuncios prioritarios de tu región.",
  telegramGroupUrl = "#",
  onSubscribe,
}: CommunitySubscriptionProps = {}): React.ReactElement {
  // Step 1: Manage local form state for 4 fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Colombia");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 2: Validate and submit subscription
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Indica tu nombre o alias (mínimo 2 caracteres).";
    }
    if (!city.trim()) {
      newErrors.city = "Indica tu ciudad de residencia.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const payload: CommunitySubscriptionPayload = {
      email: email.trim(),
      name: name.trim(),
      country,
      city: city.trim(),
    };

    onSubscribe?.(payload);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setEmail("");
    setName("");
    setCountry("Colombia");
    setCity("");
    setErrors({});
    setIsSubmitted(false);
  };

  // Step 3: Render brutalist container shell
  return (
    <section className="w-full border-t border-raveBorder bg-bg py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl border border-raveBorder bg-black p-6 font-mono shadow-rave sm:p-10">
        {/* Step 4: Header section */}
        <div className="border-b border-raveBorder pb-4 mb-6">
          <span className="text-xs uppercase tracking-widest text-raveRed">
            {"// RADAR TERRITORIAL // CONECTIVIDAD GLOBAL"}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-neutral-300">
            {subtitle}
          </p>
        </div>

        {/* Step 5: Submitted state or form inputs */}
        {isSubmitted ? (
          <div className="border border-raveRed bg-raveRed/10 p-6 text-center animate-in fade-in duration-300">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center border border-raveRed bg-black text-raveRed font-mono text-lg font-bold">
              ✓
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              NODO COMUNITARIO ACTIVADO
            </h3>
            <p className="mt-2 text-xs text-neutral-300 max-w-md mx-auto">
              Bienvenida <span className="text-raveRed font-bold">{name}</span>. Te notificaremos a{" "}
              <span className="text-white font-bold">{email}</span> de iniciativas y drops en{" "}
              <span className="text-white font-bold">{city}, {country}</span>.
            </p>
            <div className="mt-5">
              <TactileButton variant="outline" size="sm" onClick={handleReset}>
                [ REGISTRAR OTRO NODO ]
              </TactileButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Field 1: Correo Electrónico */}
              <div>
                <label htmlFor="comm-email" className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                  Correo Electrónico <span className="text-raveRed">*</span>
                </label>
                <input
                  id="comm-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alias@dominio.com"
                  className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
                />
                {errors.email && <p className="mt-1 text-xs text-raveRed">{errors.email}</p>}
              </div>

              {/* Field 2: Nombre / Alias */}
              <div>
                <label htmlFor="comm-name" className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                  Nombre / Alias <span className="text-raveRed">*</span>
                </label>
                <input
                  id="comm-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. RACHEL / NOISE_ARCH"
                  className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
                />
                {errors.name && <p className="mt-1 text-xs text-raveRed">{errors.name}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Field 3: País (selector) */}
              <div>
                <label htmlFor="comm-country" className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                  País <span className="text-raveRed">*</span>
                </label>
                <select
                  id="comm-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 text-sm text-white focus:border-raveRed focus:outline-none"
                >
                  {STANDARD_COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-black text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 4: Ciudad */}
              <div>
                <label htmlFor="comm-city" className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                  Ciudad <span className="text-raveRed">*</span>
                </label>
                <input
                  id="comm-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ej. Bogotá / Medellín / Berlín"
                  className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
                />
                {errors.city && <p className="mt-1 text-xs text-raveRed">{errors.city}</p>}
              </div>
            </div>

            {/* Step 6: CTA Button */}
            <div className="pt-3">
              <TactileButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "[ CONECTANDO... ]" : "[ CONECTAR CON LA COMUNIDAD ]"}</span>
              </TactileButton>
            </div>
          </form>
        )}

        {/* Step 7: Direct Telegram Community Channel & Specialized Groups Banner */}
        <TelegramCommunityBanner telegramGroupUrl={telegramGroupUrl} />
      </div>
    </section>
  );
}

export default CommunitySubscription;
