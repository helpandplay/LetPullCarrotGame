import express from "express";
import bodyParser from "body-parser";
import "./db";
import "./models/User";
import { enroll, loadLastRankerCarrotCnt, getList } from "./controller";

const app = express();
const port = 3000;

// html을 express에서 렌더링하기 위해선 ejs 세팅과 엔진 세팅이 필요함. html을 ejs로 렌더링 해줌
// node.js는 view를 ejs로 하기 때문임
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use("/src", express.static("src"));
app.use("/asset", express.static("asset"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index.html");
});
app.post("/", loadLastRankerCarrotCnt);
app.post("/enroll", enroll);
app.post("/getList", getList);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
