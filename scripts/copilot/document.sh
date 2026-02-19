#!/usr/bin/env bash
# copilot:docs — Auto-generate or update documentation for components.
# Usage: npm run copilot:docs  OR  bash scripts/copilot/document.sh [file]

set -euo pipefail

if ! command -v copilot &>/dev/null; then
  echo "❌ GitHub Copilot CLI is not installed."
  echo "   Install it: https://docs.github.com/en/copilot/github-copilot-in-the-cli"
  exit 1
fi

TARGET=${1:-""}

if [ -n "$TARGET" ]; then
  echo "📝 Generating documentation for: $TARGET"
  echo "═══════════════════════════════════════════"
  copilot -sp "
  Generate comprehensive JSDoc documentation for the file at '$TARGET' in this repository.
  Include:
  - Component/function purpose
  - Props/parameters with types
  - Return values
  - Usage examples
  Output only the documentation comments that should be added to the file.
  "
else
  echo "📝 Generating project documentation summary..."
  echo "═══════════════════════════════════════════════"
  copilot -sp "
  Analyze the Contoso University repository and generate a comprehensive documentation update.

  Review all files in src/ and produce:
  1. **Component Catalog**: List every React component with its purpose, props, and location
  2. **Data Model Reference**: Document all TypeScript interfaces in src/data/
  3. **Route Map**: Document all routes and their corresponding pages
  4. **Missing Documentation**: Identify files that lack JSDoc comments

  Format as markdown suitable for inclusion in project documentation.
  "
fi
