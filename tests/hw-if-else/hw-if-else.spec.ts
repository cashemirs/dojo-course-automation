import { test, expect } from "@playwright/test";

const isAdultEnough = (age: number | string) =>
  typeof age === 'number' && age >= 18
    ? 'Ви можете голосувати.'
    : 'Ви ще не можете голосувати.';

test("18 повертає 'Ви можете голосувати.'", () => {
  expect(isAdultEnough(18)).toBe('Ви можете голосувати.');
});

test("19 повертає 'Ви можете голосувати.'", () => {
  expect(isAdultEnough(19)).toBe('Ви можете голосувати.');
});

test("17 повертає 'Ви ще не можете голосувати.'", () => {
  expect(isAdultEnough(17)).toBe('Ви ще не можете голосувати.');
});

test("0 повертає 'Ви ще не можете голосувати.'", () => {
  expect(isAdultEnough(0)).toBe('Ви ще не можете голосувати.');
});


test("Строка повертає 'Ви ще не можете голосувати.'", () => {
  expect(isAdultEnough('str')).toBe('Ви ще не можете голосувати.');
});

test("Булевий тип повертає 'Ви ще не можете голосувати.'", () => {
  expect(isAdultEnough('str')).toBe('Ви ще не можете голосувати.');
});