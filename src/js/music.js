"use strict";
const bgSound = new Audio("/asset/sound/bg.mp3");
const gameWinSound = new Audio("/asset/sound/game_win.mp3");
const alertSound = new Audio("/asset/sound/alert.wav");
const carrotSound = new Audio("/asset/sound/carrot_pull.mp3");
const bugSound = new Audio("/asset/sound/bug_pull.mp3");

export function playBGSound() {
  playSound(bgSound);
}
export function pauseBGSound() {
  pauseSound(bgSound);
}
export function playGameWinSound() {
  playSound(gameWinSound);
}
export function playAlertSound() {
  playSound(alertSound);
}
export function playCarrotSound() {
  playSound(carrotSound);
}
export function playBugSound() {
  playSound(bugSound);
}
function playSound(sound) {
  sound.play();
}
function pauseSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}
