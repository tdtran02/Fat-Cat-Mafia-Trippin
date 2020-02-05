const EXPRESS = require("express");
const LOGINROUTES = EXPRESS.Router();
const USER = require("../models/user.model");

LOGINROUTES.route("/user/login").post(function(req, res) {
  console.log(req.body.email);
  // email and password -encrypted
  USER.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (user.password == req.body.password) {
        res.sendStatus(202).json({
          response: "User logged in"
        });
      } else {
        res.sendStatus(401).json({
          response: "Wrong password"
        });
      }
    })
    .catch(err => {
      res.status(400).send("Failed to logins");
    });
});

module.exports = LOGINROUTES;
