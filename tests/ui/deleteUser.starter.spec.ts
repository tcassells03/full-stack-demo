/**
 * E5 — Delete user starter
 *
 * Copy this file to tests/ui/deleteUser.spec.ts, then complete the TODOs.
 *
 * Useful locators:
 *   page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' })
 *   page.getByRole('status')   ← the green success message
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.beforeEach(async ({ request }) => {
  // Reset to seed data before each test so deletes don't cascade
  await request.post(`${BASE_URL}/api/seed`);
});

test('deleting a user shows a confirmation message @smoke', async ({ page }) => {
  await page.goto(`${BASE_URL}/users/new`);
  
  await page.getByTestId('firstName-input').fill('Test');
  await page.getByTestId('lastName-input').fill('User');
  await page.getByTestId('email-input').fill('test@example.com');
  await page.getByTestId('password-input').fill('Password!123');
  await page.getByRole('button', { name: 'Create User' }).click();
  
  await page.goto(`${BASE_URL}/users`);
  await page.getByRole('row', { name: 'Test User test@example.com'}).getByRole('button').click();
  await expect(page.getByText('User "Test User" was')).toBeVisible();
  // TODO: find Alice Johnson's row and click her Delete button
  // TODO: assert the status message contains her name and "deleted"
});

/*test('deleting a user removes the row from the table', async ({ page }) => {
  await page.goto(`${BASE_URL}/users`);
  await page.goto(`${BASE_URL}/users/new`);
  
  await page.getByTestId('firstName-input').fill('Test');
  await page.getByTestId('lastName-input').fill('User');
  await page.getByTestId('email-input').fill('test@example.com');
  await page.getByTestId('password-input').fill('Password!123');
  await page.getByRole('button', { name: 'Create User' }).click();
  
  await page.goto(`${BASE_URL}/users`);
  await page.getByRole('row', { name: 'Test User test@example.com'}).getByRole('button').click();
  await expect(page.getByTestId('user-table')).not.toContainText('Test User');
  // TODO: delete Alice Johnson
  // TODO: assert her row is no longer visible in the table
});*/

// TODO (stretch): assert the Total Users count decreases by 1 after deletion
