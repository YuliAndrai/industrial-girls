# Problem Spec: archive-roster-directory

## What problem exists
La sección `/archivo` en `apps/web/src/app/archivo` requiere una arquitectura de datos desacoplada y una experiencia visual de alto impacto brutalista y tipográfico enfocada exclusivamente en el Roster de Artistas de la escena underground (DJs, productoras y directos). Actualmente, la información de artistas no está tipada con soporte de código de país ISO (`countryCode`), enlaces directos estandarizados (SoundCloud / Resident Advisor / Instagram) ni una grilla tipográfica interactiva con estados hover reactivos de acento rojo y visualización de banderas/metadatos sónicos.

## Why it matters
Industrial Girls se posiciona como una plataforma curatorial de élite para artistas mujeres e identidades disidentes en el Hard Techno, Industrial, EBM y modular live. Contar con un directorio tipográfico de alto impacto en `/archivo` proporciona credibilidad internacional, visibilidad de los vínculos territoriales (Alemania, Francia, Portugal, Países Bajos, Italia, Brasil, etc.) y una experiencia de navegación inmediata, accesible y reactiva alineada con los estándares de diseño del proyecto.

## What outcome is expected
1. **Desacople de Datos (Capa 4 - Infraestructura)**:
   - `apps/web/src/lib/infrastructure/archive-data.ts` con el contrato `ArtistProfile` y `ARTISTS_ROSTER` de 30 artistas clave (sin campos de género).
   - Contrato `MediaArchiveItem` y catálogo `MEDIA_ARCHIVE` con registros fotográficos y videográficos de eventos pasados y showcases (`getMediaArchiveItems()`).
2. **Directorio Tipográfico en Dos Columnas (Capa 1 - Presentación)**: Implementación de la vista `/archivo` con la jerarquía semántica:
   - Eyebrow: `// HISTORIAL & REGISTRO // ARCHIVO GLOBAL`
   - H1: `ROSTER DE ARTISTAS & MEMORIA VISUAL`
   - Subtítulo: `"Registro de DJs, productoras y directos que han formado parte del circuito sonoro de Industrial Girls."`
   - Encabezado de bloque Roster: `// ARCHIVO // EDICIONES PASADAS` y título `ARTISTAS EN NUESTROS EVENTOS & LABEL`.
   - Grilla responsiva de dos columnas (`grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0 items-start`) con densidad compacta (`py-2.5 sm:py-3`), número correlativo `01` al `30` atenuado (`text-white/40`), código de país `[XX]` y botonera interactiva (`[ SPOTIFY ]`, `[ SOUNDCLOUD ]`, `[ IG ]`, `[ RA ]`, `[ BC ]`) con `whitespace-nowrap`.
3. **Galería Media Archive & Registro Audiovisual (Paso 2/2 - Capa 1 Presentación)**:
   - Encabezado de bloque Media: `// REGISTRO & MEMORIA // ARCHIVO AUDIOVISUAL` y título `REGISTRO AUDIOVISUAL & SHOWCASES` (H2 semántico).
   - Subtítulo curatorial: `"Documentación fotográfica y capturas en vivo de nuestras residencias, almacenes y sesiones de club."`
   - Filtros de tipo de contenido: `[ TODOS ]`, `[ FOTOGRAFÍA ]`, `[ VIDEO ]`.
   - Grilla responsiva de tarjetas multimedia con estilo brutalista táctil, badges de ubicación `[ CIUDAD, PAÍS ]`, fecha, caption descriptivo, y reproductor/modal interactivo.
4. **Calidad y Semántica**: Un único `<h1>` en la ruta, cero errores de hidratación, 100% tipado estricto en TypeScript y suites de prueba unitaria en Vitest.

## What gaps exist today
- La sección `/archivo` cuenta con el Roster de 30 artistas (Paso 1/2), pero aún no integra la sección inferior de Media Archive & Registro Audiovisual (Paso 2/2).
- Se requiere tipar y validar las entradas multimedia en la capa de datos de infraestructura (`MediaArchiveItem`).
- Se requieren pruebas unitarias TDD en `archive-data.test.ts` que validen la integridad de los ítems de Media Archive y la jerarquía de títulos H2.

## What questions remain open
- Ninguna pregunta bloqueante: el esquema de entidades, copys, ítems multimedia y estilos brutalistas táctiles están completamente definidos.

