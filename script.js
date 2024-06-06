'use strict';

// Dom Elemlent

const players = document.querySelectorAll('.player');
const scoreOneElement = document.querySelector('#score--0');
const scoreTwoElement = document.querySelector('#score--1');
const rollDiceBtn = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
let currentScoreElement = document.querySelector(
  '.player--active .current .current-score'
);

let scoreOne = 0;
let scoreTwo = 0;
let currentScore = 0;
let targetScore = 100;

// Generate A random Number
let randomNumber;
let generateRandomNumber = function () {
  let arrOfRollNumber = [1, 2, 3, 4, 5, 6];
  randomNumber = arrOfRollNumber[parseInt(Math.random() * 6)];
};

// Create A Roll Dice Function
let rollDice = function () {
  currentScoreElement = document.querySelector(
    '.player--active .current .current-score'
  );
  if (scoreOne < targetScore && scoreTwo < targetScore) {
    generateRandomNumber();
    dice.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      currentScore += randomNumber;
    } else {
      switchPlayer();
    }
    currentScoreElement.innerHTML = currentScore;
  }
};

// Switch Player Function
let switchPlayer = function () {
  players.forEach(player => {
    player.classList.toggle('player--active');
  });
  currentScore = 0;
};

// Create A Hold Functoin
let hold = function () {
  if (scoreOne < targetScore && scoreTwo < targetScore) {
    const scoreElement = document.querySelector('.player--active .score');
    console.log(scoreElement);
    if (scoreElement.id === 'score--0') {
      scoreOne += currentScore;
      scoreOneElement.textContent = scoreOne;
    } else {
      scoreTwo += currentScore;
      scoreTwoElement.textContent = scoreTwo;
    }
    if (scoreOne >= targetScore || scoreTwo >= targetScore) {
      players.forEach(player => {
        if (player.classList.contains('player--active')) {
          player.classList.add('player--winner');
        }
      });
      dice.style.display = 'none';
    } else {
      switchPlayer();
    }
    currentScoreElement.innerHTML = currentScore;
  }
};

// The reset Function To Return To The Point Zero
let newGame = function () {
  const playerOne = document.querySelector('.player--0');
  const playerTwo = document.querySelector('.player--1');
  scoreOne = 0;
  scoreOneElement.textContent = scoreOne;
  scoreTwo = 0;
  scoreTwoElement.textContent = scoreTwo;
  currentScore = 0;
  currentScoreElement.innerHTML = currentScore;
  if (!playerOne.classList.contains('player--actve')) {
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
  }
  players.forEach(player => {
    if (player.classList.contains('player--winner')) {
      player.classList.remove('player--winner');
    }
  });
  randomNumber = 1;
  dice.src = `dice-${randomNumber}.png`;
  dice.style.display = 'block';
};

rollDiceBtn.addEventListener('click', rollDice);

holdBtn.addEventListener('click', hold);

newGameBtn.addEventListener('click', newGame);
