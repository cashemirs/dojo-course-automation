import { BasePage } from './base.page';
import { LoginLocators } from './login.locators';

export class LoginPage extends BasePage {
  readonly locators = new LoginLocators(this.page);

  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.locators.usernameLocator.fill(username);
    await this.locators.passwordLocator.fill(password);
    await this.locators.loginButtonLocator.click();
  }
}
