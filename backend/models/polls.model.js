const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema and Model for polls
const pollsSchema = new Schema({
  question: String,
  trip_id: String,
  options: Array,
  // {
  //       id: user_id,
  //       answer: answer
  //   }
  voted: Array,
});

const PollsSchema = mongoose.model("polls", pollsSchema);

module.exports = PollsSchema;
