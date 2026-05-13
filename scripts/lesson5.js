"use strict";

// Тема 1: __proto__ та Object.create
const figurePrototype = {
  name: "Фігура",

  showInfo() {
    console.log(`Фігура: ${this.name}`);
  },

  getArea() {
    return 0;
  },

  getPerimeter() {
    return 0;
  },
};

const squareByProto = {
  name: "Квадрат через __proto__",
  side: 5,
  __proto__: figurePrototype,

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони: a = ${this.side}, b = ${this.side}, c = ${this.side}, d = ${this.side}`);
  },

  getArea() {
    return this.side * this.side;
  },

  getPerimeter() {
    return this.side * 4;
  },
};

squareByProto.showInfo();
console.log(`Площа: ${squareByProto.getArea()}`);
console.log(`Периметр: ${squareByProto.getPerimeter()}`);
console.log("--------------------");

const rectangleByCreate = Object.create(figurePrototype);
rectangleByCreate.name = "Прямокутник через Object.create";
rectangleByCreate.width = 4;
rectangleByCreate.height = 8;

rectangleByCreate.showInfo = function () {
  console.log(`Фігура: ${this.name}`);
  console.log(`Сторони: a = ${this.width}, b = ${this.height}, c = ${this.width}, d = ${this.height}`);
};

rectangleByCreate.getArea = function () {
  return this.width * this.height;
};

rectangleByCreate.getPerimeter = function () {
  return (this.width + this.height) * 2;
};

rectangleByCreate.showInfo();
console.log(`Площа: ${rectangleByCreate.getArea()}`);
console.log(`Периметр: ${rectangleByCreate.getPerimeter()}`);
console.log("--------------------");

// Тема 2: Успадкування в класах
class Figure {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  showInfo() {
    console.log(`Фігура: ${this.name}`);
  }

  getArea() {
    return 0;
  }

  getPerimeter() {
    return 0;
  }
}

class Square extends Figure {
  constructor(side) {
    super("Квадрат");
    this.side = side;
  }

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони: a = ${this.side}, b = ${this.side}, c = ${this.side}, d = ${this.side}`);
  }

  getArea() {
    return this.side * this.side;
  }

  getPerimeter() {
    return this.side * 4;
  }
}

class Rectangle extends Figure {
  constructor(width, height) {
    super("Прямокутник");
    this.width = width;
    this.height = height;
  }

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони: a = ${this.width}, b = ${this.height}, c = ${this.width}, d = ${this.height}`);
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return (this.width + this.height) * 2;
  }
}

class Triangle extends Figure {
  constructor(sideA, sideB, sideC) {
    super("Трикутник");
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони: a = ${this.sideA}, b = ${this.sideB}, c = ${this.sideC}`);
  }

  getArea() {
    const halfPerimeter = this.getPerimeter() / 2;

    return Math.sqrt(
      halfPerimeter *
        (halfPerimeter - this.sideA) *
        (halfPerimeter - this.sideB) *
        (halfPerimeter - this.sideC),
    );
  }

  getPerimeter() {
    return this.sideA + this.sideB + this.sideC;
  }
}

const figures = [
  new Square(5),
  new Rectangle(4, 8),
  new Triangle(3, 4, 5),
  new Square(10),
];

for (let i = 0; i < figures.length; i++) {
  const figure = figures[i];

  figure.showInfo();
  console.log(`Площа: ${figure.getArea()}`);
  console.log(`Периметр: ${figure.getPerimeter()}`);
  console.log("--------------------");
}
