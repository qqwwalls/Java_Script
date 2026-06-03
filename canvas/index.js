const canvas = document.getElementById("main-canvas");
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");
const dx = 10;

class Brush {
  constructor(fillColor, lineWidth) {
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
  }
}

class Shape {
  constructor(x, y, brush) {
    this.x = x;
    this.y = y;
    this.brush = brush;
    this.isSelected = false;
  }

  createPath(ctx) {}

  draw(ctx) {
    this.createPath(ctx);
    ctx.fillStyle = this.brush.fillColor;
    ctx.lineWidth = this.brush.lineWidth;
    ctx.strokeStyle = "black";

    ctx.fill();
    ctx.stroke();

    if (this.isSelected) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  move(stepX, stepY) {
    this.x += stepX;
    this.y += stepY;
  }
}

class Rectangle extends Shape {
  constructor(x, y, rectWidth, rectHeight, brush) {
    super(x, y, brush);
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
  }

  createPath(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.rectWidth, this.rectHeight);
  }
}

class Square extends Rectangle {
  constructor(x, y, side, brush) {
    super(x, y, side, side, brush);
  }
}

class Circle extends Shape {
  constructor(x, y, radius, brush) {
    super(x, y, brush);
    this.radius = radius;
  }

  createPath(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  }
}

class Triangle extends Shape {
  constructor(x, y, side, brush) {
    super(x, y, brush);
    this.side = side;
  }

  createPath(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.side / 2);
    ctx.lineTo(this.x + this.side / 2, this.y + this.side / 2);
    ctx.lineTo(this.x - this.side / 2, this.y + this.side / 2);
    ctx.closePath();
  }
}

class Artist {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  paint(shapes) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    shapes.forEach((shape) => shape.draw(this.ctx));
  }
}

const artist = new Artist(canvas, ctx);
const shapes = [];
let selectedShape = null;

setTimeout(() => {
  const count = parseInt(prompt("Скільки фігур створити на Canvas?", "2")) || 0;
  
  for (let i = 0; i < count; i++) {
    const type = prompt(`Фігура ${i + 1}:\nТип (Rectangle, Square, Circle, Triangle):`, "Circle")?.toLowerCase();
    const color = prompt(`Фігура ${i + 1}:\nКолір залівки:`, "blue") || "blue";
    const lineWidth = parseInt(prompt(`Фігура ${i + 1}:\nТовщина лінії контуру:`, "3")) || 3;
    
    const brush = new Brush(color, lineWidth);
    const x = canvas.width / 2 + (Math.random() * 100 - 50);
    const y = canvas.height / 2 + (Math.random() * 100 - 50);

    switch (type) {
      case "rectangle":
        shapes.push(new Rectangle(x, y, 150, 80, brush));
        break;
      case "square":
        shapes.push(new Square(x, y, 100, brush));
        break;
      case "triangle":
        shapes.push(new Triangle(x, y, 120, brush));
        break;
      case "circle":
      default:
        shapes.push(new Circle(x, y, 60, brush));
    }
  }
  artist.paint(shapes);
}, 100);

canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  if (selectedShape) selectedShape.isSelected = false;
  selectedShape = null;

  for (let i = shapes.length - 1; i >= 0; i--) {
    shapes[i].createPath(ctx);
    if (ctx.isPointInPath(mouseX, mouseY)) {
      selectedShape = shapes[i];
      selectedShape.isSelected = true;
      break;
    }
  }
  artist.paint(shapes);
});

window.addEventListener("keydown", (e) => {
  if (!selectedShape) return;
  
  if (e.key === "ArrowUp") selectedShape.move(0, -dx);
  if (e.key === "ArrowDown") selectedShape.move(0, dx);
  if (e.key === "ArrowLeft") selectedShape.move(-dx, 0);
  if (e.key === "ArrowRight") selectedShape.move(dx, 0);

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    artist.paint(shapes);
  }
});