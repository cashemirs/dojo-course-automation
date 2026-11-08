import type { Page } from '@playwright/test';

export class ProductItemComponent {
  constructor(readonly page: Page) {}

  getProductByTitle(title: string) {
    return this.page.locator('[data-test="inventory-item"]').filter({
      has: this.page.locator('[data-test="inventory-item-name"]').getByText(title, { exact: true }),
    });
  }
}
