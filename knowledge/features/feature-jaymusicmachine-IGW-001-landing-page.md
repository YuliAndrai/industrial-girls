# Problem Spec: landing-page

## What problem exists
El sello discográfico de techno industrial **Industrial Girls** carece actualmente de una plataforma web pública donde presentar su identidad visual, catálogo musical, fechas de eventos/raves en vivo, plantilla de residentes y venta de merchandising. Actualmente el repositorio contiene únicamente la plantilla starter genérica de Next.js sin los elementos visuales de marca, paleta ni estructura editorial requerida.

## Why it matters
Tener una plataforma web con alta fidelidad estética (**Tactile Brutalism**) inspirada en referentes líderes de la escena rave como [Exhale Music](https://www.exhalemusic.net/) es fundamental para establecer la presencia digital del sello, comunicar lanzamientos (records), congregar a la comunidad y habilitar la preventa de entradas a almacenes/clubs clandestinos mediante un canal oficial y directo.

## What outcome is expected
1. Una landing page Next.js 16 App Router con arquitectura funcional en 4 capas limpia (`Presentation`, `Application`, `Pipelines`, `Infrastructure`).
2. Implementación de las secciones homólogas a Exhale Music:
   - Header fijo con logotipo gótico enrejado de Industrial Girls y menú desplegable (drawer).
   - Hero Section atmosférico con tipografía brutalista, scanlines/textura, lemas del sello y llamadas a la acción directas.
   - Next Events: Fechas de raves y showcases en clubes industriales (Tresor Berlin, Fold London, Shelter Amsterdam, Warehouse Bogota) con botones táctiles de tickets.
   - Records / Releases: Catálogo de lanzamientos en vinilo/digital (IG001 a IG006) con portadas e identificadores de catálogo.
   - Residents & Artists: Panel de artistas residentes y DJs del sello.
   - Shop / Merch: Muestra de productos oficiales (Pasamontañas/Balaclava, Hoodie con logo, Vinilos).
   - Videos / Sessions: Transmisiones y aftermovies de raves underground.
   - Community Gallery: Muro fotográfico de alta energía rave.
   - Dispatch / Newsletter: Registro para alertas de ubicaciones secretas y preventas.
   - Floating Sound Bar: Botón flotante táctil `SOUND [ON/OFF] |||·` con visualizador reactivo y micro-interacciones de feedback mecánico.
   - Footer: Enlaces legales, demos y redes oficiales.
3. Compatibilidad responsiva total (320px, 375px, 768px, 1024px) sin desbordamiento horizontal.
4. Cobertura de pruebas unitarias y validación completa del arnés (`pnpm validate`).

## What gaps exist today
- No existe el catálogo estructurado de datos del sello (lanzamientos, eventos, residentes, productos) en la capa de infraestructura.
- No existen las utilidades CSS ni la paleta rave (`rave-red`, `rave-black`, `rave-zinc`, scanlines) en Tailwind.
- No existen los componentes modulares de sección para la landing page.
- El streaming de audio directo de SoundCloud aún no está integrado (marcado como Out-of-Scope para este Feature-001).

## What questions remain open
- Ninguna pregunta bloqueante abierta. Se acordó diferir el reproductor completo de SoundCloud a un feature posterior y mantener en este entregable el control interactivo `SOUND` con micro-interacciones táctiles.
