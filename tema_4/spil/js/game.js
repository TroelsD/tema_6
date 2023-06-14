window.addEventListener("load",() => {
  const redFish = document.getElementById('red_fish_container');
  redFish.addEventListener('click', () => addPoint(redFish));

  const greenFish = document.getElementById('green_fish_container');
  greenFish.addEventListener('click', () => addPoint(greenFish));

  const blueFish = document.getElementById('blue_fish_container');
  blueFish.addEventListener('click', () => addPoint(blueFish));
  
  const shark = document.getElementById('shark_container');
  shark.addEventListener('click', () => loseLife(shark));
  start();
});

const elements = document.getElementsByClassName('start_game');
for(var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', () => start());
}

const themesong = new Audio('./sounds/theme_song.mp3');

// declare variables points and lives
let lives, points, timeoutId;

function start() {
  themesong.play();
  console.log('starting game');
  timeoutId = setTimeout(() => endGame(), 48000);
  lives = 3;
  points = 0;

  const timer = document.getElementById('time_viser');
  timer.classList = '';
  void timer.offsetWidth;
  timer.classList.add('minut_animation');

  updatePoints();
  updateLives();

  const redFish = document.getElementById('red_fish_container');
  const greenFish = document.getElementById('green_fish_container');
  const blueFish = document.getElementById('blue_fish_container');
  const shark = document.getElementById('shark_container');

  setTimeout(() => swim(redFish), 0);
  setTimeout(() => swim(greenFish), 1300);
  setTimeout(() => swim(blueFish), 2150);
  setTimeout(() => swim(shark), 830);

  hideAllScreens();
}

// function for adding point
function addPoint(fishContainer) {
  points = points + 1;
  const audio = new Audio('./sounds/good_click.mp3');
  audio.play();

  updatePoints();

  swim(fishContainer)
  console.log('clicked', points);
}

// function for printing point
function updatePoints() {
  document.querySelector("#score_board").textContent = points;
}

// function for losing lives
function loseLife(shark) {
  const audio = new Audio('./sounds/bad_click.mp3');
  audio.play();
  lives = lives - 1;
  console.log(lives);
  swim(shark);
  updateLives();
  // add condition: if lives = 0 endGame
  if (lives < 1) {
    endGame();
  }
}
// function for printing lives
function updateLives() {
  document.querySelector("#energy_board").textContent = lives;
}

// function endGame()
function endGame() {
  console.log("endGame");
  themesong.pause();
  themesong.currentTime = 0;
  if(points < 15 || lives <= 0) {
    document.getElementById('game_over').classList.remove('hide');
    const lose = new Audio('./sounds/you_lose.mp3');
    lose.play();
  } else {
    document.getElementById('level_complete').classList.remove('hide');
    const win = new Audio('./sounds/you_win.mp3');
    win.play();
  }
  const redFish = document.getElementById('red_fish_container');
  redFish.classList = 'hide';

  const greenFish = document.getElementById('green_fish_container');
  greenFish.classList = 'hide';

  const blueFish = document.getElementById('blue_fish_container');
  blueFish.classList = 'hide';

  const shark = document.getElementById('shark_container');
  shark.classList = 'hide';
  clearTimeout(timeoutId);
}

function hideAllScreens() {
  console.log("hideAllScreen");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start").classList.add("hide");
}

function swim(fishContainer) {
  fishContainer.classList = '';
  void fishContainer.offsetWidth;

  const position = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
  fishContainer.classList.add(`top-${position}`);
  fishContainer.classList.add('swim');

  fishContainer.addEventListener('animationend', () => swim(fishContainer));
}
