import type { Page } from '@playwright/test';

export class AppMenuComponent {
  readonly menuButtonLocator = this.page.getByRole('button', { name: 'Open Menu' });
  readonly logoutButtonLocator = this.page.getByRole('button', { name: 'Logout' });

  constructor(readonly page: Page) {}

  async isLoggedIn() {
    return this.menuButtonLocator.isVisible();
  }

  async logout() {
    await this.menuButtonLocator.click();
    await this.logoutButtonLocator.click();
  }
}
