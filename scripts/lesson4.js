import User from "./User.js";
import Button from "./Button.js";

// Регулярні вирази RegExp - Regular Expression
const emailTemplate = /^\S+@\S+\.\S+$/;
console.log(emailTemplate.test("bob@gmail.com"));

console.log("he l  lo world".replace(/\s/g, "*"));

const spacesTemplate = new RegExp("\\s+");
console.log(spacesTemplate.test("he l  lo world"));

// Запитайте у користувача номер телефона через prompt і перевірте,
// що він відповідає регулярному виразу:
// +3цифри(двіцифри)-2цифри-3цифри-700
// Якщо відповідає, виведіть повідомлення Success.
// Інакше повідомлення про помилку та запитайте знову.
const phoneTemplate = /^\+\d{3}\(\d{2}\)-\d{2}-\d{3}-700$/;
let phoneNumber = prompt("Введіть номер телефона:");

while (!phoneTemplate.test(phoneNumber)) {
  alert("Помилка. Номер телефона введено неправильно.");
  phoneNumber = prompt("Введіть номер телефона:");
}

alert("Success");

const userLogin = prompt("Введіть логін користувача:");
const userAge = Number(prompt("Введіть вік користувача:"));
const user = new User(userLogin, userAge);
const nameElement = document.getElementById("name");
const newUserLogin = prompt("Введіть новий логін користувача:");

console.log("Об'єкт, створений з класу User:", user);
console.log("Початкові дані user.toString():", user.toString());
console.log("Кількість створених користувачів:");
User.showInfo();

user.login = newUserLogin;

console.log("Setter user.login змінив логін і викликав приватний метод #changeAge()");
console.log("Нові дані user.toString():", user.toString());

nameElement.innerText = user.toString();

// Практика: клас Button
const firstButton = new Button(40, 120, "Save", 16, "blue", "white");
const secondButton = new Button(50, 150, "Cancel", 18, "gray", "black");
const thirdButton = new Button(60, 180, "Delete", 20, "red", "white");

console.log("Кількість створених кнопок:", Button.showCount());

firstButton.show();
secondButton.show();
thirdButton.show();

console.log("Початкова висота першої кнопки:", firstButton.height);
console.log("Початкова ширина першої кнопки:", firstButton.width);

firstButton.height = 45;
firstButton.width = 130;

console.log("Нова висота першої кнопки:", firstButton.height);
console.log("Нова ширина першої кнопки:", firstButton.width);
console.log("Перша кнопка після змін:", firstButton);
