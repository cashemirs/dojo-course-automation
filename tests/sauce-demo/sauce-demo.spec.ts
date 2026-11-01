
import { expect, test } from '@playwright/test';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';
import { InventoryPage } from './pages/inventory.page';
import { LoginPage } from './pages/login.page';
import { ProductPage } from './pages/product.page';
import { createCheckoutUser, productTitle } from './sauce-demo.data';

test.describe('Авторизация', () => {
  test('Пользователь входит с правильными данными', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.locators.pageTitleLocator).toBeVisible();
  });

  test('Пользователь не входит с неправильным паролем', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.locators.errorMessageLocator).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});

test.describe('Товары', () => {
  test('Пользователь открывает страницу товара', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.openProduct(productTitle);

    await expect(productPage.locators.nameLocator).toHaveText(productTitle);
  });

  test('Пользователь сортирует товары', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.sortBy('Name (Z to A)');

    const productNames = await inventoryPage.getProductNames();
    const expectedProductNames = [...productNames].sort().reverse();

    expect(productNames).toEqual(expectedProductNames);
  });
});

test.describe('Корзина и заказ', () => {
  test('Пользователь добавляет товар в корзину', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCartByTitle(productTitle);
    await inventoryPage.openCart();

    await expect(cartPage.products.getProductByTitle(productTitle)).toBeVisible();
  });

  test('Пользователь удаляет товар из корзины', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCartByTitle(productTitle);
    await inventoryPage.openCart();
    await expect(cartPage.products.getProductByTitle(productTitle)).toBeVisible();

    await cartPage.removeFromCartByTitle(productTitle);

    await expect(cartPage.products.getProductByTitle(productTitle)).toHaveCount(0);
  });

  test('Пользователь оформляет заказ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutUser = createCheckoutUser();

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
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
