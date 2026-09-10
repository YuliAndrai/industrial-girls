# Solution Spec: route-metadata-seo Implementation (IGW-008)

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
1. **Presentation Layer (Layer 1)**:
   - `apps/web/src/app/page.tsx`: Server Component que exporta `metadata: Metadata = ROUTE_METADATA.home` y renderiza el componente cliente `HomePageClient`.
   - `apps/web/src/app/musica/page.tsx`: Server Component que exporta `metadata: Metadata = ROUTE_METADATA.musica` y renderiza `MusicaPageClient`.
   - `apps/web/src/app/desarrollo-artistico/page.tsx`: Server Component que exporta `metadata: Metadata = ROUTE_METADATA.desarrolloArtistico` y renderiza `ArtistDevelopmentClient`.
   - `apps/web/src/app/eventos/page.tsx`: Server Component que exporta `metadata: Metadata = ROUTE_METADATA.eventos` y renderiza `EventosPageClient`.
   - `apps/web/src/app/comunidad/page.tsx`: Server Component que exporta `metadata: Metadata = ROUTE_METADATA.comunidad` y renderiza `ComunidadPageClient`.
2. **Application / Consumption Layer (Layer 2)**:
   - Se mantienen los hooks reactivos existentes (`useDrawer`, `useSoundFx`).
3. **Domain / Pipelines Layer (Layer 3)**:
   - Contratos y tipos de metadatos de rutas (`RouteMetadataMap`, `AppRouteKey`).
4. **Infrastructure Layer (Layer 4)**:
   - `apps/web/src/lib/infrastructure/route-metadata.ts`: Diccionario inmutable `ROUTE_METADATA` con las especificaciones de título, descripción, keywords, Open Graph y Twitter Cards para las 5 secciones maestras.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Diccionario de Metadata por Ruta e Integración en App Router (Rama: `feature/jaymusicmachine-IGW-008-route-metadata-seo`)
  - Red: Suite de tests unitarios validando la configuración de metadata por ruta y la jerarquía de tags H1 en el DOM.
  - Green: Implementación de `apps/web/src/lib/infrastructure/route-metadata.ts` y desacople a Server Components en los 5 `page.tsx`.
  - Refactor: Verificación de calidad, auditoría de comentarios de capa, Gate 2 y validación con `pnpm validate`.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/infrastructure/route-metadata.test.ts`
- **Command**: `pnpm test apps/web/src/lib/infrastructure/route-metadata.test.ts`
- **Assertion Goals**:
  1. Validar que `ROUTE_METADATA` defina títulos y descripciones exactas para `/`, `/musica`, `/desarrollo-artistico`, `/eventos` y `/comunidad`.
  2. Validar que la home contenga los 6 keywords requeridos.
  3. Validar que cada metadata incluya configuración Open Graph y Twitter Cards coherentes.
  4. Validar mediante análisis estático que los 5 `page.tsx` exportan `metadata` y no usan `"use client"` directamente en el archivo de ruta.
  5. Validar que cada página mantiene un único tag `<h1>` en su estructura renderizada.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] Jerarquía semántica de H1 verificada y sin duplicaciones.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-008-route-metadata-seo.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-008-route-metadata-seo.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-008-route-metadata-seo-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-008-route-metadata-seo-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-008](https://linear.app/industrial-girls/issue/IGW-008)
