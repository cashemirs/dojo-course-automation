import { BaseLocators } from './base.locators';

export class LoginLocators extends BaseLocators {
  readonly usernameLocator = this.page.getByRole('textbox', { name: 'Username' });
  readonly passwordLocator = this.page.getByRole('textbox', { name: 'Password' });
  readonly loginButtonLocator = this.page.getByRole('button', { name: 'Login', exact: true });
  readonly errorMessageLocator = this.page.locator('[data-test="error"]');
}
