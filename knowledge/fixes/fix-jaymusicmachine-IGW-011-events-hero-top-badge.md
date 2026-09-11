# Problem Spec: events-hero-top-badge

## What problem exists
In `/eventos` (`http://localhost:3001/eventos`), the Hero header requires copy and layout refinements across three key elements:
1. The top eyebrow badge was updated to `EVENTS // SELECTIVE DATES & CLUB SESSIONS // CONCEPTO LINE UP DJS MUJERES` to explicitly convey the brand context ("EVENTS") and female DJ lineup curation, necessitating responsive viewport hardening (`text-[10px] sm:text-[11px]`, `break-words`, `max-w-full`).
2. The main `<h1>` title currently reads `SHOWCASES & FECHAS SELECCIONADAS`. The creative direction requires replacing it with the exact copy:
   `SHOWCASES Y ANUNCIOS PRONTO`
   while preserving display typography in uppercase, size, spacing, single `<h1>` semantic hierarchy, and red glow branding accent.
3. The descriptive subtitle is refined to remove redundant introductory phrases and read exactly:
   `"Regístrate para acceder a locaciones, alineaciones y preventas prioritarias en tu región."`
   to directly call the audience to register for secret locations, lineups, and priority presale access.
4. The lower season callout badge (`[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]`) and its associated red box container and spacing are completely removed to streamline the Hero and provide a clean visual transition into the geographic radar section below.
5. In the Geographic Radar form on `/eventos`, the top eyebrow badge is updated to `ÚNETE A NUESTRO TELEGRAM // RECIBE NOTICIAS` and the main form title is updated to `PREVENTAS & ALERTAS POR CIUDAD`, maintaining monospace/display typography, tracking, and red brand accents.

## Why it matters
The eyebrow badge, headline, and subtitle together establish a concise, high-impact value proposition for `/eventos`. Removing the repetitive season callout badge declutters the Hero section, while the refined Telegram callout and presales title on the geographic radar form directly convert visitors into prioritized community subscribers.

## What outcome is expected
1. Canonical Layer 4 infrastructure constant `CALENDAR_STATUS.topBadge` in `apps/web/src/lib/infrastructure/events-catalog.ts` is set to:
   `"EVENTS // SELECTIVE DATES & CLUB SESSIONS // CONCEPTO LINE UP DJS MUJERES"`
2. Canonical Layer 4 infrastructure constant `CALENDAR_STATUS.headline` in `apps/web/src/lib/infrastructure/events-catalog.ts` is updated to exactly:
   `"SHOWCASES Y ANUNCIOS PRONTO"`
3. Canonical Layer 4 infrastructure constant `CALENDAR_STATUS.curatorialNote` in `apps/web/src/lib/infrastructure/events-catalog.ts` is updated to exactly:
   `"Regístrate para acceder a locaciones, alineaciones y preventas prioritarias en tu región."`
4. Presentation layer `apps/web/src/app/eventos/eventos-view.tsx` completely removes the `statusCallout` container, leaving a clean Hero block (Eyebrow Badge, H1 Headline, Subtitle) that flows naturally into the Geographic Form.
5. `GeographicForm` (`apps/web/src/components/common/geographic-form.tsx`) supports an optional `badge` prop, configured in `eventos-view.tsx` with:
   - Eyebrow badge: `"ÚNETE A NUESTRO TELEGRAM // RECIBE NOTICIAS"`
   - Title: `"PREVENTAS & ALERTAS POR CIUDAD"`
6. Unit, integration, and architecture test suites in `apps/web/src/lib/infrastructure/events-catalog.test.ts` and `apps/web/src/lib/master-architecture.test.ts` validate these invariants cleanly.

## What gaps exist today
- `GeographicForm` in `eventos-view.tsx` currently renders `"RADAR GEOGRÁFICO DE PREVENTAS"` and a hardcoded eyebrow badge.

## What questions remain open
None. The text copy for the eyebrow badge, title, subtitle, and form header is explicitly defined by the user.
