# Problem Spec: route-metadata-seo (IGW-008)

## What problem exists
Actualmente, las 5 páginas maestras de la plataforma (`/`, `/musica`, `/desarrollo-artistico`, `/eventos`, `/comunidad`) están marcadas como `"use client"` a nivel de `page.tsx` y no exportan metadatos de Next.js (`Metadata` API). Esto ocasiona que todas las subpáginas hereden únicamente el título y descripción genéricos del layout raíz, impidiendo títulos de pestaña contextuales, descripciones únicas, etiquetas Open Graph específicas para redes sociales y palabras clave enriquecidas para motores de búsqueda.

## Why it matters
1. **Indexación SEO Segmentada**: Cada una de las 5 secciones representa una vertical de negocio y cultura distinta (Home de plataforma, Catálogo musical/podcasts, Agencia 360, Showcases de eventos y Journal de comunidad). Sin metadata por ruta, los motores de búsqueda no pueden rankear adecuadamente cada vertical.
2. **Previsualización Social (Open Graph & Twitter Cards)**: Al compartir enlaces en Telegram, WhatsApp, Twitter/X o Discord, se requiere que cada página muestre su título, descripción e imagen representativa.
3. **Jerarquía Semántica & Accesibilidad**: Es fundamental garantizar que cada una de las 5 páginas cuente con un único tag `<h1>` en el DOM para la navegación asistida y el rastreo de bots.

## What outcome is expected
1. **Diccionario de Metadatos en Capa 4**: Creación de `apps/web/src/lib/infrastructure/route-metadata.ts` con tipado estricto `Metadata` de Next.js para las 5 rutas maestras.
2. **Exportación de Metadata en App Router**: Conversión de `page.tsx` en Server Components que exportan `metadata: Metadata` desacoplando la interactividad cliente a componentes visuales dedicados.
3. **Validación de Jerarquía Semántica H1**: Verificación de que cada página contiene exactamente un `<h1>` principal sin duplicaciones ni avisos de hidratación.
4. **TDD & Suite de Regresión**: Pruebas unitarias en `apps/web/src/lib/infrastructure/route-metadata.test.ts` validando títulos, descripciones, keywords y tags Open Graph.
5. **Validación Completa**: `pnpm validate` pasando al 100% en verde con 0 errores y working tree limpio.

## What gaps exist today
- Los 5 archivos `page.tsx` son Client Components y carecen de `export const metadata: Metadata`.
- No existe un módulo centralizado en Capa 4 para gobernar los metadatos de las rutas.

## What questions remain open
- Ninguna pregunta abierta; los títulos, descripciones y keywords para las 5 secciones fueron especificados unívocamente por el usuario.
