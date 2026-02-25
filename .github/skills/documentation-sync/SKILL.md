---
name: documentation-sync
description: >
  Ensures documentation stays in sync with code changes in the Contoso University project.
  Activated when source files, configuration, or features are modified. Updates README.md,
  COPILOT-SHOWCASE.md, inline JSDoc, and CONTRIBUTING.md as needed.
---

# Documentation Sync Skill — Contoso University

You are responsible for keeping all project documentation accurate and current whenever code changes are made.

## When to Activate

- New pages or components are added to `src/`
- Routes change in `src/App.tsx`
- New scripts are added to `scripts/` or `package.json`
- CI/CD workflows are added or modified in `.github/workflows/`
- New Copilot features are added (hooks, skills, agentic workflows)
- Dependencies change in `package.json`

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
