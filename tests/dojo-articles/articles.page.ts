import { expect, type Page } from '@playwright/test';

export type UserData = {
  username: string;
  email: string;
  password: string;
};

export type ArticleData = {
  title: string;
  description: string;
  body: string;
};

export class ArticlesPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async register(user: UserData) {
    await this.page.goto('/register');
    await this.page.getByLabel(/username/i).fill(user.username);
    await this.page.getByLabel(/email/i).fill(user.email);
    await this.page.getByTestId('auth-password').fill(user.password);
    await this.page.getByTestId('register-confirm-password').fill(user.password);
    await this.page.getByTestId('register-terms').check();
    await this.page.getByTestId('auth-submit').click();

    await expect(this.page.getByTestId('nav-profile')).toContainText(user.username);
  }

  async createArticle(article: ArticleData) {
    await this.page.getByTestId('nav-new-article').click();
    await this.page.getByTestId('editor-title').fill(article.title);
    await this.page.getByTestId('editor-description').fill(article.description);
    await this.page.getByTestId('editor-body').fill(article.body);
    await this.page.getByTestId('editor-submit').click();

    await expect(this.page.getByTestId('article-title')).toHaveText(article.title);
  }

  async followTheAuthor(number: number, id: string) {
    await this.page.goto(`/articles/article/article-${number}-${id}`);
    await this.page.getByTestId('article-follow-button').click();
  }

  async openYourFeed() {
    await this.page.getByTestId('nav-home').click();

    const yourFeedTab = this.page.getByTestId('feed-tab-your');
    await yourFeedTab.click();

    await expect(yourFeedTab).toHaveAttribute('data-active', 'true');
  }

  async checkArticleInYourFeed(title: string) {
    await expect(this.page.getByTestId('feed-tab-your')).toHaveAttribute('data-active', 'true');

    const articleTitle = this.page
      .getByTestId('article-list')
      .getByRole('heading', { name: title, exact: true });

    await expect(articleTitle, `В Your Feed отсутствует статья: ${title}`).toBeVisible();
  }
}
