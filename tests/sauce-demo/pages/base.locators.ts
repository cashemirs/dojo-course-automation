import type { Page } from '@playwright/test';

export class BaseLocators {
  constructor(readonly page: Page) {}
}
