const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  trip_id: String,
  name: String,
  amount: Number,
  unit: Number,
  pricePerUnit: Number
});

const SPENDING = mongoose.model("spending", spendingSchema);

module.exports = SPENDING;
