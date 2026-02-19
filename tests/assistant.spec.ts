import { test, expect } from '@playwright/test';

test.describe('AI Assistant Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/assistant');
  });

  test('displays assistant heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /AI Campus Assistant/i })).toBeVisible();
  });

  test('shows Copilot SDK demo banner', async ({ page }) => {
    await expect(page.getByText('Copilot SDK Demo')).toBeVisible();
  });

  test('shows suggested prompts when empty', async ({ page }) => {
    await expect(page.getByText('How can I help you today?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Find students in Computer Science' })).toBeVisible();
  });

  test('sends a message and receives a response', async ({ page }) => {
    await page.getByPlaceholder('Ask about students').fill('Show university statistics');
    await page.getByRole('button', { name: '' }).filter({ has: page.locator('svg') }).last().click();
    await expect(page.getByText('University Overview')).toBeVisible({ timeout: 5000 });
  });

  test('clicking suggested prompt sends message', async ({ page }) => {
    await page.getByRole('button', { name: 'List all courses' }).click();
    await expect(page.getByText('CS101')).toBeVisible({ timeout: 5000 });
  });
});
