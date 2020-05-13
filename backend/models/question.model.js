const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema and Model for trip
const questionSchema = new Schema({
   trip_id: String,
   user_id: String,
   destination: String,
   questions: Array,
   start_date: Date,
   end_date: Date
});

const QuestionSchem = mongoose.model('questionchar', questionSchema);

module.exports = QuestionSchem;