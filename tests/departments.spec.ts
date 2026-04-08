import { test, expect } from '@playwright/test';

test.describe('Departments Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/departments');
  });

  test('displays departments heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Departments' })).toBeVisible();
  });

  test('renders department cards', async ({ page }) => {
    await expect(page.getByText('Computer Science').first()).toBeVisible();
    await expect(page.getByText('Mathematics').first()).toBeVisible();
    await expect(page.getByText('Engineering').first()).toBeVisible();
  });

  test('shows department names', async ({ page }) => {
    await expect(page.getByText('Computer Science').first()).toBeVisible();
    await expect(page.getByText('Mathematics').first()).toBeVisible();
  });

  test('shows course counts per department', async ({ page }) => {
    await expect(page.getByText(/\d+ courses/).first()).toBeVisible();
  });

  test('shows faculty counts per department', async ({ page }) => {
    await expect(page.getByText(/\d+ faculty/).first()).toBeVisible();
  });

  test('departments nav link is active', async ({ page }) => {
    const navLink = page.getByRole('link', { name: 'Departments' }).first();
    await expect(navLink).toHaveAttribute('aria-current', 'page');
  });
});
