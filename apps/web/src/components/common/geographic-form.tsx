/**
 * @file apps/web/src/components/common/geographic-form.tsx
 * @description Layer 1: Presentation - Reusable Tactical Brutalism Geographic Capture Form.
 * Used across /eventos and /comunidad for targeted tour presales and territorial notifications.
 */

"use client";

import React, { useState } from "react";
import { TactileButton } from "@/components/ui/tactile-button";
import {
  GeographicCaptureInput,
  validateGeographicCapture,
} from "@/lib/pipelines/geographic-capture-pipeline";
import { getStandardCountries } from "@/lib/infrastructure/events-catalog";

/**
 * Props for the GeographicForm component.
 */
export interface GeographicFormProps {
  /** Source context: 'events' or 'community' */
  source: "events" | "community";
  /** Optional custom eyebrow badge label */
  badge?: string;
  /** Title for the form section */
  title: string;
  /** Subtitle context */
  subtitle: string;
  /** Submit button text */
  buttonText: string;
}

/**
 * Brutalist tactile subscription form capturing territory data.
 *
 * @param {GeographicFormProps} props - Component properties.
 * @returns {React.ReactElement} Rendered form element.
 */
export function GeographicForm({
  source,
  badge,
  title,
  subtitle,
  buttonText,
}: GeographicFormProps): React.ReactElement {
  // Step 1: Load standard country options from infrastructure catalog
  const countries = getStandardCountries();

  // Step 2: Initialize reactive form state with source and default territory
  const [formData, setFormData] = useState<GeographicCaptureInput>({
    email: "",
    name: "",
    country: "Colombia",
    city: "",
    phone: "",
    source,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 3: Validate form submission via pure domain validation pipeline
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateGeographicCapture(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  // Step 4: Reset form state to permit secondary territorial submissions
  const handleReset = () => {
    setFormData({
      email: "",
      name: "",
      country: "Colombia",
      city: "",
      phone: "",
      source,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="w-full border border-raveBorder bg-black/90 p-6 sm:p-10 shadow-rave">
      <div className="border-b border-raveBorder/80 pb-4 mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
          {badge || ("// RADAR GEOGRÁFICO // " + source.toUpperCase())}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
          {title}
        </h3>
        <p className="mt-2 font-mono text-xs text-neutral-300 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>

      {isSubmitted ? (
        <div className="border border-raveRed bg-raveRed/5 p-6 text-center animate-in fade-in duration-300">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-raveRed bg-raveRed/10 text-raveRed font-mono text-lg font-bold">
            ✓
          </div>
          <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
            UBICACIÓN REGISTRADA EN EL RADAR
          </h4>
          <p className="mt-2 font-mono text-xs text-neutral-300 max-w-md mx-auto">
            Gracias <span className="text-raveRed font-bold">{formData.name}</span>. Te alertaremos a <span className="text-white font-bold">{formData.email}</span> cuando anunciemos convocatorias en <span className="text-white font-bold">{formData.city}, {formData.country}</span>.
          </p>
          <div className="mt-5">
            <TactileButton variant="outline" size="sm" onClick={handleReset}>
              [ REGISTRAR OTRA UBICACIÓN ]
            </TactileButton>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name / Alias */}
            <div>
              <label htmlFor={"name-" + source} className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                Nombre / Alias <span className="text-raveRed">*</span>
              </label>
              <input
                id={"name-" + source}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. DISTORTA / ALEX"
                className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
              />
              {errors.name && (
                <p className="mt-1 font-mono text-xs text-raveRed">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor={"email-" + source} className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                Correo Electrónico <span className="text-raveRed">*</span>
              </label>
              <input
                id={"email-" + source}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rave@dominio.com"
                className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
              />
              {errors.email && (
                <p className="mt-1 font-mono text-xs text-raveRed">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Country Selector */}
            <div>
              <label htmlFor={"country-" + source} className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                País de Residencia <span className="text-raveRed">*</span>
              </label>
              <select
                id={"country-" + source}
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 font-mono text-sm text-white focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
              >
                {countries.map((c) => (
                  <option key={c} value={c} className="bg-black text-white">
                    {c}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 font-mono text-xs text-raveRed">{errors.country}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor={"city-" + source} className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                Ciudad <span className="text-raveRed">*</span>
              </label>
              <input
                id={"city-" + source}
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ej. Bogotá / Berlín / París"
                className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
              />
              {errors.city && (
                <p className="mt-1 font-mono text-xs text-raveRed">{errors.city}</p>
              )}
            </div>
          </div>

          {/* Optional Phone / Telegram */}
          <div>
            <label htmlFor={"phone-" + source} className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-1.5">
              Teléfono móvil / Telegram
            </label>
            <input
              id={"phone-" + source}
              type="text"
              required={false}
              value={formData.phone ?? ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+XX XXX XXXXXXX o @usuario_telegram"
              className="w-full border border-raveBorder bg-panel px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
            />
            {errors.phone && (
              <p className="mt-1 font-mono text-xs text-raveRed">{errors.phone}</p>
            )}
          </div>

          <div className="pt-3">
            <TactileButton
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "[ PROCESANDO... ]" : buttonText}</span>
            </TactileButton>
          </div>
        </form>
      )}
    </div>
  );
}
