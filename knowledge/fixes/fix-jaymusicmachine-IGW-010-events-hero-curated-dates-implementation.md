# Solution Spec: events-hero-curated-dates Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La solución actualiza el catálogo y la cabecera de la sección de eventos (`/eventos`) estructurada en las 4 capas:

1. **Presentation Layer (Layer 1)**:
   - `apps/web/src/app/eventos/eventos-view.tsx`:
     - Top Badge: `// SELECTIVE DATES & CLUB SESSIONS //`
     - H1 Principal: `SHOWCASES & FECHAS SELECCIONADAS` con acento en tipografía display.
     - Descripción: "Conexiones entre cabinas, clubs y residencias underground en desarrollo. Curadurías directas para la pista de baile."
     - Status Badge: `[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]`
     - Instancia de `GeographicForm` con subtitle y propósito: "Notificarme de nuevas fechas y preventas exclusivas en mi ciudad."
   - `apps/web/src/components/common/geographic-form.tsx`:
     - Soporte opcional para campo de teléfono móvil / WhatsApp en el formulario de captación geográfica.
2. **Application/Consumption Layer (Layer 2)**:
   - Preservación de hooks de navegación (`useDrawer`) y efectos de sonido (`useSoundFx`).
3. **Domain/Pipelines/Services Layer (Layer 3)**:
   - `apps/web/src/lib/pipelines/geographic-capture-pipeline.ts`:
     - Soporte opcional para validación y saneamiento de teléfono (`phone?: string`).
4. **Infrastructure Layer (Layer 4)**:
   - `apps/web/src/lib/infrastructure/events-catalog.ts`:
     - Actualización de `CALENDAR_STATUS` y tipado `EventCalendarStatus` con los textos canónicos de fechas seleccionadas y temporada activa.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Refactor del Hero de Eventos, centralización de copy en catálogo de infraestructura, soporte de teléfono en pipeline/formulario geográfico y suite de pruebas unitarias. (Rama: `fix/jaymusicmachine-IGW-010-events-hero-curated-dates`)

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/infrastructure/events-catalog.test.ts`
- **Command**: `pnpm test apps/web/src/lib/infrastructure/events-catalog.test.ts`
- **Assertion Goals**:
  - Validar que `CALENDAR_STATUS` exporte exactamente los nuevos textos canónicos (`topBadge`, `headline`, `curatorialNote`, `statusCallout`).
  - Validar que `eventos-view.tsx` renderice los nuevos textos e invariantes.
  - Validar que `GeographicCaptureInput` acepte teléfono opcional.

## 5. Local Definition of Done (DoD)
- [x] La fase actual del tracker de estado avanza secuencialmente hasta `PHASE_8_HUMAN_MERGE_APPROVED`.
- [x] La suite de pruebas de regresión pasa al 100% (verde).
- [x] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [x] La documentación de arquitectura y specs duales está poblada sin placeholders.
- [x] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-jaymusicmachine-IGW-010-events-hero-curated-dates.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/fixes/fix-jaymusicmachine-IGW-010-events-hero-curated-dates.md)
- **Solution Spec**: [fix-jaymusicmachine-IGW-010-events-hero-curated-dates-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/fixes/fix-jaymusicmachine-IGW-010-events-hero-curated-dates-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-010](https://linear.app/industrial-girls/issue/IGW-010)
