#!/usr/bin/env bash
# copilot:review — Review a specific file for improvements.
# Usage: npm run copilot:review -- <file>  OR  bash scripts/copilot/review-file.sh <file>

set -euo pipefail

if ! command -v copilot &>/dev/null; then
  echo "❌ GitHub Copilot CLI is not installed."
  echo "   Install it: https://docs.github.com/en/copilot/github-copilot-in-the-cli"
  exit 1
fi

FILE=${1:-""}

if [ -z "$FILE" ]; then
  echo "Usage: bash scripts/copilot/review-file.sh <file-path>"
  echo ""
  echo "Examples:"
  echo "  bash scripts/copilot/review-file.sh src/pages/StudentsPage.tsx"
  echo "  bash scripts/copilot/review-file.sh src/components/Layout.tsx"
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "❌ File not found: $FILE"
  exit 1
fi

echo "🔎 Reviewing: $FILE"
echo "═══════════════════════════════════"
echo ""

copilot -sp "
Review the file '$FILE' in this Contoso University project (React + TypeScript + Vite + Tailwind CSS).

Provide a detailed review covering:

1. **Code Quality** (1-5 stars): TypeScript usage, type safety, clarity
2. **React Patterns**: Component structure, hook usage, performance
3. **Styling**: Tailwind CSS usage, responsiveness, consistency
4. **Accessibility**: ARIA attributes, semantic HTML, keyboard support
5. **Test Coverage**: Does this file have a corresponding Playwright test?

For each issue, provide:
- Line reference
- Current code
- Suggested improvement
- Reason for the change

End with a summary and priority list of changes.
"
