"use strict";

let rangeStart = Number(prompt("Введіть початок діапазону:"));
let rangeEnd = Number(prompt("Введіть кінець діапазону:"));

if (rangeStart > rangeEnd) {
  const temp = rangeStart;
  rangeStart = rangeEnd;
  rangeEnd = temp;
}

let rangeSum = 0;

for (let i = rangeStart; i <= rangeEnd; i++) {
  rangeSum += i;
}

alert(`Сума чисел у діапазоні: ${rangeSum}.`);

let firstNumber = Math.abs(Number(prompt("Введіть перше число для НСД:")));
let secondNumber = Math.abs(Number(prompt("Введіть друге число для НСД:")));

while (secondNumber !== 0) {
  const remainder = firstNumber % secondNumber;
  firstNumber = secondNumber;
  secondNumber = remainder;
}

alert(`Найбільший спільний дільник: ${firstNumber}.`);

const divisorNumber = Math.abs(Number(prompt("Введіть число, дільники якого потрібно знайти:")));
let divisors = "";

if (divisorNumber === 0) {
  alert("У числа 0 нескінченно багато дільників.");
} else {
  for (let i = 1; i <= divisorNumber; i++) {
    if (divisorNumber % i === 0) {
      divisors += `${i} `;
    }
  }

  alert(`Дільники числа ${divisorNumber}: ${divisors}`);
}

let digitsNumber = Math.abs(Number(prompt("Введіть число, щоб порахувати кількість цифр:")));
let digitsCount = 0;

do {
  digitsCount++;
  digitsNumber = Math.floor(digitsNumber / 10);
} while (digitsNumber > 0);

alert(`Кількість цифр: ${digitsCount}.`);

let positiveCount = 0;
let negativeCount = 0;
let zeroCount = 0;
let evenCount = 0;
let oddCount = 0;

for (let i = 1; i <= 10; i++) {
  const userNumber = Number(prompt(`Введіть число ${i} з 10:`));

  if (userNumber > 0) {
    positiveCount++;
  } else if (userNumber < 0) {
    negativeCount++;
  } else {
    zeroCount++;
  }

  if (userNumber % 2 === 0) {
    evenCount++;
  } else {
    oddCount++;
  }
}

alert(
  `Статистика:
Додатних чисел: ${positiveCount}
Від'ємних чисел: ${negativeCount}
Нулів: ${zeroCount}
Парних чисел: ${evenCount}
Непарних чисел: ${oddCount}`
);
