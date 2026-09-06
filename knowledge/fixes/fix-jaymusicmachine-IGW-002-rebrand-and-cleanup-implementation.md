# Solution Spec: rebrand-and-cleanup Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `architect`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`

## 2. Solution Overview & 4-Layer Architecture
La resolución del fix comprende tres frentes de saneamiento transversal:

1. **Saneamiento de Identidad (BRIDS -> Industrial-Girls)**:
   - Actualización de nombres de paquetes en `package.json` (`industrial-girls`) y `apps/web/package.json` (`@industrial-girls/web`).
   - Saneamiento de las 14 guías en `knowledge/guides/` y políticas en `knowledge/governance/`.
   - Ajuste de templates en `knowledge/templates/` al equipo `Industrial Girls App`.
   - Actualización del servidor MCP en `scripts/linear-mcp-server.ts` a `industrial-girls-linear-mcp`.
   - Sincronización del grafo de conocimiento en `.agents/graph.json`.

2. **Eliminación de Residuos Web3/Solana**:
   - Reescritura de `README.md` eliminando menciones a Solana Devnet, Web3 monorepo, carpetas ficticias (`programs/`, `packages/solana-client/`) y botones de wallet.
   - Actualización de `knowledge/architecture/architecture-overview.md` y `knowledge/governance/clean-code-folder-structure.md` alineándolos con la arquitectura Next.js y los módulos de audio y catálogo de Industrial Girls.

3. **Estandarización del Prefijo Canónico (BRI -> IGW)**:
   - Configuración en `scripts/task-init.sh`, `scripts/git-start.sh`, `scripts/linear-plan-core.js` y `scripts/linear-status-core.js` para normalizar los IDs numéricos como `IGW-<id>`.
   - Actualización de las expresiones regulares de extracción de issues en `scripts/ci/pr-auto.sh` y `scripts/ci/generate-pr-body.sh` para soportar `IGW-[0-9]+`.
   - Actualización de las suites de test (`apps/web/src/lib/landing.test.ts` con `@spec IGW-001`, `tests/harness/specs/03-lifecycle-state.test.ts` con `IGW-TEST` y `06-pr-governance.test.ts` con `IGW-184`).

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Actualización de paquetes, scripts y prefijos (`IGW`).
- **SPEC-2**: Limpieza de documentación y erradicación de referencias Web3.
- **SPEC-3**: Verificación integral con la suite de arnés y pruebas.

## 4. TDD Strategy
- Comprobar que `pnpm validate` ejecuta y aprueba los 60 tests unitarios y de gobernanza con los nuevos identificadores `IGW`.
- Comprobar que no queden referencias a `BRI` en el código de producción ni en los scripts de scaffolding.

## 5. Local Definition of Done (DoD)
- [x] Rama de fix creada: `fix/jaymusicmachine-IGW-002-rebrand-and-cleanup`.
- [x] Artefactos duales creados en `knowledge/fixes/`.
- [x] Cero menciones de `BRIDS` o `BRI` en scripts, tests y configuración.
- [x] Cero menciones no deseadas a Web3 en el README.
- [x] `pnpm validate` aprobado al 100%.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-jaymusicmachine-IGW-002-rebrand-and-cleanup.md](file:///Users/jaymusicmachine/Documents/Desarrollo/industrial-girls/knowledge/fixes/fix-jaymusicmachine-IGW-002-rebrand-and-cleanup.md)
- **Solution Spec**: [fix-jaymusicmachine-IGW-002-rebrand-and-cleanup-implementation.md](file:///Users/jaymusicmachine/Documents/Desarrollo/industrial-girls/knowledge/fixes/fix-jaymusicmachine-IGW-002-rebrand-and-cleanup-implementation.md)
- **Linear Issue**: IGW-002
