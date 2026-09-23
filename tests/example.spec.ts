import { test, expect } from '@playwright/test';

test('should calculate cart total', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Flat_White"]').click();

  await expect(page.locator('[data-test="checkout"]')).toHaveText('Total: $37.00');
});

test('should display Mocha promo', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="Flat_White"]').click();

  await expect(page.locator('.promo')).toBeVisible();
});

test('should add discounted Mocha', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="Flat_White"]').click();

  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await page.getByRole('link', { name: 'Cart page' }).click();

  const discountedMocha = page.locator('li.list-item').filter({
    has: page.locator('div').filter({ hasText: /^\(Discounted\) Mocha$/ }),
  });
  await expect(discountedMocha).toBeVisible();
  await expect(discountedMocha.getByText('$4.00', { exact: true })).toBeVisible();
});


test('should not display promo Mocha cup', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Flat_White"]').click();

  await expect(page.locator('.promo')).not.toBeVisible();
});

test('should remove all Americano from cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();

  await expect(page.locator('div').filter({ hasText: /^Americano$/ })).toBeVisible();
  await page.getByRole('button', { name: 'Remove all Americano' }).click();
  await expect(page.locator('div').filter({ hasText: /^Americano$/ })).not.toBeVisible();

});
