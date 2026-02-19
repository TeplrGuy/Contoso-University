# 🚀 GitHub Copilot Showcase — Contoso University

This document describes all GitHub Copilot integrations in the Contoso University project, organized by feature area. Use this as a reference for demos and as a guide for extending the project.

---

## Table of Contents

1. [Copilot SDK — AI Campus Assistant](#1-copilot-sdk--ai-campus-assistant)
2. [Copilot Hooks — Lifecycle Guards](#2-copilot-hooks--lifecycle-guards)
3. [Copilot Agent Skills](#3-copilot-agent-skills)
4. [Copilot CLI in CI/CD](#4-copilot-cli-in-cicd)
5. [Copilot CLI Developer Scripts](#5-copilot-cli-developer-scripts)
6. [Agentic Workflows](#6-agentic-workflows)
7. [Playwright Test Infrastructure](#7-playwright-test-infrastructure)
8. [Repeatable Productivity Kit](#8-repeatable-productivity-kit)

---

## 1. Copilot SDK — AI Campus Assistant

**Location:** `src/copilot/`, `src/pages/AssistantPage.tsx`

An interactive chatbot embedded in the application at `/assistant`, demonstrating the `@github/copilot-sdk` pattern with custom tool registration.

### Custom Tools Registered

| Tool | Description |
|------|-------------|
| `searchStudents` | Search students by name, major, or email |
| `listCourses` | List courses, optionally filtered by department |
| `getTeacherInfo` | Look up faculty by name or department |
| `getUniversityStats` | Get overall university statistics |

### Architecture

```
src/copilot/
  client.ts    — CampusAssistantClient (SDK client wrapper with tool orchestration)
  tools.ts     — Tool definitions and handlers (query app data)

src/pages/
  AssistantPage.tsx — Chat UI with streaming-style responses

src/components/
  ChatBubble.tsx    — Message display component (user, assistant, tool roles)
```

### Try It

```bash
npm run dev
# Navigate to http://localhost:5173/assistant
# Try: "Find students in Computer Science"
```

---

## 2. Copilot Hooks — Lifecycle Guards

**Location:** `.github/hooks/`

Hooks enforce best practices at every stage of a Copilot agent session.

### Hook Events

| Event | Script | Purpose |
|-------|--------|---------|
| `sessionStart` | `scripts/session-start.sh` | Verify Playwright is installed, check test coverage for all pages |
| `preToolUse` | `scripts/pre-tool-check.sh` | Snapshot files, flag when `src/` changes need test updates |
| `postToolUse` | `scripts/post-tool-check.sh` | Check if modified pages/components have corresponding `.spec.ts` files |
| `sessionEnd` | `scripts/session-end.sh` | Run `playwright test --list`, lint, generate quality report |

### Configuration

```json
// .github/hooks/hooks.json
{
  "version": 1,
  "hooks": {
    "sessionStart": [{ "type": "command", "bash": "./.github/hooks/scripts/session-start.sh" }],
    "preToolUse": [{ "type": "command", "bash": "./.github/hooks/scripts/pre-tool-check.sh" }],
    "postToolUse": [{ "type": "command", "bash": "./.github/hooks/scripts/post-tool-check.sh" }],
    "sessionEnd": [{ "type": "command", "bash": "./.github/hooks/scripts/session-end.sh" }]
  }
}
```

### What the Hooks Enforce

- ✅ Every page in `src/pages/` must have a `tests/<name>.spec.ts` file
- ✅ Playwright configuration must exist (`playwright.config.ts`)
- ✅ `node_modules/` must be installed
- ✅ Lint passes at session end
- ✅ All Playwright tests parse at session end

---

## 3. Copilot Agent Skills

**Location:** `.github/skills/`

Reusable skill definitions that Copilot auto-discovers and loads contextually.

### Available Skills

| Skill | Purpose |
|-------|---------|
| `playwright-testing` | Teaches the agent how to write Playwright tests for this project (conventions, selectors, patterns) |
| `documentation-sync` | Ensures docs stay in sync with code changes (README, COPILOT-SHOWCASE, JSDoc) |
| `code-quality` | Enforces TypeScript, Tailwind CSS, React, ESLint, and conventional commit standards |
| `productivity-orchestrator` | Enforces plan → implement → validate → review workflow with policy and approval gates |

### Structure

```
.github/skills/
  playwright-testing/
    SKILL.md              — Skill definition with test conventions and patterns
    example-test.spec.ts  — Reference test template
  documentation-sync/
    SKILL.md              — Documentation checklist and style guide
  code-quality/
    SKILL.md              — Tech stack rules and quality checks
  productivity-orchestrator/
    SKILL.md              — Skill-first orchestration and critical review protocol
```

---

## 4. Copilot CLI in CI/CD

**Location:** `.github/workflows/copilot-review.yml`

A GitHub Actions workflow that uses `copilot -sp` to generate AI code reviews on pull requests.

### How It Works

1. PR is opened or updated against `main`
2. Workflow gets the PR diff
3. Pipes diff to `copilot -sp` with a review prompt
4. Posts the AI review as a PR comment

### Workflow

```yaml
# .github/workflows/copilot-review.yml
- name: AI Review Analysis
  run: |
    cat /tmp/pr-diff.txt | copilot -sp "Review this PR for quality, testing, and style..."
```

---

## 5. Copilot CLI Developer Scripts

**Location:** `scripts/copilot/`

Shell scripts that leverage `copilot -p` for local developer productivity.

### Available Scripts

| Command | Script | Description |
|---------|--------|-------------|
| `npm run copilot:audit` | `audit.sh` | Full code quality audit (TypeScript, security, performance, accessibility) |
| `npm run copilot:docs` | `document.sh` | Auto-generate documentation for components or the whole project |
| `npm run copilot:onboard` | `onboard.sh` | Generate onboarding guide for new contributors |
| `npm run copilot:review` | `review-file.sh` | Review a specific file for improvements |

### Usage Examples

```bash
# Run a full audit
npm run copilot:audit

# Generate docs for a specific file
npm run copilot:docs -- src/pages/StudentsPage.tsx

# Onboard a new team member
npm run copilot:onboard

# Review a file
npm run copilot:review -- src/components/Layout.tsx
```

### Prerequisites

- [GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli) must be installed
- Authenticated via `gh auth login`

---

## 6. Agentic Workflows

**Location:** `.github/workflows/*.md`

Copilot agentic workflows using `.md` files with YAML front-matter.

### Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci-doctor.md` | CI Pipeline fails | Investigate failures, create diagnostic issues |
| `pr-fix.md` | `/pr-fix` comment | Auto-fix failing PR checks |
| `issue-triage.md` | Issue opened/reopened | Auto-label and triage new issues |
| `contribution-guidelines.md` | PR opened/edited | Check PR compliance with CONTRIBUTING.md |
| `productivity-governor.md` | `/productivity-check` comment | Validate guardrails, validation evidence, and approval readiness |
| **`release-notes.md`** | Release published | Generate categorized release notes from merged PRs |

---

## 7. Playwright Test Infrastructure

**Location:** `tests/`, `playwright.config.ts`

End-to-end tests for all pages using Playwright.

### Test Files

| File | Page | Tests |
|------|------|-------|
| `tests/home.spec.ts` | Home Page | Welcome heading, stats cards, quick access links, navigation |
| `tests/students.spec.ts` | Students Page | Heading, table headers, student data, emails, badges |
| `tests/courses.spec.ts` | Courses Page | Heading, course cards, codes, departments, credits |
| `tests/teachers.spec.ts` | Teachers Page | Heading, teacher cards, emails, departments, offices |
| `tests/assistant.spec.ts` | AI Assistant | Heading, SDK banner, prompts, message sending |

### Commands

```bash
npm test                    # Run all Playwright tests
npm run test:list           # List all tests without running
npx playwright test --debug # Run in debug mode
npx playwright show-report  # View HTML report
```

---

## 8. Repeatable Productivity Kit

**Location:** `.github/copilot-instructions.md`, `.github/skills/productivity-orchestrator/`, `.github/workflows/productivity-governor.md`, `.github/pull_request_template.md`

This layer turns Copilot usage into a repeatable team operating model:

- **Fixed guardrails** in `copilot-instructions.md` (minimal edits, required validation, safe defaults)
- **Skill-first orchestration** in `productivity-orchestrator/SKILL.md` (plan, implement, validate, critical review)
- **Agentic governance** in `productivity-governor.md` via `/productivity-check` for PR evidence checks
- **Approval/policy gates** in `pull_request_template.md` so every PR carries test, risk, and security evidence

These assets are intentionally portable so other repos can copy them as a starter kit.

---

## Architecture Overview

```
contoso-university/
├── .github/
│   ├── copilot-instructions.md      # 🛡️ Fixed guardrails
│   ├── hooks/                    # 🪝 Copilot Hooks
│   │   ├── hooks.json
│   │   └── scripts/
│   ├── pull_request_template.md  # ✅ Approval/policy checklist
│   ├── skills/                   # 🧠 Agent Skills
│   │   ├── playwright-testing/
│   │   ├── documentation-sync/
│   │   ├── code-quality/
│   │   └── productivity-orchestrator/
│   └── workflows/                # ⚙️ CI/CD + Agentic Workflows
│       ├── ci.yml / cd.yml
│       ├── copilot-review.yml    # CLI in CI
│       ├── ci-doctor.md          # Agentic
│       ├── pr-fix.md             # Agentic
│       ├── issue-triage.md       # Agentic
│       ├── contribution-guidelines.md  # Agentic
│       ├── productivity-governor.md     # Agentic governance
│       └── release-notes.md      # Agentic (NEW)
├── scripts/copilot/              # 🖥️ CLI Developer Scripts
├── src/copilot/                  # 🤖 SDK Integration
├── tests/                        # 🧪 Playwright Tests
└── COPILOT-SHOWCASE.md           # 📖 This file
```
