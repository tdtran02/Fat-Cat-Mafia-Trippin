const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema and Model for trip
const questionSchema = new Schema({
   // questionId: Number,
   // question: String,
   // answer: String
   trip_id: String,
   user_id: String,
   destination: String,
   questions: Array
});

const QuestionSchem = mongoose.model('questionchar', questionSchema);

module.exports = QuestionSchem;