import { BaseLocators } from './base.locators';

export class ProductLocators extends BaseLocators {
  readonly nameLocator = this.page.locator('.inventory_details_container [data-test="inventory-item-name"]');
  readonly priceLocator = this.page.locator('.inventory_details_container [data-test="inventory-item-price"]');
  readonly addButtonLocator = this.page.getByRole('button', { name: 'Add to cart' });
  readonly removeButtonLocator = this.page.getByRole('button', { name: 'Remove' });
  readonly backButtonLocator = this.page.getByRole('button', { name: 'Back to products' });
}
