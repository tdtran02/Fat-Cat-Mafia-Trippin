const EXPRESS = require("express");
const DRIVERROUTES = EXPRESS.Router();
const DRIVER = require("../models/driver.model");
const TRIPBUDDY = require("../models/tripbuddy.model");

// create a new driver
DRIVERROUTES.route("/driver").post(function (req, res) {
  const D = new DRIVER({
    trip_id: req.body.trip_id,
    driver_id: req.body.driver_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    passengers: [],
  });
  D.save()
    .then((result) => {
      return DRIVER.find({ trip_id: req.body.trip_id });
    })
    .then((r) => {
      res.status(200).json({
        drivers: r,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

DRIVERROUTES.route("/driverremove").post(function (req, res) {
  DRIVER.findOneAndRemove({
    trip_id: req.body.trip_id,
    driver_id: req.body.driver_id,
  })
    .then((result) => {
      res.status(200).json({
        updated: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all candidates excludes driver and passanegers
DRIVERROUTES.route("/driver/friends/:trip_id").get(function (req, res) {
  let trip_buddies;
  TRIPBUDDY.find({ trip_id: req.params.trip_id, accepted: true })
    .then((tripbuddy) => {
      trip_buddies = tripbuddy;
      return DRIVER.find({ trip_id: req.params.trip_id });
    })
    .then((drivers) => {
      if (trip_buddies.length != 0) {
        for (let i = 0; i < drivers.length; i++) {
          for (let d = 0; d < trip_buddies.length; d++) {
            if (trip_buddies[d].buddy_id == drivers[i].driver_id) {
              trip_buddies.splice(d, 1);
            }
          }
          for (let j = 0; j < drivers[i].passengers.length; j++) {
            let p = drivers[i].passengers[j];

            for (let d = 0; d < trip_buddies.length; d++) {
              if (
                trip_buddies[d].buddy_id == drivers[i].passengers[j].passenger
              ) {
                trip_buddies.splice(d, 1);
              }
            }
          }
        }
        res.status(200).json({
          candidates: trip_buddies,
        });
      } else {
        res.status(400).json({
          candidates: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

DRIVERROUTES.route("/driver/add").post(function (req, res) {
  DRIVER.findOneAndUpdate(
    { trip_id: req.body.trip_id, driver_id: req.body.driver_id },
    {
      $addToSet: {
        passengers: {
          passenger: req.body.passenger,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
        },
      },
    },
    { returnOriginal: false }
  )
    .then((result) => {
      res.status(200).json({
        driver: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

DRIVERROUTES.route("/driver/remove").post(function (req, res) {
  DRIVER.findOneAndUpdate(
    { trip_id: req.body.trip_id, driver_id: req.body.driver_id },
    {
      $pull: {
        passengers: {
          passenger: req.body.passenger,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
        },
      },
    },
    {
      returnOriginal: false,
    }
  )
    .then((result) => {
      res.status(200).json({
        driver: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

DRIVERROUTES.route("/driver/:trip_id").get(function (req, res) {
  DRIVER.find({ trip_id: req.params.trip_id })
    .then((result) => {
      res.status(200).json({
        drivers: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = DRIVERROUTES;
