# Problem Spec: community-journal-page

## What problem exists
La página actual de Comunidad (`/comunidad`) cuenta con una versión preliminar que no satisface la visión integral requerida para el Journal y la plataforma cultural de Industrial Girls:
1. **Hero & Declaración Incompletos**: El Hero no implementa el título display Display H1 *"JOURNAL & COMUNIDAD DE INGENIERÍA SONORA"*, su subtítulo sobre investigación histórica y vanguardia femenina, ni los 5 badges de filtrado temático (`#PionerasDelVoltaje`, `#CircuitDesign`, `#DSP`, `#SoftwareDAW`, `#SoundDesign`).
2. **Artículos de Investigación Desalineados**: El catálogo no incluye las 5 investigaciones detalladas con sus imágenes históricas de Wikimedia Commons (Delia Derbyshire, Suzanne Ciani, Hedy Lamarr, Laurie Spiegel, Eurorack modular), el tratamiento visual de escala de grises con transición a color al hover (`grayscale hover:grayscale-0 transition-all duration-300`), las preguntas detonadoras de debate ni el botón de lectura `[ Leer Artículo & Debatir ]`.
3. **Consola de Discusión Incompleta**: El sistema de comentarios no sigue la estética de consola de comandos industrial (`// FORO TÉCNICO & PARTICIPACIÓN ABIERTA`), carece de los campos específicos requeridos (Alias, Correo no publicado, Selector de Rol [Productora / Live Act, DJ / Selector, Ingeniera de Sonido, Melómana / Asistente], Aporte Técnico) y no modela respuestas anidadas.
4. **Captura Geográfica de Comunidad**: El bloque de suscripción final no implementa el título *"RED COMUNITARIA INDUSTRIAL GIRLS"*, su subtítulo sobre convocatorias y drops regionales, ni el botón de acción `[ CONECTAR CON LA COMUNIDAD ]`.

## Why it matters
1. **Rigor Histórico y Cultural**: Posiciona a Industrial Girls como referente editorial y de pensamiento crítico en ingeniería sonora y música electrónica de vanguardia impulsada por mujeres.
2. **Engagement & Participación de la Escena**: La consola de discusión técnica invita a productoras, DJs e ingenieras a debatir sobre hardware, DSP, síntesis y acústica industrial.
3. **Descentralización y Alcance Global**: La captación geográfica permite mapear la comunidad internacional para futuros showcases, conversatorios y lanzamientos del sello.

## What outcome is expected
1. **Hero de Alto Impacto**:
   - Título H1: *"JOURNAL & COMUNIDAD DE INGENIERÍA SONORA"*
   - Subtítulo: *"Investigación histórica, arquitectura de hardware, desarrollo de software y debate crítico sobre la vanguardia femenina en la música electrónica."*
   - Badges temáticos: `#PionerasDelVoltaje` · `#CircuitDesign` · `#DSP` · `#SoftwareDAW` · `#SoundDesign`
2. **5 Tarjetas de Artículos con Imágenes de Archivo**:
   - Artículo 1: Delia Derbyshire & Daphne Oram (Oramics, BBC Radiophonic Workshop, Éliane Radigue ARP 2500).
   - Artículo 2: Suzanne Ciani & Wendy Carlos (Moog, Buchla 200, modulación en anillo, low-pass gates).
   - Artículo 3: Hedy Lamarr (Salto de frecuencia, espectro ensanchado, sincronización digital de audio).
   - Artículo 4: Laurie Spiegel & Ada Lovelace (Bell Labs GROOVE, Music Mouse, disco de oro Voyager).
   - Artículo 5: Arquitectura del Hard Techno (Saturación, wavefolding, hard clipping a 150+ BPM, Eurorack).
   - Tratamiento de imagen: Grises por defecto, color/contraste al hover (`grayscale hover:grayscale-0 transition-all duration-300`).
   - Botón interactivo: `[ Leer Artículo & Debatir ]`.
3. **Consola Interactiva de Discusión**:
   - Encabezado: `// FORO TÉCNICO & PARTICIPACIÓN ABIERTA`
   - Campos: Nombre/Alias, Correo electrónico (con nota 'No será publicado'), Rol en la escena (dropdown con 4 opciones), Aporte técnico/reflexión (textarea).
   - Botón de envío: `[ ENVIAR APORTE AL FORO ]`.
   - Feed de comentarios con respuestas anidadas simuladas.
4. **Suscripción de Red Comunitaria Geográfica**:
   - Título: *"RED COMUNITARIA INDUSTRIAL GIRLS"*
   - Subtítulo: *"Recibe invitaciones a conversatorios, convocatorias de producción, drops de artículos y anuncios prioritarios de tu región."*
   - Campos: Correo Electrónico, Nombre / Alias, País (selector), Ciudad.
   - Botón CTA: `[ CONECTAR CON LA COMUNIDAD ]`.
5. **Calidad y Gobernanza**:
   - 100% tests unitarios TDD pasando en verde.
   - Cumplimiento estricto de arquitectura de 4 capas.
   - `pnpm validate` y `pnpm build` con 0 errores.

## What gaps exist today
- El catálogo `community-catalog.ts` requiere la redefinición completa de los 5 artículos con sus imágenes de Wikimedia Commons, preguntas detonadoras y nuevos campos de metadatos.
- La página `/comunidad` requiere componentes desacoplados para Hero, Card Grid, Discussion Console y Subscription Module.

## What questions remain open
- Ninguna pregunta abierta; los requerimientos técnicos y de diseño fueron definidos unívocamente por el usuario.
