import { ProductItemComponent } from '../components/product-item.component';
import { BasePage } from './base.page';
import { InventoryLocators } from './inventory.locators';

export class InventoryPage extends BasePage {
  readonly locators = new InventoryLocators(this.page);
  readonly products = new ProductItemComponent(this.page);

  async addToCartByTitle(title: string) {
    await this.locators.getAddButtonLocatorByProduct(this.products.getProductByTitle(title)).click();
  }

  async removeFromCartByTitle(title: string) {
    await this.locators.getRemoveButtonLocatorByProduct(this.products.getProductByTitle(title)).click();
  }

  async openProduct(title: string) {
    await this.locators.getNameLocatorByProduct(this.products.getProductByTitle(title)).click();
  }

  async getPriceByTitle(title: string) {
    return this.locators.getPriceLocatorByProduct(this.products.getProductByTitle(title)).innerText();
  }

  async getProductNames() {
    return this.locators.productNamesLocator.allTextContents();
  }

  async openCart() { await this.locators.cartLocator.click(); }
  async sortBy(label: string) { await this.locators.sortLocator.selectOption({ label }); }
}
