const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema and Model for friend
const friendSchema = new Schema({
  owner_id: String,
  confirmed_friends: Array,
  incoming_pending_friends: Array,
  outgoing_pending_friends: Array,
  incoming_trip_invitation: Array,
  outgoing_trip_invitation: Array
});

const Friend = mongoose.model("friend", friendSchema);

module.exports = Friend;
