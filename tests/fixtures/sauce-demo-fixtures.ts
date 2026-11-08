import { test as base } from '@playwright/test';
import { AppMenuComponent } from '../sauce-demo/components/app-menu.component';
import { CartPage } from '../sauce-demo/pages/cart.page';
import { CheckoutPage } from '../sauce-demo/pages/checkout.page';
import { InventoryPage } from '../sauce-demo/pages/inventory.page';
import { LoginPage } from '../sauce-demo/pages/login.page';
import { ProductPage } from '../sauce-demo/pages/product.page';

type SauceDemoUser = {
  username: string;
  password: string;
};

type SauceDemoOptions = {
  user: SauceDemoUser;
};

type SauceDemoFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  appMenu: AppMenuComponent;
  autoLogin: void;
  autoLogout: void;
};

export const sauceDemoUsers = {
  standardUser: { username: 'standard_user', password: 'secret_sauce' },
  visualUser: { username: 'visual_user', password: 'secret_sauce' },
  invalidUser: { username: 'standard_user', password: 'wrong_password' },
} satisfies Record<string, SauceDemoUser>;

export const test = base.extend<SauceDemoOptions & SauceDemoFixtures>({
  user: [sauceDemoUsers.standardUser, { option: true }],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  appMenu: async ({ page }, use) => {
    await use(new AppMenuComponent(page));
  },

  autoLogin: [async ({ loginPage, user }, use) => {
    await loginPage.open();
    await loginPage.login(user.username, user.password);
    await use();
  }, { auto: true }],

  autoLogout: [async ({ appMenu, autoLogin }, use) => {
    void autoLogin;
    await use();

    if (await appMenu.isLoggedIn()) {
      await appMenu.logout();
    }
  }, { auto: true }],
});
