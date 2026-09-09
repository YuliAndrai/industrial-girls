# Problem Spec: home-brand-statement

## What problem exists
En la portada principal (`/`), la sección Hero presenta tres desajustes clave respecto a la identidad y estrategia visual de Industrial Girls:
1. **Hashtags Desactualizados**: Los badges superiores actuales (`#INDUSTRIALGIRLS`, `#HARDTECHNO`, `#FUTURESOUNDSOFTECHNO`) no reflejan los 3 identificadores oficiales aprobados por la dirección de marca: `#IndustrialGirls`, `#TechnoGirls` y `#HardGirls`.
2. **Saturación Tipográfica en el Slogan**: El slogan central ("TALENTO, IDENTIDAD" / "REVOLUCIÓN SONORA") compite visualmente en luminosidad y peso con el emblema central del pasamontañas rave (`industrial-girls-badge-mask.jpg`), requiriendo un ajuste de contraste, kerning y legibilidad táctil.
3. **Ausencia del Manifiesto Editorial y Descripción de Plataforma**: Inmediatamente debajo del Hero no existe un bloque editorial formal que comunique la misión cultural del sello como plataforma impulsada por mujeres en la música electrónica underground contemporánea.
4. **Falta de Barra de Exploración Rápida**: Tras el lanzamiento de la arquitectura maestra de 5 secciones, la Home carece de una fila de CTAs directos hacia los módulos troncales (`/musica`, `/desarrollo-artistico`, `/archivo`).

## Why it matters
1. **Posicionamiento y Claridad Cultural**: Define de forma contundente la propuesta de valor y misión de Industrial Girls ante promotores, artistas internacionales y público underground global desde el primer scroll.
2. **Jerarquía Visual Brutalista y Armonía**: Garantiza que el emblema del pasamontañas permanezca como elemento icónico primario, complementado armónicamente por el slogan y los hashtags.
3. **Conversión y Retención**: Facilita el acceso inmediato a la música publicada, al módulo de agencia artística 360° y al roster histórico de artistas.

## What outcome is expected
1. **Badges Actualizados**:
   - Badge 1: `#IndustrialGirls`
   - Badge 2: `#TechnoGirls`
   - Badge 3: `#HardGirls`
   - Estilo: Píldoras táctiles oscuras con borde y acento sutil rojo signal (`#FF0000`).
2. **Refinamiento Tipográfico del Slogan**:
   - Línea 1: "TALENTO, IDENTIDAD"
   - Línea 2: "REVOLUCIÓN SONORA"
   - Contraste refinado y balance de sombras para preservar la jerarquía sin sobrecargar la pantalla.
3. **Bloque Editorial Brand Statement & Platform Description**:
   - Título H2 / Subtítulo: *"Una plataforma curada que impulsa y visibiliza a mujeres con un sonido consolidado en la escena y la industria de la música electrónica global."*
   - Declaración de Movimiento (2 párrafos destacados con tipografía editorial de alta legibilidad):
     - Párrafo 1: *"Industrial Girls Music es un sello y plataforma cultural impulsada por mujeres que reúne artistas consolidadas y experimentales en los territorios más intensos, crudos y desafiantes de la música electrónica contemporánea."*
     - Párrafo 2: *"A través de lanzamientos, eventos y colaboraciones curadas, enlazamos escenas underground, festivales de avanzada y la cultura electrónica internacional, dando espacio a artistas que crean desde el sonido, la verdad artística y la experiencia real. Con raíces en Colombia y presencia global, nos afirmamos como un movimiento construido desde la intensidad, la experimentación y una visión creativa sin concesiones."*
4. **Quick Exploration CTA Bar**:
   - Enlaces táctiles brutalistas:
     - `[ Explorar Música ]` ➔ `/musica`
     - `[ Desarrollo Artístico ]` ➔ `/desarrollo-artistico`
     - `[ Archivo & Artistas ]` ➔ `/archivo`
5. **Calidad y Verificación**:
   - Suite completa de pruebas unitarias TDD passing.
   - Cumplimiento de arquitectura de 4 capas y pnpm validate limpio.

## What gaps exist today
- `HeroSection` (`apps/web/src/components/landing/hero-section.tsx`) mantiene los badges y textos originales de la landing inicial sin los nuevos textos de marca ni la barra de exploración.

## What questions remain open
- Ninguna pregunta abierta pendiente. Los requerimientos de copy, tipografía, enlaces y jerarquía visual fueron definidos unívocamente por el usuario.
