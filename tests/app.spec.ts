import { test, expect } from '@playwright/test';

/**
 * Smoke tests validating the global AppInsightsErrorBoundary does not
 * accidentally trigger on normal renders. Each test navigates to a route
 * and asserts the fallback crash banner is absent.
 */
test.describe('App — error boundary smoke tests', () => {
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/students', label: 'Students' },
    { path: '/courses', label: 'Courses' },
    { path: '/teachers', label: 'Teachers' },
    { path: '/assistant', label: 'Assistant' },
  ];

  for (const { path, label } of routes) {
    test(`${label} page renders without crash banner`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByText('Something went wrong')).not.toBeVisible();
    });
  }
});
