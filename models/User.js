import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: "nickname is required",
  },
  carrotCnt: {
    type: Number,
    required: "carrotCnt is required",
  },
  enrollTime: {
    type: String,
    required: "enrollTime is required",
  },
});

const model = mongoose.model("User", UserSchema);
export default model;
