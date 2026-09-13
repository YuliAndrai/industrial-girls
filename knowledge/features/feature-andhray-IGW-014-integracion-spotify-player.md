# Problem Spec: integracion-spotify-player

## What problem exists
La plataforma web de Industrial Girls (`apps/web`) cuenta con secciones para catálogo de música (`/musica`), archivo de artistas (`/archivo`) y eventos de club (`/eventos`), pero actualmente carece de un mecanismo interactivo integrado y no invasivo para que los visitantes puedan previsualizar y reproducir música directamente en la web.
Actualmente, escuchar los lanzamientos de las artistas y compilaciones requiere abandonar la plataforma dirigiéndose a enlaces externos en Bandcamp, Beatport o Spotify, lo cual interrumpe la inmersión del usuario y degrada la retención dentro de la web.
Adicionalmente, implementar reproductores basados en peticiones directas de API para archivos MP3 vía `preview_url` presenta fallos críticos de disponibilidad, dado que Spotify ha restringido de forma generalizada las URLs de preview para nuevas aplicaciones en su Developer Portal. Por ende, se requiere una solución de alta fiabilidad basada en el **Spotify Embed Iframe / IFrame Controller**.

## Why it matters
Industrial Girls es un sello discográfico y colectivo underground (Hard Techno, Industrial, EBM, Dark Wave) donde la música es el núcleo absoluto de la identidad de marca.
Integrar un **Spotify Mini Player persistente y compacto**:
1. Permite a cualquier visitante escuchar 30 segundos de preview instantáneo de los lanzamientos oficiales sin necesidad de autenticarse en Spotify ni autorizar permisos OAuth.
2. Permite a los usuarios con cuenta activa de Spotify en su navegador escuchar las pistas completas directamente en el widget.
3. Conserva la persistencia de audio durante la navegación en Next.js App Router (la música no se corta al pasar de `/` a `/musica`, `/archivo` o `/eventos`).
4. Eleva la experiencia de usuario con una interfaz brutalista, estética industrial de club oscuro, tipografía monospace y controles táctiles de colapso/expansión adaptados a escritorio y móvil.

## What outcome is expected
1. **Infraestructura de Datos y Catálogo (Capa 4 - Infraestructura)**:
   - Mapeo tipado en `apps/web/src/lib/infrastructure/spotify-catalog.ts` con pistas destacadas del sello (`SpotifyTrackItem`) conteniendo `id`, `title`, `artist`, `spotifyTrackId`, `releaseName` y `duration`.
   - Función selectora `getSpotifyFeaturedTracks()` e integración con las compilaciones existentes.
2. **Dominio y Validaciones de Spotify (Capa 3 - Dominio / Pipelines)**:
   - Módulo en `apps/web/src/lib/pipelines/spotify-track-pipeline.ts` con funciones puras para parsear URIs/URLs (`spotify:track:...`, `open.spotify.com/track/...`), validar IDs de 22 caracteres alfanuméricos (`validateSpotifyId`) y construir URLs de embed seguras (`buildSpotifyEmbedUrl`).
3. **Consumo y Estado Global del Reproductor (Capa 2 - Aplicación / Consumo)**:
   - Hook y contexto React en `apps/web/src/lib/hooks/use-spotify-player.ts` (`SpotifyPlayerProvider` y `useSpotifyPlayer`) que administra el estado global: `currentTrackId`, `isOpen`, `isMinimized`, `playTrack(id)`, `togglePlayer()`, `minimizePlayer()`, `closePlayer()`.
4. **Componentes de Interfaz de Usuario (Capa 1 - Presentación)**:
   - `SpotifyMiniPlayer` (`apps/web/src/components/player/spotify-mini-player.tsx`): widget flotante dockeado en la esquina inferior con estética brutalista industrial (`bg-black/95`, `border-neutral-800`, badge activo `raveRed`), switch de expandir/minimizar y el `<iframe>` oficial de Spotify configurado con parámetros óptimos de sandbox y rendimiento (`loading="lazy"`, `height="152"`).
   - `SpotifyTrackTrigger` (`apps/web/src/components/player/spotify-track-trigger.tsx`): botón interactivo reutilizable para lanzar canciones al mini-player desde fichas de tracks o catálogos.
   - Montaje no invasivo en el layout global para persistencia entre rutas.
5. **Calidad y Gobernanza**:
   - 100% pruebas unitarias TDD en Vitest cubriendo utilidades de dominio, catálogo y renderizado del componente.
   - Cumplimiento de la regla de In-Code Commentary (declaración de capa, JSDoc y comentarios paso a paso `// Step N:`).
   - Aprobación de las compuertas Gate 1 y Gate 2 del rol `architect`.

## What gaps exist today
- No existe un contrato tipado ni catálogo que mapee las pistas de Industrial Girls a identificadores de Spotify (`spotifyTrackId`).
- No existen funciones de dominio para sanitizar y construir URLs de Spotify Embed.
- No existe un contexto global de reproducción ni el componente UI `SpotifyMiniPlayer`.
- El layout actual no dispone de un slot o provider para persistir la reproducción de Spotify.

## What questions remain open
- Ninguna pregunta bloqueante: el uso del Spotify Embed IFrame resuelve de forma nativa la autenticación, derechos de streaming discográficos y reproducción multiplataforma sin depender de credenciales secretas en el cliente.
