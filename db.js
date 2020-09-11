import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/carrotGameUser", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB!");
const handleError = () => console.log("Can not connected to DB!");

db.once("open", handleOpen);
db.on("error", handleError);
