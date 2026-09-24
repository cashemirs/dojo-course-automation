import { test, expect, type APIRequestContext } from '@playwright/test';

type UserData = {
  username: string;
  email: string;
  password: string;
};

async function createUser(request: APIRequestContext, user: UserData) {
  const response = await request.post('http://104.168.59.50/api/users', {
    data: { user },
  });

  await expect(response).toBeOK();
  return response.json();
}

const uniqueEmail = () => `student-${Date.now()}-${Math.random()}@example.com`;
const uniqueUsername = () => `student-${Date.now()}`;
const validPassword = 'ValidPassword123!';
const shortPassword = 'word';
const invalidPassword = 'invalidPassword123!';



test.describe('Registration', { tag: '@auth' }, () => {
  test('Registration Poland user use valid data', async ({ page }) => {
    const userName = uniqueUsername();

    await page.goto('/register');
    await page.getByLabel(/username/i).fill(userName);
    await page.getByLabel(/email/i).fill(uniqueEmail());
    await page.getByTestId('auth-password').fill(validPassword);
    await page.getByTestId('register-confirm-password').fill(validPassword);
    await page.getByLabel('Country').selectOption({ label: 'Poland' });
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await page.getByTestId('nav-profile').click();

    await expect(page.getByTestId('profile-username')).toHaveText(userName);
  });

  test('Registration use used email', async ({ page, request }) => {

    const user = {
      username: uniqueUsername(),
      email: uniqueEmail(),
      password: validPassword,
    };
    await createUser(request, user);

    await page.goto('/register');
    await page.getByLabel(/username/i).fill(user.username);
    await page.getByLabel(/email/i).fill(user.email);
    await page.getByTestId('auth-password').fill(validPassword);
    await page.getByTestId('register-confirm-password').fill(validPassword);
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    await expect(page.getByTestId('error-messages')).toBeVisible();
  });

  test('Registration use invalid short password', async ({ page, request }) => {

    await page.goto('/register');

    await page.getByLabel(/username/i).fill(uniqueUsername());
    await page.getByLabel(/email/i).fill(uniqueEmail());
    await page.getByTestId('auth-password').fill(shortPassword);
    await page.getByTestId('register-confirm-password').fill(shortPassword);
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    const errorMessage = page.getByTestId('error-messages');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('пароль має містити щонайменше 6 символів');
  });
});

test.describe('Login', { tag: '@auth' }, () => {
  test('successful login use valid credentials', async ({ page, request }) => {
    const user = {
      username: uniqueUsername(),
      email: uniqueEmail(),
      password: validPassword,
    };
    await createUser(request, user);

    await page.goto('/login');
    await page.getByLabel(/Email/i).fill(user.email);
    await page.getByLabel(/Password/i).fill(user.password);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    await expect(page.getByTestId('nav-profile')).toContainText(user.username);
    await expect(page).toHaveURL('http://104.168.59.50/articles');

  });

  test('unsuccessful login use invalid password', async ({ page, request }) => {
    const user = {
      username: uniqueUsername(),
      email: uniqueEmail(),
      password: validPassword,
    };
    await createUser(request, user);

    await page.goto('/login');
    await page.getByLabel(/Email/i).fill(user.email);
    await page.getByLabel(/Password/i).fill(invalidPassword);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    await expect(page).toHaveURL('http://104.168.59.50/articles/login');
    await expect(page.getByTestId('error-messages')).toContainText('email or password неправильні');
  });

  test('unsuccessful login use unregistered user', async ({ page, request }) => {
    await page.goto('/login');

    await page.getByLabel(/Email/i).fill(uniqueEmail());
    await page.getByLabel(/Password/i).fill(validPassword);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    await expect(page).toHaveURL('http://104.168.59.50/articles/login');
    await expect(page.getByTestId('error-messages')).toContainText('email or password неправильні');
  });
});
