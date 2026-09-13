# Problem Spec: semantic-seo-audit

## What problem exists
El despliegue de las 5 páginas maestras de Industrial Girls (`/`, `/musica`, `/desarrollo-artistico`, `/eventos`, `/comunidad`) requiere una auditoría técnica profunda y un blindaje estricto de HTML semántico, jerarquía de encabezados (`<h1>`), accesibilidad web (`aria-label` en controles interactivos de audio y enlaces externos) y eliminación de metaetiquetas duplicadas en la cabecera `<head>`, para garantizar máxima visibilidad orgánica en buscadores e indexación en motores de IA (ChatGPT, Perplexity, Gemini).

## Why it matters
1. **Autoridad SEO y Consistencia Semántica**: Múltiples etiquetas `<h1>` en una misma página diluyen la relevancia del tópico principal ante los rastreadores de Google y rompen las directrices de indexación semántica HTML5.
2. **Accesibilidad WCAG 2.1 AA**: Los botones táctiles (`[ DEMO DROP ]`, toggle de sonido `FloatingSoundBar`) y los enlaces a plataformas externas (SoundCloud, Bandcamp, Beatport, YouTube, Instagram) deben contar con atributos `aria-label` descriptivos para que usuarios con lectores de pantalla y agentes autónomos comprendan el destino exacto de cada interacción.
3. **Optimización de Snippets en Redes y Crawlers**: La duplicación accidental de etiquetas `<meta name="description">` o `<meta property="og:*">` genera penalizaciones en motores de búsqueda e incongruencias al generar vistas previas de enlaces en mensajería instantánea y redes sociales.

## What outcome is expected
1. **Single H1 Invariant**: Confirmar y blindar mediante tests automatizados que cada una de las 5 páginas maestras contenga exactamente una etiqueta `<h1>` principal en el DOM.
2. **Atributos Accesibles `aria-label`**: Garantizar que todos los botones de acción (`[ DEMO DROP ]`, controles del `FloatingSoundBar`, enlaces externos a SoundCloud, YouTube, Bandcamp y Beatport) incluyan atributos `aria-label` descriptivos.
3. **No Duplicate Meta Tags**: Asegurar que las etiquetas `<meta>` y `<title>` no se dupliquen en el `<head>` de ninguna de las 5 rutas.
4. **Validación Exhaustiva**: `pnpm test` y `pnpm validate` ejecutándose al 100% en verde con 0 errores y 0 warnings.

## What gaps exist today
- Varios botones táctiles y enlaces externos a redes sociales en componentes de pie de página (`footer.tsx`), drawer (`navigation-drawer.tsx`), catálogo (`musica-view.tsx`), residentes (`residents-section.tsx`) y control de sonido (`floating-sound-bar.tsx`) carecen de atributos `aria-label` explícitos.
- Se requiere una suite de tests dedicada a auditar la accesibilidad semántica y la ausencia de duplicados en metadatos para evitar regresiones futuras en CI.

## What questions remain open
- Ninguna pregunta abierta. Las especificaciones de accesibilidad, jerarquía de encabezados y ausencia de metadatos duplicados están completamente definidas.
