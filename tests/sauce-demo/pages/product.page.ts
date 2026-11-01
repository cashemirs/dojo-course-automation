import { BasePage } from './base.page';
import { ProductLocators } from './product.locators';

export class ProductPage extends BasePage {
  readonly locators = new ProductLocators(this.page);

  async addToCart() { await this.locators.addButtonLocator.click(); }
  async removeFromCart() { await this.locators.removeButtonLocator.click(); }
  async backToProducts() { await this.locators.backButtonLocator.click(); }
  async getName() { return this.locators.nameLocator.innerText(); }
  async getPrice() { return this.locators.priceLocator.innerText(); }
}
