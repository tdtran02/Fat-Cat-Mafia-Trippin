const EXPRESS = require("express");
const USERROUTES = EXPRESS.Router();

const USER = require("../models/user.model");

//find user by id
USERROUTES.route("/user/:id").get(function (req, res) {
  USER.findOne({ _id: req.params.id }).then(user => {
    if (user != null) {
      res.status(200).json({
        user: user
      });
    } else {
      res.status(400).json({
        user: null
      });
    }
  });
});

//find user by email
USERROUTES.route("/useremail/:email").get(function (req, res) {
  USER.findOne({ email: req.params.email }).then(user => {
    if (user != null) {
      res.status(200).json({
        user: user
      });
    } else {
      res.status(400).json({
        user: null
      });
    }
  });
});

//get all users
USERROUTES.route("/user").get(function (req, res) {
  USER.find(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

USERROUTES.route("/user/:id").put(function (req, res) {
  /*  console.log(req.body.hi);
   console.log(req.params); */
  console.log(req.params);
  console.log(req.body.user.image);
  USER.updateOne(
    { _id: req.params.id },
    {
      $set: { image: req.body.user.image, first_name: req.body.user.first_name, last_name: req.body.user.last_name, hometown: req.body.user.hometown }
    }
  )
    .then(response => {
      res.status(200).json({});
      console.log(response);
    })
    .catch(err => { console.log(err) });
});




module.exports = USERROUTES;
