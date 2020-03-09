const EXPRESS = require("express");
const TRIPROUTES = EXPRESS.Router();
const TRIP = require("../models/trip.model");
const USER = require("../models/user.model");

TRIPROUTES.route("/trip").post(function(req, res) {
  // console.log(req.body);
  const T = new TRIP({
    owner_id: req.body.owner_id,
    trip_name: req.body.trip_name,
    destination: req.body.destination,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    days: req.body.days,
    buddies: req.body.buddies,
    posts: req.body.posts
  });
  T.save()
    .then(x => {
      console.log(x);
      res.status(200).json({
        saved: true,
        response_message: "Trip created!",
        trip: x
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

TRIPROUTES.route("/trip/:id").get(function (req, res) {
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

TRIPROUTES.route("/trip/:id").delete(function (req, res) {
  TRIP.findOneAndDelete({ _id: req.params.id }).then(trip => {
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

// add a location to user's list
TRIPROUTES.route("/trip/addtotriplocation").post(function (req, res) {
  // console.log(req.body);
  TRIP.findOneAndUpdate(
    { _id: req.body.trip_id },
    {
      $addToSet: { trip_locations: req.body.trip_location }
    },
    {
      returnOriginal: false
    }
  ).then(trip => {
    if (trip != null) {
      res.status(200).json({
        updated: true,
        trip: trip
      });
    } else {
      res.status(400).json({
        updated: false,
        trip: null
      });
    }
  });
});

// delete a location from user's list
TRIPROUTES.route("/trip/deletefromtriplocations").post(function (req, res) {
  TRIP.findOneAndUpdate(
    { _id: req.body.trip_id },
    {
      $pull: { trip_locations: req.body.trip_location }
    },
    {
      returnOriginal: false
    }
  ).then(trip => {
    if (trip != null) {
      res.status(200).json({
        updated: true,
        trip: trip
      });
    } else {
      res.status(400).json({
        updated: false,
        trip: null
      });
    }
  });
});

TRIPROUTES.route("/tripinfo/addtodays").post(function (req, res) {
  TRIP.findOneAndUpdate(
    { _id: req.body.trip_id },
    { days: req.body.days },
    { returnOriginal: false }
  ).then(r => {
    res.status(200).json({ days: r.days });
  });
});

TRIPROUTES.route("/tripinfo/addBuddy").post(function (req, res) {
  TRIP.findOneAndUpdate(
    { _id: req.body.trip_id },
    { buddies: req.body.buddies }
  ).then(r => {
    res.status(200).json({ buddies: r.buddies });
  });
});

// get trip information based on trip id
TRIPROUTES.route("/tripinfo/:trip_id").get(function (req, res) {
  TRIP.findOne({ _id: req.params.trip_id }).then(trip => {
    if (trip != null) {
      res.status(200).json({
        // updated: true,
        trip: trip
      });
    } else {
      res.status(400).json({
        // updated: false,
        trip: null
      });
    }
  });
});

module.exports = TRIPROUTES;
