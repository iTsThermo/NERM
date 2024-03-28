const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  { versionKey: false }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
