"use strict";

class Marker {
  constructor(color, inkAmount) {
    this.color = color;
    this.inkAmount = inkAmount;
  }

  print(text) {
    let printedText = "";

    for (let i = 0; i < text.length; i++) {
      if (this.inkAmount <= 0) {
        break;
      }

      if (text[i] === " ") {
        printedText += text[i];
      } else if (this.inkAmount >= 0.5) {
        printedText += text[i];
        this.inkAmount -= 0.5;
      } else {
        break;
      }
    }

    document.write(`<p style="color: ${this.color};">${printedText}</p>`);
  }
}

class RefillableMarker extends Marker {
  refill(inkAmount) {
    this.inkAmount += inkAmount;

    if (this.inkAmount > 100) {
      this.inkAmount = 100;
    }
  }
}

class ExtendedDate extends Date {
  showDateText() {
    const months = [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ];

    return `${this.getDate()} ${months[this.getMonth()]}`;
  }

  isFutureOrCurrentDate() {
    const currentDate = new Date();
    const checkedDate = new Date(this);

    currentDate.setHours(0, 0, 0, 0);
    checkedDate.setHours(0, 0, 0, 0);

    return checkedDate >= currentDate;
  }

  isLeapYear() {
    const year = this.getFullYear();

    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  getNextDate() {
    const nextDate = new ExtendedDate(this);
    nextDate.setDate(this.getDate() + 1);

    return nextDate;
  }
}

document.write(`
  <style>
    body {
      max-width: 900px;
      margin: 30px auto;
      font-family: Arial, sans-serif;
      font-size: 20px;
      line-height: 1.5;
    }
  </style>
`);

document.write("<h2>Завдання 1</h2>");

const simpleMarker = new Marker("blue", 5);

document.write(`<p>Чорнила в простому маркері: ${simpleMarker.inkAmount}%</p>`);
simpleMarker.print("Hello JavaScript marker!");
document.write(`<p>Залишок чорнил: ${simpleMarker.inkAmount}%</p>`);

const refillableMarker = new RefillableMarker("green", 3);

document.write(
  `<p>Чорнила в маркері, що заправляється: ${refillableMarker.inkAmount}%</p>`,
);
refillableMarker.print("Refillable marker text example.");
document.write(`<p>Залишок чорнил: ${refillableMarker.inkAmount}%</p>`);

refillableMarker.refill(20);
document.write(`<p>Після заправки: ${refillableMarker.inkAmount}%</p>`);
refillableMarker.print("Text after refill.");
document.write(`<p>Залишок чорнил: ${refillableMarker.inkAmount}%</p>`);

document.write("<h2>Завдання 2</h2>");

const extendedDate = new ExtendedDate();
const pastDate = new ExtendedDate(2020, 0, 15);
const nextDate = extendedDate.getNextDate();

document.write(`<p>Дата текстом: ${extendedDate.showDateText()}</p>`);
document.write(
  `<p>Поточна дата не минула: ${extendedDate.isFutureOrCurrentDate()}</p>`,
);
document.write(
  `<p>Дата 15 січня 2020 не минула: ${pastDate.isFutureOrCurrentDate()}</p>`,
);
document.write(`<p>Високосний рік: ${extendedDate.isLeapYear()}</p>`);
document.write(`<p>Наступна дата: ${nextDate.toLocaleDateString("uk-UA")}</p>`);
