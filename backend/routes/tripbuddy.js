const EXPRESS = require("express");
const TRIPBUDDYROUTES = EXPRESS.Router();
const TRIPBUDDY = require("../models/tripbuddy.model");
const USER = require("../models/user.model");
const nodemailer = require("nodemailer");
const sender = require("../sender.js");

TRIPBUDDYROUTES.route("/buddy").post(function (req, res) {
    TRIPBUDDY.findOne({ trip_id: req.body.trip_id, buddy_id: req.body.buddy_id }).then(tripbuddy => {
        if (tripbuddy != null) {
            res.status(200).json({
                response: "That User has already been invited",
                saved: true
            });
        } else {
            const B = new TRIPBUDDY({
                owner_id: req.body.owner_id,
                trip_id: req.body.trip_id,
                buddy_id: req.body.buddy_id,
                buddy_first_name: req.body.buddy_first_name,
                buddy_last_name: req.body.buddy_last_name,
                buddy_picture: req.body.buddy_picture,
                accepted: req.body.accepted,
                denied: req.body.denied,
                pending: req.body.pending

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
        }
    }).catch(err => {
        console.log(err);
    })


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

TRIPBUDDYROUTES.route("/buddypending/:_id").put(function (req, res) {
    TRIPBUDDY.findByIdAndUpdate(
        { _id: req.params._id },
        {
            $set: { accepted: req.body.accepted, denied: req.body.denied, pending: req.body.pending }
        }
    ).then(response => {
        res.status(200).json({

        })
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
});

TRIPBUDDYROUTES.route("/buddy").get(function (req, res) {
    TRIPBUDDY.find(function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});

TRIPBUDDYROUTES.route("/buddy/:id").delete(function (req, res) {
    TRIPBUDDY.deleteMany({ trip_id: req.params.id })
        .then(tripbuddy => {
            if (tripbuddy != null) {
                res.status(200).json({
                    response_message: "Travel Buddies removed",
                    tripbuddy: tripbuddy
                });
            } else {
                res.status(400).json({
                    tripbuddy: null
                })
            }
        })
})
TRIPBUDDYROUTES.route("/buddyinvite").put(function (req, res) {
    if (req.body.email == "") {
        res.status(400).send("email required");
    }
    console.error(req.body.email);
    USER.findOne({email: req.body.email}).then((user) =>{
        if(user != null){
            console.log("user found in database");
            res.status(403).send("Nice! Your travel buddy has registered.")
        }else{
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                pool: true,
                host: "smtp.example.com",
                port: 465,
                secure: true,
                auth: {
                  user: sender.MAIL_USERNAME,
                  pass: sender.MAIL_PASSWORD
                },
              });
            const mailOptions = {
            from: 'Trippin Webapp Service <trippinwebapp@gmail.com>',
            to: `${req.body.email}`,
            subject: 'Join in Trippin to Travel',
            text:
                'You are receiving this from Trippin because your friend has a trip plan for you.\n\n'
                + 'Please click on the following link, or paste this into your browser to register with Trippin:\n\n'
                + `http://localhost:3000/register\n\n`
                + 'If you did not want to register, please ignore this email.\n',
            };
            console.log('sending mail');

            transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error("there was an error: ", err);
            } else {
                console.log("here is the res: ", response);
                res.status(200).json('invitation email sent');
            }
            });
        }
    })
})



module.exports = TRIPBUDDYROUTES;