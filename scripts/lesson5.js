"use strict";

// Тема 1: __proto__ та Object.create
const figurePrototype = {
  getSidesInfo() {
    return this.sides
      .map((side) => `${side.name}: ${side.length}`)
      .join(", ");
  },

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони: ${this.getSidesInfo()}`);
  },

  getPerimeter() {
    return this.sides.reduce((sum, side) => sum + side.length, 0);
  },
};

const squareByProto = {
  name: "Квадрат через __proto__",
  sides: [
    { name: "a", length: 5 },
    { name: "b", length: 5 },
    { name: "c", length: 5 },
    { name: "d", length: 5 },
  ],
  __proto__: figurePrototype,
};

squareByProto.showInfo();
console.log(`Периметр: ${squareByProto.getPerimeter()}`);

const rectangleByCreate = Object.create(figurePrototype);
rectangleByCreate.name = "Прямокутник через Object.create";
rectangleByCreate.sides = [
  { name: "a", length: 4 },
  { name: "b", length: 8 },
  { name: "c", length: 4 },
  { name: "d", length: 8 },
];

rectangleByCreate.showInfo();
console.log(`Периметр: ${rectangleByCreate.getPerimeter()}`);
console.log("--------------------");

// Тема 2: Успадкування в класах
class Figure {
  constructor(name, sides) {
    this._name = name;
    this.sides = sides;
  }

  get name() {
    return this._name;
  }

  getSidesInfo() {
    return this.sides
      .map((side) => `${side.name}: ${side.length}`)
      .join(", ");
  }

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони: ${this.getSidesInfo()}`);
  }

  getArea() {
    return 0;
  }

  getPerimeter() {
    return this.sides.reduce((sum, side) => sum + side.length, 0);
  }
}

class Square extends Figure {
  constructor(side) {
    super("Квадрат", [
      { name: "a", length: side },
      { name: "b", length: side },
      { name: "c", length: side },
      { name: "d", length: side },
    ]);

    this.side = side;
  }

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони квадрата: ${this.getSidesInfo()}`);
  }

  getArea() {
    return this.side ** 2;
  }

  getPerimeter() {
    return this.side * 4;
  }
}

class Rectangle extends Figure {
  constructor(width, height) {
    super("Прямокутник", [
      { name: "a", length: width },
      { name: "b", length: height },
      { name: "c", length: width },
      { name: "d", length: height },
    ]);

    this.width = width;
    this.height = height;
  }

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони прямокутника: ${this.getSidesInfo()}`);
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return (this.width + this.height) * 2;
  }
}

class Triangle extends Figure {
  constructor(firstSide, secondSide, thirdSide) {
    super("Трикутник", [
      { name: "a", length: firstSide },
      { name: "b", length: secondSide },
      { name: "c", length: thirdSide },
    ]);

    this.firstSide = firstSide;
    this.secondSide = secondSide;
    this.thirdSide = thirdSide;
  }

  showInfo() {
    console.log(`Фігура: ${this.name}`);
    console.log(`Сторони трикутника: ${this.getSidesInfo()}`);
  }

  getArea() {
    const halfPerimeter = this.getPerimeter() / 2;

    return Math.sqrt(
      halfPerimeter *
        (halfPerimeter - this.firstSide) *
        (halfPerimeter - this.secondSide) *
        (halfPerimeter - this.thirdSide),
    );
  }

  getPerimeter() {
    return this.firstSide + this.secondSide + this.thirdSide;
  }
}

const figures = [
  new Square(5),
  new Rectangle(4, 8),
  new Triangle(3, 4, 5),
  new Square(10),
];

figures.forEach((figure) => {
  figure.showInfo();
  console.log(`Площа: ${figure.getArea()}`);
  console.log(`Периметр: ${figure.getPerimeter()}`);
  console.log("--------------------");
});
