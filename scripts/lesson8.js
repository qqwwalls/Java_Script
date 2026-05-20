"use strict";

const cl = console.log;
const block = document.getElementById("block");
const mainBlock = document.getElementById("main-block");

block.style.width = "300px";
block.style.height = "200px";
block.style.backgroundColor = "lime";
block.innerText = "Block-2";
block.style.color = "black";
block.style.fontSize = "36px";

block.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  block.style.backgroundColor = "red";
});

block.addEventListener("mouseenter", () => {
  block.style.backgroundColor = "yellow";
});

block.addEventListener("mouseleave", () => {
  block.style.backgroundColor = "lime";
});

block.addEventListener("click", () => {
  alert("Clicked");
});

mainBlock.addEventListener("click", () => {
  cl("Block1");
});

for (let i = 0; i < 150000; i++) {
  cl("He");
}

const colorBlocks = document.getElementById("color-blocks");
const addBlockButton = document.getElementById("add-block-button");

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

addBlockButton.addEventListener("click", () => {
  const newBlock = document.createElement("div");

  newBlock.className = "color-block";
  newBlock.style.backgroundColor = getRandomColor();

  newBlock.addEventListener("click", () => {
    newBlock.remove();
  });

  colorBlocks.append(newBlock);
});
