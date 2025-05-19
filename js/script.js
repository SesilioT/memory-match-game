/* jshint esversion: 6 */

// script.js

const board = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const moveCounter = document.getElementById('move-counter');

let emojis = ['🍎', '🍊', '🍇', '🍉']; // Apple, Orange, Grapes, Watermelon
let cardArray = [...emojis, ...emojis]; // Duplicate for matching pairs
let flippedCards = [];
let moves = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  board.innerHTML = '';
  moveCounter.textContent = '0';
  moves = 0;
  flippedCards = [];
  let shuffled = shuffle(cardArray);

  shuffled.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-emoji', emoji);
    card.setAttribute('data-index', index);
    card.textContent = '';

    card.addEventListener('click', () => handleCardClick(card));

    board.appendChild(card);
  });
}

function handleCardClick(card) {
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.textContent = card.getAttribute('data-emoji');
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    moveCounter.textContent = moves;
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const emoji1 = card1.getAttribute('data-emoji');
  const emoji2 = card2.getAttribute('data-emoji');

  if (emoji1 === emoji2) {
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.textContent = '';
      card2.textContent = '';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

resetBtn.addEventListener('click', createBoard);

// Initialize game
createBoard();
