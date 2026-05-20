"use strict";

const gameBoard = document.querySelector("#game-board");
const movesCount = document.querySelector("#moves-count");
const pairsCount = document.querySelector("#pairs-count");
const restartButton = document.querySelector("#restart-button");
const message = document.querySelector("#message");

const cardValues = [
  "HTML",
  "CSS",
  "JS",
  "DOM",
  "TAG",
  "WEB",
  "HTML",
  "CSS",
  "JS",
  "DOM",
  "TAG",
  "WEB",
];

let firstCard = null;
let secondCard = null;
let moves = 0;
let pairs = 0;
let isLocked = false;
let closeTimer = null;

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];

    cards[i] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
}

function openCard(card) {
  card.innerText = card.value;
  card.classList.add("open");
}

function closeCards() {
  if (firstCard === null || secondCard === null) {
    return;
  }

  firstCard.innerText = "?";
  secondCard.innerText = "?";
  firstCard.classList.remove("open");
  secondCard.classList.remove("open");

  firstCard = null;
  secondCard = null;
  isLocked = false;
  closeTimer = null;
}

function clearSelectedCards() {
  firstCard = null;
  secondCard = null;
  isLocked = false;
  closeTimer = null;
}

function checkGameEnd() {
  if (pairs === cardValues.length / 2) {
    message.innerText = `Ви перемогли за ${moves} кроків!`;
  }
}

function checkCards() {
  moves++;
  movesCount.innerText = moves;

  if (firstCard.value === secondCard.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    pairs++;
    pairsCount.innerText = pairs;
    clearSelectedCards();
    checkGameEnd();
  } else {
    isLocked = true;
    closeTimer = setTimeout(closeCards, 800);
  }
}

function cardClick(card) {
  if (
    isLocked ||
    card.classList.contains("open") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  openCard(card);

  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
    checkCards();
  }
}

function createCard(value) {
  const card = document.createElement("button");

  card.type = "button";
  card.className = "card";
  card.innerText = "?";
  card.value = value;

  card.onclick = function () {
    cardClick(card);
  };

  return card;
}

function startGame() {
  const cards = cardValues.slice();

  if (closeTimer !== null) {
    clearTimeout(closeTimer);
  }

  shuffleCards(cards);
  gameBoard.innerHTML = "";
  moves = 0;
  pairs = 0;
  firstCard = null;
  secondCard = null;
  isLocked = false;
  closeTimer = null;
  movesCount.innerText = moves;
  pairsCount.innerText = pairs;
  message.innerText = "";

  for (let i = 0; i < cards.length; i++) {
    const card = createCard(cards[i]);

    gameBoard.append(card);
  }
}

restartButton.onclick = function () {
  startGame();
};

startGame();
