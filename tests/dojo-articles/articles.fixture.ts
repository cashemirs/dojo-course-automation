import { randomUUID } from 'node:crypto';
import { test as base } from '@playwright/test';
import { ArticlesPage, type ArticleData } from './articles.page';

type ArticlesFixtures = {
  articlesPage: ArticlesPage;
  readerPage: ArticlesPage;
  createArticle: (article: ArticleData) => Promise<void>;
};

export const test = base.extend<ArticlesFixtures>({
  articlesPage: async ({ page }, use) => {
    const id = randomUUID();
    const articlesPage = new ArticlesPage(page);

    // Для каждого теста создаётся свой пользователь.
    const user = {
      username: `student-${id}`,
      email: `student-${id}@example.com`,
      password: 'ValidPassword123!',
    };

    await articlesPage.register(user);

    await use(articlesPage);
  },

  readerPage: async ({ browser, baseURL }, use) => {
    const context = await browser.newContext({ baseURL, storageState: { cookies: [], origins: [] } });
    try {
      const readerPage = new ArticlesPage(await context.newPage());
      const id = randomUUID();

      await readerPage.register({
        username: `reader-${id}`,
        email: `reader-${id}@example.com`,
        password: 'ValidPassword123!',
      });

      await use(readerPage);
    } finally {
      await context.close();
    }
  },

  createArticle: async ({ articlesPage }, use) => {
    // Фикстура передаёт функцию: тест сам вызывает её в цикле.
    async function createArticle(article: ArticleData) {
      await articlesPage.createArticle(article);
    }

    await use(createArticle);
  },
});

export { expect } from '@playwright/test';
