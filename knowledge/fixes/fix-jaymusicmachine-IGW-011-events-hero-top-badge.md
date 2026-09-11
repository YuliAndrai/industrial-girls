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

## Why it matters
The eyebrow badge, headline, and subtitle together establish a concise, high-impact value proposition for `/eventos`. Removing the repetitive season callout badge declutters the Hero section and creates an immediate, natural visual connection with the geographic radar form directly below.

## What outcome is expected
1. Canonical Layer 4 infrastructure constant `CALENDAR_STATUS.topBadge` in `apps/web/src/lib/infrastructure/events-catalog.ts` is set to:
   `"EVENTS // SELECTIVE DATES & CLUB SESSIONS // CONCEPTO LINE UP DJS MUJERES"`
2. Canonical Layer 4 infrastructure constant `CALENDAR_STATUS.headline` in `apps/web/src/lib/infrastructure/events-catalog.ts` is updated to exactly:
   `"SHOWCASES Y ANUNCIOS PRONTO"`
3. Canonical Layer 4 infrastructure constant `CALENDAR_STATUS.curatorialNote` in `apps/web/src/lib/infrastructure/events-catalog.ts` is updated to exactly:
   `"Regístrate para acceder a locaciones, alineaciones y preventas prioritarias en tu región."`
4. Presentation layer `apps/web/src/app/eventos/eventos-view.tsx` completely removes the `statusCallout` container, leaving a clean Hero block (Eyebrow Badge, H1 Headline, Subtitle) that flows naturally into the Geographic Form.
5. Unit, integration, and architecture test suites in `apps/web/src/lib/infrastructure/events-catalog.test.ts` and `apps/web/src/lib/master-architecture.test.ts` validate these invariants cleanly.

## What gaps exist today
- `CALENDAR_STATUS.curatorialNote` in `apps/web/src/lib/infrastructure/events-catalog.ts` contains the previous introductory phrase `"Showcases y fechas pronto."`.
- Unit test assertions expect the previous curatorial note string.

## What questions remain open
None. The text copy for the eyebrow badge, the main title, and the subtitle is explicitly defined by the user.
