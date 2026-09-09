# Solution Spec: master-architecture Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La implementación distribuye estrictamente las responsabilidades en las 4 capas funcionales:
1. **Layer 4: Infrastructure (Catalogs & Repositories)**:
   - `apps/web/src/lib/infrastructure/music-catalog.ts`: Modelos y catálogo inmutable para los 5 compilados VA (VA 001 - VA 005) con tracklists oficiales, links a plataformas (Bandcamp, Beatport) y las 4 sesiones de podcast (IG MIX 001 - 004) con embeds de SoundCloud y YouTube.
   - `apps/web/src/lib/infrastructure/events-catalog.ts`: Estado del calendario, listado de showcases pasados con videos embebidos y lista estandarizada de países para captación.
   - `apps/web/src/lib/infrastructure/archive-catalog.ts`: Roster de más de 30 artistas vinculadas a Industrial Girls (Clara Cuvé, Øtta, Parfait, Wallis, Caravel, Somniac One, Lady Maru, etc.) con nacionalidad, subgénero sonoro y enlaces, además del catálogo multimedia de fotos y videos.
   - `apps/web/src/lib/infrastructure/community-catalog.ts`: Los 5 artículos del Journal Editorial sobre síntesis, chips analógicos, DAWs, hard techno y diseño sonoro.
2. **Layer 3: Domain / Pipelines**:
   - `apps/web/src/lib/pipelines/geographic-capture-pipeline.ts`: Pipeline de validación para captación geográfica en Eventos y Comunidad (email válido, nombre, país de catálogo, ciudad).
   - `apps/web/src/lib/pipelines/community-comment-pipeline.ts`: Pipeline para validación de comentarios en artículos del Journal.
   - `apps/web/src/lib/pipelines/merch-waitlist-pipeline.ts`: Pipeline de validación de correo para lista de espera prioritaria de Merch.
3. **Layer 2: Application / State & Hooks**:
   - `apps/web/src/lib/state/community-comments-store.ts`: Gestión de estado de comentarios reactivos en artículos de la comunidad.
4. **Layer 1: Presentation (Routes & Components)**:
   - Componentes de navegación: Header reestructurado con 5 rutas y CTA 'Demo Drop'; Navigation Drawer a pantalla completa; Footer unificado con enlace a modal 'Merch (Coming Soon)'.
   - Rutas en App Router:
     - `/musica`: Hero con selector de filtro rápido, ReleasesGrid, PodcastList, DemoDropCallout.
     - `/eventos`: Estado en preparación, GeographicCaptureForm, ShowcaseHistory.
     - `/archivo`: RosterGrid (30+ artistas), MediaArchiveGallery.
     - `/comunidad`: JournalGrid (5 artículos), ArticleDiscussion, GeographicCaptureForm.
     - Componente común: `MerchWaitlistModal`.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: [Infraestructura & Pipelines de Validación] (`apps/web/src/lib/infrastructure/*` y `apps/web/src/lib/pipelines/*`).
- **SPEC-2**: [Navegación Global, Footer & Modal Merch] (`Header`, `NavigationDrawer`, `Footer`, `MerchWaitlistModal`).
- **SPEC-3**: [Vistas Maestras: Música, Eventos, Archivo y Comunidad] (`/musica`, `/eventos`, `/archivo`, `/comunidad`).

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/master-architecture.test.ts`
- **Command**: `pnpm test apps/web/src/lib/master-architecture.test.ts`
- **Assertion Goals**:
  - Validar que el catálogo de música contiene compilados VA 001-005 con tracklists válidas e IG MIX 001-004.
  - Validar que el archivo cuenta con al menos 30 artistas tipadas con metadatos.
  - Validar que el catálogo editorial contiene los 5 artículos del journal.
  - Validar reglas de invariantes en los pipelines de captación geográfica, comentarios de comunidad y waitlist de merch.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] La documentación de arquitectura local y de base de datos está actualizada.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-004-master-architecture.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-004-master-architecture.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-004-master-architecture-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-004-master-architecture-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-004](https://linear.app/industrial-girls/issue/IGW-004)
