# Contoso University Copilot Guardrails

You are working in a React + TypeScript + Vite + Tailwind project with Playwright E2E tests.

## Goals
- Maximize developer productivity with safe, repeatable changes.
- Prefer small, verifiable increments over broad rewrites.

## Non-Negotiable Delivery Rules
1. Create a short implementation plan before non-trivial changes.
2. Reuse existing patterns before introducing new abstractions.
3. Keep edits minimal and scoped to the requested behavior.
4. Update tests when UI behavior changes (`tests/*.spec.ts`).
5. Update docs when commands, workflows, or architecture change.
6. Never commit secrets or disable security checks to make builds pass.

## Required Validation Before Done
Run the smallest relevant set, then report outcomes:

```bash
npm run lint
npm run build
npx playwright test --list
```

If one command is not relevant to the change, explain why.

## PR Quality Checklist
- [ ] Summary clearly states user impact.
- [ ] Risks and rollback approach are documented.
- [ ] Test evidence is included (commands + result).
- [ ] Security or dependency impacts are called out.
- [ ] Required reviewers are requested.

## Agent and Skill Pattern for Repeatability
- Prefer repository skills in `.github/skills/` over ad-hoc prompt files.
- Use agentic workflows in `.github/workflows/*.md` for repeatable PR governance.
- Run a critical review pass before completion, ideally across multiple perspectives (tests, security, bugs, standards).
- Report outcomes in this order:
  1. **Plan**
  2. **Implementation**
  3. **Validation**
  4. **Review Findings**
