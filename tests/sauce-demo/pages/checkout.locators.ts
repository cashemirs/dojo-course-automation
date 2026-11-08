import { BaseLocators } from './base.locators';

export class CheckoutLocators extends BaseLocators {
  readonly firstNameLocator = this.page.getByRole('textbox', { name: 'First Name' });
  readonly lastNameLocator = this.page.getByRole('textbox', { name: 'Last Name' });
  readonly postalCodeLocator = this.page.getByRole('textbox', { name: 'Zip/Postal Code' });
  readonly continueButtonLocator = this.page.getByRole('button', { name: 'Continue', exact: true });
  readonly cancelButtonLocator = this.page.getByRole('button', { name: 'Cancel' });
  readonly finishButtonLocator = this.page.getByRole('button', { name: 'Finish' });
  readonly completeHeaderLocator = this.page.getByRole('heading', { name: 'Thank you for your order!' });
  readonly itemTotalLocator = this.page.locator('[data-test="subtotal-label"]');
  readonly taxLocator = this.page.locator('[data-test="tax-label"]');
  readonly totalLocator = this.page.locator('[data-test="total-label"]');
}
