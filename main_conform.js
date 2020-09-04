// 클래스를 우리가 원하는 콜백함수를 파라미터로 넘겨주고 그 것을 쉽게 활용
class Counter {
  constructor(runIfFive) {
    this.callback = runIfFive;
    this.counter = 0;
  }
  increase() {
    this.counter++;
    if (this.counter === 5) this.callback && this.callback(this.counter);
    //this.callback이 있다면 this.callback 실행
    //if(this.callback) this.callback과 같다.
    //오브젝트나 함수가 비어있다면 실행하지 않게 하는 코드.
  }
}

function printNumber(num) {
  console.log(`Wow ${num}!`);
}
function alertNumber(num) {
  alert(`Wow ${num}!`);
}
//하나의 클래스를 만들고 다형성을 확보할 수 있음!
const printcounter = new Counter(printNumber);
const alertcounter = new Counter(alertNumber);
for (let i = 0; i <= 5; i++) {
  counter.increase();
}
