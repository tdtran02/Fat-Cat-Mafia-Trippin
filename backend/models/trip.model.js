const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema and Model for trip
const tripSchema = new Schema({
  owner_id: String,
  // trip_id: String,
  destination: String,
  start_date: Date,
  end_date: Date,
  // length: Number
  trip_locations: Array
});

const TripSchem = mongoose.model("tripchar", tripSchema);

module.exports = TripSchem;
