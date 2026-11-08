import { BasePage } from './base.page';
import { CheckoutLocators } from './checkout.locators';

export class CheckoutPage extends BasePage {
  readonly locators = new CheckoutLocators(this.page);

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.locators.firstNameLocator.fill(firstName);
    await this.locators.lastNameLocator.fill(lastName);
    await this.locators.postalCodeLocator.fill(postalCode);
  }

  async continue() { await this.locators.continueButtonLocator.click(); }
  async cancel() { await this.locators.cancelButtonLocator.click(); }
  async finish() { await this.locators.finishButtonLocator.click(); }
  async getItemTotal() { return this.locators.itemTotalLocator.innerText(); }
  async getTax() { return this.locators.taxLocator.innerText(); }
  async getTotal() { return this.locators.totalLocator.innerText(); }
}
