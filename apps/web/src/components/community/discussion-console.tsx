/**
 * @file apps/web/src/components/community/discussion-console.tsx
 * @description Layer 1: Presentation - Brutalist Technical Discussion Console.
 * Displays open technical debate terminal with 4-field contribution form and threaded discussion feed.
 */

"use client";

import React, { useState } from "react";
import { TactileButton } from "@/components/ui/tactile-button";
import type { ArticleComment } from "@/lib/infrastructure/community-catalog";

/**
 * Allowed community scene participant roles.
 */
export type DiscussionParticipantRole =
  | "Productora / Live Act"
  | "DJ / Selector"
  | "Ingeniera de Sonido"
  | "Melómana / Asistente";

/**
 * Technical discussion role options catalog.
 */
export const DISCUSSION_ROLES: DiscussionParticipantRole[] = [
  "Productora / Live Act",
  "DJ / Selector",
  "Ingeniera de Sonido",
  "Melómana / Asistente",
];

/**
 * Props for DiscussionConsole presentation component.
 */
export interface DiscussionConsoleProps {
  /** Target article identifier */
  articleSlug?: string;
  /** Current article headline */
  articleTitle?: string;
  /** Existing discussion comments */
  comments?: ArticleComment[];
  /** Callback triggered on posting contribution */
  onSubmitContribution?: (data: {
    author: string;
    email: string;
    role: DiscussionParticipantRole;
    content: string;
  }) => void;
}

/**
 * Brutalist command console for open technical debates and threaded community commentary.
 *
 * @param {DiscussionConsoleProps} props - Component properties.
 * @returns {React.ReactElement} Rendered discussion console element.
 */
export function DiscussionConsole({
  articleSlug = "pioneras-del-voltaje",
  articleTitle = "Pioneras del Voltaje: De la Música Concreta a la Resonancia Modular",
  comments = [],
  onSubmitContribution,
}: DiscussionConsoleProps = {}): React.ReactElement {
  // Step 1: Initialize local form state for 4 fields
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<DiscussionParticipantRole>("Productora / Live Act");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Step 2: Handle form submission with basic validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!author.trim() || author.trim().length < 2) {
      newErrors.author = "Indica tu alias o nombre (mínimo 2 caracteres).";
    }
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }
    if (!content.trim() || content.trim().length < 5) {
      newErrors.content = "El aporte técnico debe tener al menos 5 caracteres.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmitContribution?.({
      author: author.trim(),
      email: email.trim(),
      role,
      content: content.trim(),
    });

    setSubmittedMessage("Aporte registrado en el hilo de discusión.");
    setAuthor("");
    setEmail("");
    setContent("");

    setTimeout(() => {
      setSubmittedMessage(null);
    }, 4000);
  };

  // Step 3: Render brutalist console container
  return (
    <section className="w-full border border-raveBorder bg-black p-6 font-mono text-white shadow-rave sm:p-10">
      {/* Step 4: Console header banner */}
      <div className="border-b-2 border-raveRed pb-4 mb-6">
        <span className="text-xs uppercase tracking-widest text-raveRed">
          {"// FORO TÉCNICO & PARTICIPACIÓN ABIERTA"}
        </span>
        <h3 className="mt-1 text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
          DEBATE: {articleTitle}
        </h3>
        <p className="mt-1 text-xs text-neutral-400">
          Terminal de intercambio sobre arquitectura sonora, hardware y producción de club.
        </p>
      </div>

      {/* Step 5: Contribution input form */}
      <form onSubmit={handleSubmit} className="mb-10 border border-raveBorder bg-panel/30 p-5 sm:p-6">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase text-white tracking-wider block">
            [ APORTAR AL HILO DE DISCUSIÓN ]
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Field 1: Alias / Nombre */}
          <div>
            <label htmlFor="discussion-alias" className="block text-[11px] font-bold uppercase text-neutral-300 mb-1">
              Nombre / Alias <span className="text-raveRed">*</span>
            </label>
            <input
              id="discussion-alias"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ej. SINTETIZADORA_909"
              className="w-full border border-raveBorder bg-black px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
            />
            {errors.author && <p className="mt-1 text-[10px] text-raveRed">{errors.author}</p>}
          </div>

          {/* Field 2: Correo electrónico */}
          <div>
            <label htmlFor="discussion-email" className="block text-[11px] font-bold uppercase text-neutral-300 mb-1">
              Correo Electrónico <span className="text-[10px] text-neutral-500">(No será publicado)</span> <span className="text-raveRed">*</span>
            </label>
            <input
              id="discussion-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alias@dominio.com"
              className="w-full border border-raveBorder bg-black px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-[10px] text-raveRed">{errors.email}</p>}
          </div>

          {/* Field 3: Selector de Rol */}
          <div>
            <label htmlFor="discussion-role" className="block text-[11px] font-bold uppercase text-neutral-300 mb-1">
              Rol en la Escena <span className="text-raveRed">*</span>
            </label>
            <select
              id="discussion-role"
              value={role}
              onChange={(e) => setRole(e.target.value as DiscussionParticipantRole)}
              className="w-full border border-raveBorder bg-black px-3 py-2 text-xs text-white focus:border-raveRed focus:outline-none"
            >
              {DISCUSSION_ROLES.map((r) => (
                <option key={r} value={r} className="bg-black text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Field 4: Aporte técnico / reflexión */}
        <div className="mt-4">
          <label htmlFor="discussion-content" className="block text-[11px] font-bold uppercase text-neutral-300 mb-1">
            Aporte Técnico / Reflexión <span className="text-raveRed">*</span>
          </label>
          <textarea
            id="discussion-content"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comparte tu análisis sobre el circuito, flujo de trabajo, o pregunta técnica..."
            className="w-full border border-raveBorder bg-black px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:border-raveRed focus:outline-none"
          />
          {errors.content && <p className="mt-1 text-[10px] text-raveRed">{errors.content}</p>}
        </div>

        {/* Action Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <TactileButton type="submit" variant="primary" size="sm">
            <span>[ ENVIAR APORTE AL FORO ]</span>
          </TactileButton>

          {submittedMessage && (
            <span className="text-xs text-raveRed font-bold animate-pulse">
              &gt; {submittedMessage}
            </span>
          )}
        </div>
      </form>

      {/* Step 6: Threaded discussion feed */}
      <div className="space-y-4">
        <div className="border-b border-raveBorder pb-2">
          <span className="text-xs uppercase tracking-widest text-neutral-400">
            {`// HILO ACTIVO // ${comments.length} APORTES REGISTRADOS`}
          </span>
        </div>

        {comments.length === 0 ? (
          <div className="border border-dashed border-raveBorder/60 p-6 text-center text-xs text-neutral-500">
            [ Sé la primera en abrir el debate técnico para este artículo ]
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border border-raveBorder bg-panel/60 p-4 transition-colors hover:border-raveRed/40">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-raveBorder/40 pb-2 mb-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-raveRed font-bold">&gt; {comment.author}</span>
                  <span className="border border-white/20 bg-black px-1.5 py-0.5 text-[9px] uppercase text-neutral-400">
                    PARTICIPANTE
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default DiscussionConsole;
