const EXPRESS = require("express");
const DRIVERROUTES = EXPRESS.Router();
const DRIVER = require("../models/driver.model");
const TRIPBUDDY = require("../models/tripbuddy.model");

DRIVERROUTES.route("/driver").post(function(req, res) {
  console.log(req.body);
  const D = new DRIVER({
    trip_id: req.body.trip_id,
    driver: req.body.driver_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    passengers: []
  });
  D.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        driver: D
      });
    })
    .catch(err => {
      console.log(err);
    });
});

DRIVERROUTES.route("/driver/friends/:trip_id").get(function(req, res) {
  let trip_buddies;
  TRIPBUDDY.find({ trip_id: req.params.trip_id })
    .then(tripbuddy => {
      trip_buddies = tripbuddy;
      return DRIVER.find({ trip_id: req.params.trip_id });
    })
    .then(drivers => {
      if (trip_buddies != null) {
        for (let i = 0; i < drivers.length; i++) {
          console.log(drivers[i]);
          console.log(drivers[i].driver);
          if (trip_buddies.includes(drivers[i].driver)) {
            trip_buddies = trip_buddies.splice(
              trip_buddies.indexOf(drivers[i].driver),
              1
            );
          }
          for (let j = 0; j < drivers[i].passengers.length; j++) {
            let p = drivers[i].passengers[j];
            if (trip_buddies.includes(p)) {
              trip_buddies = trip_buddies.splice(trip_buddies.indexOf(p), 1);
            }
          }
        }
        res.status(200).json({
          tripbuddy: trip_buddies
        });
      } else {
        res.status(400).json({
          tripbuddy: null
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

DRIVERROUTES.route("/driver/add").post(function(req, res) {
  console.log(req.body);
  DRIVER.findOneAndUpdate(
    { trip_id: req.body.trip_id, driver: req.body.driver_id },
    {
      $addToSet: {
        passengers: {
          passenger: req.body.passenger,
          first_name: req.body.first_name,
          last_name: req.body.last_name
        }
      }
    },
    { returnOriginal: false }
  )
    .then(result => {
      console.log(result);
      res.status(200).json({
        driver: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

DRIVERROUTES.route("/driver/remove").post(function(req, res) {
  DRIVER.findOneAndUpdate(
    { trip_id: req.body.trip_id, driver: req.body.driver_id },
    { $pull: { passengers: req.body.passenger } }
  )
    .then(result => {
      console.log(result);
      res.status(200).json({
        driver: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

DRIVERROUTES.route("/driver/:trip_id").get(function(req, res) {
  DRIVER.find({ trip_id: req.params.trip_id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        drivers: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = DRIVERROUTES;
