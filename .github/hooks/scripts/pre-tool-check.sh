#!/usr/bin/env bash
# Copilot Hook: preToolUse
# Runs before the agent executes any tool (file edit, command, etc.).
# Snapshots files about to be changed and flags test requirements.

set -euo pipefail

HOOK_LOG=".github/hooks/session.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SNAPSHOT_FILE=".github/hooks/.pre-tool-snapshot"

# Read tool context from stdin (JSON with tool name, parameters, etc.)
TOOL_INPUT=$(cat)

echo "[$TIMESTAMP] 🔧 preToolUse triggered" >> "$HOOK_LOG"

# Snapshot current state of src/ files for post-tool comparison
find src -name "*.tsx" -o -name "*.ts" 2>/dev/null | sort > "$SNAPSHOT_FILE" 2>/dev/null || true

# Check if the tool is editing files in src/pages/ or src/components/
if echo "$TOOL_INPUT" | grep -qE "src/(pages|components)/"; then
  echo "📝 Note: You are modifying UI source files."
  echo "   Please ensure corresponding Playwright tests are updated:"
  echo ""

  # Extract file paths from the tool input
  MODIFIED_FILES=$(echo "$TOOL_INPUT" | grep -oE "src/(pages|components)/[A-Za-z]+\.(tsx|ts)" || true)

  for file in $MODIFIED_FILES; do
    PAGE_NAME=$(basename "$file" .tsx | sed 's/Page$//' | tr '[:upper:]' '[:lower:]')
    if [ -f "tests/${PAGE_NAME}.spec.ts" ]; then
      echo "   ✅ Test exists: tests/${PAGE_NAME}.spec.ts"
    else
      echo "   ⚠️  No test found for $file → consider creating tests/${PAGE_NAME}.spec.ts"
    fi
  done

  echo "[$TIMESTAMP] 📝 UI file modification detected in tool input" >> "$HOOK_LOG"
fi
