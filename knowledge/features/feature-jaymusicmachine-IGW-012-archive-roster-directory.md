# Problem Spec: archive-roster-directory

## What problem exists
La sección `/archivo` en `apps/web/src/app/archivo` requiere una arquitectura de datos desacoplada y una experiencia visual de alto impacto brutalista y tipográfico enfocada exclusivamente en el Roster de Artistas de la escena underground (DJs, productoras y directos). Actualmente, la información de artistas no está tipada con soporte de código de país ISO (`countryCode`), enlaces directos estandarizados (SoundCloud / Resident Advisor / Instagram) ni una grilla tipográfica interactiva con estados hover reactivos de acento rojo y visualización de banderas/metadatos sónicos.

## Why it matters
Industrial Girls se posiciona como una plataforma curatorial de élite para artistas mujeres e identidades disidentes en el Hard Techno, Industrial, EBM y modular live. Contar con un directorio tipográfico de alto impacto en `/archivo` proporciona credibilidad internacional, visibilidad de los vínculos territoriales (Alemania, Francia, Portugal, Países Bajos, Italia, Brasil, etc.) y una experiencia de navegación inmediata, accesible y reactiva alineada con los estándares de diseño del proyecto.

## What outcome is expected
1. **Desacople de Datos (Capa 4 - Infraestructura)**: Creación de `apps/web/src/lib/infrastructure/archive-data.ts` con la interfaz tipada `RosterArtistEntity` y la constante `ARTISTS_ROSTER` que contiene a las 8 artistas clave de la escena (Clara Cuvé, Øtta, Parfait, Wallis, Caravel, Somniac One, Lady Maru, Juliana Yamasaki) con campos normalizados (`id`, `name`, `country`, `countryCode`, `subgenre`, enlaces directos).
2. **Directorio Tipográfico (Capa 1 - Presentación)**: Implementación de la vista `/archivo` con la jerarquía semántica:
   - Eyebrow: `// HISTORIAL & REGISTRO // ARCHIVO GLOBAL`
   - H1: `ROSTER DE ARTISTAS & MEMORIA VISUAL`
   - Subtítulo: `"Registro de DJs, productoras y directos que han formado parte del circuito sonoro de Industrial Girls."`
   - Grilla tipográfica en monospace/display con micro-interacciones hover (revelación de código de país/bandera y estilo sonoro con glow sutil rojo de marca).
3. **Calidad y Semántica**: Un único `<h1>`, cero errores de hidratación, 100% tipado estricto en TypeScript y suites de prueba unitaria en Vitest.

## What gaps exist today
- No existe el archivo de infraestructura `apps/web/src/lib/infrastructure/archive-data.ts` con la estructura canónica requerida.
- La página `/archivo` actual no cuenta con la estructura visual, copys de hero ni interacciones hover especificadas para esta primera fase del roster.
- No existen pruebas de Vitest que verifiquen la integridad estructural de `ARTISTS_ROSTER`.

## What questions remain open
- Ninguna pregunta bloqueante: el esquema de entidades, copys, artistas iniciales y estilos tipográficos están completamente definidos en el brief técnico.

