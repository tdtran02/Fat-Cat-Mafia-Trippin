const EXPRESS = require("express");
const TRIPBUDDYROUTES = EXPRESS.Router();
const TRIPBUDDY = require("../models/tripbuddy.model");

TRIPBUDDYROUTES.route("/buddy").post(function (req, res) {
    const B = new TRIPBUDDY({
        owner_id: req.body.owner_id,
        trip_id: req.body.trip_id,
        buddy_id: req.body.buddy_id,
        accepted: "false",
        denied: "false",
        pending: "true"
    })
    B.save().then(x => {
        console.log(x);
        res.status(200).json({
            saved: true,
            response_message: "TripBuddy created!",
            tripbuddy: x
        });
    }).catch(err => {
        console.log(err);
        res.status(200).json({
            saved: false,
            response_message: "Creating TripBuddy failed!",
            tripbuddy: null
        });
    });
});

TRIPBUDDYROUTES.route("/buddy/:trip_id").get(function (req, res) {
    TRIPBUDDY.find({ trip_id: req.params.trip_id })
        .then(tripbuddy => {
            if (tripbuddy != null) {
                res.status(200).json({
                    tripbuddy: tripbuddy
                })
            } else {
                res.status(400).json({
                    tripbuddy: null
                })
            }
        });
});

TRIPBUDDYROUTES.route("/buddypending/:buddy_id").get(function (req, res) {
    TRIPBUDDY.find({ buddy_id: req.params.buddy_id })
        .then(tripbuddy => {
            if (tripbuddy != null) {
                res.status(200).json({
                    tripbuddy: tripbuddy
                })
            } else {
                res.status(400).json({
                    tripbuddy: null
                })
            }
        });
});



module.exports = TRIPBUDDYROUTES;