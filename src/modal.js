"use strict";

export default class Modal {
  constructor() {
    this.gameModal = document.querySelector(".game__modal");
    this.gameModal.addEventListener("click", (e) => {
      e.target.matches(".modal_btn") && this.onClick && this.onClick();
      this.hide();
    });
  }
  setEventListener(onClick) {
    this.onClick = onClick;
  }
  hide() {
    this.gameModal.style.visibility = "hidden";
  }
  show() {
    this.gameModal.style.visibility = "visible";
  }
  renderResultElement(text) {
    this.gameModal.innerHTML = `
        <span class='modal__text'>${text}</span>
        <button class="modal_btn">restart</button>
  `;
  }
}
