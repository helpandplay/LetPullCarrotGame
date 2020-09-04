"use strict";

//이거를 클래스 생성할 때 생성자에 넣으면 ㄱㅊ을듯?
const CARROT_COUNT = 10;
const IMG_SIZE = 90;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

let timer;
let started = false;
let firstStart = true;

const gameModal = document.querySelector(".game__modal");
const responseArea = document.querySelector(".response-area");
const areaRect = responseArea.getBoundingClientRect();
const timerIndicator = document.querySelector(".timer");
const cntIndicator = document.querySelector(".cnt");

const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const gameWinSound = new Audio("sound/game_win.mp3");
const alertSound = new Audio("sound/alert.wav");

function startGame() {
  started = !started;
  hidePopUp();
  clearItem();
  addItem(CARROT_COUNT, "img/carrot.png", "carrot");
  addItem(BUG_COUNT, "img/bug.png", "bug");
  startTimer();
  showScore();
}
function playSound(audio) {
  audio.play();
}
function showScore() {
  cntIndicator.innerHTML = `${CARROT_COUNT}`;
}
function startTimer() {
  playSound(bgSound);
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      gameOver();
      return;
    }
    if (!started) clearInterval(timer);
    playSound(alertSound);
    updateTimerText(--remainingTimeSec);
  }, 1000);
}
function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerIndicator.innerHTML = `${minutes}:${seconds}`;
}
function handleItemListener(target) {
  if (target.matches(".carrot")) {
    playSound(carrotSound);
    updateRemainCarrotScore();
    deleteCarrot(target);
  }
  if (target.matches(".bug")) {
    playSound(bugSound);
    gameOver();
  }
}
function gameOver() {
  bgSound.pause();
  bgSound.currentTime = 0;
  started = false;
  clearInterval(timer);
  resultPopUpText("You Lose!");
  showPopUp();
}
function resultPopUpText(text) {
  gameModal.innerHTML = `
    <span class='modal__text'>${text}</span>
    <button class="modal_btn">restart</button>
  `;
}
function deleteCarrot(target) {
  responseArea.removeChild(target);
}
function updateRemainCarrotScore() {
  let currCnt = cntIndicator.textContent;
  cntIndicator.innerHTML = `${--currCnt}`;
}
function addItem(itemCount, imgPath, className) {
  //아이템을 만들어서 에이리어에 추가해준다.
  const x1 = 0;
  const x2 = areaRect.width - IMG_SIZE;
  const y1 = 0;
  const y2 = areaRect.height - IMG_SIZE;

  for (let i = 0; i < itemCount; i++) {
    const item = document.createElement("img");
    item.setAttribute("src", imgPath);
    item.setAttribute("class", className);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.userDrag = "none";
    responseArea.appendChild(item);
  }
}
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function clearItem() {
  responseArea.innerHTML = "";
}
function hidePopUp() {
  gameModal.style.visibility = "hidden";
}
function showPopUp() {
  gameModal.style.visibility = "visible";
}

function initGame() {
  gameModal.addEventListener("click", (e) => {
    if (!e.target.matches(".modal_btn")) return;
    startGame();
    if (firstStart) {
      responseArea.addEventListener("click", (e) =>
        handleItemListener(e.target)
      );
      firstStart = false;
    }
  });
}
initGame();

// * started = !started라고 하면 저절로 바뀌는 코드 방식!
// * visiable css를 이용하면 레이아웃이 달라지지 않아도 보이지 않게 렌더링 되기 때문에 사라졌다 보여지는 요소에 꿀!
// * 숫자나 문자로 넣을 것은 무조건 변수로 선언한 뒤 사용!
// * element.addEventListner('event', (e) => function(e) {} ) === element.addEventListner('event', function(e) )
// * target.matches('css-selector')를 쓰면 클릭했을 때 무엇을 클릭했는 지 알 수 있다.
// * 코드를 읽었을 때 무슨 말인 지 알 수 있도록 코드를 작성해야한다. (변수 이름도 마찬가지)
