# Solution Spec: home-brand-statement Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security` (zero trust, validación de enlaces relativos)

## 2. Solution Overview & 4-Layer Architecture
La solución preserva estrictamente la arquitectura funcional de 4 capas:
1. **Presentation Layer (Layer 1)**:
   - `apps/web/src/components/landing/hero-section.tsx`: Actualización de los 3 badges a `#IndustrialGirls`, `#TechnoGirls`, `#HardGirls`, y refinamiento de jerarquía/contraste en el slogan principal.
   - `apps/web/src/components/landing/brand-statement-section.tsx`: Nuevo componente que implementa el subtítulo editorial H2, la Declaración de Movimiento (2 párrafos con tipografía brutalista de alta legibilidad) y la barra horizontal de navegación rápida con botones táctiles hacia `/musica`, `/desarrollo-artistico` y `/archivo`.
   - `apps/web/src/app/page.tsx`: Inserción del `BrandStatementSection` inmediatamente debajo del `HeroSection`.
2. **Application / Consumption Layer (Layer 2)**:
   - Consumo de utilidades de estilo táctil (`cn`, constantes de rutas y hooks de feedback táctil).
3. **Domain / Pipelines Layer (Layer 3)**:
   - Validación de enlaces de navegación rápida y contenido inmutable de la declaración de marca.
4. **Infrastructure Layer (Layer 4)**:
   - `apps/web/src/lib/infrastructure/brand-catalog.ts`: Repositorio fuertemente tipado que centraliza los textos oficiales del manifiesto, hashtags autorizados y enlaces de navegación rápida.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Actualización de Badges en Hero, Refinamiento Tipográfico del Slogan, Creación del Catálogo de Marca en Layer 4, Creación del Componente `BrandStatementSection` en Layer 1, e Integración en `page.tsx`.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/home-brand-statement.test.ts`
- **Command**: `pnpm test apps/web/src/lib/home-brand-statement.test.ts`
- **Assertion Goals**:
  1. Validar que el catálogo de marca contenga exactamente los 3 hashtags autorizados: `#IndustrialGirls`, `#TechnoGirls`, `#HardGirls`.
  2. Validar que los textos del mensaje principal (H2) y los 2 párrafos de la Declaración de Movimiento coincidan de forma exacta con la especificación.
  3. Validar que los 3 enlaces de exploración rápida apunten a `/musica`, `/desarrollo-artistico` y `/archivo`.
  4. Validar la estructura y renderizado del componente `BrandStatementSection`.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde) incluyendo `home-brand-statement.test.ts`.
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] `pnpm build` prerenderiza todas las rutas estáticas sin fallos.
- [ ] Verificación en `http://localhost:3001` confirmada.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-005-home-brand-statement.md](knowledge/features/feature-jaymusicmachine-IGW-005-home-brand-statement.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-005-home-brand-statement-implementation.md](knowledge/features/feature-jaymusicmachine-IGW-005-home-brand-statement-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-005](https://linear.app/industrial-girls/issue/IGW-005)
