'use strict';

const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score1EL = document.getElementById('score--1');
const score0EL = document.getElementById('score--0');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

// score0EL.textContent = 0;
// score1EL.textContent = 0;
// diceEl.classList.add('hidden');
// let currentScore = 0;
// let activePlayer = 0;
// let score = [0, 0];
// let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEL.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.src = `dice-${dice}.png`;
    console.log(dice);

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEL.classList.add('hidden');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
    } else {
      switchPlayer();
    }
  }
});

// btnNew.addEventListener('click', function () {
//   currentScore = 0;
//   current0EL.textContent = 0;
//   current1EL.textContent = 0;
//   score = [0, 0];
//   playing = true;
//   diceEl.classList.add('hidden');
//   score0EL.textContent = 0;
//   score1EL.textContent = 0;
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   player0EL.classList.add('player--active');
//   player1EL.classList.remove('player--active');
//   activePlayer = 0;
// });

btnNew.addEventListener('click', init);
