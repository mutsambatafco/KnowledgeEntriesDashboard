import { test, expect } from '@playwright/test';

test.describe('Knowledge Entries Dashboard - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

    // Wait for the main content to be visible with a longer timeout
    await page.waitForSelector('main', { timeout: 30000 });

    // Additional wait to ensure page is fully loaded
    await page.waitForTimeout(2000);
  });

  test('should add a new knowledge entry', async ({ page }) => {
    // Click the New Entry button
    await page.getByRole('button', { name: /new entry|new/i }).first().click();

    // Wait for the form modal to appear
    await expect(page.getByRole('heading', { name: /new entry/i })).toBeVisible({ timeout: 10000 });

    // Fill in the title
    const testTitle = `Test Entry ${Date.now()}`;
    await page.locator('#title').fill(testTitle);

    // Fill in the description
    const testDescription = 'This is a comprehensive test description for automated testing purposes. It contains sufficient detail to pass validation.';
    await page.locator('#description').fill(testDescription);

    // Submit the form
    await page.getByRole('button', { name: /create/i }).click();

    // Wait for the modal to close (form is closed after successful submit)
    await expect(page.getByRole('heading', { name: /new entry/i })).not.toBeVisible({ timeout: 10000 });

    // Verify the entry appears in the list
    await expect(page.getByText(testTitle)).toBeVisible({ timeout: 10000 });
  });

  test('should delete a knowledge entry', async ({ page }) => {
    // First, create an entry to delete
    await page.getByRole('button', { name: /new entry|new/i }).first().click();
    await expect(page.getByRole('heading', { name: /new entry/i })).toBeVisible({ timeout: 10000 });

    const testTitle = `Entry to Delete ${Date.now()}`;
    await page.locator('#title').fill(testTitle);
    await page.locator('#description').fill('This entry will be deleted during testing.');
    await page.getByRole('button', { name: /create/i }).click();

    // Wait for the modal to close
    await expect(page.getByRole('heading', { name: /new entry/i })).not.toBeVisible({ timeout: 10000 });

    // Wait for entry to appear
    await expect(page.getByText(testTitle)).toBeVisible({ timeout: 10000 });

    // Find and click the delete button using aria-label
    const entryCard = page.getByText(testTitle).locator('..');
    await entryCard.getByLabel('Delete entry').click();

    // Wait for confirmation modal
    await expect(page.getByRole('heading', { name: /delete entry\?/i })).toBeVisible({ timeout: 10000 });

    // Confirm deletion - click the Delete button in the modal
    await page.locator('.fixed.inset-0').getByRole('button', { name: 'Delete' }).click();

    // Wait for modal to close
    await expect(page.getByRole('heading', { name: /delete entry\?/i })).not.toBeVisible({ timeout: 10000 });

    // Verify the entry is no longer visible
    await expect(page.getByText(testTitle)).not.toBeVisible();
  });
});
