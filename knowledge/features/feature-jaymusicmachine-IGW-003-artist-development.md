# Problem Spec: artist-development

## What problem exists
El sello discográfico de techno industrial **Industrial Girls** cuenta con una landing page principal enfocada en eventos, catálogo discográfico (records), roster de residentes y merchandising, pero carece de un módulo dedicado y formal para su vertical de **Agencia de Desarrollo Artístico 360°** accesible en la ruta `/desarrollo-artistico`. Actualmente no existe una página estructurada donde productoras y DJs de la escena electrónica puedan conocer la oferta de servicios de aceleración y desarrollo integral (Estrategia, Ingeniería Sonora, Legal y Soluciones Digitales), ni un formulario interactivo de intake para solicitar un diagnóstico artístico inicial. Asimismo, el menú de navegación principal y el drawer lateral no tienen enlazada esta sección ni existe una consistencia de rutas absolutas entre vistas.

## Why it matters
Consolidar una carrera profesional global en la música electrónica underground requiere más que publicar tracks esporádicos; requiere una infraestructura técnica, legal, estratégica y de posicionamiento integral. Industrial Girls necesita una superficie digital de alta conversión con estética **Tactile Brutalism** que proyecte autoridad en la industria, comunique con claridad los 4 pilares de desarrollo artístico del sello y capte leads calificados de artistas mediante un diagnóstico artístico formal Nivel 1.

## What outcome is expected
1. **Ruta y Navegación [FIX]**:
   - Nueva ruta Next.js 16 App Router en `apps/web/src/app/desarrollo-artistico/page.tsx`.
   - Menú de navegación superior (`Header`) con enlace directo a `/desarrollo-artistico` ("Desarrollo Artístico") y normalización de anclas a rutas absolutas (`/#events`, `/#records`, etc.).
   - Menú lateral (`NavigationDrawer`) con nuevo ítem `/07` hacia `/desarrollo-artistico` ("DESARROLLO ARTÍSTICO").
   - Botón secundario del Hero principal (`[ AGENCIA DE DIRECCIÓN CREATIVA ]`) apuntando directamente a `/desarrollo-artistico`.
2. **Hero & Value Proposition [FEAT]**:
   - Encabezado H1 brutalista con glow rojo: *"AGENCIA DE DESARROLLO ARTÍSTICO 360°"*.
   - Subtítulo oficial: *"Infraestructura estratégica, técnica y legal para productoras y artistas de la música electrónica que buscan consolidar su carrera global."*
   - Badges clave: `"Diagnóstico Nivel 1"`, `"Identidad & EPK"`, `"Ingeniería de Audio"`, `"Legal & Publishing"`, `"Soluciones Digitales"`.
3. **Modular Services Grid (4 Pilares) [FEAT]**:
   - Tarjeta 01 (ESTRATEGIA & DIAGNÓSTICO): Diagnóstico Artístico Nivel 1 y Plan Completo 360° (business plan, redes, branding, EPK internacional).
   - Tarjeta 02 (INGENIERÍA SONORA & PRODUCCIÓN): Ghost Production sin cesión de derechos, Masterización de Pistas (Add-on) y Diseño de Arte Visual.
   - Tarjeta 03 (LEGAL, REGISTROS & LANZAMIENTOS): Contratos & Derechos de Autor (Add-on), Legalización/registro de tracks y Campaña de Lanzamiento.
   - Tarjeta 04 (INFRAESTRUCTURA DIGITAL & AUTOMATIZACIÓN): Diseño y desarrollo web para DJs/Productoras, Automatización de flujos y Migración/configuración de software musical.
4. **Intake & Diagnostic Form (CTA) [FEAT]**:
   - Formulario titulado *"SOLICITAR DIAGNÓSTICO ARTÍSTICO"*.
   - Campos: Nombre / Alias artístico, Correo electrónico, País / Ciudad, Enlaces de música (SoundCloud / Spotify), Servicios de interés (Checkboxes 4 áreas), Mensaje / Objetivos.
   - Botón táctil brutalista: *"Agendar Evaluación Inicial"* con micro-interacción y estado de confirmación.
5. **Arquitectura y Calidad**:
   - Capa de dominio/pipelines (`intake-diagnostic-pipeline.ts`) y capa de infraestructura (`artist-development-catalog.ts`).
   - Suite de pruebas unitarias TDD en Vitest (`apps/web/src/lib/artist-development.test.ts`).
   - 100% de cumplimiento en `pnpm validate` y responsive design (320px, 375px, 768px, 1024px).

## What gaps exist today
- No existe el archivo de ruta `apps/web/src/app/desarrollo-artistico/page.tsx`.
- No existen los componentes `artist-dev-hero.tsx`, `services-grid.tsx` ni `intake-diagnostic-form.tsx`.
- No existe el catálogo tipado en memoria para los servicios de desarrollo artístico ni el pipeline de validación del intake form.
- El header y el drawer no enlazan la nueva ruta.

## What questions remain open
- Ninguna pregunta bloqueante abierta. Todos los requerimientos de contenido, pilares, validación y estética han sido acordados y aprobados en el Solution Plan.
