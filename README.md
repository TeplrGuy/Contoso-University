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

This project showcases **6 pillars** of the GitHub Copilot ecosystem:

| Feature | Location | Description |
|---------|----------|-------------|
| 🤖 **Copilot SDK** | `src/copilot/` | AI Campus Assistant chatbot with custom tools |
| 🪝 **Copilot Hooks** | `.github/hooks/` | Lifecycle guards enforcing tests & quality |
| 🧠 **Agent Skills** | `.github/skills/` | Reusable skills for testing, docs, and quality |
| 🖥️ **CLI in CI/CD** | `.github/workflows/copilot-review.yml` | AI code review on PRs |
| 📜 **CLI Scripts** | `scripts/copilot/` | Local dev helpers (`copilot:audit`, `copilot:docs`, etc.) |
| ⚙️ **Agentic Workflows** | `.github/workflows/*.md` | CI Doctor, PR Fix, Issue Triage, Release Notes |

👉 **See [COPILOT-SHOWCASE.md](COPILOT-SHOWCASE.md) for the full guide.**

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build**: Vite 7
- **Testing**: Playwright (24 e2e tests)
- **CI/CD**: GitHub Actions → Azure Web Apps
- **Infrastructure**: Terraform (Azure ACR + Web App)
