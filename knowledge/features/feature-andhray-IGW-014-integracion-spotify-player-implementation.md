# Solution Spec: integracion-spotify-player Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
- **Layer 1: Presentation Layer (`apps/web/src/components/player/`)**:
  - `spotify-mini-player.tsx`: Client Component (`"use client"`) rendering the persistent floating dock widget.
    - Mini docked floating pill when minimized / open full card (`w-[360px]` max width, `bg-black/95`, backdrop-blur, `border-neutral-800`).
    - Monospace header displaying `// SPOTIFY VAULT // MINI PLAYER`, track status badge (`raveRed` neon pulse), and tactile minimize/close button.
    - Official Spotify Embed IFrame:
      `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`
      `width="100%"`, `height="152"`, `loading="lazy"`, `allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"`.
  - `spotify-track-trigger.tsx`: Reusable tactile trigger button for catalog cards or lists that invokes `playTrack(trackId)` with subtle neon hover feedback.
- **Layer 2: Application / Consumption Layer (`apps/web/src/lib/hooks/` & context)**:
  - `apps/web/src/lib/hooks/use-spotify-player.tsx`:
    - Provides `SpotifyPlayerContext` and `useSpotifyPlayer()` hook.
    - State: `currentTrackId: string | null`, `isOpen: boolean`, `isMinimized: boolean`.
    - Actions: `playTrack(trackId: string)`, `togglePlayer()`, `minimizePlayer()`, `expandPlayer()`, `closePlayer()`.
    - Integrated into `apps/web/src/app/providers.tsx` and mounted in `apps/web/src/app/layout.tsx` so audio playback is preserved during client-side Next.js route transitions.
- **Layer 3: Domain / Pipelines / Services Layer (`apps/web/src/lib/pipelines/`)**:
  - `spotify-track-pipeline.ts`:
    - `parseSpotifyTrackId(input: string): string | null`: Extracts the 22-character base62 ID from Spotify URLs, URIs (`spotify:track:...`) or plain IDs.
    - `validateSpotifyId(id: string): boolean`: Validates the format matches `^[a-zA-Z0-9]{22}$`.
    - `buildSpotifyEmbedUrl(trackId: string, options?: { theme?: "0" | "1" }): string`: Constructs a secure, sanitized embed iframe URL.
- **Layer 4: Infrastructure Layer (`apps/web/src/lib/infrastructure/`)**:
  - `spotify-catalog.ts`:
    - Interface `SpotifyTrackItem` (`id`, `title`, `artist`, `spotifyTrackId`, `releaseCatalogCode`, `duration`).
    - Immutable catalog `SPOTIFY_FEATURED_TRACKS`: Curated initial list of representative underground techno and EBM tracks corresponding to Industrial Girls VA releases (e.g. `va-001`, `va-002`).
    - Getter `getSpotifyFeaturedTracks(): readonly SpotifyTrackItem[]`.
    - Getter `getDefaultSpotifyTrack(): SpotifyTrackItem`.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1: Spotify Domain Pipelines & Infrastructure Catalog (Branch: `SPEC/andhray-IGW-014-s01-spotify-domain-catalog`)**:
  - Cycle:
    1. **RED (TDD)**: Create `apps/web/src/lib/pipelines/spotify-track-pipeline.test.ts` and `apps/web/src/lib/infrastructure/spotify-catalog.test.ts` with assertions for ID extraction, URI parsing, embed URL generation, and catalog completeness.
    2. **GREEN (Implementation)**: Implement `spotify-track-pipeline.ts` and `spotify-catalog.ts` with strict layer annotation and JSDoc commentary.
    3. **REFACTOR (Clean Code)**: Clean code pass, verify 100% tests pass.
- **SPEC-2: Spotify Player State Hook & UI Mini Player (Branch: `SPEC/andhray-IGW-014-s02-spotify-ui-player`)**:
  - Cycle:
    1. **RED (TDD)**: Create `apps/web/src/lib/hooks/use-spotify-player.test.tsx` and `apps/web/src/components/player/spotify-mini-player.test.tsx` testing state transitions, minimize/maximize toggling, and iframe DOM attributes.
    2. **GREEN (Implementation)**:
       - Implement `use-spotify-player.tsx` context and hook.
       - Implement `spotify-mini-player.tsx` and `spotify-track-trigger.tsx`.
       - Mount the provider in `apps/web/src/app/providers.tsx` and the player in `apps/web/src/app/layout.tsx`.
    3. **REFACTOR (Clean Code)**:
       - Refactoring audit, verify Next.js runtime loop via `next-dev-loop`.
       - Run `pnpm validate`.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Paths**:
  - `apps/web/src/lib/pipelines/spotify-track-pipeline.test.ts`
  - `apps/web/src/lib/infrastructure/spotify-catalog.test.ts`
  - `apps/web/src/lib/hooks/use-spotify-player.test.tsx`
  - `apps/web/src/components/player/spotify-mini-player.test.tsx`
- **Commands**:
  - `pnpm test apps/web/src/lib/pipelines/spotify-track-pipeline.test.ts`
  - `pnpm test apps/web/src/lib/infrastructure/spotify-catalog.test.ts`
- **Assertion Goals**:
  - Correct extraction of track IDs from `spotify:track:4cOdK2wGLETKBW3PvgPWqT` and web URLs.
  - Rejection of malicious or malformed IDs.
  - Construction of valid Spotify Embed URLs with `utm_source=generator&theme=0`.
  - Initial catalog returns valid `SpotifyTrackItem` entries with non-empty Spotify IDs.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] Cumplimiento estricto de In-Code Commentary (declaración de capa en header, JSDoc y comentarios `// Step N:`).
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-andhray-IGW-014-integracion-spotify-player.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-andhray-IGW-014-integracion-spotify-player.md)
- **Solution Spec**: [feature-andhray-IGW-014-integracion-spotify-player-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/industrial-girls/knowledge/features/feature-andhray-IGW-014-integracion-spotify-player-implementation.md)
- **Linear Issue**: [Linear Ticket #IGW-014](https://linear.app/industrial-girls/issue/IGW-014)

