import type { Locator } from '@playwright/test';
import { BaseLocators } from './base.locators';

export class InventoryLocators extends BaseLocators {
  readonly pageTitleLocator = this.page.getByText('Products', { exact: true });
  readonly cartLocator = this.page.locator('[data-test="shopping-cart-link"]');
  readonly sortLocator = this.page.getByRole('combobox', { name: 'Sort products' });
  readonly productNamesLocator = this.page.locator('[data-test="inventory-item-name"]');
  readonly getAddButtonLocatorByProduct = (productLocator: Locator) => productLocator.getByRole('button', { name: 'Add to cart' });
  readonly getRemoveButtonLocatorByProduct = (productLocator: Locator) => productLocator.getByRole('button', { name: 'Remove' });
  readonly getNameLocatorByProduct = (productLocator: Locator) => productLocator.locator('[data-test="inventory-item-name"]');
  readonly getPriceLocatorByProduct = (productLocator: Locator) => productLocator.locator('[data-test="inventory-item-price"]');
}
