
import { expect } from '@playwright/test';
import { sauceDemoUsers, test } from '../../fixtures/sauce-demo-fixtures';
import { createCheckoutUser, productTitle } from '../../sauce-demo/sauce-demo.data';

test.use({
  ignoreHTTPSErrors: true,
  user: sauceDemoUsers.standardUser,
});

test.describe('Authorization', () => {
  test('User logs in with valid credentials', async ({ inventoryPage }) => {
    await expect(inventoryPage.locators.pageTitleLocator).toBeVisible();
  });

  test.describe('Invalid credentials', () => {
    test.use({ user: sauceDemoUsers.invalidUser });

    test('User cannot log in with an invalid password', async ({ loginPage }) => {
      await expect(loginPage.locators.errorMessageLocator).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );
    });
  });
});

test.describe('Products', () => {
  test.use({ user: sauceDemoUsers.visualUser });

  test('User opens a product page', async ({ inventoryPage, productPage }) => {
    await inventoryPage.openProduct(productTitle);

    await expect(productPage.locators.nameLocator).toHaveText(productTitle);
  });

  test('User sorts products', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('Name (Z to A)');

    const productNames = await inventoryPage.getProductNames();
    const expectedProductNames = [...productNames].sort().reverse();

    expect(productNames).toEqual(expectedProductNames);
  });
});

test.describe('Cart and checkout', () => {
  test('User adds a product to the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCartByTitle(productTitle);
    await inventoryPage.openCart();

    await expect(cartPage.products.getProductByTitle(productTitle)).toBeVisible();
  });

  test('User removes a product from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCartByTitle(productTitle);
    await inventoryPage.openCart();
    await expect(cartPage.products.getProductByTitle(productTitle)).toBeVisible();

    await cartPage.removeFromCartByTitle(productTitle);

    await expect(cartPage.products.getProductByTitle(productTitle)).toHaveCount(0);
  });

  test('User completes checkout', async ({ inventoryPage, cartPage, checkoutPage }) => {
    const checkoutUser = createCheckoutUser();

    await inventoryPage.addToCartByTitle(productTitle);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
      checkoutUser.firstName,
      checkoutUser.lastName,
      checkoutUser.postalCode,
    );
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(checkoutPage.locators.completeHeaderLocator).toHaveText('Thank you for your order!');
  });
});
