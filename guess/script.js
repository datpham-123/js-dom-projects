'use strict';

const initSecretNumber = () => Math.trunc(Math.random() * 20) + 1;
const displayMessage = message => {
  result.textContent = message;
};

const starting_point = 20;
let secret_number = initSecretNumber();
let point = starting_point;
let highest_point = 0;

// color
const win_color = '#60b347';
const newgame_color = '#222';

// dom elements
const body = document.querySelector('body');
const btn_check = document.querySelector('.check');
const guess_input = document.querySelector('.guess');
const guess_result = document.querySelector('.number');
const result = document.querySelector('.message');
const score = document.querySelector('.score');
const playagain = document.querySelector('.again');
const highscore = document.querySelector('.highscore');

// use for test
// guess_result.textContent = secret_number;

//events
btn_check.addEventListener('click', () => {
  const guess = Number(guess_input.value);

  if (point > 1) {
    if (!guess) {
      displayMessage('No Number...');
    } else if (guess === secret_number) {
      displayMessage('Correct Number 😎');

      // change body color
      body.style.backgroundColor = win_color;
      guess_input.style.width = '30rem';

      // change highscore
      if (point > highest_point) {
        highest_point = point;
        highscore.textContent = highest_point;
      }
    } else if (guess !== secret_number) {
      displayMessage(guess > secret_number ? 'Too High 😒' : 'Too Low 😂');
      --point;
      score.textContent = point;
    }
  } else {
    displayMessage('🤔 You Lost the name');
    score.textContent = 0;
  }
});

playagain.addEventListener('click', () => {
  point = starting_point;
  secret_number = initSecretNumber();

  displayMessage('Start guessing..');
  body.style.backgroundColor = newgame_color;
  score.textContent = point;
  guess_result.textContent = '?';
  guess_result.style.width = '15rem';
  guess_input.value = 0;
});