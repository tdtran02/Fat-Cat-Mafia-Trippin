const EXPRESS = require("express");
const FRIENDROUTES = EXPRESS.Router();
const FRIEND = require("../models/trip.model");
const USER = require("../models/user.model");

TRIPROUTES.route("/trip/:id").get(function(req, res) {
  TRIP.findOne({ owner_id: req.params.id }).then(user => {
    if (trip != null) {
      res.status(200).json({
        trip: trip
      });
    } else {
      res.status(400).json({
        trip: null
      });
    }
  });
});

TRIPROUTES.route("/trip/:id").put(function(req, res) {
  console.log(req.body.hi);
  console.log(req.params);

  TRIP.updateOne(
    { _id: req.params.id },
    { $set: { destination: req.body.destination,
    start_date,
    end_date,
    length} }
  )
    .then(response => {
      res.status(200).json({
        trip:req.body
      });
      console.log(response);
    })
    .catch(err => {});
});

module.exports = USERROUTES;