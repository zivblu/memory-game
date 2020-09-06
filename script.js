const memoryGame = {};
memoryGame.tryCounter = 0;
memoryGame.score = 0;
const cards = document.querySelectorAll('.memory-card');
let msg = document.querySelector('#msg');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardsWon = [];
let starting =  document.getElementById("newgame");
memoryGame.counter = function () {
  document.getElementById("tries").textContent = memoryGame.tryCounter;
  document.getElementById("score").textContent = memoryGame.score;
}

starting.addEventListener("click", function () {
  memoryGame.startGame();
});

memoryGame.startGame = function () {
  resetTimer();
  starting.addEventListener("click", timer);
  this.flipAll();
  this.cleanUp();
  starting.removeEventListener("click", timer);
}

memoryGame.cleanUp = function () {
  shuffle();
  this.tryCounter = 0;
  this.score = 0;
  score.textContent = '0';
  tries.textContent = '0';
  cardsWon = [];
  msg.textContent = '';
}

memoryGame.flipAll = function () {
  cardsWon.forEach(card => card.addEventListener('click', flipCard));
  cardsWon.forEach(card => card.classList.remove('flip'));
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;
  checkForMatch();
  memoryGame.counter();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  cardsWon.push(firstCard, secondCard);
  memoryGame.score += 1;
  resetBoard();
  if (cardsWon.length === 4) {
    stopGame();
  } else {
    null;
  }
}

function unflipCards() {
  memoryGame.tryCounter += 1;
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};

function stopGame() {
  msg.textContent = `You Won in ${h2.textContent}, Your score is ${score.textContent} with ${tries.textContent} wrong tries`;
  clearTimeout(t);
}

let h2 = document.getElementsByTagName('h2')[0],
  milseconds = 0, seconds = 0, minutes = 0,
  t;

function add() {
  milseconds++;
  if (milseconds >= 100) {
    milseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
  }
  h2.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":"
    + (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":"
    + (milseconds > 9 ? milseconds : "0" + milseconds);
  timer();
}

function timer() {
  t = setTimeout(add, 10);
}

function resetTimer() {
  milseconds = 0;
  seconds = 0;
  minutes = 0;
  h2.textContent = "00:00:00";
}

cards.forEach(card => card.addEventListener('click', flipCard));
add();
shuffle();