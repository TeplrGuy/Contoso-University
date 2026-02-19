import { test, expect } from '@playwright/test';

/**
 * Example Playwright test template for Contoso University pages.
 * Copy this file and adapt for new pages.
 *
 * Naming convention: tests/<page-name>.spec.ts
 * e.g., src/pages/NewPage.tsx → tests/new.spec.ts
 */

test.describe('Example Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/example-route');
  });

  test('displays page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Page Title' })).toBeVisible();
  });

  test('renders data correctly', async ({ page }) => {
    // Use actual data values from src/data/ files
    await expect(page.getByText('Expected content')).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.getByRole('link', { name: /Link Text/ }).click();
    await expect(page).toHaveURL('/target-route');
  });

  test('interactive elements respond', async ({ page }) => {
    await page.getByRole('button', { name: 'Action' }).click();
    // Assert expected behavior
  });
});
