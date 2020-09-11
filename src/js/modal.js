"use strict";

import { Result } from "./game.js";
export default class Modal {
  constructor() {
    this.gameModal = document.querySelector(".game__modal");
    this.resultModal = document.querySelector(".result__modal");
    this.gameModal.addEventListener("click", (e) => {
      if (e.target.matches(".start_btn"))
        this.onStartClick && this.onStartClick();
      if (e.target.matches(".ranking_btn"))
        this.onRankingClick && this.onRankingClick();
      if (!e.target.matches(".game__modal")) this.hide(this.gameModal);
    });
    this.resultModal.addEventListener("click", (e) => {
      if (e.target.matches(".start_btn"))
        this.onStartClick && this.onStartClick();
      if (e.target.matches(".input_ranking"))
        this.onEnrollClick && this.onEnrollClick();
      if (!e.target.matches(".result__modal")) this.hide(this.resultModal);
    });
  }
  setStartListener(onStartClick) {
    this.onStartClick = onStartClick;
  }
  setRankingListener(onRankingClick) {
    this.onRankingClick = onRankingClick;
  }
  setEnrollListener(onEnrollClick) {
    this.onEnrollClick = onEnrollClick;
  }
  hide(modal) {
    modal.style.visibility = "hidden";
  }
  show(modal) {
    modal.style.visibility = "visible";
  }
  renderResultElement(text) {
    const resultText = this.resultModal.querySelector(".modal__text");
    const startBtn = this.resultModal.querySelector(".start_btn");
    if (text === Result.lose) startBtn.classList.add("hidden");
    if (text === Result.win) startBtn.classList.remove("hidden");
    resultText.innerHTML = text;
  }
}
