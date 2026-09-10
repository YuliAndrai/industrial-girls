#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
ROOT_DIR="${ROOT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
STATE_FILE="${ROOT_DIR}/.agents/active_task_state.json"
HOOKS_FILE="${ROOT_DIR}/.agents/hooks.json"
if [[ ! -f "${HOOKS_FILE}" && -f "${REPO_ROOT}/.agents/hooks.json" ]]; then
  HOOKS_FILE="${REPO_ROOT}/.agents/hooks.json"
fi

echo "== Task Lifecycle & Idempotency Check =="

if [[ ! -f "${HOOKS_FILE}" ]]; then
  echo "❌ .agents/hooks.json not found."
  exit 1
fi

echo "✓ Declarative hooks configuration present (.agents/hooks.json)"

CURRENT_BRANCH="$(git branch --show-current 2>/dev/null || true)"
committed_changed_files=""
if [[ "${CURRENT_BRANCH}" != "develop" ]]; then
  committed_changed_files="$(git diff --name-only "origin/develop...HEAD" 2>/dev/null || git diff --name-only "develop...HEAD" 2>/dev/null || true)"
fi
working_tree_changed_files="$(git diff --name-only HEAD 2>/dev/null || true)"
untracked_changed_files="$(git ls-files --others --exclude-standard 2>/dev/null || true)"

CHANGED_FILES="$(
  {
    printf '%s\n' "${committed_changed_files}"
    printf '%s\n' "${working_tree_changed_files}"
    printf '%s\n' "${untracked_changed_files}"
  } | awk '!seen[$0]++' | grep -v '^$' || true
)"

CODE_CHANGES=""
if [[ -n "${CHANGED_FILES}" ]]; then
  CODE_CHANGES="$(echo "${CHANGED_FILES}" | grep -E '^(app/|components/|lib/|programs/|db/|scripts/|tests/|e2e/)' | grep -E -v '^(scripts/ci/check-task-lifecycle.sh|scripts/task-init.sh|scripts/git-start.sh|.agents/)' || true)"
fi

if [[ -n "${CODE_CHANGES}" ]]; then
  if [[ ! -f "${STATE_FILE}" ]]; then
    echo "❌ ERROR DE GOBERNANZA: Se detectaron cambios en el código pero no se ha encontrado el archivo de estado de la tarea (.agents/active_task_state.json)."
    echo "Debe iniciar la tarea con ./scripts/task-init.sh primero."
    echo "Cambios de código detectados:"
    echo "${CODE_CHANGES}"
    exit 1
  fi

  node -e '
    const fs = require("fs");
    const statePath = process.argv[1];
    try {
      const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
      const allowedPhases = [
        "PHASE_4_HUMAN_DESIGN_APPROVED",
        "PHASE_5_TESTS_RED",
        "PHASE_6_CODE_GREEN",
        "PHASE_7_VALIDATED",
        "PHASE_7_ARCHITECT_GATE_2_VALIDATED",
        "PHASE_8_HUMAN_MERGE_APPROVED"
      ];
      if (!allowedPhases.includes(state.current_phase)) {
        console.error(`❌ ERROR DE GOBERNANZA: La fase actual es "${state.current_phase}".`);
        console.error("No se permite modificar código hasta alcanzar la fase PHASE_4_HUMAN_DESIGN_APPROVED (completar specs y obtener aprobación del humano).");
        process.exit(1);
      }
    } catch (e) {
      console.error("❌ ERROR DE GOBERNANZA: Error al validar el archivo de estado - " + e.message);
      process.exit(1);
    }
  ' "${STATE_FILE}"
fi

# Check dual governing artifact placeholders
FIND_BIN="/usr/bin/find"
if [[ ! -x "$FIND_BIN" ]]; then
  FIND_BIN="find"
fi
FEATURE_DOCS=($("$FIND_BIN" "${ROOT_DIR}/knowledge/features" -maxdepth 2 -name "*.md" ! -name "README.md" ! -name "index.md" 2>/dev/null || true))
PLACEHOLDER_COUNT=0

for doc in "${FEATURE_DOCS[@]:-}"; do
  [[ -z "${doc}" ]] && continue
  if grep -q "<!-- Describir" "${doc}" 2>/dev/null || grep -q "<!-- Cómo se resolverá" "${doc}" 2>/dev/null; then
    echo "⚠️ Placeholder found in governing doc: ${doc}"
    PLACEHOLDER_COUNT=$((PLACEHOLDER_COUNT + 1))
  fi
done

if [[ "${PLACEHOLDER_COUNT}" -gt 0 ]]; then
  echo "⚠️ Warning: Found ${PLACEHOLDER_COUNT} governing doc(s) with unpopulated placeholders."
else
  echo "✓ Governing dual artifacts populated with 0 placeholders."
fi

# Active task state check
if [[ ! -f "${STATE_FILE}" ]]; then
  echo "❌ ERROR: active_task_state.json not found at ${STATE_FILE}."
  exit 1
fi

node -e '
  const fs = require("fs");
  const statePath = process.argv[1];
  try {
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    if (!state || typeof state !== "object" || !state.current_phase || !state.phases) {
      console.error("❌ ERROR: active_task_state.json is malformed or missing current_phase/phases");
      process.exit(1);
    }
  } catch (e) {
    console.error("❌ ERROR: active_task_state.json is corrupted: " + e.message);
    process.exit(1);
  }
' "${STATE_FILE}"

echo "✓ Active task state tracked (.agents/active_task_state.json)"
echo "Task Lifecycle & Idempotency Check Passed."
