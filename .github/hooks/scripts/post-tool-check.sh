#!/usr/bin/env bash
# Copilot Hook: postToolUse
# Runs after the agent executes any tool.
# Checks for test coverage gaps on modified files.

set -euo pipefail

HOOK_LOG=".github/hooks/session.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SNAPSHOT_FILE=".github/hooks/.pre-tool-snapshot"

echo "[$TIMESTAMP] ✔️  postToolUse triggered" >> "$HOOK_LOG"

# Compare current src/ files against pre-tool snapshot to detect new/changed files
CURRENT_FILES=$(find src -name "*.tsx" -o -name "*.ts" 2>/dev/null | sort)

if [ -f "$SNAPSHOT_FILE" ]; then
  NEW_FILES=$(comm -13 "$SNAPSHOT_FILE" <(echo "$CURRENT_FILES") 2>/dev/null || true)

  if [ -n "$NEW_FILES" ]; then
    echo "🆕 New source files detected since last tool use:"
    echo "$NEW_FILES" | while read -r file; do
      echo "   • $file"
    done
    echo ""
  fi
fi

# Check test coverage for all pages and components
MISSING_TESTS=0
for page in src/pages/*.tsx; do
  [ -f "$page" ] || continue
  PAGE_NAME=$(basename "$page" .tsx | sed 's/Page$//' | tr '[:upper:]' '[:lower:]')
  if [ ! -f "tests/${PAGE_NAME}.spec.ts" ]; then
    echo "⚠️  Missing test: $page has no tests/${PAGE_NAME}.spec.ts"
    MISSING_TESTS=$((MISSING_TESTS + 1))
  fi
done

if [ "$MISSING_TESTS" -gt 0 ]; then
  echo ""
  echo "🔴 $MISSING_TESTS page(s) without Playwright tests!"
  echo "   Please create test files before completing this task."
  echo "[$TIMESTAMP] 🔴 $MISSING_TESTS pages missing tests" >> "$HOOK_LOG"
else
  echo "✅ All pages have corresponding Playwright test files."
  echo "[$TIMESTAMP] ✅ All pages have tests" >> "$HOOK_LOG"
fi

# Check documentation freshness
if [ -f "COPILOT-SHOWCASE.md" ]; then
  SHOWCASE_AGE=$(( $(date +%s) - $(stat -c %Y "COPILOT-SHOWCASE.md" 2>/dev/null || stat -f %m "COPILOT-SHOWCASE.md" 2>/dev/null || echo 0) ))
  if [ "$SHOWCASE_AGE" -gt 604800 ]; then
    echo "📄 Note: COPILOT-SHOWCASE.md hasn't been updated in over a week."
  fi
fi
