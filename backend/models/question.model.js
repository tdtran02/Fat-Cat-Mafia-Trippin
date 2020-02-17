const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema and Model for trip
const questionSchema = new Schema({
   // questionId: Number,
   // question: String,
   // answer: String
   questions: Array
});

const QuestionSchem = mongoose.model('questionchar', questionSchema);

module.exports = QuestionSchem;