# Solution Spec: community-journal-page Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security` (validación estricta Zod en formularios, sanitización de inputs, zero trust)

## 2. Solution Overview & 4-Layer Architecture
La arquitectura funcional de 4 capas se distribuye de la siguiente manera:
1. **Presentation Layer (Layer 1)**:
   - `apps/web/src/components/community/community-hero.tsx`: Hero con display H1, subtítulo editorial y badges de filtrado temático.
   - `apps/web/src/components/community/article-card.tsx`: Tarjeta interactiva con imagen de archivo tratada (`grayscale hover:grayscale-0 transition-all duration-300`), tags, tiempo de lectura, autoría ("Industrial Girls Editorial"), resumen, pregunta detonadora y botón `[ Leer Artículo & Debatir ]`.
   - `apps/web/src/components/community/discussion-console.tsx`: Consola brutalista de comandos (`// FORO TÉCNICO & PARTICIPACIÓN ABIERTA`) con los 4 campos (Alias, Email, Rol, Aporte) y feed de comentarios anidados con respuestas.
   - `apps/web/src/components/community/community-subscription.tsx`: Módulo de suscripción geolocalizada "RED COMUNITARIA INDUSTRIAL GIRLS" con selector de países, ciudad y botón CTA `[ CONECTAR CON LA COMUNIDAD ]`.
   - `apps/web/src/app/comunidad/page.tsx`: Integración composicional de la ruta.
2. **Application / State Layer (Layer 2)**:
   - `apps/web/src/lib/state/community-comments-store.ts`: Gestión de estado client-side para los comentarios y respuestas anidadas en memoria.
3. **Domain / Pipelines Layer (Layer 3)**:
   - `apps/web/src/lib/pipelines/community-comment-pipeline.ts`: Validación Zod para el formulario de discusión técnica (incluyendo validación de roles permitidos).
   - `apps/web/src/lib/pipelines/geographic-capture-pipeline.ts`: Validación Zod para la suscripción comunitaria con geolocalización.
4. **Infrastructure Layer (Layer 4)**:
   - `apps/web/src/lib/infrastructure/community-catalog.ts`: Catálogo fuertemente tipado de los 5 artículos de investigación, URLs de imágenes de archivo de Wikimedia Commons, descripciones técnicas, preguntas detonadoras y comentarios semilla.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Actualización de Infraestructura (`community-catalog.ts`, pipeline de validación y store de comentarios) en Layers 2, 3 y 4.
- **SPEC-2**: Scaffolding e Implementación de Componentes de Presentación en Layer 1 (`community-hero.tsx`, `article-card.tsx`, `discussion-console.tsx`, `community-subscription.tsx` y ensamble en `comunidad/page.tsx`).

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/community-journal.test.ts`
- **Command**: `pnpm vitest run apps/web/src/lib/community-journal.test.ts`
- **Assertion Goals**:
  1. Validar que el catálogo de artículos contenga exactamente los 5 artículos detallados con sus imágenes de Wikimedia Commons, preguntas de debate y autoría "Industrial Girls Editorial".
  2. Validar que la validación del formulario de discusión admita los 4 roles permitidos y rechace entradas inválidas.
  3. Validar que los componentes de la vista rendericen los textos, badges y etiquetas según la especificación.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde) incluyendo `community-journal.test.ts`.
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] `pnpm build` compila las 10 rutas estáticas con éxito.
- [ ] Inspección visual en `http://localhost:3001/comunidad` verificada.
- [ ] Aprobación explícita del humano registrada antes de fusionar.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-006-community-journal-page.md](knowledge/features/feature-jaymusicmachine-IGW-006-community-journal-page.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-006-community-journal-page-implementation.md](knowledge/features/feature-jaymusicmachine-IGW-006-community-journal-page-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-006](https://linear.app/industrial-girls/issue/IGW-006)
