'use strict';

//Selecting elements
const dice = document.querySelector('.dice');
const player1 = document.querySelector('.player--0').classList;
const player2 = document.querySelector('.player--1').classList;

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let player1Score = (document.querySelector('#score--0').textContent = 0);
let player2Score = (document.querySelector('#score--1').textContent = 0);
let player1CurrentScore = document.getElementById('current--0');
let player2CurrentScore = document.getElementById('current--1');

let currentScore = 0;

//Hide dice at start
dice.classList.add('hidden');

//Random dice roll
btnRollDice.addEventListener('click', function () {
  let randomRoll = Math.round(Math.random() * 5) + 1;
  dice.classList.remove('hidden');
  //Set dice image
  dice.setAttribute('src', `dice-${randomRoll}.png`);

  //Switch players
  if (randomRoll === 1) {
    if (player1.contains('player--active')) {
      togglePlayerActiveClass();
      player1CurrentScore.textContent = 0;
      currentScore = 0;
    } else if (player2.contains('player--active')) {
      togglePlayerActiveClass();
      player2CurrentScore.textContent = 0;
      currentScore = 0;
    }
  } else if (randomRoll !== 1 && player1.contains('player--active')) {
    currentScore += randomRoll;
    player1CurrentScore.textContent = currentScore;
  } else if (randomRoll !== 1 && player2.contains('player--active')) {
    currentScore += randomRoll;
    player2CurrentScore.textContent = currentScore;
  }
});

//Update score when HOLD is pressed
btnHold.addEventListener('click', function () {
  if (player1.contains('player--active')) {
    player1Score += currentScore;
    document.querySelector('#score--0').textContent = player1Score;
    togglePlayerActiveClass();
    if (player2.contains('player--active')) {
      player1CurrentScore.textContent = 0;
      currentScore = 0;
    }
    gameOver();
  } else if (player2.contains('player--active')) {
    player2Score += currentScore;
    document.querySelector('#score--1').textContent = player2Score;
    togglePlayerActiveClass();
    if (player1.contains('player--active')) {
      player2CurrentScore.textContent = 0;
      currentScore = 0;
    }
    gameOver();
  }
});

//New game
btnNewGame.addEventListener('click', function () {
  player1.remove('player--winner', 'player--winner.name');
  player2.remove('player--winner', 'player--winner.name');
  player1.add('player--active');
  player2.remove('player--active');
  document.querySelector('#score--0').textContent = 0;
  player1Score = 0;
  document.querySelector('#score--1').textContent = 0;
  player2Score = 0;
  document.querySelector('#current--0').textContent = 0;
  currentScore = 0;
  document.querySelector('#current--1').textContent = 0;
  currentScore = 0;

  btnRollDice.disabled = false;
  btnHold.disabled = false;
});

//Game over condition
function gameOver() {
  if (player1Score >= 20) {
    player1.add('player--winner', 'player--winner.name');
    disableButtons();
  } else if (player2Score >= 20) {
    player2.add('player--winner', 'player--winner.name');
    disableButtons();
  }

  function disableButtons() {
    btnRollDice.disabled = true;
    btnHold.disabled = true;
    dice.classList.add('hidden');
  }
}

//Refactoring
function togglePlayerActiveClass() {
  player1.toggle('player--active');
  player2.toggle('player--active');
  //   player1.remove('player--active');
  //   player2.add('player--active');
}
