# Solution Spec: root-jsonld-schema Implementation (IGW-007)

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
1. **Presentation Layer (Layer 1)**: `apps/web/src/app/layout.tsx`
   - Inyecta en el tag `<head>` del layout raíz el script `<script type="application/ld+json">` consumiendo `ROOT_JSON_LD_SCHEMA` serializado.
2. **Application / Consumption Layer (Layer 2)**: N/A (este incremento no requiere hooks o mutaciones interactivas de usuario).
3. **Domain / Pipelines Layer (Layer 3)**: Definición de contratos e interfaces para el esquema semántico de Schema.org (`MusicGroupEntity`, `MusicPlatformEntity`, `RootJsonLdGraph`).
4. **Infrastructure Layer (Layer 4)**: `apps/web/src/lib/infrastructure/seo-schema.ts`
   - Diccionario y estructura de datos inmutable (`as const`) conteniendo la definición completa de Schema.org con `@graph`, identidades URI canonicales (`https://industrialgirls.com/#organization`, `https://industrialgirls.com/#label`), géneros, entidades de autoridad de Wikipedia y áreas de servicio global.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Inyección de Schema.org JSON-LD en Root Layout y Diccionario Semántico en Infraestructura (Rama: `feature/jaymusicmachine-IGW-007-root-jsonld-schema`)
  - Red: Suite de tests unitarios validando la estructura del JSON-LD y la inyección en el Layout.
  - Green: Creación de `apps/web/src/lib/infrastructure/seo-schema.ts` y actualización de `apps/web/src/app/layout.tsx`.
  - Refactor: Verificación de calidad, comentarios de capa y validación estricta de arquitectura.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/src/lib/infrastructure/seo-schema.test.ts`
- **Command**: `pnpm test apps/web/src/lib/infrastructure/seo-schema.test.ts`
- **Assertion Goals**:
  1. Validar que `@context` sea `https://schema.org`.
  2. Validar que `@graph` contenga exactamente las entidades `MusicGroup` y `MusicPlatform`.
  3. Validar los 7 géneros declarados (Techno, Industrial Techno, Hard Techno, Acid Techno, EBM, Groove Techno, Trance).
  4. Validar las 7 URLs de Wikipedia de autoridad (Charlotte de Witte, Amelie Lens, Nina Kraviz, Peggy Gou, Sara Landry, Awakenings, MUTEK).
  5. Validar las 4 áreas servidas (Global, Colombia, Europe, Asia).
  6. Validar que `layout.tsx` integre el script JSON-LD de forma segura y consistente.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] La documentación de arquitectura local está actualizada.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jaymusicmachine-IGW-007-root-jsonld-schema.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-007-root-jsonld-schema.md)
- **Solution Spec**: [feature-jaymusicmachine-IGW-007-root-jsonld-schema-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-jaymusicmachine-IGW-007-root-jsonld-schema-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-007](https://linear.app/industrial-girls/issue/IGW-007)

