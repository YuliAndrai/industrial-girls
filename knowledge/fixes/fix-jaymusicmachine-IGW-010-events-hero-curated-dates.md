# Problem Spec: events-hero-curated-dates

## What problem exists
La cabecera y el copy principal de la ruta de eventos (`/eventos`) utilizaban etiquetas y textos orientados a promesas de "Gira Global" (`// GIRA GLOBAL //`, "TEMPORADA EN CURADURÍA // GIRA 2026-2027", "PRÓXIMAS FECHAS — EN PREPARACIÓN"), generando una expectativa desalineada con la identidad real del proyecto como sello underground y curador de noches de club selectivas.

## Why it matters
1. **Identidad y Honestidad Editorial**: Industrial Girls se enfoca en conexiones auténticas entre cabinas, clubs y residencias underground en desarrollo, no en giras comerciales masivas infladas.
2. **Claridad de Marca**: Reflejar un enfoque de curaduría quirúrgica para la pista de baile refuerza la autoridad y credibilidad del sello ante la escena techno internacional.
3. **Conversión del Radar Geográfico**: Alinear el llamado a la acción directamente con "Notificarme de nuevas fechas y preventas exclusivas en mi ciudad" optimiza la captura de datos de asistentes reales interesados en la cultura de club.

## What outcome is expected
1. **Hero Eyebrow & Title**:
   - Top Badge: `// SELECTIVE DATES & CLUB SESSIONS //`
   - H1 Principal: `SHOWCASES & FECHAS SELECCIONADAS` (con tipografía display en mayúsculas, espaciado y acento/glow rojo).
2. **Subtitle & Season Copy**:
   - Descripción: "Conexiones entre cabinas, clubs y residencias underground en desarrollo. Curadurías directas para la pista de baile."
   - Status Badge / Callout secundario: `[ TEMPORADA ACTIVA // PRÓXIMAS CIUDADES EN CONFIRMACIÓN ]`
3. **Data Capture Alignment**:
   - Formulario de captación geográfica alineado con el enfoque "Notificarme de nuevas fechas y preventas exclusivas en mi ciudad", con soporte opcional de teléfono (WhatsApp/Telegram).
4. **Validación Exhaustiva**:
   - Suite de pruebas unitarias y de validación (`pnpm test` y `pnpm validate`) ejecutándose al 100% en verde con 0 errores y 0 warnings.

## What gaps exist today
- El catálogo de infraestructura (`events-catalog.ts`) y la vista (`eventos-view.tsx`) tienen codificados los copies antiguos de "Gira Global".
- El pipeline y formulario de captación geográfica no tenían integrado el campo opcional de teléfono solicitado para alertas de preventa.

## What questions remain open
- Ninguna. Los textos, etiquetas y jerarquía visual están completamente especificados por el equipo de diseño y producto.
