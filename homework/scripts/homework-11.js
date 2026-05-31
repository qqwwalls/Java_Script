"use strict";

function washDishes() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Посуд вимито"), 2000);
  });
}

function cleanRoom() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Кімнату прибрано"), 4000);
  });
}

function makeDinner() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Вечеря приготована"), 7000);
  });
}

washDishes()
  .then((result) => {
    console.log(result);
    return cleanRoom();
  })
  .then((result) => {
    console.log(result);
    return makeDinner();
  })
  .then((result) => {
    console.log(result);
  });

function sortArray(array) {
  return new Promise((resolve, reject) => {
    if (!array || array.length === 0) {
      reject("Масив порожній");
    } else {
      setTimeout(() => {
        const sorted = [...array].sort((a, b) => a - b);
        localStorage.setItem("sortedArray", JSON.stringify(sorted));
        resolve(sorted);
      }, 2000);
    }
  });
}

sortArray([5, 2, 8, 1, 4])
  .then((sorted) => console.log("Відсортований масив:", sorted))
  .catch((error) => console.error(error));

sortArray([])
  .then((sorted) => console.log(sorted))
  .catch((error) => console.error(error));

function multiplyAsync(a, b) {
  return new Promise((resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
      reject("Некоректні значення");
    } else {
      setTimeout(() => {
        resolve(a * b);
      }, 2000);
    }
  });
}

async function main() {
  try {
    const result = await multiplyAsync(6, 9);
    console.log("Результат множення:", result);
  } catch (error) {
    console.error("Помилка:", error);
  }
}

main();