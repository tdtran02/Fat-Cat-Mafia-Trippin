const EXPRESS = require("express");
const LOGINROUTES = EXPRESS.Router();
const USER = require("../models/user.model");

const BCRYPT = require("bcrypt");

LOGINROUTES.route("/user/login").post(function(req, res) {
  USER.findOne({ email: req.body.email })
    .then(user => {
      const IS_RIGHT_PASSWORD = BCRYPT.compareSync(
        req.body.password,
        user.password
      );
      if (IS_RIGHT_PASSWORD) {
        res.status(200).json({
          response: "User logged in",
          logged_in: true,
          user: user
        });
      } else {
        res.status(200).json({
          response: "Wrong password",
          logged_in: false
        });
      }
    })
    .catch(err => {
      console.error("Log in failed");
      res.status(200).json({
        response: "Log in failed",
        logged_in: false
      });
    });
});

module.exports = LOGINROUTES;
