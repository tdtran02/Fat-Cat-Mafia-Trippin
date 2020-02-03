const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema and Model for trip
const tripSchema = new Schema({
    destination: String,
    date: Date,
    length: Number
});

const TripSchem = mongoose.model('tripchar', tripSchema);

module.exports = TripSchem;

var user = new TripSchem({})
