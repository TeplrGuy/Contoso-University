import { test, expect } from '@playwright/test';

test.describe('Students Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/students');
  });

  test('displays students heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Students' })).toBeVisible();
  });

  test('renders student table with headers', async ({ page }) => {
    const headers = ['Name', 'Email', 'Major', 'Enrollment Date', 'Courses', 'Actions'];
    for (const header of headers) {
      await expect(page.getByRole('columnheader', { name: header })).toBeVisible();
    }
  });

  test('shows all students from data', async ({ page }) => {
    await expect(page.getByText('Emma Johnson')).toBeVisible();
    await expect(page.getByText('Liam Williams')).toBeVisible();
    await expect(page.getByText('Olivia Brown')).toBeVisible();
  });

  test('displays student emails', async ({ page }) => {
    await expect(page.getByText('emma.johnson@contoso.edu')).toBeVisible();
  });

  test('shows course count badges', async ({ page }) => {
    await expect(page.getByText('4 courses').first()).toBeVisible();
  });
});
