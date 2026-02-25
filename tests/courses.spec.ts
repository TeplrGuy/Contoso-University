import { test, expect } from '@playwright/test';

test.describe('Courses Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/courses');
  });

  test('displays courses heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Courses' })).toBeVisible();
  });

  test('renders course cards', async ({ page }) => {
    const courseCards = page.locator('.bg-white.rounded-xl').first();
    await expect(courseCards).toBeVisible();
  });

  test('shows course codes', async ({ page }) => {
    await expect(page.getByText('CS101').first()).toBeVisible();
  });

  test('shows departments summary section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Departments' })).toBeVisible();
  });

  test('displays credit information', async ({ page }) => {
    await expect(page.getByText(/\d+ credits/).first()).toBeVisible();
  });
});
