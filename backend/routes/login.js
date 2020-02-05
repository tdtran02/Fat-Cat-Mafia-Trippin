const EXPRESS = require("express");
const LOGINROUTES = EXPRESS.Router();
const USER = require("../models/user.model");

LOGINROUTES.route("/user/login").post(function(req, res) {
  // email and password -encrypted
  USER.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (user.password == req.body.password) {
        res.status(200).json({
          response: "User logged in"
        });
      } else {
        res.status(401).json({
          response: "Wrong password"
        });
      }
    })
    .catch(err => {
      res.status(400).send("Failed to logins");
    });
});

module.exports = LOGINROUTES;