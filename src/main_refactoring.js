"use strict";
import { GameBuilder, Reason, Result } from "./game.js";
import * as sound from "./music.js";
const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

function init() {
  //game class를 리턴하니 game class가 할당된다.
  const game = new GameBuilder()
    .carrotCnt(CARROT_COUNT)
    .bugCnt(BUG_COUNT)
    .gameDuration(GAME_DURATION_SEC)
    .build();
  game.init();
  game.setOnGameStopListener((reason) => {
    sound.pauseBGSound();
    let message;
    switch (reason) {
      case Reason.win:
        message = Result.win;
        sound.playGameWinSound();
        break;
      case Reason.lose:
        message = Result.lose;
        sound.playBugSound();
        break;
      default:
        throw new Error("not vaild reason");
    }
    game.finish(message);
  });
}
init();

// * started = !started라고 하면 저절로 바뀌는 코드 방식!
// * visiable css를 이용하면 레이아웃이 달라지지 않아도 보이지 않게 렌더링 되기 때문에 사라졌다 보여지는 요소에 꿀!
// * 숫자나 문자로 넣을 것은 무조건 변수로 선언한 뒤 사용!
// * element.addEventListner('event', (e) => function(e) {} ) === element.addEventListner('event', function(e) )
// * target.matches('css-selector')를 쓰면 클릭했을 때 무엇을 클릭했는 지 알 수 있다.
// * 코드를 읽었을 때 무슨 말인 지 알 수 있도록 코드를 작성해야한다. (변수 이름도 마찬가지)

// 이벤트 등록 flow
// 1. const gameFinishBanner = new PopUp();
// ? -> 객체가 생성되면서 popupRefresh.addEventListener가 등록됨.
// 2. gameFinishBanner.setClickListener(()=> {startGame();} );
// ? -> popup클래스에 있는 setClickListener 함수를 실행해서 onclick 변수에 ()=>{startGame();}; 을 할당
//3. 리프레시 버튼이 클릭되면 this.onclick && this.onClick();
// 코드가 실행되면서 ()=>{startGame();};이 this.onclick에 할당되지 않았다면 코드를 실행하지 않음
