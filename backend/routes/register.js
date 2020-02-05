const EXPRESS = require("express");
const LOGINROUTES = EXPRESS.Router();
const USER = require("../models/user.model");

LOGINROUTES.route("/user/login").post(function(req, res) {
  // email and password -encrypted

  //   USER newUser = {
  //     email: req.body.email,
  //     first_name: req.body.first_name,
  //     last_name: req.body.last_name,
  //     password: req.body.password
  //   };
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
