import type { Locator } from '@playwright/test';
import { BaseLocators } from './base.locators';

export class CartLocators extends BaseLocators {
  readonly checkoutButtonLocator = this.page.getByRole('button', { name: 'Checkout' });
  readonly continueShoppingButtonLocator = this.page.getByRole('button', { name: 'Continue Shopping' });
  readonly getRemoveButtonLocatorByProduct = (productLocator: Locator) => productLocator.getByRole('button', { name: 'Remove' });
}
