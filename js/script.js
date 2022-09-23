const mario = document.getElementById("mario");
const pipe = document.getElementById("pipe");
const clouds = document.getElementById("clouds");
const mainSong = document.getElementById("mainSong");
const dieSong = document.getElementById("dieSong");
const continueText = document.getElementById("continue");
const gameOver = document.getElementById("game-over");
const score = document.getElementById("score");

var isDead = false;
var isPlaying = false;
var currentScore = 0;

score.innerText = currentScore;

dieSong.addEventListener("ended", () => {
  dieSong.src = "";
});

document.body.addEventListener("mousemove", function () {
  if (!isDead) {
    mainSong.play();
  }
});

document.body.addEventListener("keydown", function (event) {
  if (!isDead) {
    pipe.classList.add("pipe-animation");
    mainSong.play();
  }
  if (isPlaying && event.keyCode === 32) {
    jump();
  }
  if (!isPlaying && event.keyCode === 13) {
    pipe.style.display = "block";
    isPlaying = true;
    continueText.style.display = "none";
  }
  if (event.keyCode === 13 && isDead) {
    console.log("entrou");
    clouds.style.animation = "none";
    pipe.style.animation = "none";
    pipe.style.left = "";
    clouds.style.left = "";
    setTimeout(() => {
      pipe.style.animation = "";
      clouds.style.animation = "";
    }, 0);
    gameOver.style.display = "none";
    mario.src = "../assets/images/mario.gif";
    mario.style.width = "";
    mario.style.marginLeft = "";
    mario.style.animation = "";
    mario.style.bottom = "";
    isDead = false;
    isPlaying = true;
  }
});

const jump = () => {
  mario.classList.add("jump");
  currentScore += 1;
  score.innerText = currentScore;
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  const cloudsPosition = clouds.getBoundingClientRect();

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    isDead = true;
    mainSong.pause();
    dieSong.play();

    gameOver.style.display = "block";
    continueText.style.display = "block";

    isPlaying = false;
    currentScore = 0;
    score.innerText = currentScore;

    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    clouds.style.animation = "none";
    clouds.style.left = `${cloudsPosition.left}px`;

    mario.src = "../assets/images/game-over.png";
    mario.style.width = "4.8rem";
    mario.style.marginLeft = "3rem";
  }
}, 10);
