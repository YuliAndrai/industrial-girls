# Problem Spec: root-jsonld-schema (IGW-007)

## What problem exists
Industrial Girls carece actualmente de datos estructurados de Schema.org en su layout raíz (`apps/web/src/app/layout.tsx`). Los motores de búsqueda (Google, Bing, Perplexity) y los rastreadores semánticos no pueden vincular formalmente la plataforma con el Knowledge Graph global de la música electrónica, afectando su indexación semántica, indexación generativa (GEO/LLMO) y la autoridad de marca sobre subgéneros (Techno, Industrial Techno, EBM) y entidades globales de referencia.

## Why it matters
1. **Autoridad Semántica y Knowledge Graph**: Permite a motores de búsqueda y LLMs contextualizar inequívocamente a Industrial Girls como una entidad cultural legítima de la música electrónica underground ("MusicGroup" y "MusicPlatform").
2. **Entidades Globales de Autoridad**: Al relacionar el campo `knowsAbout` con referencias autoritativas de Wikipedia (Charlotte de Witte, Amelie Lens, Nina Kraviz, Peggy Gou, Sara Landry, festivales Awakenings y MUTEK), se establece una red semántica de alta relevancia y confianza temática.
3. **Cero Impacto Visual & Performance Máximo**: La inyección directa en `<head>` mediante JSON-LD estructurado no altera la estética Tactile Brutalism ni añade overhead de ejecución en el hilo principal del navegador.

## What outcome is expected
1. **Infraestructura de Datos Estructurados (Capa 4)**: Creación de `apps/web/src/lib/infrastructure/seo-schema.ts` exportando `ROOT_JSON_LD_SCHEMA` tipado e inmutable.
2. **Inyección en Root Layout (Capa 1)**: Modificación de `apps/web/src/app/layout.tsx` para inyectar `<script type="application/ld+json">` conteniendo el grafo `@graph` con `MusicGroup` y `MusicPlatform`.
3. **Cobertura TDD & Blindaje de Regresión**: Creación de suite de tests en `apps/web/src/lib/infrastructure/seo-schema.test.ts` verificando la integridad del esquema, géneros, entidades Wikipedia, y cobertura geográfica.
4. **Validación Total**: `pnpm validate` pasando al 100% en verde con 0 errores y el working tree completamente limpio.

## What gaps exist today
- El archivo `apps/web/src/app/layout.tsx` solo define metadatos básicos (`title`, `description`, `icons`) pero no posee etiquetas `<head>` con script de datos estructurados `application/ld+json`.
- No existe un módulo en Capa 4 para gobernar las entidades semánticas de SEO.

## What questions remain open
- Ninguna pregunta abierta; los requerimientos de esquema y entidades fueron provistos unívocamente para el Paso 1/3.
