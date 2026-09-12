# Solution Spec: archive-roster-directory Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
- **Layer 1: Presentation Layer (`apps/web/src/app/archivo/page.tsx` & `apps/web/src/app/archivo/archivo-view.tsx`)**:
  - `page.tsx`: Server Component configuring route metadata (`ROSTER DE ARTISTAS & MEMORIA VISUAL | INDUSTRIAL GIRLS`).
  - `archivo-view.tsx`: Client Component rendering:
    - Eyebrow: `// HISTORIAL & REGISTRO // ARCHIVO GLOBAL`
    - Main title H1: `ROSTER DE ARTISTAS & MEMORIA VISUAL`
    - Subtitle: `"Registro de DJs, productoras y directos que han formado parte del circuito sonoro de Industrial Girls."`
    - Roster Typographic Directory: High-impact monospace/display grid with subtle red glow hover micro-interactions revealing country code, flag emoji, and sonic subgenre.
    - Single `<h1>` semantic invariant per route.
- **Layer 2: Application / Consumption Layer**:
  - Consumes `getArtistsRoster()` and `getMediaArchiveItems()` from Layer 4 Infrastructure.
  - Integrates application state hooks `useDrawer` and `useSoundFx`.
- **Layer 3: Domain / Pipelines / Services Layer**:
  - Artist entity contracts and query sorting helpers.
- **Layer 4: Infrastructure Layer (`apps/web/src/lib/infrastructure/archive-data.ts`)**:
  - Defines `RosterArtistEntity` interface (`id`, `name`, `country`, `countryCode`, `subgenre`, `socialLinks?: { soundcloud?: string; ra?: string; instagram?: string }`).
  - Exports immutable typed constant `ARTISTS_ROSTER` with initial 8 artists:
    1. Clara Cuvé (Alemania // DE // Fast & Hard Techno)
    2. Øtta (Portugal // PT // Hard Techno & Industrial)
    3. Parfait (Francia // FR // Industrial Groove)
    4. Wallis (Alemania // DE // Modular Live & Industrial)
    5. Caravel (Francia // FR // Dark Industrial)
    6. Somniac One (Países Bajos // NL // Industrial Hardcore)
    7. Lady Maru (Italia // IT // Acid Techno & EBM)
    8. Juliana Yamasaki (Brasil // BR // Hard Techno)
  - Exports getter function `getArtistsRoster(): RosterArtistEntity[]`.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Archive Roster Data & Typographic Directory (Branch: `feature/jaymusicmachine-IGW-012-archive-roster-directory`)
  - Red-Green-Refactor cycle:
    1. **RED (TDD)**: Create `apps/web/src/lib/infrastructure/archive-data.test.ts` defining failing assertions for `ARTISTS_ROSTER` structure, 8 scene entities, required properties, and single H1 semantic hierarchy.
    2. **GREEN (Implementation)**: Scaffold and implement `apps/web/src/lib/infrastructure/archive-data.ts`, update `apps/web/src/app/archivo/page.tsx` and create `apps/web/src/app/archivo/archivo-view.tsx` with all mandatory in-code commentary.
    3. **REFACTOR (Clean Code)**: Clean code pass, audit zero dead code, execute Gate 2 audit, and verify `pnpm validate` passes 100% in green.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/infrastructure/archive-data.test.ts`
- **Command**: `pnpm test apps/web/src/lib/infrastructure/archive-data.test.ts`
- **Assertion Goals**:
  - `ARTISTS_ROSTER` contains at least 8 artists.
  - Every entity contains `id`, `name`, `country`, `countryCode`, `subgenre`.
  - Required artists (Clara Cuvé, Øtta, Parfait, Wallis, Caravel, Somniac One, Lady Maru, Juliana Yamasaki) are present.
  - `/archivo` view renders exactly one semantic `<h1>` element.
  - `/archivo` view contains eyebrow `// HISTORIAL & REGISTRO // ARCHIVO GLOBAL` and subtitle.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] La documentación de arquitectura local y de base de datos está actualizada.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-012-archive-roster-directory.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-012-archive-roster-directory.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-012-archive-roster-directory-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-012-archive-roster-directory-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-012](https://linear.app/industrial-girls/issue/IGW-012)
