# Solution Spec: archive-roster-directory Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
- **Layer 1: Presentation Layer (`apps/web/src/app/archivo/page.tsx` & `apps/web/src/app/archivo/archivo-view.tsx`)**:
  - `page.tsx`: Server Component configuring route metadata (`ARCHIVO // ROSTER DE ARTISTAS & MEMORIA VISUAL - INDUSTRIAL GIRLS`).
  - `archivo-view.tsx`: Client Component rendering:
    - Eyebrow: `// HISTORIAL & REGISTRO // ARCHIVO GLOBAL`
    - Main title H1: `ROSTER DE ARTISTAS & MEMORIA VISUAL`
    - Subtitle: `"Registro de DJs, productoras y directos que han formado parte del circuito sonoro de Industrial Girls."`
    - Encabezado de bloque: `// ARCHIVO // EDICIONES PASADAS` y `ARTISTAS EN NUESTROS EVENTOS & LABEL`.
    - Roster Typographic Directory: Responsive two-column grid (`grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0 items-start`) partitioning 30 scene artists into two balanced columns of 15, with compact density (`py-2.5 sm:py-3`), index `01`-`30` (`text-white/40`), and compact profile link buttons (`[ SPOTIFY ]`, `[ SOUNDCLOUD ]`, `[ IG ]`, `[ RA ]`, `[ BC ]`) aligned to the right.
    - Single `<h1>` semantic invariant per route.
- **Layer 2: Application / Consumption Layer**:
  - Consumes `getArtistsRoster()` and `getMediaArchiveItems()` from Layer 4 Infrastructure.
  - Integrates application state hooks `useDrawer` and `useSoundFx`.
- **Layer 3: Domain / Pipelines / Services Layer**:
  - Artist entity contracts and media item categorization/filtering logic.
- **Layer 4: Infrastructure Layer (`apps/web/src/lib/infrastructure/archive-data.ts`)**:
  - Defines `ArtistProfile` interface (`id`, `name`, `country`, `countryCode`, `links: { spotify?, soundcloud?, residentAdvisor?, instagram?, bandcamp? }`).
  - Exports immutable typed constant `ARTISTS_ROSTER` with 30 scene artists (zero genre/subgenre properties).
  - Exports getter function `getArtistsRoster(): readonly ArtistProfile[]`.
  - Defines `MediaArchiveItem` interface (`id`, `title`, `date`, `location`, `type: "photo" | "video"`, `mediaUrl`, `caption`, `duration?`, `thumbnailUrl?`).
  - Exports immutable typed constant `MEDIA_ARCHIVE` containing photographic and audiovisual records from showcases and club sessions.
  - Exports getter function `getMediaArchiveItems(): readonly MediaArchiveItem[]`.
  - Defines `ArchivePhoto` interface (`id`, `url`, `alt`) and immutable catalog `ARCHIVE_PHOTOS` with exactly 41 indexed visual frames (`photo-01` to `photo-41`).
  - Exports getter function `getArchivePhotos(): readonly ArchivePhoto[]`.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Archive Roster Data & Typographic Directory (Branch: `feature/jaymusicmachine-IGW-012-archive-roster-directory`) — Completed & Validated.
- **SPEC-2**: Media Archive & Registro Audiovisual Gallery (Branch: `feature/jaymusicmachine-IGW-012-archive-roster-directory`)
  - Red-Green-Refactor cycle:
    1. **RED (TDD)**: Extend `apps/web/src/lib/infrastructure/archive-data.test.ts` with failing assertions for:
       - `MEDIA_ARCHIVE` dataset and `getMediaArchiveItems()` getter.
       - Mandatory properties for media entities (`id`, `title`, `date`, `location`, `type`, `mediaUrl`, `caption`).
       - Presence of both photo and video record types.
       - Presence of block eyebrow `// REGISTRO & MEMORIA // ARCHIVO AUDIOVISUAL` and semantic H2 `REGISTRO AUDIOVISUAL & SHOWCASES`.
       - Preservation of single `<h1>` invariant on `/archivo`.
    2. **GREEN (Implementation)**:
       - Update `apps/web/src/lib/infrastructure/archive-data.ts` to export `MediaArchiveItem`, `MEDIA_ARCHIVE`, and `getMediaArchiveItems()`.
       - Update `apps/web/src/app/archivo/archivo-view.tsx` to render the Media Archive section below the 30-artist directory with filter tabs (`[ TODOS ]`, `[ FOTOGRAFÍA ]`, `[ VIDEO ]`), media cards, interactive video player / photo preview modal, responsive grid, and in-code commentary.
    3. **REFACTOR (Clean Code)**:
       - Execute clean code audit.
       - Invoke `architect` subagent for Gate 2 audit.
       - Verify `pnpm validate` and `pnpm test` pass 100% in green.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/infrastructure/archive-data.test.ts`
- **Command**: `pnpm test apps/web/src/lib/infrastructure/archive-data.test.ts`
- **Assertion Goals**:
  - `ARTISTS_ROSTER` contains exactly 30 artists without subgenres.
  - `MEDIA_ARCHIVE` contains at least 3 curated items with photos and videos.
  - Media items have valid formats and properties.
  - `/archivo` view renders exactly one semantic `<h1>` element.
  - `/archivo` view renders the Media Archive block header with semantic `<h2>`.

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
