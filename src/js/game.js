"use strict";
import * as sound from "./music.js";
import Modal from "./modal.js";
import { Field, itemType } from "./field.js";
import Ranking from "./ranking.js";

//타입을 보장받게 해주는 방법
export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
});
export const Result = Object.freeze({
  win: "랭킹에 등록하실 수 있습니다!",
  lose: "랭킹 등록에 실패!",
});

// Build Pattern
// 메소드마다 return을 해줌으로써 체이닝을 할 수 있게 해준다.
export class GameBuilder {
  gameDuration(time) {
    this.gameDuration = time;
    return this;
  }
  carrotCnt(num) {
    this.carrotCnt = num;
    return this;
  }
  bugCnt(num) {
    this.bugCnt = num;
    return this;
  }
  build() {
    return new Game(
      this.carrotCnt, //
      this.bugCnt, //
      this.gameDuration
    );
  }
}
class Game {
  constructor(CARROT_COUNT, BUG_COUNT, GAME_DURATION_SEC) {
    this.bugCnt = BUG_COUNT;
    this.carrotCnt = CARROT_COUNT;
    this.durationSec = GAME_DURATION_SEC;
    this.timer = undefined;
    this.started = false;
    this.modal = new Modal();
    this.field = new Field(CARROT_COUNT, BUG_COUNT);
    this.ranking = new Ranking();
    this.field.setEventListener(this.handleItemListener);
    this.timerIndicator = document.querySelector(".timer");
    this.cntIndicator = document.querySelector(".cnt");
    this.currentCarrot = 0;
  }
  setOnGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  handleItemListener = (item) => {
    if (item === itemType.carrot) this.updateCarrotScore();
    if (item === itemType.bug)
      this.onGameStop && this.onGameStop(this.cntIndicator.textContent);
  };
  updateCarrotScore() {
    let currCnt = this.cntIndicator.textContent;
    this.cntIndicator.innerHTML = `${++currCnt}`;
    this.currentCarrot++;
    if (this.currentCarrot == this.carrotCnt) {
      this.field.init();
      this.currentCarrot = 0;
    }
  }
  start = () => {
    this.started = !this.started;
    this.field.init();
    this.showScore();
    this.startTimer();
  };
  finish(resultText) {
    this.started = false;
    clearInterval(this.timer);
    this.modal.renderResultElement(resultText);
    this.modal.show(this.modal.resultModal);
  }
  showScore() {
    this.cntIndicator.innerHTML = "0";
  }
  startTimer() {
    sound.playBGSound();
    let remainingTimeSec = this.durationSec;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        this.onGameStop && this.onGameStop(this.cntIndicator.textContent);
        return;
      }
      if (!this.started) clearInterval(this.timer);
      sound.playAlertSound();
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
  }

  init() {
    this.modal.setStartListener(this.start);
    this.ranking.init();
  }
}
