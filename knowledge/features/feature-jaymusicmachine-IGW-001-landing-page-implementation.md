# Solution Spec: landing-page Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La implementación estructura el landing page siguiendo estrictamente la arquitectura funcional en 4 capas:
1. **Presentation Layer (`apps/web/src/app`, `apps/web/src/components`)**:
   - `apps/web/src/app/page.tsx`: Punto de entrada que orquesta el orden de lectura brutalista.
   - `apps/web/src/components/layout/header.tsx`: Barra superior fija con logotipo enrejado gótico, selector de estado y disparador del drawer.
   - `apps/web/src/components/layout/navigation-drawer.tsx`: Menú en pantalla completa con tipografía brutalista mayúscula y coordenadas urbanas.
   - `apps/web/src/components/landing/hero-section.tsx`: Hero con textura analógica/scanline, hashtags, claim del sello y CTAs de acción directa.
   - `apps/web/src/components/landing/events-section.tsx`: Tabla táctil de eventos en clubes industriales con botones de tickets.
   - `apps/web/src/components/landing/records-section.tsx`: Malla de lanzamientos con códigos de catálogo (`[IG001]`), carátulas y metadatos técnicos.
   - `apps/web/src/components/landing/residents-section.tsx`: Fichas de DJs y productoras residentes del colectivo.
   - `apps/web/src/components/landing/shop-section.tsx`: Muestra de merchandising oficial con botón de compra táctil.
   - `apps/web/src/components/landing/videos-section.tsx`: Cuadrícula de transmisiones de raves y aftermovies.
   - `apps/web/src/components/landing/community-section.tsx`: Muro fotográfico de la comunidad rave.
   - `apps/web/src/components/landing/floating-sound-bar.tsx`: Píldora inferior flotante con control `SOUND [ON/OFF] |||·`.
   - `apps/web/src/components/ui/tactile-button.tsx`: Botón con inversión de color táctil e indicadores de estado.
2. **Application / Consumption Layer (`apps/web/src/lib/hooks`, `apps/web/src/lib/state`)**:
   - `apps/web/src/lib/hooks/use-sound-fx.ts`: Hook para micro-interacciones mecánicas y control del estado del botón `SOUND`.
   - `apps/web/src/lib/hooks/use-drawer.ts`: Control de apertura/cierre accesible del menú.
   - `apps/web/src/lib/state/landing-state.ts`: Estado cliente de filtros de catálogo, mute sonoro y modal de video.
3. **Domain / Pipelines Layer (`apps/web/src/lib/pipelines`)**:
   - `apps/web/src/lib/pipelines/example-pipeline.ts`: Pipeline agnóstico de validación canónico de la arquitectura.
4. **Infrastructure Layer (`apps/web/src/lib/infrastructure`)**:
   - `apps/web/src/lib/infrastructure/label-catalog.ts`: Repositorio estático fuertemente tipado que provee eventos, lanzamientos discográficos, residentes y productos.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Core UI Infrastructure & Brutalist System (Scaffolding 4 capas, catálogo base, utilidades de estilo y tests unitarios).
- **SPEC-2**: Exhale Section Parity & Interactive Sound Bar (Hero, Events, Records, Residents, Shop, Videos, Community y Sound Pill).

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/landing.test.ts`
- **Command**: `pnpm test apps/web/src/lib/landing.test.ts`
- **Assertion Goals**:
  1. Validar que el catálogo en `label-catalog.ts` expone lanzamientos, eventos y residentes válidos con identificadores consistentes (`IG001`, `IG002`, etc.).
  2. Validar que las funciones de consulta (`getReleases`, `getUpcomingEvents`, etc.) filtran e interactúan correctamente.
  3. Validar que el estado inicial de sonido e interacciones responde predeciblemente.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas unitarias pasa al 100% (`apps/web/src/lib/landing.test.ts`).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] Responsive QA validado sin overflow horizontal en 320px, 375px, 768px y 1024px.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-001-landing-page.md](file:///Users/jaymusicmachine/Documents/Desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-001-landing-page.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-001-landing-page-implementation.md](file:///Users/jaymusicmachine/Documents/Desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-001-landing-page-implementation.md)
- **Linear Issue**: Bypassed per developer instruction (`skip linear`).
