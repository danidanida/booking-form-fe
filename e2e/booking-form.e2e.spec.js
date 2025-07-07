import { test, expect } from '@playwright/test';

test('Full booking flow', async ({ page }) => {
  await page.goto('/');
  // Select departure and arrival stations
  await page.getByLabel('Departure').click();
  await page.getByRole('option').first().click();
  await page.getByLabel('Arrival').click();
  await page.getByRole('option').nth(1).click();
  // Add a passenger
  await page.getByRole('button', { name: /increment passenger/i }).click();
  // Open the passenger modal by clicking the edit button
  await page.getByRole('button', { name: /edit passenger/i }).click();
  // Fill in passenger 1
  await page.getByLabel('Full Name').fill('John Doe');
  await page.getByLabel('Phone').fill('+66912345678');
  await page.getByLabel('Email').fill('john@example.com');
  await page.getByLabel('Birthdate').fill('01/01/1990');
  await page.getByLabel('Passport Number').fill('A1234567');
  await page.getByLabel('Passport Expiry').fill('01/01/2030');
  // Save passenger 1 and close modal
  await page.getByRole('button', { name: /save/i }).click();
  // Now submit the form
  await page.getByRole('button', { name: /submit booking/i }).click();
  // Check for success message
  await expect(page.getByText(/success/i)).toBeVisible();
}); 