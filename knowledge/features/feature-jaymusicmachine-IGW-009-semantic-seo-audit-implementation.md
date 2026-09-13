# Solution Spec: semantic-seo-audit Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La solución audita y refuerza la calidad semántica, la accesibilidad de controles y la consistencia de metadatos en las 5 rutas maestras:
1. **Presentation Layer (Layer 1)**:
   - `apps/web/src/components/layout/footer.tsx`: Enlaces a redes oficiales (SoundCloud, YouTube, Instagram, Bandcamp) enriquecidos con `aria-label`.
   - `apps/web/src/components/layout/navigation-drawer.tsx`: Enlaces sociales y botón `[ DEMO DROP // ENVIAR PISTA ]` con `aria-label` descriptivos.
   - `apps/web/src/components/landing/floating-sound-bar.tsx`: Botón toggle de audio con `aria-label` contextual según estado activo/inactivo.
   - `apps/web/src/components/landing/residents-section.tsx`: Botones a SoundCloud e Instagram de residentes con `aria-label` individualizados.
   - `apps/web/src/app/musica/musica-view.tsx`: Enlaces y botones de streaming (Bandcamp, Beatport, YouTube, correo de Demo Drop) con atributos `aria-label` descriptivos.
   - Preservación estricta de exactamente un único `<h1>` por ruta.
2. **Application/Consumption Layer (Layer 2)**:
   - Consumo inmutable de catálogo y metadata sin mutación de estado.
3. **Domain/Pipelines/Services Layer (Layer 3)**:
   - Validaciones semánticas y contratos de formato de metadatos.
4. **Infrastructure Layer (Layer 4)**:
   - `apps/web/src/lib/infrastructure/route-metadata.ts`: Catálogo canónico de metadatos y Open Graph sin duplicaciones.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Auditoría y adición de atributos de accesibilidad `aria-label` a controles interactivos, reproductores y enlaces externos, validación de un solo `<h1>` por página y verificación de no-duplicidad en etiquetas `<meta>`. (Rama: `feature/jaymusicmachine-IGW-009-semantic-seo-audit`)

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/infrastructure/semantic-seo-audit.test.ts`
- **Command**: `pnpm test apps/web/src/lib/infrastructure/semantic-seo-audit.test.ts`
- **Assertion Goals**:
  - Validar que cada una de las 5 páginas (`/`, `/musica`, `/desarrollo-artistico`, `/eventos`, `/comunidad`) renderice exactamente un único tag `<h1>`.
  - Validar que todos los botones de acción relevantes (`[ DEMO DROP ]`, toggle de sonido `FloatingSoundBar`, enlaces externos a SoundCloud, Bandcamp, YouTube, Instagram) cuenten con atributos `aria-label` descriptivos no vacíos.
  - Validar que la cabecera `<head>` de cada ruta no contenga metaetiquetas duplicadas (`title`, `description`, `og:title`, `og:description`).

## 5. Local Definition of Done (DoD)
- [x] La fase actual del tracker de estado avanza secuencialmente hasta `PHASE_8_HUMAN_MERGE_APPROVED`.
- [x] La suite de pruebas de regresión pasa al 100% (verde).
- [x] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [x] La documentación de arquitectura y specs duales está poblada sin placeholders.
- [x] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-009-semantic-seo-audit.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-009-semantic-seo-audit.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-009-semantic-seo-audit-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-009-semantic-seo-audit-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-009](https://linear.app/industrial-girls/issue/IGW-009)
