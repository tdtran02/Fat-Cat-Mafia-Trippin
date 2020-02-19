const EXPRESS = require("express");
const TRIPROUTES = EXPRESS.Router();
const TRIP = require("../models/trip.model");
const USER = require("../models/user.model");

TRIPROUTES.route("/trip/:id").get(function(req, res) {
  TRIP.find({ owner_id: req.params.id }).then(trip => {
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

TRIPROUTES.route("/trip/:id").delete(function(req, res) {
  TRIP.findByIdAndRemove({ _id: req.body._id }).then(trip => {
    if (trip != null) {
      res.status(200).json({
        response_message: "Trip deleted!",
        trip: trip
      });
    } else {
      res.status(400).json({
        trip: null
      });
    }
  });
});

TRIPROUTES.route("/trip").post(function(req, res){
    const T = new TRIP({
        owner_id: req.body.owner_id,
        destination: req.body.destination,
        start_date: req.body.start_date,
        end_date:req.body.end_dart
    });
    T.save()
    .then(x=>{
        res.status(200).json({
            saved: true,
            response_message: "Trip created!",
            trip:x
        });
    })
    .catch(err => {
        //   console.error(err);
          res.status(200).json({
            saved: false,
            response_message: "Creating trip failed!",
            trip: null
        });
    });
});

module.exports = TRIPROUTES;