const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema and Model for user
const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  image: String,
  hometown: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const UserChar = mongoose.model("user", userSchema);

module.exports = UserChar;
