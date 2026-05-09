"use strict";

//1) functions declaration
function f1(a, b) {
  let str = "";
  for (let i = 0; i < arguments.length; i++) {
    str += arguments[i] + " ";
  }
  console.log(str);
}
f1(2, 3, 4);
f1(7, 8);

//2) functions expressions
let f2 = function (a, b) {
  return a + b;
};
console.log(f2(2, 3));
//3) arrow functions (немає arguments)
let f3 = (a) => a * a;
console.log(f3(3));

const arr = [4, 2, 7];
const arr2 = new Array();
arr.push(3); //4 2 7 3
arr.pop(); //3   4 2 7
console.log(arr);
console.log(arr.shift()); //
console.log(arr);
arr.unshift(12);

const arr3 = arr;
arr3[0] = 90;
console.log(arr);
//arr.length
// O(1), O(n)

//Вставити елемент на початок масива за O(1)
const numbers = {
  values: {
    0: 4,
    1: 2,
    2: 7,
  },
  start: 0,
  length: 3,
};

function addFirst(arr, value) {
  arr.start--;
  arr.values[arr.start] = value;
  arr.length++;
}

addFirst(numbers, 12);
console.log(numbers);

// Завдання зі switch
const monthNumber = Number(prompt("Введіть номер місяця:"));
let monthName;

switch (monthNumber) {
  case 1:
    monthName = "Січень";
    break;
  case 2:
    monthName = "Лютий";
    break;
  case 3:
    monthName = "Березень";
    break;
  case 4:
    monthName = "Квітень";
    break;
  case 5:
    monthName = "Травень";
    break;
  case 6:
    monthName = "Червень";
    break;
  case 7:
    monthName = "Липень";
    break;
  case 8:
    monthName = "Серпень";
    break;
  case 9:
    monthName = "Вересень";
    break;
  case 10:
    monthName = "Жовтень";
    break;
  case 11:
    monthName = "Листопад";
    break;
  case 12:
    monthName = "Грудень";
    break;
  default:
    monthName = "Невірний номер місяця";
}

alert(monthName);

const firstCalcNumber = Number(prompt("Введіть перше число:"));
const secondCalcNumber = Number(prompt("Введіть друге число:"));
const action = prompt("Введіть знак (+, -, *, /):");
let calcResult;

switch (action) {
  case "+":
    calcResult = firstCalcNumber + secondCalcNumber;
    break;
  case "-":
  case "–":
    calcResult = firstCalcNumber - secondCalcNumber;
    break;
  case "*":
    calcResult = firstCalcNumber * secondCalcNumber;
    break;
  case "/":
    calcResult =
      secondCalcNumber === 0
        ? "На нуль ділити не можна"
        : firstCalcNumber / secondCalcNumber;
    break;
  default:
    calcResult = "Невідомий знак";
}

alert(calcResult);

// Завдання з тернарним оператором
const firstNumber = Number(prompt("Введіть перше число:"));
const secondNumber = Number(prompt("Введіть друге число:"));
const biggerNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
alert("Більше число: " + biggerNumber);

const number = Number(prompt("Введіть число:"));
const multiplicityMessage =
  number % 5 === 0 ? "Число кратне 5" : "Число не кратне 5";
alert(multiplicityMessage);

const planet = prompt("Введіть назву планети:");
const greeting =
  planet === "Земля" || planet === "земля"
    ? "Привіт, землянине!"
    : "Привіт, інопланетянине!";
alert(greeting);
