import { test, expect } from '@playwright/test';

// You can create a .har file for mocking
// But ensures that this user exists in the database

test('See users and logs when logged in as admin', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password', { exact: true }).fill('123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByTestId('users-table')).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId('logs-table')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('logout-button').click();
});

test('See error when logged in as user', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username').fill('user');
  await page.getByLabel('Password', { exact: true }).fill('123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('You are not authorized to access this page')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('logout-button').click();
});


