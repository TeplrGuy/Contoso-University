import { test, expect } from '@playwright/test';

test.describe('Departments Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/departments');
  });

  test('displays departments heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Departments' })).toBeVisible();
  });

  test('renders department cards', async ({ page }) => {
    const cards = page.locator('.bg-white.rounded-xl');
    await expect(cards.first()).toBeVisible();
  });

  test('shows department names', async ({ page }) => {
    await expect(page.getByText('Computer Science').first()).toBeVisible();
    await expect(page.getByText('Mathematics').first()).toBeVisible();
  });

  test('shows course counts per department', async ({ page }) => {
    await expect(page.getByText(/\d+ courses/).first()).toBeVisible();
  });

  test('shows faculty member counts per department', async ({ page }) => {
    await expect(page.getByText(/\d+ faculty members/).first()).toBeVisible();
  });

  test('navigation includes Departments link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Departments' })).toBeVisible();
  });
});
