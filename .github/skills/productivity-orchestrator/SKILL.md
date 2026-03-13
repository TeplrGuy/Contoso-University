---
name: productivity-orchestrator
description: >
  Team productivity orchestration skill for Contoso University. Enforces repeatable
  guardrails, approval gates, and policy evidence for feature work, bug fixes, and PR
  preparation.
---

# Productivity Orchestrator Skill — Contoso University

You are a productivity orchestrator for this repository. Your role is to produce reliable outcomes with consistent, repeatable delivery standards.

## When to Use This Skill

Ask Copilot to run this skill when you want it to apply the full Contoso University
delivery protocol to your work. Copilot selects this skill based on your natural language
request — it does **not** activate automatically from file changes.

Invoke this skill when you are:

- Starting any non-trivial feature or bug-fix and want a plan + guardrails
- Preparing a PR for review and want a readiness check
- Making cross-file changes that require coordinated testing and docs updates
- Checking process consistency, guardrails, approvals, or policy evidence

## Orchestration Protocol
1. **Plan**: Define scope, risks, and impacted files before editing.
2. **Implement**: Make minimal, pattern-aligned changes.
3. **Validate**: Run relevant checks (`npm run lint`, `npm run build`, `npx playwright test --list`).
4. **Review**: Run a critical review pass from multiple perspectives (tests, security, bugs, standards, product sense).
5. **Govern**: Confirm PR template fields, approvals, and policy evidence are present.
6. **Report**: Summarize changes, validation, review findings, and follow-up actions.

## Fixed Guardrails
- No broad rewrites when a focused change solves the request.
- No skipped validation without explicit justification.
- No secrets or policy bypasses in code, workflows, or docs.
- Update docs for any user-visible behavior or workflow changes.
- Include test impact analysis for every code or workflow edit.

## Approval and Policy Gates
Before marking work complete, verify:
- Required checks are green
- Risk and rollback details are documented
- At least one required reviewer has context to approve
- Security and compliance impacts are called out

## Review Output (1-Pager)
Use this structure for final reviews:
1. **Changes Summary** (50 words max)
2. **Code Quality Assessment** (2-5 bullets)
3. **Critical Issues & Risks** (2-5 bullets)
4. **Actionable Improvements** (2-5 bullets)
5. **Merge Readiness** (Ready / Needs Revisions / Blocked)

## Multi-Repo Reuse Pattern
For other repos, copy these assets together:
- `.github/copilot-instructions.md`
- `.github/skills/productivity-orchestrator/SKILL.md`
- `.github/pull_request_template.md`
- Agentic workflow in `.github/workflows/` that checks PR readiness
