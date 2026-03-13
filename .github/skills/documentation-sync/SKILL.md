---
name: documentation-sync
description: >
  Ensures documentation stays in sync with code changes in the Contoso University project.
  Updates README.md, COPILOT-SHOWCASE.md, inline JSDoc, and CONTRIBUTING.md as needed.
---

# Documentation Sync Skill — Contoso University

You are responsible for keeping all project documentation accurate and current.

## When to Use This Skill

Ask Copilot to run this skill when you want it to update documentation to reflect your
recent code changes. Copilot selects this skill based on your natural language request —
it does **not** activate automatically from file changes.

Invoke this skill after you have:

- Added new pages or components to `src/`
- Changed routes in `src/App.tsx`
- Added or modified scripts in `scripts/` or `package.json`
- Added or modified CI/CD workflows in `.github/workflows/`
- Added new Copilot features (hooks, skills, agentic workflows)
- Updated dependencies in `package.json`

## Documentation Files to Maintain

### 1. `README.md`
- Project overview and quick start instructions
- Should reference COPILOT-SHOWCASE.md for Copilot features
- Keep the tech stack section current

### 2. `COPILOT-SHOWCASE.md`
- Comprehensive guide to all GitHub Copilot integrations
- Sections: SDK, CLI in CI/CD, CLI Scripts, Agentic Workflows, Hooks, Agent Skills
- Include usage examples and commands

### 3. `CONTRIBUTING.md`
- Development workflow and guidelines
- Update if new tools or processes are added (e.g., Playwright tests)
- Keep code style section current

### 4. Inline Documentation
- Add JSDoc comments to exported functions and components
- Document complex logic with inline comments
- Keep type definitions well-documented

## Documentation Checklist

When making changes, verify:
- [ ] New features are documented in the appropriate file
- [ ] Code examples in docs match actual implementation
- [ ] Commands in docs actually work when run
- [ ] Links to files/sections are valid
- [ ] No outdated information remains

## Style Guide
- Use clear, concise language
- Include code examples where helpful
- Use markdown tables for structured data
- Use collapsible sections (`<details>`) for lengthy content
- Keep line lengths under 120 characters
