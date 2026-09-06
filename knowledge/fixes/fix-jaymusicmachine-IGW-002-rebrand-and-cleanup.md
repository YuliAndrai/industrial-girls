# Problem Spec: rebrand-and-cleanup

## What problem exists
El proyecto aún contenía referencias persistentes al nombre y prefijo de proyecto anterior (`BRIDS` y `BRI-`), así como descripciones obsoletas heredadas de plantillas anteriores que catalogaban erróneamente el monorepo como un proyecto Web3/Solana, cuando en realidad es la plataforma digital oficial y sello discográfico subterráneo **Industrial Girls** (`IGW`).

## Why it matters
1. **Identidad de Marca e Integridad**: Toda la plataforma, metadatos de paquetes npm (`package.json`, `apps/web/package.json`), documentación de gobernanza y scripts deben reflejar de forma fidedigna y consistente la marca **Industrial Girls**.
2. **Eliminación de Confusión Tecnológica**: El proyecto es una aplicación web Next.js 16 con síntesis Web Audio y estética brutalista táctil; mantener referencias a Web3 o Solana en el README o documentación genera confusión arquitectónica y técnica.
3. **Estandarización de Identificadores**: La nomenclatura de tickets, ramas y scripts debe usar canónicamente el prefijo **IGW** (Industrial Girls Web) para evitar que el sistema vuelva a sugerir `BRI`.

## What outcome is expected
1. Sustitución total de `BRIDS` por `Industrial-Girls` / `Industrial Girls` en todos los archivos de configuración, scripts de automatización, guías y políticas.
2. Eliminación de todas las menciones a Web3 y Solana en el `README.md`, guías de arquitectura y políticas de carpetas limpias.
3. Reemplazo de los prefijos y ejemplos `BRI-` por `IGW-` en scripts (`task-init.sh`, `git-start.sh`, `linear-plan-core.js`, `linear-status-core.js`, `linear-mcp-server.ts`, `pr-auto.sh`, `generate-pr-body.sh`), tests y plantillas.
4. Creación de una rama aislada de fix (`fix/jaymusicmachine-IGW-002-rebrand-and-cleanup`) con gobernanza completa y pase limpio de `pnpm validate`.

## What gaps exist today
- Múltiples scripts y validadores esperaban o generaban por defecto el prefijo `BRI-`.
- `README.md` y guías de arquitectura conservaban textos descriptivos de un monorepo starter con Solana/Web3.
- Paquetes npm tenían nombres `@brids/web` y `brids`.

## What questions remain open
- Ninguna. Se acordó que el identificador canónico permanente es `IGW` y el proyecto está enfocado puramente en Next.js y la identidad musical de Industrial Girls.
