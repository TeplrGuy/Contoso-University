#!/usr/bin/env bash
# Copilot Hook: sessionStart
# Runs at the beginning of every Copilot agent session.
# Verifies test infrastructure and logs session start.

set -euo pipefail

HOOK_LOG=".github/hooks/session.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "[$TIMESTAMP] 🚀 Copilot session started" >> "$HOOK_LOG"

# Check Playwright is installed
if [ ! -f "playwright.config.ts" ]; then
  echo "⚠️  WARNING: playwright.config.ts not found!"
  echo "   Playwright test infrastructure is missing."
  echo "   Run 'npm install -D @playwright/test' and create playwright.config.ts"
  echo "[$TIMESTAMP] ⚠️  Missing playwright.config.ts" >> "$HOOK_LOG"
fi

# Check node_modules exists
if [ ! -d "node_modules" ]; then
  echo "⚠️  WARNING: node_modules/ not found. Run 'npm ci' first."
  echo "[$TIMESTAMP] ⚠️  Missing node_modules" >> "$HOOK_LOG"
fi

# Check test directory exists
if [ ! -d "tests" ]; then
  echo "⚠️  WARNING: tests/ directory not found!"
  echo "   No Playwright tests exist yet. Create tests before modifying UI components."
  echo "[$TIMESTAMP] ⚠️  Missing tests/ directory" >> "$HOOK_LOG"
else
  TEST_COUNT=$(find tests -name "*.spec.ts" 2>/dev/null | wc -l)
  echo "✅ Found $TEST_COUNT Playwright test file(s)"
  echo "[$TIMESTAMP] ✅ Found $TEST_COUNT test files" >> "$HOOK_LOG"
fi

# List pages without corresponding tests
echo ""
echo "📋 Test coverage check:"
for page in src/pages/*.tsx; do
  PAGE_NAME=$(basename "$page" .tsx | sed 's/Page$//' | sed -E 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')
  if [ -f "tests/${PAGE_NAME}.spec.ts" ]; then
    echo "  ✅ $page → tests/${PAGE_NAME}.spec.ts"
  else
    echo "  ❌ $page → NO TEST FILE (tests/${PAGE_NAME}.spec.ts missing)"
    echo "[$TIMESTAMP] ❌ Missing test for $page" >> "$HOOK_LOG"
  fi
done

echo ""
if [ -f ".github/hooks/scripts/load-test-coverage.sh" ]; then
  echo "📈 Load test coverage check:"
  bash .github/hooks/scripts/load-test-coverage.sh || true
  echo ""
fi

echo "🔧 Session ready. Remember: every UI change should include test updates!"
