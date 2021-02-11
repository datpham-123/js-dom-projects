'use strict';

//generate random number 1 --> 6
const rollDice = () => Math.trunc(Math.random() * 6) + 1;

const updateCurrentScore = value =>
  (document.getElementById(`current--${activePlayer}`).textContent = value);

const updatePlayerScore = value =>
  (document.getElementById(`score--${activePlayer}`).textContent = value);

const switchPlayer = () => {
  currentScore = 0;
  updateCurrentScore(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;

  // visual change when switch
  playerArea0.classList.toggle('player--active');
  playerArea1.classList.toggle('player--active');
};

// global variables
let scores, currentScore, activePlayer, gameFinished;

const init = () => {
  // current score
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameFinished = false;

  gameFinished = false;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;

  dice.classList.add('hidden');
  playerArea0.classList.remove('player--winner');
  playerArea1.classList.remove('player--winner');
  playerArea0.classList.add('player--active');
  playerArea1.classList.remove('player--active');
};

// element from DOM
const dice = document.querySelector('.dice');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentScoreP0 = document.getElementById('current--0');
const currentScoreP1 = document.getElementById('current--1');

const playerArea0 = document.querySelector('.player--0');
const playerArea1 = document.querySelector('.player--1');

const playerActive = document.querySelector('.player--active');

// roll event
btnRoll.addEventListener('click', () => {
  if (!gameFinished) {
    //1. generate ranom dice value
    const diceValue = rollDice();
    //2. display dice. Change image source base ong dice number
    dice.classList.remove('hidden');
    dice.src = `dice-${diceValue}.png`;

    if (diceValue === 1) {
      switchPlayer();
    } else {
      // add dice to current score
      currentScore += diceValue;
      updateCurrentScore(currentScore);
    }
  }
});

btnHold.addEventListener('click', () => {
  if (!gameFinished) {
    //1. Add current score of active player score
    scores[activePlayer] += currentScore;
    updatePlayerScore(scores[activePlayer]);
    //2. score == 100 ? finish : switch player

    if (scores[activePlayer] >= 20) {
      gameFinished = true;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// start playing game
init();