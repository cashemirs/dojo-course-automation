import { randomUUID } from 'node:crypto';
import { test } from './articles.fixture';

test('10 созданных статей отображаются в Your Feed', async ({
  readerPage,
  createArticle,
}) => {
  const id = randomUUID();
  const titles: string[] = [];

  for (let number = 1; number <= 10; number++) {
    const article = {
      title: `Article ${number} ${id}`,
      description: `Description for article ${number}`,
      body: `Body for article ${number}`,
    };

    await createArticle(article);
    titles.push(article.title);
  }
  await readerPage.followTheAuthor(10, id);
  await readerPage.openYourFeed();

  for (const title of titles) {
    await readerPage.checkArticleInYourFeed(title);
  }
});
