# Industrial Girls

Underground Techno Record Label & Digital Platform with 4-Layer Functional Architecture and Autonomous Agent Governance Harness.

<!-- DOCS-AUTO:START -->
## Documentation Snapshot (Auto-generated)

Updated: 2026-09-10 01:06:02 UTC

| Document | Scope | Last Updated | Last Commit |
| --- | --- | --- | --- |

### Required Docs by Change Type
- Frontend/Auth (/app): `knowledge/architecture/auth-flow.md`, `knowledge/architecture/session-model.md`
- Architecture: `knowledge/architecture/architecture-overview.md`, `knowledge/architecture/state-machine.md`, `knowledge/architecture/threat-model.md`
<!-- DOCS-AUTO:END -->

## Operational Architecture

This repository is structured as a high-performance **pnpm monorepo** for **Next.js**:

- `apps/web/`: Next.js 16 (App Router) presentation application with Tailwind CSS, Web Audio API sound synthesis, Motion 12, and 4-layer functional architecture.
- `knowledge/`: Canonical OKF documentation, governance policies (`knowledge/governance/`), and architecture specifications.
- `scripts/`: Task lifecycle automation (`task-init.sh`), 4-layer architecture linter, and CI governance scripts.
- `tests/`: Integration tests, unit tests, and autonomous agent governance harness (`tests/harness/`).
- `.agents/`: Autonomous agent definitions, policies, workflows, and task state tracking.

---

## 4-Layer Functional Architecture

All frontend and application code in `apps/web/src/` adheres strictly to 4 decoupled layers:

1. **Layer 1: Presentation** (`apps/web/src/app`, `apps/web/src/components`):
   - UI views, layout skeletons, interactive brutalist components, client interaction boundaries.
2. **Layer 2: Application / Consumption** (`apps/web/src/lib/hooks`, `apps/web/src/lib/state`):
   - React custom hooks, Web Audio synthesizer hooks, drawer/navigation state, application store mutations.
3. **Layer 3: Domain / Pipelines** (`apps/web/src/lib/pipelines`):
   - Pure domain business logic, data transformers, validation rules.
4. **Layer 4: Infrastructure** (`apps/web/src/lib/infrastructure`, `apps/web/src/lib/utils.ts`):
   - Record label catalog, API clients, external service connectors, utility helpers.

---

## Development Commands

```bash
# Start Next.js development server
pnpm dev

# Run unit and starter tests
pnpm test

# Run governance & harness verification suite
pnpm test:harness

# Execute complete CI validation (Lint, Typecheck, Licenses, 4-Layer Architecture, Harness)
pnpm validate

# Build Next.js for production
pnpm build
```

---

## Agent Governance & Task Lifecycle

This repository uses the Autonomous Agent Governance framework. All changes follow the 8-phase task lifecycle with double-gatekeeper enforcement:

1. **Task Initialization**:
   ```bash
   pnpm task:init
   ```
2. **Architecture Review (Gate 1)**: Pre-implementation Solution Spec review.
3. **TDD RED Phase**: Write tests before production implementation.
4. **Code Implementation**: Write clean production code with mandatory in-code commentary.
5. **Diff Audit (Gate 2)**: Architecture isolation audit & `pnpm validate`.
