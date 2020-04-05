const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripbuddySchema = new Schema({
    owner_id: String,
    trip_id: String,
    trip_name: String,
    buddy_id: String,
    buddy_first_name: String,
    buddy_last_name: String,
    buddy_picture: String,
    owner_first_name: String,
    owner_last_name: String,
    accepted: Boolean,
    denied: Boolean,
    pending: Boolean
})

const TripBuddy = mongoose.model("tripbuddy", tripbuddySchema);
module.exports = TripBuddy;