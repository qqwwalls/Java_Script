"use strict";

const randomNumberBlock = document.querySelector("#random-number");
const generateButton = document.querySelector("#generate-button");

function getRandomNumber() {
  return Math.floor(Math.random() * 101);
}

generateButton.onclick = function () {
  randomNumberBlock.innerText = getRandomNumber();
};
