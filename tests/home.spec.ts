import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays welcome heading', async ({ page }) => {
    await expect(page.getByText('Welcome to Contoso University')).toBeVisible();
  });

  test('shows all four stat cards', async ({ page }) => {
    await expect(page.getByText('Total Students')).toBeVisible();
    await expect(page.getByText('Active Courses')).toBeVisible();
    await expect(page.getByText('Faculty Members')).toBeVisible();
    await expect(page.getByText('Total Enrollments')).toBeVisible();
  });

  test('shows quick access links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Students/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Courses/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Teachers/i }).first()).toBeVisible();
  });

  test('navigates to students page via quick access', async ({ page }) => {
    await page.getByRole('link', { name: /Students/ }).filter({ hasText: 'View and manage' }).click();
    await expect(page).toHaveURL('/students');
  });
});
