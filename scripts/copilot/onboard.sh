#!/usr/bin/env bash
# copilot:onboard — Generate an onboarding summary for new contributors.
# Usage: npm run copilot:onboard  OR  bash scripts/copilot/onboard.sh

set -euo pipefail

if ! command -v copilot &>/dev/null; then
  echo "❌ GitHub Copilot CLI is not installed."
  echo "   Install it: https://docs.github.com/en/copilot/github-copilot-in-the-cli"
  exit 1
fi

echo "🎓 Generating Onboarding Guide for Contoso University..."
echo "════════════════════════════════════════════════════════"
echo ""

copilot -sp "
You are generating an onboarding guide for a new developer joining the Contoso University project.

Analyze the repository and produce a comprehensive onboarding document covering:

1. **Project Overview**: What does this application do? Tech stack summary.

2. **Getting Started**:
   - Prerequisites (Node.js version, tools)
   - How to clone, install, and run locally
   - How to run tests
   - How to build for production

3. **Architecture Tour**:
   - Directory structure explained
   - Key files and their purposes
   - Data flow (how data gets from src/data/ to the UI)
   - Routing setup

4. **Development Workflow**:
   - Branch naming conventions
   - How to create a PR
   - CI/CD pipeline overview
   - Code review process

5. **Copilot Integration**:
   - Available Copilot CLI scripts (npm run copilot:*)
   - Agent skills in .github/skills/
   - Hooks in .github/hooks/
   - Agentic workflows

6. **Common Tasks**:
   - How to add a new page
   - How to add a new data model
   - How to write Playwright tests
   - How to update documentation

Format as a well-structured markdown document with clear headings and code examples.
"
