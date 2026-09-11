# Solution Spec: events-hero-top-badge Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security` (Verification of zero mock data or security bypasses)

## 2. Solution Overview & 4-Layer Architecture
- **Layer 1: Presentation Layer (`apps/web/src/app/eventos/eventos-view.tsx`)**:
  - Consumes `calendarStatus.topBadge` from Layer 4 Infrastructure.
  - Renders the badge inside the styled red container:
    ```tsx
    <span className="border border-raveRed/60 bg-raveRed/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-raveRed inline-block max-w-full break-words text-center leading-relaxed">
      {calendarStatus.topBadge}
    </span>
    ```
  - Preserves the brutalist visual language: red border with glow accent, uppercase monospace typography, and strict visual centering.
  - Ensures responsive behavior on small screens (<380px) preventing horizontal overflow.
  - Maintains strict semantic hierarchy: exactly one `<h1>` tag (`SHOWCASES Y ANUNCIOS PRONTO`).
  - Removes the season callout badge (`statusCallout`) to streamline the layout and connect directly to the Geographic Form.

- **Layer 2: Application/Consumption Layer**:
  - Directly consumes the strongly typed `getEventCalendarStatus()` function from Layer 4 during server/client render.

- **Layer 3: Domain/Pipelines Layer (`apps/web/src/lib/pipelines/geographic-capture-pipeline.ts`)**:
  - Geographic RSVP lead capture pipeline supports both international phone numbers and `@username` Telegram handles while keeping the field strictly optional.

- **Layer 1 (Presentation - GeographicForm `apps/web/src/components/common/geographic-form.tsx`)**:
  - Updated phone input label to `"Teléfono móvil / Telegram"`.
  - Updated placeholder to `"+XX XXX XXXXXXX o @usuario_telegram"`.
  - Explicit `required={false}` to maintain optionality.

- **Layer 4: Infrastructure Layer (`apps/web/src/lib/infrastructure/events-catalog.ts`)**:
  - Updates `CALENDAR_STATUS.topBadge` to:
    `"EVENTS // SELECTIVE DATES & CLUB SESSIONS // CONCEPTO LINE UP DJS MUJERES"`
  - Updates `CALENDAR_STATUS.headline` to:
    `"SHOWCASES Y ANUNCIOS PRONTO"`
  - Updates `CALENDAR_STATUS.curatorialNote` to:
    `"Regístrate para acceder a locaciones, alineaciones y preventas prioritarias en tu región."`
  - Preserves all JSDoc and layer header documentation.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Events Hero Top Badge, Title & Subtitle Refinement (Branch: `fix/jaymusicmachine-IGW-011-events-hero-top-badge`)
  - Red-Green-Refactor cycle:
    1. **RED (TDD)**: Update assertions in `apps/web/src/lib/infrastructure/events-catalog.test.ts` to expect `"EVENTS // SELECTIVE DATES & CLUB SESSIONS // CONCEPTO LINE UP DJS MUJERES"`, `"SHOWCASES Y ANUNCIOS PRONTO"`, and `"Regístrate para acceder a locaciones, alineaciones y preventas prioritarias en tu región."`. Verify test failure.
    2. **GREEN (Implementation)**: Update `CALENDAR_STATUS.topBadge`, `CALENDAR_STATUS.headline`, and `CALENDAR_STATUS.curatorialNote` in `events-catalog.ts`, ensure responsive classes in `eventos-view.tsx`, remove the `statusCallout` container, and configure `GeographicForm` with `badge="ÚNETE A NUESTRO TELEGRAM // RECIBE NOTICIAS"` and `title="PREVENTAS & ALERTAS POR CIUDAD"`.
    3. **REFACTOR (Clean Code)**: Clean code review, verify zero lint errors, layer header comments intact.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/infrastructure/events-catalog.test.ts`
- **Command**: `pnpm test apps/web/src/lib/infrastructure/events-catalog.test.ts`
- **Assertion Goals**:
  - `getEventCalendarStatus().topBadge` equals `"EVENTS // SELECTIVE DATES & CLUB SESSIONS // CONCEPTO LINE UP DJS MUJERES"`.
  - `getEventCalendarStatus().headline` equals `"SHOWCASES Y ANUNCIOS PRONTO"`.
  - `getEventCalendarStatus().curatorialNote` equals `"Regístrate para acceder a locaciones, alineaciones y preventas prioritarias en tu región."`.
  - `eventos-view.tsx` integrates the badge, headline, and subtitle while omitting the season callout badge, preserving the single `<h1>` invariant.
  - `eventos-view.tsx` configures `GeographicForm` with `badge="ÚNETE A NUESTRO TELEGRAM // RECIBE NOTICIAS"` and `title="PREVENTAS & ALERTAS POR CIUDAD"`.
  - Full architecture test suite (`apps/web/src/lib/master-architecture.test.ts`) passes.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] La documentación de arquitectura local y de base de datos está actualizada.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-jaymusicmachine-IGW-011-events-hero-top-badge.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/fixes/fix-jaymusicmachine-IGW-011-events-hero-top-badge.md)
- **Solution Spec**: [fix-jaymusicmachine-IGW-011-events-hero-top-badge-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/fixes/fix-jaymusicmachine-IGW-011-events-hero-top-badge-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-011](https://linear.app/industrial-girls/issue/IGW-011)
