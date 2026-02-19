import { test, expect } from '@playwright/test';

test.describe('Teachers Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/teachers');
  });

  test('displays teachers heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Teachers' })).toBeVisible();
  });

  test('renders teacher cards', async ({ page }) => {
    const teacherCards = page.locator('.bg-white.rounded-xl');
    await expect(teacherCards.first()).toBeVisible();
  });

  test('shows teacher email addresses', async ({ page }) => {
    await expect(page.getByText(/@contoso\.edu/).first()).toBeVisible();
  });

  test('shows faculty by department section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Faculty by Department' })).toBeVisible();
  });

  test('displays office locations', async ({ page }) => {
    await expect(page.getByText(/Room/).first()).toBeVisible();
  });
});
