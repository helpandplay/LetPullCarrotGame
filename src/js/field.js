"use strict";

import * as sound from "./music.js";

const IMG_SIZE = 90;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
export const itemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});
export class Field {
  constructor(carrotCnt, bugCnt) {
    this.carrotCnt = carrotCnt;
    this.bugCnt = bugCnt;
    this.firstStart = true;
    this.field = document.querySelector(".response-area");
    this.areaRect = this.field.getBoundingClientRect();
    if (this.firstStart) {
      this.field.addEventListener("click", (e) => this.onClick(e));
      this.firstStart = false;
    }
  }
  init() {
    this.clearItem();
    this._addItem(this.carrotCnt, "/asset/img/carrot.png", itemType.carrot);
    this._addItem(this.bugCnt, "/asset/img/bug.png", itemType.bug);
  }
  setEventListener(handleItemListener) {
    this.handleItemListener = handleItemListener;
  }
  onClick(e) {
    if (e.target.matches(".carrot")) {
      sound.playCarrotSound();
      this._deleteCarrot(e.target);
      // ? 클래스에 있는 함수가 인자로 전달되어져 왔을 때, "click", (e) => this.onClick(e)
      // ? onClick에는 field라는 클래스의 정보는 받아오지 않는다.
      // ? 따라서 onclick안에 this.handleItemListener는 this가 어디인 지 모르므로 undefined
      this.handleItemListener && this.handleItemListener(itemType.carrot);
    }
    if (e.target.matches(".bug")) {
      sound.playBugSound();
      this.handleItemListener && this.handleItemListener(itemType.bug);
    }
  }

  _deleteCarrot(target) {
    this.field.removeChild(target);
  }
  clearItem() {
    this.field.innerHTML = "";
  }
  _addItem(itemCount, imgPath, className) {
    const x1 = 0;
    const x2 = this.areaRect.width - IMG_SIZE;
    const y1 = 0;
    const y2 = this.areaRect.height - IMG_SIZE;

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
      this.field.appendChild(item);
    }
  }
}
