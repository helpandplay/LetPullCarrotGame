"use strict";
import Modal from "./modal.js";
import { sendDB, retrieveDB } from "./fetch.js";

export default class Ranking {
  constructor() {
    this.modal = new Modal();
    this.rankingModal = document.querySelector(".ranking__modal");
    this.enrollModal = document.querySelector(".enroll__modal");
    this.enrollModal.addEventListener("click", (e) => {
      if (e.target.matches(".enroll__submit"))
        this.onSubmit && this.onSubmit(e);
    });
    this.list = document.querySelector(".ranking__list");
    this.rankingModal.addEventListener("click", (e) => {
      e.target.matches(".prev") && this.onPrevClick && this.onPrevClick();
    });
    this.modal.setEnrollListener(this.onEnrollClick);
  }
  //enroll 버튼 클릭할 때
  onSubmit = (event) => {
    event.preventDefault();

    const nickname = this.enrollModal.querySelector(".nickname");
    const carrotCnt = document.querySelector(".cnt__con");
    const date = new Date();
    const enrollTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    const data = {
      id: 3,
      nickname: nickname.value,
      carrotCnt: carrotCnt.textContent,
      enrollTime: enrollTime,
    };
    sendDB(data, "/enroll");
    this.hide(this.enrollModal);
    this.modal.show(this.modal.gameModal);
  };
  setPrevListener(onPrevClick) {
    this.onPrevClick = onPrevClick;
  }
  onEnrollClick = () => {
    const carrotCount = this.enrollModal.querySelector(".carrotCount");
    const cntIndicator = document.querySelector(".cnt");
    carrotCount.textContent = cntIndicator.textContent;
    this.show(this.enrollModal);
  };
  onPrevClick() {
    this.hide(this.rankingModal);
    this.modal.show(this.modal.gameModal);
  }
  hide(modal) {
    modal.style.visibility = "hidden";
  }
  show(modal) {
    modal.style.visibility = "visible";
  }
  // * ranking list
  view = () => {
    this.show(this.rankingModal);
    this.listShow();
    this.setPrevListener(this.onPrevClick);
  };
  async listShow() {
    const rankingList = await retrieveDB("/getList");
    this.list.innerHTML = "";
    let id = 1;
    rankingList.forEach((element) => {
      const li = document.createElement("li");
      li.setAttribute("class", "list__item");
      li.innerHTML = `
            <span class="id">${id++}</span>
            <span class="nickname">${element.nickname}</span>
            <span class="record">${element.carrotCnt}</span>
            <span class="regist__time">${element.enrollTime}</span>
        `;
      this.list.appendChild(li);
    });
  }
  init() {
    this.modal.setRankingListener(this.view);
  }
}
