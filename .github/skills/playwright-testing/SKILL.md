---
name: playwright-testing
description: >
  Skill for writing and maintaining Playwright end-to-end tests for the Contoso University
  React application. Activated when creating or modifying UI pages, components, or routes.
  Ensures every page and component has corresponding test coverage.
---

# Playwright Testing Skill — Contoso University

You are an expert at writing Playwright end-to-end tests for this React + TypeScript + Vite application.

## When to Activate

- Any time a file in `src/pages/` or `src/components/` is created or modified
- When new routes are added to `src/App.tsx`
- When asked to write tests or improve test coverage
- When the postToolUse hook reports missing test files

## Project Test Conventions

### File Structure
- Test files live in `tests/` at the project root
- Naming: `<page-name>.spec.ts` (lowercase, kebab-case, matching the page)
  - `src/pages/HomePage.tsx` → `tests/home.spec.ts`
  - `src/pages/StudentsPage.tsx` → `tests/students.spec.ts`

### Configuration
- Config file: `playwright.config.ts`
- Base URL: `http://localhost:4173` (Vite preview server)
- Web server command: `npm run preview`
- Browser: Chromium only (for speed)

### Test Patterns

```typescript
import { test, expect } from '@playwright/test';

test.describe('Page Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/route');
  });

  test('displays main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Page Title' })).toBeVisible();
  });

  test('renders data from source', async ({ page }) => {
    // Verify actual data from src/data/ files renders correctly
    await expect(page.getByText('Expected Data')).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.getByRole('link', { name: /Target/ }).click();
    await expect(page).toHaveURL('/target');
  });
});
```

### Selector Priority (best → worst)
1. `page.getByRole()` — accessibility roles (heading, link, button)
2. `page.getByText()` — visible text content
3. `page.getByLabel()` — form labels
4. `page.getByTestId()` — data-testid attributes
5. `page.locator('.class')` — CSS selectors (last resort)

### What to Test for Each Page
- **Heading** renders correctly
- **Data** from `src/data/` files displays (use actual values, not mocks)
- **Navigation** links work
- **Interactive elements** respond to clicks
- **Layout** elements (header, nav, footer) are present
- **Responsive** behavior if applicable

## Commands
- List tests: `npx playwright test --list`
- Run all tests: `npx playwright test`
- Run one file: `npx playwright test tests/home.spec.ts`
- Debug mode: `npx playwright test --debug`
- Generate report: `npx playwright show-report`

## Important Rules
1. **Always use real data values** from `src/data/` — never use placeholder text
2. **Build before testing** — run `npm run build` before `npx playwright test`
3. **Keep tests fast** — avoid unnecessary waits, use Playwright auto-waiting
4. **One describe block per test file** — matches the page being tested
5. **Never skip tests** — if a test fails, fix the code or the test, don't skip
