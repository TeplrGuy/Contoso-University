# Contoso University — Student Information System

A React + TypeScript + Vite web application for managing university students, courses, and faculty. Built as the **ultimate GitHub Copilot showcase** — demonstrating the Copilot SDK, CLI, Hooks, Agent Skills, and Agentic Workflows.

## Quick Start

```bash
npm install
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Production build
npm test             # Run Playwright e2e tests
npm run lint         # Run ESLint
```

## GitHub Copilot Integrations

This project showcases **8 pillars** of the GitHub Copilot ecosystem:

| Feature | Location | Description |
|---------|----------|-------------|
| 🤖 **Copilot SDK** | `src/copilot/` | AI Campus Assistant chatbot with custom tools |
| 🪝 **Copilot Hooks** | `.github/hooks/` | Lifecycle guards enforcing tests & quality |
| 🧠 **Agent Skills** | `.github/skills/` | Reusable skills for testing, docs, quality, and orchestration |
| 🖥️ **CLI in CI/CD** | `.github/workflows/copilot-review.yml` | AI code review on PRs |
| 📜 **CLI Scripts** | `scripts/copilot/` | Local dev helpers (`copilot:audit`, `copilot:docs`, etc.) |
| ⚙️ **Agentic Workflows** | `.github/workflows/*.md` | CI Doctor, PR Fix, Issue Triage, Release Notes, Productivity Governor |
| 🧪 **Playwright Test Infrastructure** | `tests/`, `playwright.config.ts` | End-to-end test coverage for all pages |
| 🎯 **Repeatable Productivity Kit** | `.github/copilot-instructions.md`, `.github/skills/productivity-orchestrator/`, `.github/pull_request_template.md` | Skill-first guardrails, governance, and approval checklist |

👉 **See [COPILOT-SHOWCASE.md](COPILOT-SHOWCASE.md) for the full guide.**

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build**: Vite 7
- **Testing**: Playwright (24 e2e tests)
- **CI/CD**: GitHub Actions → Azure Web Apps
- **Infrastructure**: Terraform (Azure ACR + Web App)
