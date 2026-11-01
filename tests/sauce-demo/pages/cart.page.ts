import { ProductItemComponent } from '../components/product-item.component';
import { BasePage } from './base.page';
import { CartLocators } from './cart.locators';

export class CartPage extends BasePage {
  readonly locators = new CartLocators(this.page);
  readonly products = new ProductItemComponent(this.page);

  async removeFromCartByTitle(title: string) {
    await this.locators.getRemoveButtonLocatorByProduct(this.products.getProductByTitle(title)).click();
  }

  async checkout() { await this.locators.checkoutButtonLocator.click(); }
  async continueShopping() { await this.locators.continueShoppingButtonLocator.click(); }
}
