# 당근 뽑기 게임

## reference
* DreamCoding : https://academy.dream-coding.com/
* MDN : https://developer.mozilla.org/en-US/

## 게임 작동 설명
<img src="https://user-images.githubusercontent.com/70260006/91684744-4ba44c80-eb93-11ea-98b5-d4d9a8fed6d0.PNG">

* start 버튼을 누르면 게임이 시작됩니다.

<img src="https://user-images.githubusercontent.com/70260006/91684804-7bebeb00-eb93-11ea-8eec-2151a1bfe7b5.PNG">

* 게임 시작과 동시에 배경음악이 흘러나옵니다.
* 타이머는 10초로 고정, 0초가 되면 게임을 패배합니다.
* 제한 시간 내에 당근을 클릭해 모두 없애야 합니다!

<img src="https://user-images.githubusercontent.com/70260006/91684890-b48bc480-eb93-11ea-88c8-339f42c78dda.PNG">

* 게임을 승리하면 승리 문구와 함께 효과음이 나옵니다. restart를 이용해 다시 시작할 수 있습니다.

### 알게된 문제점
 > DOMException: play() failed because the user didn't interact with the document first.
* 다음과 같이 정책이 존재하는 이유
  - 사용자 경험 개선
  - 네트워크 데이터 소비 비용 감소
  - 광고 차단기 설치로 인한 인센티브 최소화
  * [출처] https://mygumi.tistory.com/333

그래서 다음과 같이 권장하고 있다.
* The audio is muted or its volume is set to 0
* The user has interacted with the site (by clicking, tapping, pressing keys, etc.)
* If the site has been whitelisted; this may happen either automatically if the browser determines that the user engages with media frequently, or manually through preferences or other user interface features
* If the autoplay feature policy is used to grant autoplay support to an  iframe and its document.
- https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide


