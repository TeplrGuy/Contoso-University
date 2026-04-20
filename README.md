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

## Application Insights Telemetry

The app ships browser-side telemetry via the [Azure Application Insights JavaScript SDK](https://learn.microsoft.com/azure/azure-monitor/app/javascript).

### Local development (telemetry off by default)

1. Copy `.env.example` → `.env.local`
2. Paste your connection string from **Azure portal → Application Insights → Overview → Connection String**
3. Restart `npm run dev`

```env
VITE_APPINSIGHTS_CONNECTION_STRING=InstrumentationKey=...;IngestionEndpoint=...
```

Omitting or leaving the variable blank disables the SDK entirely — no errors, no network calls.

### Azure deployment

Add `VITE_APPINSIGHTS_CONNECTION_STRING` as an **App Service Application Setting** (or a GitHub Actions secret → `env:` in your build step). Vite bakes the value in at build time.

### What is tracked

| Signal | Detail |
|--------|--------|
| Page views | Auto-tracked by the SDK on every React Router navigation (`enableAutoRouteTracking: true`) |
| Page visit time | Time spent on each page |
| AJAX dependency calls | Outbound fetch/XHR requests |
| React render errors | Caught by `AppInsightsErrorBoundary` and reported via `trackException` with component stack |
| Other JS exceptions | Auto-collected by the SDK for uncaught errors outside the React tree |

---

A production-ready Student Information System demonstrating modern cloud-native development practices with React, TypeScript, Azure, and a fully automated GitHub Actions CI/CD pipeline — including an **Agentic Workflow** powered by GitHub Copilot.

## Table of Contents

- [Overview](#overview)
- [Application Architecture](#application-architecture)
- [Technology Stack](#technology-stack)
- [Local Development](#local-development)
- [Docker & Containerization](#docker--containerization)
- [Infrastructure Architecture](#infrastructure-architecture)
- [GitHub Actions Architecture](#github-actions-architecture)
  - [CI Pipeline](#ci-pipeline-ciyml)
  - [CD Pipeline](#cd-pipeline-cdyml)
  - [Infrastructure Pipeline](#infrastructure-pipeline-infrayml)
  - [Agentic Workflow](#agentic-workflow)
- [Azure Setup & Bootstrap](#azure-setup--bootstrap)
- [GitHub Variables](#github-variables)
- [Security Model](#security-model)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## Overview

Contoso University is a fictional university student information system used to showcase a complete end-to-end cloud-native application stack. It demonstrates how to:

- Build a **React + TypeScript + Vite** single-page application
- Containerize it with a **multi-stage Docker** build using nginx
- Provision **Azure** infrastructure with **Terraform** (Infrastructure-as-Code)
- Automate the full software delivery lifecycle with **GitHub Actions** (build, test, security scans, deploy)
- Implement **zero-secrets authentication** using OIDC federation (Workload Identity)
- Use **agentic AI workflows** to automate common repository maintenance tasks

---

## Application Architecture

The frontend is a React single-page application (SPA) with client-side routing provided by React Router. All data is currently served from static TypeScript mock-data files.

```
┌─────────────────────────────────────────────────────┐
│                  Browser (SPA)                      │
│                                                     │
│   App.tsx                                           │
│   └── BrowserRouter                                 │
│       └── Routes                                    │
│           ├── /            → Layout → HomePage      │
│           ├── /students    → Layout → StudentsPage  │
│           ├── /courses     → Layout → CoursesPage   │
│           └── /teachers    → Layout → TeachersPage  │
│                                                     │
│   Shared: Layout.tsx (navigation + outlet)          │
│   Data:   src/data/*.ts   (mock data layer)         │
└─────────────────────────────────────────────────────┘
         │
         │ served by
         ▼
┌──────────────────────────┐
│  nginx (Docker container)│
│  SPA fallback to         │
│  index.html for all      │
│  client-side routes      │
└──────────────────────────┘
         │
         │ hosted on
         ▼
┌──────────────────────────┐
│  Azure App Service       │
│  (Linux Web App)         │
│  Pulls image from ACR    │
└──────────────────────────┘
```

### Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Dashboard summary with stats |
| `/students` | StudentsPage | List of enrolled students |
| `/courses` | CoursesPage | Available courses |
| `/teachers` | TeachersPage | Faculty directory |

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI library |
| TypeScript | 5.9 | Type-safe development |
| Vite | 7 | Build tool with HMR |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Lucide React | latest | Icon library |

### Build & Quality
| Tool | Purpose |
|------|---------|
| ESLint | Code linting (React hooks + TypeScript rules) |
| TypeScript compiler | Type checking |
| Vite | Production bundling |

### Cloud & Infrastructure
| Technology | Purpose |
|------------|---------|
| Azure App Service | Web application hosting |
| Azure Container Registry (ACR) | Private Docker image registry |
| Terraform | Infrastructure-as-Code (IaC) provisioning |

### CI/CD & Security
| Tool | Purpose |
|------|---------|
| GitHub Actions | Workflow automation |
| Docker | Multi-stage containerization |
| nginx | Production web server inside container |
| Gitleaks | Secret scanning |
| CodeQL | Static Application Security Testing (SAST) |
| Trivy | Container vulnerability scanning |
| OWASP ZAP | Dynamic Application Security Testing (DAST) |
| npm audit + dependency-review | Software Composition Analysis (SCA) |

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- [npm](https://www.npmjs.com/)

### Getting Started

```bash
# 1. Clone the repository (replace YOUR_USERNAME with your GitHub username or org)
git clone https://github.com/YOUR_USERNAME/Contoso-University.git
cd Contoso-University

# 2. Install dependencies
npm install

# 3. Start the development server (with HMR)
npm run dev
```

The dev server starts at `http://localhost:5173` with Hot Module Replacement enabled.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run lint` | Run ESLint across all source files |
| `npm run preview` | Serve the production build locally |

---

## Docker & Containerization

The application uses a **multi-stage Docker build** to produce a minimal production image.

```dockerfile
# Stage 1 — Build
FROM node:20-alpine AS build
# Installs dependencies and runs the Vite build
# Output: /app/dist/

# Stage 2 — Production
FROM nginx:alpine
# Copies only the built static files
# Configures nginx for SPA routing (try_files → index.html)
# Exposes port 80
```

### Build locally

```bash
# Build the image
docker build -t contoso-university:local .

# Run the container
docker run -p 8080:80 contoso-university:local

# Browse to http://localhost:8080
```

### nginx SPA Configuration

nginx is configured to serve `index.html` for any path that does not match a static file. This allows React Router to handle all client-side navigation:

```nginx
location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
}
```

---

## Infrastructure Architecture

Azure resources are provisioned using **Terraform** with **workspace-based environment separation**. All state is stored remotely in an Azure Storage Account.

```
Azure Subscription
│
├── rg-contoso-university-tfstate        ← Terraform remote state backend
│   └── stcontosounivtfstate (Storage)
│       └── tfstate container
│
├── rg-contoso-university-shared         ← Shared resources (created once)
│   └── acrcontosouniversity (ACR)       ← Shared Docker registry
│
├── rg-contoso-university-staging        ← Staging environment
│   ├── asp-contoso-university-staging   ← App Service Plan (Linux, B1)
│   └── contoso-university-staging       ← Linux Web App
│       └── System-Assigned Managed Identity
│
└── rg-contoso-university-production     ← Production environment
    ├── asp-contoso-university-production ← App Service Plan (Linux, B1)
    └── contoso-university               ← Linux Web App
        └── System-Assigned Managed Identity
```

### Terraform Workspaces

Terraform workspaces are used to manage staging and production environments from a single configuration. The `staging` workspace also creates the shared Azure Container Registry.

| Workspace | Environment | ACR Created |
|-----------|------------|-------------|
| `staging` | Staging web app | ✅ Yes (shared) |
| `production` | Production web app | ❌ No |

### Key Terraform Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `project_name` | `contoso-university` | Base name for all resources |
| `location` | `eastus` | Azure region |
| `acr_sku` | `Basic` | Container Registry SKU |
| `app_service_sku` | `B1` | App Service Plan SKU |
| `subscription_id` | — | Azure Subscription ID |
| `tenant_id` | — | Azure Tenant (Directory) ID |

### Resource Naming Convention

```
Resource Group:    rg-{project_name}-{environment}
App Service Plan:  asp-{project_name}-{environment}
Web App (prod):    {project_name}
Web App (staging): {project_name}-staging
ACR:               acr{project_name}  (hyphens removed)
```

---

## GitHub Actions Architecture

The CI/CD system consists of three main workflows and an agentic workflow layer. They follow a clear separation of concerns: CI builds and verifies, CD deploys, and Infrastructure provisions cloud resources.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Code Push / PR                               │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   CI Pipeline  (ci.yml)                             │
│                                                                     │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ Secret Scan   │  │ SAST (CodeQL)│  │ SCA (npm audit +         │ │
│  │ (Gitleaks)    │  │              │  │ dependency-review)       │ │
│  └───────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘ │
│          └────────────────┬┘─────────────────────────┘             │
│                           ▼                                        │
│                  ┌─────────────────┐                               │
│                  │ Build & Test    │                               │
│                  │ (lint + build   │                               │
│                  │  + Docker build)│                               │
│                  └────────┬────────┘                               │
│                           │                                        │
│              ┌────────────┴──────────────┐                         │
│              ▼                           ▼                         │
│  ┌───────────────────┐      ┌────────────────────────┐            │
│  │ Push to ACR       │      │ Container Scanning     │            │
│  │ (main push only)  │      │ (Trivy SARIF → GitHub) │            │
│  └───────────────────┘      └────────────────────────┘            │
└──────────────────────────────┬──────────────────────────────────────┘
                               │  triggers on success (main branch)
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   CD Pipeline  (cd.yml)                             │
│                                                                     │
│  ┌──────────────────────────────────────────┐                      │
│  │            Staging Environment           │                      │
│  │                                          │                      │
│  │  Deploy → Smoke Tests + DAST (ZAP)       │                      │
│  └─────────────────────┬────────────────────┘                      │
│                        │  on success                               │
│                        ▼                                           │
│  ┌──────────────────────────────────────────┐                      │
│  │          Production Environment          │                      │
│  │                                          │                      │
│  │  Deploy → Smoke Tests + DAST (ZAP)       │                      │
│  └──────────────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│              Infrastructure Pipeline  (infra.yml)                   │
│                                                                     │
│  Triggered by: infra/** changes, push to main, or manual dispatch  │
│                                                                     │
│  Matrix: [staging, production] (max-parallel: 1)                   │
│                                                                     │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────────────┐   │
│  │ terraform    │   │ terraform    │   │ terraform            │   │
│  │ plan         │   │ apply        │   │ destroy              │   │
│  │ (always)     │   │ (main push / │   │ (manual only)        │   │
│  │              │   │  manual)     │   │                      │   │
│  └──────────────┘   └──────────────┘   └──────────────────────┘   │
│                                                                     │
│  PR comments: Plan output posted automatically                      │
│  Step summary: Resource outputs after apply                        │
└─────────────────────────────────────────────────────────────────────┘
```

### CI Pipeline (`ci.yml`)

**Triggers:** `push` to `main`, `pull_request` targeting `main`, `workflow_dispatch`

The CI pipeline enforces quality gates before any code reaches the build stage. Security scanning jobs run in **parallel** and must all pass before `build-and-test` can proceed.

#### Jobs

| Job | Runs After | Purpose |
|-----|-----------|---------|
| `secret-scanning` | — | Gitleaks scans the full git history for leaked credentials |
| `sast` | — | CodeQL analyzes JavaScript/TypeScript for security vulnerabilities |
| `sca` | — | npm audit checks for known vulnerabilities; dependency-review runs on PRs |
| `build-and-test` | All 3 above | Installs deps, lints, builds app, builds Docker image, uploads artifact |
| `push-container` | `build-and-test` | Tags & pushes image to ACR (main branch push only) |
| `container-scanning` | `build-and-test` | Trivy scans the image; results uploaded as SARIF to GitHub Security |

#### Artifact Flow

```
build-and-test  →  saves  →  image.tar  (artifact, 1-day retention)
push-container  →  loads  →  image.tar  →  ACR (sha tag + latest)
container-scanning → loads → image.tar → Trivy → GitHub Security tab
```

#### Permissions

| Permission | Reason |
|------------|--------|
| `contents: read` | Checkout code |
| `security-events: write` | Upload SARIF results to GitHub |
| `id-token: write` | OIDC token for Azure authentication |

---

### CD Pipeline (`cd.yml`)

**Triggers:** Successful completion of the CI Pipeline on the `main` branch (`workflow_run`)

The CD pipeline implements a **staged deployment** strategy: code must successfully pass through staging — including smoke tests and a DAST scan — before it can be promoted to production.

#### Deployment Flow

```
CI Pipeline succeeds on main
         │
         ▼
┌─────────────────────────────────────┐
│  1. Deploy to Staging               │
│     azure/webapps-deploy@v3         │
│     Image: ACR/contoso-university   │
│            :{head_sha}              │
└────────────────┬────────────────────┘
                 │ (parallel)
       ┌─────────┴──────────┐
       ▼                    ▼
┌─────────────┐     ┌────────────────┐
│ Smoke Tests │     │ DAST (ZAP)     │
│ 5 retries,  │     │ Baseline scan  │
│ 30s delay   │     │ continue-on-   │
│             │     │ error: true    │
└──────┬──────┘     └───────┬────────┘
       └─────────┬──────────┘
                 │ both complete
                 ▼
┌─────────────────────────────────────┐
│  2. Deploy to Production            │
│     azure/webapps-deploy@v3         │
│     Same image SHA as staging       │
└────────────────┬────────────────────┘
                 │ (parallel)
       ┌─────────┴──────────┐
       ▼                    ▼
┌─────────────┐     ┌────────────────┐
│ Smoke Tests │     │ DAST (ZAP)     │
│ 5 retries,  │     │ Baseline scan  │
│ 30s delay   │     │ continue-on-   │
│             │     │ error: true    │
└─────────────┘     └────────────────┘
```

#### Environment URLs

| Environment | URL |
|-------------|-----|
| Staging | `https://contoso-university-staging.azurewebsites.net` |
| Production | `https://contoso-university.azurewebsites.net` |

#### Smoke Tests

The smoke test script retries up to 5 times with a 30-second delay between attempts, accommodating slow container cold starts:

```bash
for i in 1 2 3 4 5; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$URL")
  [ "$STATUS" = "200" ] && exit 0
  sleep 30
done
exit 1
```

---

### Infrastructure Pipeline (`infra.yml`)

**Triggers:** Changes to `infra/**` or `.github/workflows/infra.yml` on push/PR to `main`, or `workflow_dispatch`

Manages Terraform lifecycle for both environments using a **matrix strategy**.

#### Matrix Strategy

```yaml
strategy:
  matrix:
    environment: [staging, production]
  max-parallel: 1   # prevents concurrent state lock conflicts
```

#### Actions

| Action | Trigger | Description |
|--------|---------|-------------|
| `plan` | Always (default) | Generates and displays Terraform plan |
| `apply` | Push to `main` or manual `apply` dispatch | Applies infrastructure changes |
| `destroy` | Manual `destroy` dispatch only | Tears down all resources |

#### PR Comments

When run against a pull request, the plan output is automatically posted as a PR comment using `actions/github-script`, making infrastructure review straightforward:

```
### 🏗️ Terraform Plan — staging
```hcl
<plan output>
```
*Triggered by @user on pull_request*
```

#### Step Summary

After a successful `apply`, Terraform outputs (Web App name, URL, resource group, ACR login server) are written to the GitHub Actions step summary for easy reference.

---

## Agentic Workflow

Contoso University includes a set of **AI-powered agentic workflows** built with GitHub Copilot. These agents automate common repository maintenance tasks, reducing manual toil and improving developer experience.

These workflows live in `.github/workflows/` as markdown files with YAML front-matter. GitHub's Copilot Coding Agent runtime processes them like native workflows — responding to events, calling tools, and taking actions on your behalf.

### How Agentic Workflows Work

An agentic workflow is a markdown file that combines:
1. **YAML front-matter** — defines triggers, permissions, tools, and outputs (just like a regular workflow)
2. **Natural language instructions** — written in the body, describing what the agent should do step-by-step
3. **Template variables** — `${{ github.event.* }}` expressions inject runtime context into the prompt

The Copilot agent reads the prompt, uses the declared tools (GitHub API, web fetch, bash, etc.), and takes real actions: creating issues, posting comments, adding labels, pushing code.

```
GitHub Event (push, PR, issue, comment)
         │
         ▼
┌────────────────────────────────────┐
│  Agentic Workflow (*.md file)      │
│  ┌──────────────────────────────┐  │
│  │ YAML Front-matter            │  │
│  │  - on: <event trigger>       │  │
│  │  - permissions               │  │
│  │  - tools                     │  │
│  │  - safe-outputs              │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ Natural Language Prompt      │  │
│  │  - Context variables         │  │
│  │  - Step-by-step instructions │  │
│  │  - Output templates          │  │
│  └──────────────────────────────┘  │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  GitHub Copilot Agent Runtime      │
│  - Calls declared tools            │
│  - Reads repo, issues, logs, web   │
│  - Writes: comments, labels,       │
│    issues, code pushes             │
└────────────────────────────────────┘
```

### Implemented Agents

#### 1. CI Failure Doctor (`ci-doctor.md`)

**Trigger:** `workflow_run` — fires whenever the CI Pipeline completes with `failure`

The CI Doctor automatically investigates failed CI runs so developers don't have to dig through logs manually.

**What it does:**
1. Verifies the CI run actually failed (exits immediately if not)
2. Fetches full workflow run details and lists all failed jobs
3. Downloads and analyzes logs from every failed job
4. Categorizes the failure: code issue, dependency, Docker, security scan, or infrastructure
5. Searches for duplicate existing issues before creating a new one
6. Creates a GitHub issue with a structured investigation report including root cause, failed jobs, and recommended fix actions

**Key configuration:**
```yaml
on:
  workflow_run:
    workflows: ["CI Pipeline"]
    types: [completed]
    branches: [main]

safe-outputs:
  create-issue:
    title-prefix: "🏥 CI Doctor"
    labels: [automation, ci-failure]
  add-comment:

tools:
  cache-memory: true
  web-fetch:

timeout-minutes: 10
```

**Why this matters:** Instead of a failing CI silently blocking your team, the CI Doctor creates a labeled, structured issue in under 10 minutes with actionable remediation steps — even classifying the failure category.

---

#### 2. PR Fix (`pr-fix.md`)

**Trigger:** `/pr-fix` slash command in a PR comment (+ 👀 reaction acknowledgment)

An on-demand agent that analyzes failing CI checks on the current PR, identifies root causes from error logs, implements fixes, runs validation, and pushes corrected code back to the PR branch.

**What it does:**
1. Reads the PR, its failing CI checks, and any instructions in the triggering comment
2. Downloads and analyzes failure logs (TypeScript errors, ESLint violations, test failures, Docker errors)
3. Checks out the PR branch and installs dependencies
4. Plans and implements minimal, targeted fixes
5. Runs `npm run lint && npm run build && npm test` to verify the fix works
6. Pushes the fix to the PR branch if all checks pass
7. Adds a comment summarizing what was broken, what was fixed, and how to prevent it

**Key configuration:**
```yaml
on:
  slash_command:
    name: pr-fix
  reaction: "eyes"

safe-outputs:
  push-to-pull-request-branch:
  create-issue:
    title-prefix: "🔧 PR Fix"
    labels: [automation, pr-fix]
  add-comment:

tools:
  web-fetch:
  bash: true

timeout-minutes: 20
```

**Why this matters:** Contributors can get CI failures automatically fixed without waiting for a maintainer — especially useful for newcomers who may be unfamiliar with the project's lint/build requirements.

---

#### 3. Issue Triage (`issue-triage.md`)

**Trigger:** `issues` event — fires when an issue is opened or reopened; also on 👀 reaction

Performs initial triage on every new issue: detects spam, applies labels, and adds a structured analysis comment to help the team prioritize and reproduce.

**What it does:**
1. Retrieves the issue and checks for spam (exits without action if detected)
2. Fetches available repository labels and existing issues for context
3. Analyzes the issue type (bug, feature, question, docs), affected area (frontend, routing, CI/CD, Docker, deployment), severity, and components
4. Applies up to 5 appropriate labels including priority labels when urgency is clear
5. Posts a triage comment (starting with "🎯 Agentic Issue Triage") with a summary, debugging strategies, reproduction steps, and relevant links

**Key configuration:**
```yaml
on:
  issues:
    types: [opened, reopened]
  reaction: eyes

safe-outputs:
  add-labels:
    max: 5
  add-comment:

tools:
  web-fetch:
  github:
    toolsets: [issues]
    lockdown: false

timeout-minutes: 10
```

**Why this matters:** Every issue gets immediate triage without maintainer intervention. Spam is filtered, real issues get labeled within seconds, and the analysis comment gives the team a head start on investigation.

---

#### 4. Contribution Guidelines Checker (`contribution-guidelines.md`)

**Trigger:** `pull_request` events (opened, edited, synchronize); also on 👀 reaction

Reviews every incoming PR for compliance with [CONTRIBUTING.md](CONTRIBUTING.md) and either labels it as ready or provides constructive feedback.

**What it does:**
1. Reads `CONTRIBUTING.md` to load the current requirements
2. Fetches the PR title, description, changed files, and commit messages
3. Evaluates compliance across all requirements:
   - PR title follows conventional commit format (`feat:`, `fix:`, `docs:`, etc.)
   - Description is complete and explains what and why
   - Commit messages follow conventional commits
   - Code uses TypeScript, Tailwind CSS, and functional React components
   - Tests included for new functionality
   - Documentation updated if user-facing behavior changed
4. **If compliant:** Adds the `contribution-ready` label and a welcoming comment
5. **If not compliant:** Posts a detailed, friendly comment listing specific gaps and actionable steps to fix them (does NOT add the label)

**Key configuration:**
```yaml
on:
  pull_request:
    types: [opened, edited, synchronize]
  reaction: eyes

safe-outputs:
  add-labels:
    allowed: [contribution-ready]
    max: 1
  add-comment:
    max: 1

tools:
  github:
    toolsets: [default]
    lockdown: false

timeout-minutes: 10
```

**Why this matters:** Contribution standards are enforced automatically and consistently. New contributors get immediate, specific feedback without waiting for a human reviewer — improving onboarding and PR quality.

---

### Implementing a Similar Agentic Flow

If you want to adopt this pattern in your own repository, here is what you need:

**1. File structure**

Place your agentic workflow files in `.github/workflows/` with a `.md` extension:

```
.github/workflows/
├── ci.yml                        # Regular GitHub Actions workflow
├── cd.yml                        # Regular GitHub Actions workflow
└── my-agent.md                   # Agentic workflow
```

**2. Front-matter structure**

```yaml
---
description: |
  Brief description of what this agent does.

on:
  issues:
    types: [opened]           # Any GitHub event trigger
  reaction: eyes              # Optional: emoji reaction trigger

permissions: read-all         # Minimal permissions (or granular)

network: defaults             # Network access policy

safe-outputs:                 # Declare what the agent is allowed to do
  add-comment:
  add-labels:
    max: 5
  create-issue:
    title-prefix: "🤖 Agent"
    labels: [automation]
  push-to-pull-request-branch:  # Allows code pushes to PR branch

tools:                        # Declare tools the agent can use
  bash: true                  # Shell access (for code execution)
  web-fetch:                  # HTTP requests
  cache-memory: true          # Persistent memory across steps
  github:
    toolsets: [issues, default]
    lockdown: false

timeout-minutes: 10
---
```

**3. Prompt body**

Write clear, step-by-step instructions in plain English. Use `${{ context.variables }}` to inject GitHub event data:

```markdown
# My Agent

You are a [role] for the [project] repository.

## Context
- Repository: ${{ github.repository }}
- Event: ${{ github.event_name }}

## Steps
1. Retrieve [something] using [tool]
2. Analyze [data] for [criteria]
3. Take action: [specific output]

## Guidelines
- Be specific about when to exit early
- Define the exact output format
```

**4. Key design principles**

- **Declare minimum permissions** — only request what the agent needs
- **Use `safe-outputs`** — explicitly limit what the agent can write/create/push
- **Exit early** — instruct the agent to stop if conditions aren't met (e.g., "exit if not a failure")
- **Avoid duplicate actions** — instruct agents to search for existing issues before creating new ones
- **Be specific in prompts** — vague instructions lead to unpredictable behavior
- **Set appropriate timeouts** — most triage agents need 10 min; agents that run builds need 20+ min

---

## Azure Setup & Bootstrap

### Step 1: Bootstrap Azure Backend

Before Terraform can run, you need an Azure Storage Account for remote state and an App Registration for authentication.

```bash
# Make the script executable
chmod +x scripts/az-setup-federation.sh

# Log in to Azure
az login

# Run the bootstrap (idempotent — safe to re-run)
./scripts/az-bootstrap.sh
```

This creates:
- Resource group: `rg-contoso-university-tfstate`
- Storage account: `stcontosounivtfstate`
- Blob container: `tfstate`

### Step 2: Configure OIDC Federation

Set up Workload Identity federation so GitHub Actions can authenticate to Azure without storing any secrets:

```bash
# Set your GitHub org/repo (replace with your own values)
export GITHUB_ORG="YOUR_GITHUB_ORG"
export GITHUB_REPO="Contoso-University"

chmod +x scripts/az-setup-federation.sh
./scripts/az-setup-federation.sh
```

This creates an Azure App Registration with four federated credentials:
- Main branch pushes
- Pull requests
- Staging environment deployments
- Production environment deployments

The script prints the three values you need to add as GitHub Variables.

### Step 3: Add GitHub Variables

Go to **GitHub → Repository → Settings → Secrets and variables → Actions → Variables** and add:

| Variable | Description | Where to find |
|----------|-------------|---------------|
| `AZURE_CLIENT_ID` | App Registration (client) ID | Printed by `az-setup-federation.sh` |
| `AZURE_TENANT_ID` | Azure Directory (tenant) ID | Printed by `az-setup-federation.sh` |
| `AZURE_SUBSCRIPTION_ID` | Azure Subscription ID | Printed by `az-setup-federation.sh` |
| `ACR_LOGIN_SERVER` | ACR login server URL | Set automatically after first `infra apply` |

> **Note:** `ACR_LOGIN_SERVER` is printed in the Infrastructure workflow step summary after the first successful apply of the `staging` workspace. Copy the value (e.g., `acrcontosouniversity.azurecr.io`) and add it as a GitHub Variable.

### Step 4: Provision Infrastructure

Trigger the Infrastructure workflow manually from GitHub Actions:

1. Go to **Actions → Infrastructure → Run workflow**
2. Select `apply`
3. Click **Run workflow**

The matrix runs staging first, then production. After completion, check the step summary for your resource URLs.

### Step 5: Run CI/CD

Push to `main` to trigger the full pipeline:

```
Push → CI Pipeline → CD Pipeline (staging → production)
```

---

## GitHub Variables

All GitHub Actions workflows use **variables** (not secrets) for Azure authentication. This is intentional — OIDC tokens are short-lived and scoped, so there is nothing sensitive to protect in these values.

| Variable | Used By | Description |
|----------|---------|-------------|
| `AZURE_CLIENT_ID` | ci.yml, cd.yml, infra.yml | Azure App Registration client ID |
| `AZURE_TENANT_ID` | ci.yml, cd.yml, infra.yml | Azure Directory tenant ID |
| `AZURE_SUBSCRIPTION_ID` | ci.yml, cd.yml, infra.yml | Azure Subscription ID |
| `ACR_LOGIN_SERVER` | ci.yml, cd.yml | ACR endpoint (e.g., `acrcontosouniversity.azurecr.io`) |

> All GitHub Actions workflows reference these as `${{ vars.VARIABLE_NAME }}` — **not** `${{ secrets.VARIABLE_NAME }}`.

---

## Security Model

### Zero-Secret Authentication (OIDC)

GitHub Actions authenticates to Azure using **OpenID Connect (OIDC) federation** — no credentials are ever stored in GitHub. The flow works as follows:

```
GitHub Actions Runner
      │
      │ 1. Requests OIDC token from GitHub
      │    (scoped to: repo, branch/environment, workflow)
      ▼
GitHub OIDC Provider (token.actions.githubusercontent.com)
      │
      │ 2. Issues short-lived JWT
      ▼
Azure AD (Entra ID)
      │
      │ 3. Validates token against federated credential
      │    (checks repo, branch, and environment claims)
      │
      │ 4. Issues Azure access token (scoped to subscription)
      ▼
Azure Resources (ACR, App Service, Storage)
```

Federated credentials are configured per-scenario (main branch, PRs, staging, production), so tokens are narrowly scoped.

### Security Scanning Layers

| Layer | Tool | Stage | On Failure |
|-------|------|-------|------------|
| Secret detection | Gitleaks | Pre-build (parallel) | Blocks build |
| SAST | CodeQL | Pre-build (parallel) | Blocks build |
| SCA | npm audit + dependency-review | Pre-build (parallel) | Blocks build |
| Container scanning | Trivy | Post-build | SARIF → GitHub Security |
| DAST | OWASP ZAP | Post-deploy | `continue-on-error: true` |

### GitHub Environments

The CD pipeline uses GitHub Environments (`staging`, `production`) which:
- Require appropriate OIDC federated credentials for deployment
- Can be configured with required reviewers for production gates
- Provide deployment history and rollback visibility in the GitHub UI

---

## Project Structure

```
Contoso-University/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI pipeline (build, test, security)
│       ├── cd.yml                    # CD pipeline (staging → production)
│       ├── infra.yml                 # Terraform infrastructure management
│       ├── copilot-setup-steps.yml   # Copilot agent environment setup
│       ├── ci-doctor.md              # 🤖 Agentic: CI failure investigator
│       ├── pr-fix.md                 # 🤖 Agentic: PR auto-fixer
│       ├── issue-triage.md           # 🤖 Agentic: Issue triage assistant
│       └── contribution-guidelines.md # 🤖 Agentic: PR compliance checker
│
├── src/
│   ├── App.tsx                       # Root component with routing
│   ├── main.tsx                      # React entry point
│   ├── index.css                     # Global styles
│   ├── components/
│   │   └── Layout.tsx                # Shared navigation layout
│   ├── pages/
│   │   ├── HomePage.tsx              # Dashboard
│   │   ├── StudentsPage.tsx          # Students list
│   │   ├── CoursesPage.tsx           # Courses list
│   │   └── TeachersPage.tsx          # Faculty directory
│   ├── data/
│   │   ├── students.ts               # Mock student data
│   │   ├── courses.ts                # Mock course data
│   │   ├── teachers.ts               # Mock teacher data
│   │   └── departments.ts            # Mock department data
│   └── assets/                       # Static assets
│
├── infra/
│   ├── main.tf                       # Provider + backend + locals
│   ├── webapp.tf                     # App Service Plan + Web App
│   ├── acr.tf                        # Azure Container Registry (shared)
│   ├── variables.tf                  # Input variables
│   ├── outputs.tf                    # Output values
│   └── terraform.tfvars              # Default variable values
│
├── scripts/
│   ├── az-bootstrap.sh               # Creates Terraform state backend
│   └── az-setup-federation.sh        # Configures OIDC federated credentials
│
├── public/                           # Static public assets
├── UI-Prototype/                     # UI wireframes/mockups
├── Dockerfile                        # Multi-stage build (node → nginx)
├── .dockerignore                     # Docker build context exclusions
├── .gitignore                        # Git ignored files
├── package.json                      # npm dependencies and scripts
├── vite.config.ts                    # Vite build configuration
├── tsconfig.json                     # TypeScript project references
├── tsconfig.app.json                 # App TypeScript config
├── tsconfig.node.json                # Build-tool TypeScript config
├── eslint.config.js                  # ESLint configuration
├── index.html                        # HTML entry point
├── README.md                         # This file
└── CONTRIBUTING.md                   # Contribution guidelines
```

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on the development workflow, code style, commit message format, and PR requirements.

> **Tip:** If your PR has failing CI checks, comment `/pr-fix` on the PR to let the AI agent investigate and push a fix automatically.
