"use strict";

// Завдання 1
// Написати сортування рядків за розміром від меншого до більшого.
const countries = [
  "Ukraine",
  "Austria",
  "Brazil",
  "Argentina",
  "Canada",
  "Belgium",
  "Australia",
  "Italy",
  "Bulgaria",
];

countries.sort((a, b) => a.length - b.length);
console.log(countries);

// Завдання 2
// Створити новий масив, який містить лише країни на A та B.
const countriesStartedWithAorB = countries.filter((country) => {
  return country[0] === "A" || country[0] === "B";
});

console.log(countriesStartedWithAorB);

// Завдання 3
// Дізнатись, чи є Austria в новому масиві.
const hasAustria = countriesStartedWithAorB.includes("Austria");
console.log(hasAustria);

// Завдання 4
// Функція приймає масив і повертає добуток всіх елементів масиву. (reduce)
function multiplyArray(arr) {
  return arr.reduce((result, el) => {
    return result * el;
  }, 1);
}

const numbersForMultiply = [2, 3, 4, 5];
console.log(multiplyArray(numbersForMultiply));

// Завдання 5
// Функція видалення елемента з масиву за вказаним індексом.
function removeElementByIndex(arr, index) {
  return arr.filter((el, i) => {
    return i !== index;
  });
}

const numbersForDelete = [10, 20, 30, 40, 50];
const numbersWithoutElement = removeElementByIndex(numbersForDelete, 2);
console.log(numbersWithoutElement);

// Завдання 6
// Створіть масив із 5 випадкових чисел у діапазоні (-10, 10).
function getRandomNumber() {
  return Math.floor(Math.random() * 21) - 10;
}

const randomNumbers = [];

for (let i = 0; i < 5; i++) {
  randomNumbers.push(getRandomNumber());
}

console.log(randomNumbers);

// Функція приймає 2 масиви і повертає новий масив із загальними елементами без повторень.
function getCommonElements(firstArr, secondArr) {
  const commonElements = firstArr.filter((el, index) => {
    return secondArr.includes(el) && firstArr.indexOf(el) === index;
  });

  return commonElements;
}

const firstNumbers = [1, 2, 3, 4, 5, 3, 2];
const secondNumbers = [3, 4, 5, 6, 7, 3];
console.log(getCommonElements(firstNumbers, secondNumbers));
console.log(getCommonElements(randomNumbers, firstNumbers));
