const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema and Model for trip
const tripSchema = new Schema({
  owner_id: String,
  trip_name: String,
  destination: String,
  start_date: Date,
  end_date: Date,
  trip_locations: Array,
  days: [],
  buddies: [],
  posts: []
});

const TripSchem = mongoose.model("tripchar", tripSchema);

module.exports = TripSchem;
