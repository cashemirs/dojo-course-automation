import { test, expect } from '@playwright/test';

test('should reopen checkout form', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '×' }).click();
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).not.toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeVisible();
});
