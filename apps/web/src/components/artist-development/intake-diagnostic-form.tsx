/**
 * @file apps/web/src/components/artist-development/intake-diagnostic-form.tsx
 * @description Layer 1: Presentation - Intake & Diagnostic Form for Artist Development.
 * Client component with tactile validation, multi-select service checkboxes, and status feedback.
 */

"use client";

import React, { useState } from "react";
import { TactileButton } from "@/components/ui/tactile-button";
import {
  DiagnosticSubmissionInput,
  validateDiagnosticSubmission,
} from "@/lib/pipelines/intake-diagnostic-pipeline";
import { getArtistDevPillars } from "@/lib/infrastructure/artist-development-catalog";

/**
 * Diagnostic evaluation intake form component.
 *
 * @returns {React.ReactElement} Rendered form.
 */
export function IntakeDiagnosticForm(): React.ReactElement {
  const pillars = getArtistDevPillars();

  const [formData, setFormData] = useState<DiagnosticSubmissionInput>({
    artistName: "",
    email: "",
    location: "",
    musicLinks: "",
    selectedServices: [],
    goalsMessage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleToggleService = (pillarId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(pillarId);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((id) => id !== pillarId)
          : [...prev.selectedServices, pillarId],
      };
    });
    if (errors.selectedServices) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.selectedServices;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateDiagnosticSubmission(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate tactical processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      artistName: "",
      email: "",
      location: "",
      musicLinks: "",
      selectedServices: [],
      goalsMessage: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="diagnostico" className="w-full border-b border-raveBorder bg-panel/40 py-16 sm:py-24 px-4 sm:px-6 relative scroll-mt-24">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="border-b-2 border-raveRed pb-6 mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
            {"// CONEXIÓN DIRECTA // EVALUACIÓN INICIAL"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
            SOLICITAR <span className="text-raveRed">DIAGNÓSTICO ARTÍSTICO</span>
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto">
            Completa el siguiente formulario para que nuestro equipo técnico y estratégico analice tu catálogo y proponga un plan a la medida.
          </p>
        </div>

        {isSubmitted ? (
          <div className="border-2 border-raveRed bg-black p-8 sm:p-12 text-center shadow-rave animate-in fade-in duration-500">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-raveRed bg-raveRed/10 text-raveRed font-mono text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              DIAGNÓSTICO SOLICITADO CON ÉXITO
            </h3>
            <p className="mt-4 font-mono text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
              Hemos recibido los datos de <span className="text-raveRed font-bold">{formData.artistName}</span>. Nuestro equipo revisará tus enlaces y te contactará a <span className="text-white font-bold">{formData.email}</span> en menos de 48 horas con el reporte inicial.
            </p>
            <div className="mt-8">
              <TactileButton variant="primary" size="md" onClick={handleReset}>
                [ ENVIAR OTRA SOLICITUD ]
              </TactileButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-raveBorder bg-black/90 p-6 sm:p-10 space-y-6">
            {/* Field 1: Artist Name */}
            <div>
              <label htmlFor="artistName" className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
                1. Nombre / Alias Artístico <span className="text-raveRed">*</span>
              </label>
              <input
                id="artistName"
                type="text"
                value={formData.artistName}
                onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                placeholder="Ej. DISTORTA / VANE"
                className="w-full border border-raveBorder bg-panel px-4 py-3 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
              />
              {errors.artistName && (
                <p className="mt-1.5 font-mono text-xs text-raveRed">{errors.artistName}</p>
              )}
            </div>

            {/* Field 2 & 3: Email and Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
                  2. Correo Electrónico <span className="text-raveRed">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="artista@dominio.com"
                  className="w-full border border-raveBorder bg-panel px-4 py-3 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
                />
                {errors.email && (
                  <p className="mt-1.5 font-mono text-xs text-raveRed">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
                  3. País / Ciudad <span className="text-raveRed">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ej. Bogotá, Colombia / Berlin, DE"
                  className="w-full border border-raveBorder bg-panel px-4 py-3 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
                />
                {errors.location && (
                  <p className="mt-1.5 font-mono text-xs text-raveRed">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Field 4: Music Links */}
            <div>
              <label htmlFor="musicLinks" className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
                4. Enlaces de Música (SoundCloud / Spotify / Bandcamp) <span className="text-raveRed">*</span>
              </label>
              <input
                id="musicLinks"
                type="text"
                value={formData.musicLinks}
                onChange={(e) => setFormData({ ...formData, musicLinks: e.target.value })}
                placeholder="https://soundcloud.com/tu-perfil"
                className="w-full border border-raveBorder bg-panel px-4 py-3 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
              />
              {errors.musicLinks && (
                <p className="mt-1.5 font-mono text-xs text-raveRed">{errors.musicLinks}</p>
              )}
            </div>

            {/* Field 5: Selected Services Checkboxes */}
            <div>
              <span className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
                5. Servicios de Interés (Selecciona los pilares deseados) <span className="text-raveRed">*</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((pillar) => {
                  const isChecked = formData.selectedServices.includes(pillar.id);
                  return (
                    <button
                      type="button"
                      key={pillar.id}
                      onClick={() => handleToggleService(pillar.id)}
                      className={`flex items-center gap-3 border p-3 text-left transition-all focus:outline-none ${
                        isChecked
                          ? "border-raveRed bg-raveRed/10 text-white"
                          : "border-raveBorder bg-panel/60 text-neutral-400 hover:border-white/30"
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center border font-mono text-xs font-bold ${
                          isChecked ? "border-raveRed bg-raveRed text-black" : "border-raveBorder bg-black"
                        }`}
                      >
                        {isChecked ? "✓" : ""}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                          {pillar.title}
                        </span>
                        <span className="font-mono text-[10px] text-raveTextMuted">
                          {pillar.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.selectedServices && (
                <p className="mt-1.5 font-mono text-xs text-raveRed">{errors.selectedServices}</p>
              )}
            </div>

            {/* Field 6: Goals Message */}
            <div>
              <label htmlFor="goalsMessage" className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
                6. Mensaje / Objetivos del Artista <span className="text-raveRed">*</span>
              </label>
              <textarea
                id="goalsMessage"
                rows={4}
                value={formData.goalsMessage}
                onChange={(e) => setFormData({ ...formData, goalsMessage: e.target.value })}
                placeholder="Cuéntanos sobre tu proyecto actual, metas para los próximos 6-12 meses y qué áreas necesitas reforzar..."
                className="w-full border border-raveBorder bg-panel px-4 py-3 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none focus:ring-1 focus:ring-raveRed"
              />
              {errors.goalsMessage && (
                <p className="mt-1.5 font-mono text-xs text-raveRed">{errors.goalsMessage}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <TactileButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "[ PROCESANDO EVALUACIÓN... ]" : "[ AGENDAR EVALUACIÓN INICIAL ]"}</span>
              </TactileButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
