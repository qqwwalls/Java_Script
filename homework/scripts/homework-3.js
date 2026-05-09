"use strict";

const car = {
  manufacturer: "Toyota",
  model: "Corolla",
  year: 2020,
  averageSpeed: 90,
};

function showCarInfo(carInfo) {
  alert(
    `Інформація про автомобіль:
Виробник: ${carInfo.manufacturer}
Модель: ${carInfo.model}
Рік випуску: ${carInfo.year}
Середня швидкість: ${carInfo.averageSpeed} км/год`
  );
}

function calculateTravelTime(distance, carInfo) {
  const drivingTime = distance / carInfo.averageSpeed;
  const breaksCount = Math.floor(drivingTime / 4);

  return drivingTime + breaksCount;
}

showCarInfo(car);

const distance = Number(prompt("Введіть відстань у кілометрах:"));
const travelTime = calculateTravelTime(distance, car);

alert(`Необхідний час у дорозі: ${travelTime} год.`);

const printMachine = {
  fontSize: "20px",
  fontColor: "blue",
  fontFamily: "Arial",
  print(text) {
    alert(
      `Інформація про printMachine:
Розмір шрифту: ${this.fontSize}
Колір шрифту: ${this.fontColor}
Сімейство шрифту: ${this.fontFamily}
Текст: ${text}`
    );
  },
};

setTimeout(function () {
  printMachine.print("Hello, JavaScript!");
}, 5000);
