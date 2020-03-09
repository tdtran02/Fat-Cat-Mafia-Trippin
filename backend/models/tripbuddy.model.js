const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripbuddySchema = new Schema({
    owner_id: String,
    trip_id: String,
    buddy_id: String,
    accepted: Boolean,
    denied: Boolean,
    pending: Boolean
})

const TripBuddy = mongoose.model("tripbuddy", tripbuddySchema);
module.exports = TripBuddy;