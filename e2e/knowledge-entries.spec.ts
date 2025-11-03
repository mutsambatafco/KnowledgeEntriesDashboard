import { test, expect } from '@playwright/test';

test.describe('Knowledge Base Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the app header and title', async ({ page }) => {
    await expect(page.locator('h1:has-text("Knowledge Base")')).toBeVisible();
  });

  test('should create a new knowledge entry', async ({ page }) => {
    await page.click('button:has-text("New Entry")');

    await expect(page.locator('h2:has-text("New Entry")')).toBeVisible();

    await page.fill('#title', 'Test Knowledge Entry');
    await page.fill('#description', 'This is a detailed test description for the knowledge entry that should be at least 10 characters long.');

    await page.click('button[type="submit"]:has-text("Create")');

    await expect(page.locator('h3:has-text("Test Knowledge Entry")')).toBeVisible({ timeout: 10000 });
  });

  test('should edit an existing knowledge entry', async ({ page }) => {
    await page.click('button:has-text("New Entry")');
    await page.fill('#title', 'Entry to Edit');
    await page.fill('#description', 'This entry will be edited in the test.');
    await page.click('button[type="submit"]:has-text("Create")');

    await expect(page.locator('h3:has-text("Entry to Edit")')).toBeVisible({ timeout: 10000 });

    const entryCard = page.locator('div').filter({ hasText: 'Entry to Edit' }).first();
    await entryCard.locator('button[aria-label="Edit entry"]').click();

    await expect(page.locator('h2:has-text("Edit Entry")')).toBeVisible();

    await page.fill('#title', 'Updated Entry Title');
    await page.click('button[type="submit"]:has-text("Update")');

    await expect(page.locator('h3:has-text("Updated Entry Title")')).toBeVisible({ timeout: 10000 });
  });

  test('should delete a knowledge entry', async ({ page }) => {
    await page.click('button:has-text("New Entry")');
    await page.fill('#title', 'Entry to Delete');
    await page.fill('#description', 'This entry will be deleted in the test.');
    await page.click('button[type="submit"]:has-text("Create")');

    await expect(page.locator('h3:has-text("Entry to Delete")')).toBeVisible({ timeout: 10000 });

    const entryCard = page.locator('div').filter({ hasText: 'Entry to Delete' }).first();
    await entryCard.locator('button[aria-label="Delete entry"]').click();

    await expect(page.locator('h3:has-text("Delete Entry?")')).toBeVisible();

    await page.click('button:has-text("Delete")');

    await expect(page.locator('h3:has-text("Entry to Delete")')).not.toBeVisible({ timeout: 10000 });
  });

  test('should display empty state when no entries exist', async ({ page }) => {
    const entries = await page.locator('h3').filter({ hasText: /Entry/ }).count();

    if (entries > 0) {
      const deleteButtons = await page.locator('button[aria-label="Delete entry"]').all();
      for (const button of deleteButtons) {
        await button.click();
        await page.click('button:has-text("Delete")');
        await page.waitForTimeout(500);
      }
    }

    await expect(page.locator('h3:has-text("No Knowledge Entries Yet")')).toBeVisible();
    await expect(page.locator('button:has-text("Create First Entry")')).toBeVisible();
  });

  test('should validate form fields', async ({ page }) => {
    await page.click('button:has-text("New Entry")');

    await page.click('button[type="submit"]:has-text("Create")');

    await expect(page.locator('text=Title is required')).toBeVisible();
    await expect(page.locator('text=Description is required')).toBeVisible();

    await page.fill('#title', 'AB');
    await page.fill('#description', 'Short');
    await page.click('button[type="submit"]:has-text("Create")');

    await expect(page.locator('text=Title must be at least 3 characters')).toBeVisible();
    await expect(page.locator('text=Description must be at least 10 characters')).toBeVisible();
  });

  test('should close form when cancel is clicked', async ({ page }) => {
    await page.click('button:has-text("New Entry")');
    await expect(page.locator('h2:has-text("New Entry")')).toBeVisible();

    await page.click('button:has-text("Cancel")');
    await expect(page.locator('h2:has-text("New Entry")')).not.toBeVisible();
  });
});
