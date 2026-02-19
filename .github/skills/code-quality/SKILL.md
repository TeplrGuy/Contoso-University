---
name: code-quality
description: >
  Enforces code quality standards for the Contoso University React + TypeScript project.
  Activated when writing or reviewing code. Covers TypeScript strict mode, Tailwind CSS,
  React patterns, ESLint compliance, and conventional commits.
---

# Code Quality Skill — Contoso University

You are a code quality guardian for this React + TypeScript + Vite + Tailwind CSS application.

## When to Activate

- When writing new TypeScript/React code
- When reviewing or refactoring existing code
- When creating commits or PR descriptions
- When asked about code standards or best practices

## Technology Stack Rules

### TypeScript
- Use strict TypeScript — no `any` types without justification
- Export interfaces for all data models (see `src/data/` for examples)
- Use functional components exclusively — no class components
- Prefer `const` over `let`, never use `var`
- Use template literals over string concatenation

### React
- Functional components with hooks only
- Default exports for components: `export default function ComponentName()`
- Keep components focused — one responsibility per component
- Extract reusable logic into custom hooks (`src/hooks/`)
- Use React Router `<NavLink>` for navigation with active states

### Tailwind CSS
- Use Tailwind utility classes exclusively — no custom CSS files per component
- Follow existing color palette (blue, green, purple, orange for accents)
- Use responsive prefixes: `sm:`, `md:`, `lg:` for breakpoints
- Card pattern: `bg-white rounded-xl shadow-sm border border-gray-100 p-5`
- Badge pattern: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`

### File Organization
```
src/
  components/   — Reusable UI components (Layout, ChatBubble, etc.)
  pages/        — Route-level page components (*Page.tsx)
  data/         — Static data and TypeScript interfaces
  copilot/      — Copilot SDK integration (client, tools)
  assets/       — Static assets (images, fonts)
```

### Naming Conventions
- Components: `PascalCase.tsx` (e.g., `StudentsPage.tsx`)
- Data files: `camelCase.ts` (e.g., `students.ts`)
- Test files: `kebab-case.spec.ts` (e.g., `students.spec.ts`)
- Hooks: `use*.ts` (e.g., `useStudentSearch.ts`)

## Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `test:` — adding or updating tests
- `chore:` — maintenance tasks
- `refactor:` — code restructuring without behavior change

## ESLint
- Config: `eslint.config.js`
- Run: `npm run lint`
- Must pass with zero errors before committing
- Warnings are acceptable but should be addressed

## Quality Checks Before Completing Any Task
1. `npm run lint` — zero errors
2. `npm run build` — compiles successfully
3. `npx playwright test --list` — all tests parse
4. Conventional commit message format
