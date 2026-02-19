#!/usr/bin/env bash
# Copilot Hook: sessionEnd
# Runs when a Copilot agent session completes.
# Validates tests, runs lint, and generates a session summary.

set -euo pipefail

HOOK_LOG=".github/hooks/session.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo ""
echo "═══════════════════════════════════════════"
echo "  📊 Copilot Session End — Quality Report  "
echo "═══════════════════════════════════════════"
echo ""

# 1. Verify all Playwright tests can be parsed
echo "🧪 Verifying Playwright tests..."
if command -v npx &>/dev/null && [ -f "playwright.config.ts" ]; then
  if npx playwright test --list 2>/dev/null; then
    echo "  ✅ All Playwright tests parse successfully"
    echo "[$TIMESTAMP] ✅ Playwright test --list passed" >> "$HOOK_LOG"
  else
    echo "  ❌ Playwright test listing failed! Some tests may have syntax errors."
    echo "[$TIMESTAMP] ❌ Playwright test --list failed" >> "$HOOK_LOG"
  fi
else
  echo "  ⚠️  Playwright not configured — skipping test validation"
  echo "[$TIMESTAMP] ⚠️  Playwright not available" >> "$HOOK_LOG"
fi

echo ""

# 2. Run ESLint
echo "🔍 Running linter..."
if command -v npx &>/dev/null && [ -f "eslint.config.js" ]; then
  if npx eslint . --quiet 2>/dev/null; then
    echo "  ✅ ESLint passed — no errors"
    echo "[$TIMESTAMP] ✅ ESLint passed" >> "$HOOK_LOG"
  else
    echo "  ⚠️  ESLint found issues (run 'npm run lint' for details)"
    echo "[$TIMESTAMP] ⚠️  ESLint issues found" >> "$HOOK_LOG"
  fi
else
  echo "  ⚠️  ESLint not configured — skipping"
fi

echo ""

# 3. Test coverage summary
echo "📋 Test Coverage Summary:"
TOTAL_PAGES=0
TESTED_PAGES=0
for page in src/pages/*.tsx; do
  [ -f "$page" ] || continue
  TOTAL_PAGES=$((TOTAL_PAGES + 1))
  PAGE_NAME=$(basename "$page" .tsx | sed 's/Page$//' | tr '[:upper:]' '[:lower:]')
  if [ -f "tests/${PAGE_NAME}.spec.ts" ]; then
    TESTED_PAGES=$((TESTED_PAGES + 1))
    echo "  ✅ $(basename "$page") → tests/${PAGE_NAME}.spec.ts"
  else
    echo "  ❌ $(basename "$page") → NO TEST"
  fi
done
echo ""
echo "  Coverage: $TESTED_PAGES/$TOTAL_PAGES pages have Playwright tests"

echo ""

# 4. Files changed in this session (via git)
echo "📁 Files changed in this session:"
if command -v git &>/dev/null; then
  CHANGED=$(git diff --name-only 2>/dev/null || true)
  STAGED=$(git diff --cached --name-only 2>/dev/null || true)
  ALL_CHANGED=$(echo -e "$CHANGED\n$STAGED" | sort -u | grep -v '^$' || true)

  if [ -n "$ALL_CHANGED" ]; then
    SRC_CHANGED=$(echo "$ALL_CHANGED" | grep "^src/" || true)
    TEST_CHANGED=$(echo "$ALL_CHANGED" | grep "^tests/" || true)

    echo "  Source files: $(echo "$SRC_CHANGED" | grep -c '.' || echo 0)"
    echo "  Test files:   $(echo "$TEST_CHANGED" | grep -c '.' || echo 0)"
    echo "  Other files:  $(echo "$ALL_CHANGED" | grep -v "^src/" | grep -v "^tests/" | grep -c '.' || echo 0)"

    if [ -n "$SRC_CHANGED" ] && [ -z "$TEST_CHANGED" ]; then
      echo ""
      echo "  ⚠️  Source files were changed but no test files were updated!"
      echo "  Consider adding or updating Playwright tests."
    fi
  else
    echo "  No files changed"
  fi
fi

echo ""
echo "[$TIMESTAMP] 📊 Session ended" >> "$HOOK_LOG"
echo "═══════════════════════════════════════════"

# Cleanup temp files
rm -f .github/hooks/.pre-tool-snapshot
