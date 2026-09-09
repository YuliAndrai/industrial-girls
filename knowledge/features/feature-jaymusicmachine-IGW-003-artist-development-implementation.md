# Solution Spec: artist-development Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La implementación estructura el módulo de Desarrollo Artístico siguiendo la arquitectura funcional en 4 capas:
1. **Presentation Layer (`apps/web/src/app`, `apps/web/src/components`)**:
   - `apps/web/src/app/desarrollo-artistico/page.tsx`: Punto de entrada que orquesta el Hero, la grilla de 4 pilares, el formulario de diagnóstico, la barra de sonido flotante, el header y el footer.
   - `apps/web/src/components/artist-development/artist-dev-hero.tsx`: Hero atmosférico con glow rojo radial, claim H1 *"AGENCIA DE DESARROLLO ARTÍSTICO 360°"*, subtítulo oficial y los 5 badges clave.
   - `apps/web/src/components/artist-development/services-grid.tsx`: Grilla interactiva de 4 tarjetas táctiles que exponen los servicios de Estrategia, Ingeniería Sonora, Legal y Digital.
   - `apps/web/src/components/artist-development/intake-diagnostic-form.tsx`: Formulario de intake con validación client-side y botón de agendamiento táctil.
   - `apps/web/src/components/layout/header.tsx`: Enlace de navegación a *"Desarrollo Artístico"* y normalización de anclas.
   - `apps/web/src/components/layout/navigation-drawer.tsx`: Ítem `/07` hacia `/desarrollo-artistico`.
   - `apps/web/src/components/landing/hero-section.tsx`: Redirección del botón secundario del Hero a `/desarrollo-artistico`.
2. **Application / Consumption Layer (`apps/web/src/lib/hooks`, `apps/web/src/lib/state`)**:
   - `apps/web/src/lib/hooks/use-sound-fx.ts`: Feedback sonoro táctil para botones y acciones interactivas.
   - `apps/web/src/lib/hooks/use-drawer.ts`: Control accesible de apertura/cierre del menú de navegación.
3. **Domain / Pipelines Layer (`apps/web/src/lib/pipelines`)**:
   - `apps/web/src/lib/pipelines/intake-diagnostic-pipeline.ts`: Lógica pura de validación del formulario de diagnóstico (correo, enlaces, alias y servicios).
4. **Infrastructure Layer (`apps/web/src/lib/infrastructure`)**:
   - `apps/web/src/lib/infrastructure/artist-development-catalog.ts`: Repositorio de datos tipado con la especificación de los 4 pilares, servicios, add-ons y funciones de consulta (`getArtistDevPillars`).

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Core Infrastructure, Domain Pipeline & TDD Red Phase (Catálogo tipado, pipeline de validación y suite de pruebas unitarias en fallo).
- **SPEC-2**: Presentation Components & Navigation Integration (Hero 360°, Grilla de 4 Pilares, Formulario de Diagnóstico, Header/Drawer updates y página `/desarrollo-artistico`).

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/artist-development.test.ts`
- **Command**: `pnpm test apps/web/src/lib/artist-development.test.ts`
- **Assertion Goals**:
  1. Validar que el catálogo de desarrollo artístico contiene exactamente los 4 pilares con sus títulos, descripciones y servicios detallados.
  2. Validar que el pipeline de diagnóstico valida correctamente campos vacíos, correos inválidos y selección de servicios requeridos.
  3. Validar que los badges clave están presentes y formateados con consistencia táctil brutalista.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas unitarias pasa al 100% (`apps/web/src/lib/artist-development.test.ts`).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] Responsive design verificado en 320px, 375px, 768px y 1024px.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-003-artist-development.md](file:///Users/jaymusicmachine/Documents/Desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-003-artist-development.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-003-artist-development-implementation.md](file:///Users/jaymusicmachine/Documents/Desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-003-artist-development-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-003](https://linear.app/industrial-girls/issue/IGW-003)

