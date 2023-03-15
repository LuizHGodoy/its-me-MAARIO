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
var isScoring = true;
var isJumping = false;
var currentScore = 0;
var speed = 7;

function updateScore() {
  score++;
  currentScoreDisplay.textContent = `Score ${currentScore}`;
  if (currentScore % 10 === 0) {
    speed++;
    console.log("speed increased to: ", speed);
  }
}

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
  if (isPlaying) {
    jump();
  }
  if (!isPlaying) {
    pipe.style.display = "block";
    isPlaying = true;
    continueText.style.display = "none";
  }

  document.addEventListener("keydown", (event) => {
    if (isDead && event.keyCode === 13) {
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
    } else if (isPlaying) {
      jump();
    }
  });
});

const jump = () => {
  if (!isJumping) {
    isJumping = true;
    mario.classList.add("jump");
    currentScore += 1;
    score.innerText = currentScore;
  }
  setTimeout(() => {
    mario.classList.remove("jump");
    isJumping = false;
  }, 500);
};

const checkCollision = () => {
  const pipeRect = pipe.getBoundingClientRect();
  const marioRect = mario.getBoundingClientRect();
  if (marioRect.bottom < pipeRect.top || marioRect.top > pipeRect.bottom) {
    return false;
  }
  if (marioRect.right < pipeRect.left || marioRect.left > pipeRect.right) {
    return false;
  }
  return true;
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
  if (isScoring) {
    currentScore += 1;
    score.innerText = currentScore;
    isScoring = false;
  }
}, 10);
