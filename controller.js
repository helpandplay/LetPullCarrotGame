import User from "./models/User.js";
import { json } from "body-parser";

// * retrieve to Client-side
export const enroll = async (req, res) => {
  const {
    body: { nickname, carrotCnt, enrollTime },
  } = req;
  await User.create({ nickname, carrotCnt, enrollTime });
};
//db.bios.find().sort( { name: 1 } ).limit( 5 )
//가져온 오브젝트에서 마지막 튜플의 캐럿 카운트를 반환
//반환한 캐럿카운트를 게임오버됐을 시 비교

// * send to Client-side
export const loadLastRankerCarrotCnt = async (req, res) => {
  const rankingData = await User.find().sort({ carrotCnt: -1 }).limit(10);
  if (rankingData.length === 0) {
    const defaultData = {
      carrotCnt: 0,
    };
    res.send(JSON.stringify(defaultData));
  } else {
    res.send(rankingData[rankingData.length - 1]);
  }
};

export const getList = async (req, res) => {
  const rankingList = await User.find().sort({ carrotCnt: -1 }).limit(10);
  res.send(rankingList);
};
