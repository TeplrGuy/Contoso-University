#!/usr/bin/env bash
# copilot:audit — Run an AI-powered code quality audit across the repository.
# Usage: npm run copilot:audit  OR  bash scripts/copilot/audit.sh

set -euo pipefail

# Prerequisite check
if ! command -v copilot &>/dev/null; then
  echo "❌ GitHub Copilot CLI is not installed."
  echo "   Install it: https://docs.github.com/en/copilot/github-copilot-in-the-cli"
  exit 1
fi

echo "🔍 Running AI Code Quality Audit..."
echo "═══════════════════════════════════"
echo ""

copilot -sp "
You are auditing the Contoso University repository — a React + TypeScript + Vite + Tailwind CSS web application.

Perform a comprehensive code quality audit covering:

1. **TypeScript Quality**: Check for any types, missing type annotations, type safety issues
2. **React Patterns**: Verify functional components, proper hook usage, no anti-patterns
3. **Security**: Look for XSS risks, unsafe innerHTML, exposed secrets, hardcoded values
4. **Performance**: Identify unnecessary re-renders, missing memoization, large bundles
5. **Accessibility**: Check for missing aria labels, semantic HTML, keyboard navigation
6. **Dead Code**: Find unused imports, unreachable code, unused variables
7. **Test Coverage**: Identify components/pages without corresponding Playwright tests

For each issue found, provide:
- File path and line number
- Severity (🔴 Critical, 🟡 Warning, 🟢 Suggestion)
- Specific fix recommendation

End with an overall health score (A-F) and top 3 priority fixes.
"
