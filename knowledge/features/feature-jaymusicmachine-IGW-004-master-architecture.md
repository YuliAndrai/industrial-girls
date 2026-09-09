# Problem Spec: Master Architecture Implementation (Full Site Refactor)

## What problem exists
Actualmente la plataforma de Industrial Girls cuenta con la página principal (Landing) y el módulo recientemente lanzado de Desarrollo Artístico (/desarrollo-artistico). Sin embargo, la navegación global y el ecosistema completo del sello discográfico carecen de una arquitectura integral de rutas maestras. Los pilares esenciales de la marca (Catálogo Musical, Calendario y Giras de Eventos, Archivo Histórico de más de 30 artistas residentes e invitadas, y la Revista Editorial/Comunidad) no cuentan con sus páginas dedicadas ni con sus modelos de datos desacoplados. Adicionalmente, el Footer y el Navbar contienen enlaces divergentes que requieren reestructuración inmediata hacia 5 secciones maestras unificadas con un botón de acción rápida ('Demo Drop') y un punto de captación de lista de espera para Merch.

## Why it matters
Industrial Girls no es únicamente un sello discográfico, sino una plataforma cultural y de infraestructura integral para la música electrónica underground. Contar con una arquitectura de navegación clara de 5 rutas maestras permite a artistas, promotores, bookers y oyentes navegar con fluidez entre lanzamientos (VA 001-005), sesiones de podcast (IG MIX), avisos de giras con captura de datos geográficos para venta de entradas, el roster histórico de talentos internacionales, y la discusión comunitaria en artículos de tecnología y cultura rave.

## What outcome is expected
1. **Navegación Global Unificada**:
   - Header y Navigation Drawer reestructurados exclusivamente a 5 rutas maestras:
     1. /musica
     2. /desarrollo-artistico
     3. /eventos
     4. /archivo
     5. /comunidad
   - CTA táctico en extremo derecho: 'Demo Drop' (apuntando a /musica#demo-drop).
2. **Nueva Ruta /musica**:
   - Hero con selector rápido (Releases | Podcasts | Demo Drop).
   - Bóveda de compilados VA 001 al VA 005 con tracklists y links a Bandcamp/Beatport.
   - Reproductores embebidos de SoundCloud y YouTube para IG MIX 001 a IG MIX 004.
   - Callout táctil informativo para recepción de pistas privadas (Demo Drop).
3. **Nueva Ruta /eventos**:
   - Bloque de estado 'PRÓXIMAS FECHAS — EN PREPARACIÓN' (temporada en curaduría).
   - Formulario de captación geográfica (Email, Alias, País con selector, Ciudad) para preventas.
   - Módulo Social Proof con historial de showcases y video embed.
4. **Nueva Ruta /archivo**:
   - Roster tipográfico y visual con más de 30 artistas internacionales.
   - Media archive con galería fotográfica de eventos y videos documentales.
5. **Nueva Ruta /comunidad**:
   - Journal editorial con 5 artículos de cultura sonora y síntesis musical.
   - Sistema de interacción y comentarios al pie de los artículos.
   - Formulario de registro y suscripción geográfica.
6. **Footer Global Reestructurado**:
   - 5 enlaces maestros y redes oficiales (SoundCloud, YouTube, Instagram).
   - Modal táctil 'Merch (Coming Soon)' para lista de espera prioritaria.

## What gaps exist today
- No existían las páginas de ruta /musica, /eventos, /archivo ni /comunidad.
- Los catálogos estáticos en capa 4 para lanzamientos VA, mixes de podcast, lista de 30+ artistas, artículos editoriales y países estaban ausentes.
- No existían pipelines de validación para captación geográfica, comentarios de artículos ni lista de espera de merchandising.
- El Header y Drawer mantenían anclas residuales previas al refactor.

## What questions remain open
- Ninguna pregunta bloqueante. Todos los requerimientos fueron clasificados formalmente entre [FEAT] y [FIX] siguiendo la estética Tactile Brutalism y la arquitectura de 4 capas de Next.js App Router.
