import { test, expect } from "@playwright/test";

function isAdultEnough(age: unknown) {
    if (typeof age !== "number") {
        return('Передайте число');
    }
    if (age < 18) {
        return 'Ви ще не можете голосувати.'
    } else 
        return 'Ви можете голосувати.'
};

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
    expect(isAdultEnough('str')).toBe('Передайте число');
});

test("Булевий тип повертає 'Передайте число'", () => {
    expect(isAdultEnough(true)).toBe('Передайте число');
});