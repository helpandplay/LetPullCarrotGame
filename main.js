"use strict";
const modal = document.querySelector(".game__modal");
const respon_area = document.querySelector(".response-area");
const cnt = document.querySelector(".cnt");
const span = document.querySelector(".timer");
let isEnd = false;
const alert_sound = new Audio("./sound/alert.wav");
const bug_pull = new Audio("./sound/bug_pull.mp3");
const carrot_pull = new Audio("./sound/carrot_pull.mp3");
const game_win = new Audio("./sound/game_win.mp3");

function startMusic() {
  const bgMusic = new Audio("./sound/bg.mp3");
  bgMusic.play();
}
// 타이머
function startTimer() {
  let stopWatch = 10;
  window.timer = setInterval(() => {
    alert_sound.play();
    stopWatch--;
    if (stopWatch >= 0) {
      span.textContent = `00:${stopWatch < 10 ? `0${stopWatch}` : stopWatch}`;
    } else {
      const printText = "You Lose !";
      gameOver(printText);
    }
  }, 1000);
}
// 당근과 벌레의 위치를 담는 배열 리턴
function createRandomPos(Num) {
  const leftMin = 0;
  const topMin = 0;
  const leftMax = 90;
  const topMax = 70;
  const randomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let array = new Array(Num);
  for (let i = 0; i < Num; i++) {
    array[i] = [randomNum(leftMin, leftMax), randomNum(topMin, topMax)];
  }
  return array;
}
// 당근과 벌레를 렌더링
function renderItem(array, isCarrot) {
  array.forEach((element) => {
    const img = document.createElement("img");
    if (isCarrot) {
      img.src = "img/carrot.png";
      img.setAttribute("class", "carrot");
    } else {
      img.src = "img/bug.png";
      img.setAttribute("class", "bug");
    }
    img.style.position = "absolute";
    img.style.left = `${element[0]}%`;
    img.style.top = `${element[1]}%`;
    respon_area.appendChild(img);
  });
}
function showItem() {
  respon_area.innerHTML = "";
  const carrotPos = createRandomPos(10);
  const bugPos = createRandomPos(7);
  renderItem(carrotPos, true);
  renderItem(bugPos, false);
}
// startBtn 눌렀을 때 실행
function gameStart() {
  isEnd = false;
  modal.setAttribute("style", "display:none");
  cnt.textContent = "10";
  span.textContent = `00:10`;
  startTimer();
  showItem();
}
function deleteCarrot(carrot) {
  respon_area.removeChild(carrot);
  cnt.textContent = `${parseInt(cnt.textContent) - 1}`;
  if (cnt.textContent === "0") {
    game_win.play();
    const printText = "You Win !";
    gameOver(printText);
  }
}

function gameOver(printText) {
  isEnd = true;
  clearInterval(window.timer);
  modal.innerHTML = `
            <span class="result">${printText}</span>
            <button class="restartBtn">restart</button>
    `;
  modal.setAttribute("style", "display:flex");
  const restartBtn = document.querySelector(".restartBtn");
  restartBtn.addEventListener("click", gameStart, false);
}
function init() {
  modal.addEventListener("click", (event) => {
    if (event.target.className === "startBtn") gameStart();
  });
  modal.addEventListener(
    "click",
    () => {
      startMusic();
    },
    { once: true }
  );
  respon_area.addEventListener("click", (event) => {
    if (event.target.className === "carrot") {
      carrot_pull.play();
      deleteCarrot(event.target);
    }
    if (event.target.className === "bug") {
      const printText = "You Lose !";
      bug_pull.play();
      gameOver(printText);
    }
  });
}

window.addEventListener("load", () => {
  init();
});
