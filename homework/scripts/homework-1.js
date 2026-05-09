"use strict";

const CURRENT_YEAR = 2026;

const userName = prompt("Введіть ваше ім'я:");
alert(`Привіт, ${userName}!`);

const birthYear = Number(prompt("Введіть ваш рік народження:"));
const userAge = CURRENT_YEAR - birthYear;
alert(`Вам ${userAge} років.`);

const squareSide = Number(prompt("Введіть довжину сторони квадрата:"));
const squarePerimeter = squareSide * 4;
alert(`Периметр квадрата: ${squarePerimeter}.`);

const circleRadius = Number(prompt("Введіть радіус кола:"));
const circleArea = Math.PI * circleRadius ** 2;
alert(`Площа кола: ${circleArea}.`);

const distance = Number(prompt("Введіть відстань між містами у кілометрах:"));
const time = Number(prompt("За скільки годин ви хочете дістатися?"));
const speed = distance / time;
alert(`Потрібна швидкість: ${speed} км/год.`);
