import { faker } from '@faker-js/faker';

export const productTitle = 'Sauce Labs Backpack';

export const createCheckoutUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
});
