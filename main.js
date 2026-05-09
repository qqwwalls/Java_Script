let userName = prompt("Введіть ваше ім'я:");
alert("Привіт, " + userName + "!");

const CURRENT_YEAR = 2026;
let birthYear = Number(prompt("Введіть ваш рік народження:"));
let age = CURRENT_YEAR - birthYear;
alert("Вам " + age + " років");

let sideLength = Number(prompt("Введіть довжину сторони квадрата:"));
let perimeter = sideLength * 4;
alert("Периметр квадрата: " + perimeter);
