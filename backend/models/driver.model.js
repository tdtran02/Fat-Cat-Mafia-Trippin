const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema and Model for friend
const driverSchema = new Schema({
  trip_id: String,
  driver_id: String,
  first_name: String,
  last_name: String,
  passengers: Array
});

const DRIVER = mongoose.model("driver", driverSchema);

module.exports = DRIVER;
