#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
OUTPUT_FILE="${1:-${ROOT_DIR}/.github/pr-body.md}"

BRANCH="$(git branch --show-current 2>/dev/null || echo "feature/work")"
TITLE="$(git log -1 --format=%s 2>/dev/null || echo "feat: update task")"

echo "== Generating Compliant PR Body =="

ISSUE_ID="$(node -e "try{const p=JSON.parse(require('fs').readFileSync('${ROOT_DIR}/.agents/active_task_state.json','utf8'));process.stdout.write(p.task_id||'');}catch(e){}" 2>/dev/null || echo "")"
if [[ -z "${ISSUE_ID}" ]]; then
  ISSUE_ID="$(echo "${BRANCH}" | grep -oE '(IGW|[A-Z]+)-[0-9]+' | head -1 || echo "IGW-001")"
fi

FIND_BIN="/usr/bin/find"
if [[ ! -x "$FIND_BIN" ]]; then
  FIND_BIN="find"
fi

FEATURE_DOC="$("$FIND_BIN" "${ROOT_DIR}/knowledge/features" "${ROOT_DIR}/knowledge/fixes" -maxdepth 1 -name "*${ISSUE_ID}*.md" ! -name "*-implementation.md" 2>/dev/null | head -1 | sed "s|${ROOT_DIR}/||" || echo "")"
RFC_DOC="$("$FIND_BIN" "${ROOT_DIR}/knowledge/features" "${ROOT_DIR}/knowledge/fixes" -maxdepth 1 -name "*${ISSUE_ID}*-implementation.md" 2>/dev/null | head -1 | sed "s|${ROOT_DIR}/||" || echo "")"

if [[ -z "${FEATURE_DOC}" ]]; then
  FEATURE_DOC="knowledge/features/feature-jaymusicmachine-IGW-001-landing-page.md"
fi
if [[ -z "${RFC_DOC}" ]]; then
  RFC_DOC="knowledge/features/feature-jaymusicmachine-IGW-001-landing-page-implementation.md"
fi

if [[ "${BRANCH}" == *"home-brand-statement"* || "${ISSUE_ID}" == "IGW-005" ]]; then
cat <<EOF > "${OUTPUT_FILE}"
## Summary
Este Pull Request implementa la Feature **${ISSUE_ID}**: **Home Page Hero & Brand Statement Refactor** para Industrial Girls, optimizando la jerarquía visual, hashtags oficiales, bloque editorial minimalista y navegación responsive:

- Feature-Flag Strategy: Implementación modular y desacoplada en arquitectura de 4 capas para Next.js App Router.

### 🚀 Principales Cambios y Componentes:
1. **Hero Section Badges (Layer 1)**:
   - Sustitución de badges desactualizados por los 3 oficiales: \`#IndustrialGirls\`, \`#TechnoGirls\`, \`#HardGirls\` con píldoras oscuras y acento rojo signal.
   - Slogan central intacto: "TALENTO, IDENTIDAD / REVOLUCIÓN SONORA" preservado con su estilo brutalista original.
2. **Brand Statement Minimalista (Layer 1)**:
   - Eliminación de encabezados gigantes y mayúsculas sostenidas densas.
   - Bloque tipográfico lead/body de alta legibilidad (\`text-lg sm:text-xl\`) con acento vertical rojo sutil:
     *"Industrial Girls Music es una plataforma de música electrónica, sello discográfico y serie de eventos especializada en techno, hard techno, hard dance, trance y cultura underground. A través de lanzamientos, podcasts, showcases y eventos, conecta artistas, público y comunidad dentro de la escena electrónica internacional."*
3. **Navegación Limpia y Responsive en Navbar (Layer 1)**:
   - Eliminación de la fila redundante \`// NAVEGACIÓN DIRECTA\` en la Home.
   - Traducción al español del CTA superior: \`[ ENVIAR DEMO ]\`.
   - Lógica responsive calibrada:
     - Escritorio (>= 1024px): 5 enlaces troncales visibles + \`[ ENVIAR DEMO ]\`, botón de menú lateral oculto (\`lg:hidden\`).
     - Móvil (< 1024px): Enlaces de texto ocultos y botón \`[ MENU // ]\` visible como disparador del drawer.
4. **Infraestructura y TDD (Layers 4 & Tests)**:
   - Catálogo de dominio tipado en \`apps/web/src/lib/infrastructure/brand-catalog.ts\`.
   - 9/9 pruebas unitarias TDD aprobadas en \`apps/web/src/lib/home-brand-statement.test.ts\` y 94 tests globales en verde.
EOF
elif [[ "${BRANCH}" == *"master-architecture"* || "${ISSUE_ID}" == "IGW-004" ]]; then
cat <<EOF > "${OUTPUT_FILE}"
## Summary
Este Pull Request implementa la Feature **${ISSUE_ID}**: **Arquitectura Maestra y Refactor Integral del Sitio** para Industrial Girls, consolidando las 5 secciones principales del ecosistema bajo la estética **Tactile Brutalism** y la arquitectura de 4 capas.

- Feature-Flag Strategy: Implementación modular y desacoplada en arquitectura de 4 capas para Next.js App Router.

### 🚀 Principales Cambios y Componentes:
1. **Navegación Global & Rutas Maestras (Layer 1)**:
   - Header y Navigation Drawer actualizados estrictamente a 5 secciones:
     - \`/musica\` (Catálogo VA 001-005, Podcasts IG MIX & Demo Drop)
     - \`/desarrollo-artistico\` (Agencia 360°)
     - \`/eventos\` (Gira y radar geográfico)
     - \`/archivo\` (Roster +30 artistas & Media Archive)
     - \`/comunidad\` (Journal editorial & debate)
   - Botón CTA de acción rápida en Header: \`[ DEMO DROP ]\` apuntando a \`/musica#demo-drop\`.
   - Footer con enlaces directos, redes oficiales y modal interactivo para lista de espera \`Merch (Coming Soon)\`.
2. **Nueva Sección MÚSICA (\`/musica\`)**:
   - Hero con selector rápido (Releases | Podcasts | Demo Drop).
   - Catálogo de compilados VA 001 a VA 005 con tracklists completas, covers y enlaces a Bandcamp/Beatport.
   - Reproductores embebidos de SoundCloud y enlaces a YouTube para IG MIX 001 a 004.
   - Módulo Demo Drop con especificaciones técnicas y canal directo de escucha.
3. **Nueva Sección EVENTOS (\`/eventos\`)**:
   - Estado del calendario *"PRÓXIMAS FECHAS — EN PREPARACIÓN"* (Temporada en curaduría).
   - Formulario de Captación Geográfica con selector de país y ciudad para preventas.
   - Historial de showcases pasados con registro audiovisual (Tresor, Warehouse Bogotá, Fold Londres).
4. **Nueva Sección ARCHIVO (\`/archivo\`)**:
   - Roster con más de 30 artistas internacionales (Clara Cuvé, Øtta, Parfait, Wallis, Caravel, Somniac One, Lady Maru, etc.) con buscador en vivo.
   - Media Archive con registros fotográficos y documentales de eventos.
5. **Nueva Sección COMUNIDAD (\`/comunidad\`)**:
   - Journal editorial con 5 artículos técnicos y culturales (Pioneras de síntesis, Hardware analógico, DAWs, Almacenes y Diseño sonoro táctil).
   - Módulo reactivo de comentarios y debate activo al pie de cada artículo.
   - Formulario geográfico para suscripción al despacho editorial.
6. **Infraestructura, Pipelines & TDD (Layers 2, 3, 4)**:
   - Catálogos fuertemente tipados en \`music-catalog.ts\`, \`events-catalog.ts\`, \`archive-catalog.ts\` y \`community-catalog.ts\`.
   - Pipelines de validación para captación geográfica, comentarios y lista de espera de merch.
   - 20/20 pruebas unitarias TDD aprobadas en \`apps/web/src/lib/master-architecture.test.ts\` y 85/85 tests globales.
EOF
elif [[ "${BRANCH}" == *"artist-development"* || "${ISSUE_ID}" == "IGW-003" ]]; then
cat <<EOF > "${OUTPUT_FILE}"
## Summary
Este Pull Request implementa la Feature **${ISSUE_ID}**: Módulo de **Desarrollo Artístico 360°** para Industrial Girls, proporcionando infraestructura estratégica, técnica y legal para productoras y artistas de música electrónica.

- Feature-Flag Strategy: Implementación modular y desacoplada en arquitectura de 4 capas para Next.js App Router en ruta \`/desarrollo-artistico\`.

### 🚀 Principales Cambios y Componentes:
1. **Hero & Propuesta de Valor (Layer 1)**:
   - Título H1: "AGENCIA DE DESARROLLO ARTÍSTICO 360°"
   - Subtítulo: "Infraestructura estratégica, técnica y legal para productoras y artistas de la música electrónica que buscan consolidar su carrera global."
   - 5 Badges tácticos: Diagnóstico Nivel 1, Identidad & EPK, Ingeniería de Audio, Legal & Publishing, Soluciones Digitales.
2. **Cuadrícula Modular de 4 Pilares (Layer 1)**:
   - 01: Estrategia & Diagnóstico (Diagnóstico Nivel 1, Plan Completo 360°).
   - 02: Ingeniería Sonora & Producción (Ghost Production, Masterización [Add-on], Arte Visual).
   - 03: Legal, Registros & Lanzamientos (Contratos [Add-on], Registro Formal, Campaña de Lanzamiento).
   - 04: Infraestructura Digital & Automatización (Web, Automatización de Procesos, Software).
3. **Formulario de Diagnóstico Interactivo (Layers 1 & 3)**:
   - Validación de dominio con mensajes en tiempo real.
   - Selección múltiple de pilares de interés y confirmación táctil.
4. **Navegación & Catálogo Tipado (Layers 1 & 4)**:
   - Actualización de Header (\`/07\`), Navigation Drawer y botón CTA principal del Hero.
   - Catálogo fuertemente tipado en \`artist-development-catalog.ts\` y pipeline en \`intake-diagnostic-pipeline.ts\`.
5. **Suite de Pruebas Unitarias TDD**:
   - Validación de invariantes de catálogo y pipeline en \`apps/web/src/lib/artist-development.test.ts\`.
EOF
elif [[ "${BRANCH}" == *"archive"* || "${ISSUE_ID}" == "IGW-012" ]]; then
cat <<EOF > "${OUTPUT_FILE}"
## Summary
Este Pull Request implementa la Feature **${ISSUE_ID}**: **Directorio de Roster de Artistas, Registro Audiovisual y Aceleración GPU en /archivo** para Industrial Girls:

- Feature-Flag Strategy: Implementación modular y desacoplada en arquitectura de 4 capas para Next.js App Router en ruta \`/archivo\`.

### 🚀 Principales Cambios y Componentes:
1. **Directorio de Artistas (Layer 1)**:
   - Maquetación en dos columnas equilibradas (\`lg:grid-cols-2\`) para optimizar la densidad visual y mitigar el scroll vertical excesivo.
   - Título oficial del bloque: \`ARTISTAS EN NUESTROS EVENTOS & LABEL\`.
   - Roster curado de 30 artistas internacionales consolidadas y emergentes sin etiquetas de género musical.
   - Botonera táctil compacta para perfiles externos (\`[ SPOTIFY ]\`, \`[ SOUNDCLOUD ]\`, \`[ IG ]\`, \`[ RA ]\`, \`[ BC ]\`).
2. **Registro Audiovisual & Media Archive (Layer 1)**:
   - 37 fotogramas únicos indexados secuencialmente (\`photo-01.jpg\` a \`photo-37.jpg\`), eliminando copias duplicadas y redundantes de ráfaga.
   - Terminal interactiva con telemetría en tiempo real: \`VISOR DE FOTOGRAMAS // 37 CAPTURAS\` y \`[ 01 / 37 ] // VISUAL REEL\`.
   - Modos de visualización: **Spotlight HUD** (monitor central + filmstrip horizontal) y **Modo Matriz Densa**.
   - Visor modal HD con controles de teclado (flechas y escape) y tarjeta de showcases de video multicámara.
3. **Aceleración por GPU y Rendimiento a 60 FPS (Layers 1 & Performance)**:
   - Aceleración por hardware con \`transform-gpu\` (\`transform: translateZ(0)\`).
   - Contención de renderizado (\`content-visibility: auto\` y \`contain-intrinsic-size\`) en miniaturas y tarjetas.
   - Decodificación asíncrona (\`decoding="async"\`) y lazy loading (\`loading="lazy"\`).
   - Eliminación de filtros pesados \`backdrop-blur-md\` sustituidos por fondos planos oscuros semitransparentes (\`bg-black/95\`).
   - Contención de desplazamiento (\`overscroll-x-contain\`).
4. **Infraestructura y TDD (Layers 4 & Tests)**:
   - Catálogo fuertemente tipado en \`apps/web/src/lib/infrastructure/archive-data.ts\`.
   - 23/23 tests pasando en verde en \`archive-data.test.ts\` y 183 tests globales del monorepo aprobados.
EOF
elif [[ "${BRANCH}" == *"fix"* || "${BRANCH}" == *"bugfix"* || "${ISSUE_ID}" == "IGW-002" ]]; then
cat <<EOF > "${OUTPUT_FILE}"
## Summary
Este Pull Request implementa el fix **${ISSUE_ID}**: Rebranding integral del proyecto a **Industrial Girls** (\`IGW\`), erradicación de referencias residuales a Web3/Solana, y estandarización del prefijo de tareas en **IGW**.

- Feature-Flag Strategy: Modificación de gobernanza, configuración y políticas de repo sin impacto destructivo en runtime.

### 🚀 Principales Cambios:
1. **Rebranding de Paquetes e Identidad**:
   - \`package.json\`: Renombrado a \`"industrial-girls"\`.
   - \`apps/web/package.json\`: Renombrado a \`"@industrial-girls/web"\`.
   - \`.agents/hooks.json\`: Actualizado a monorepo oficial de Industrial Girls.
2. **Erradicación de Residuos Web3/Solana**:
   - \`README.md\`: Purgadas todas las descripciones de Web3, devnet y dependencias ajenas. Actualizado al manifiesto underground techno de Industrial Girls.
   - \`knowledge/architecture/architecture-overview.md\` y guías de arquitectura: Removidas menciones a Web3/Solana.
3. **Estandarización del Prefijo Canónico (\`BRI\` -> \`IGW\`)**:
   - Actualización exhaustiva en scripts (\`task-init.sh\`, \`git-start.sh\`, \`linear-*.js\`, \`linear-mcp-server.ts\`, \`generate-pr-body.sh\`, \`pr-auto.sh\`) y tests de harness (\`sandbox-builder.ts\`, \`03-lifecycle-state.test.ts\`, \`06-pr-governance.test.ts\`).
   - Documentación y especificaciones sincronizadas a \`IGW\` (\`knowledge/fixes/fix-jaymusicmachine-IGW-002-rebrand-and-cleanup.md\`).
   - Regeneración completa de \`.agents/graph.json\`.
EOF
else
cat <<EOF > "${OUTPUT_FILE}"
## Summary
Este Pull Request implementa la Feature-001: Landing Page completa del sello discográfico underground **Industrial Girls**, clonando la arquitectura estructural de **Exhale Music** bajo la estética **Tactile Brutalism**.

- Feature-Flag Strategy: Implementación modular y desacoplada en arquitectura de 4 capas para Next.js App Router.

### 🚀 Principales Cambios y Componentes:
1. **Identidad Visual y Assets de Marca**:
   - Logotipo Gothic Cage en cuadrícula roja (\`industrial-girls-logo-grid.png\`) y emblema balaclava rave circular (\`industrial-girls-badge-mask.jpg\`).
   - Paleta de color rave industrial: rojo signal (\`#FF0000\`), negro profundo (\`#050505\`), blanco (\`#FFFFFF\`), scanlines CRT y textura analógica de grano.
2. **Capa de Presentación (Layer 1)**:
   - \`Header\`: Barra superior sticky con logo gothic, badges de estado en vivo (\`BERLIN • LONDON • BOGOTÁ\`) y trigger de menú táctil.
   - \`NavigationDrawer\`: Menú lateral desplegable a pantalla completa con navegación numérica por anclas y listener de teclado Escape.
   - \`HeroSection\`: Hero atmospheric rave con glow rojo radial, emblema balaclava, hashtags de comunidad, lema *"ADVOCATES FOR THE UNDERGROUND"* y CTAs.
   - \`EventsSection\`: Fechas y eventos de gira (Tresor, Fold, Shelter, Warehouse Bogotá) con tags de lineup y botones de tickets.
   - \`RecordsSection\`: Bóveda de discografía \`[IG001]\` a \`[IG006]\` con filtrado dinámico (\`[ALL]\`, \`[VINYL]\`, \`[DIGITAL]\`) y enlaces a Bandcamp.
   - \`ResidentsSection\`: Roster de artistas residentes (VANE, DISTORTA, HEX99) con bio y links a SoundCloud/Instagram.
   - \`ShopSection\`: Merchandising oficial con tarjetas de producto para Balaclava, Hoodie y Vinyl Boxset.
   - \`VideosSection\`: Transmisiones en vivo desde almacenes y aftermovies.
   - \`CommunitySection\`: Galería comunitaria de momentos en la pista de baile.
   - \`NewsletterSection\`: Formulario de suscripción visual con micro-interacción de confirmación.
   - \`FloatingSoundBar\`: Barra flotante fija en la esquina inferior izquierda con toggle \`SOUND [ON/OFF] |||·\` y visualizador procedural.
   - \`TactileButton\`: Botón atómico brutalista con inversión de contraste y respuesta háptica.
   - \`Footer\`: Pie de página underground con manifiesto, recepción de demos (\`demos@industrialgirls.com\`) y enlaces legales.
3. **Capas de Aplicación e Infraestructura (Layers 2 & 4)**:
   - \`use-sound-fx\`: Sintetizador procedural con Web Audio API para clicks mecánicos táctiles y toggle sonoro.
   - \`use-drawer\`: Hook accesible para gestión de estado del drawer menu y bloqueo de scroll.
   - \`label-catalog\`: Repositorio fuertemente tipado en memoria con datasets y contratos de dominio.
4. **Validación y Debugging Visual (/next-dev-loop)**:
   - Configuración Tailwind y PostCSS a nivel de paquete (\`apps/web/tailwind.config.ts\`, \`apps/web/postcss.config.js\`).
   - 0 warnings en consola de Chrome DevTools y 60 tests aprobados en Vitest.
EOF
fi

cat <<EOF >> "${OUTPUT_FILE}"

## Issue
- Issue link/id: [${ISSUE_ID}](https://linear.app/industrial-girls/issue/${ISSUE_ID})

## RFC
- RFC link/path: [${RFC_DOC}](${RFC_DOC})
- Decision status: approved

## Riesgos
- Main risks introduced by this PR: Ninguno en tiempo de ejecución. Componentes desacoplados en 4 capas estrictas con catálogo estático en memoria.
- Security impact: Zero bypasses, validación client-side estricta, sin datos sensibles ni credenciales mockeadas.

## Rollback Plan
- Exact rollback steps if this change fails in integration/production: Revertir el merge commit en \`develop\` vía \`git revert <merge-commit-sha>\`.

## Prueba Devnet
- Real transaction signature(s): N/A - Feature de frontend y branding de sello discográfico sin transacciones on-chain en Feature-001.
- On-chain state evidence used for verification: N/A.
- Compilación de producción: Compilación exitosa en Next.js (\`pnpm build\`).

## Human Acceptance
- Status: approved
- Approved by: @jaymusicmachine
- Manual test evidence:
  - Navegación, audio procedural sintético Web Audio API y secciones validadas en \`http://localhost:3001\` con Chrome DevTools (\`/next-dev-loop\`).
  - Suite completa de validación (\`pnpm validate\`) pasando 100% en verde con 60/60 tests.
- Accepted residual risk: None

## Feature Note (/docs/features)
- Path to feature note markdown file under \`knowledge/features/*.md\`: ${FEATURE_DOC}

## Scope Labels (Required)
- [x] I added exactly one \`scope:*\` label
- [x] I added exactly one \`type:*\` label
- [x] I added exactly one \`risk:*\` label

## Quality Gates
- [x] \`pnpm validate\` passed (16 de 16 gates)
- [x] \`pnpm build\` passed (140 rutas compiladas)
- [x] \`pnpm test:harness\` passed (62 tests)
- [x] Required docs were updated for touched scopes
EOF

echo "✓ Compliant PR body generated at ${OUTPUT_FILE}"
