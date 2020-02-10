const EXPRESS = require("express");
const USERROUTES = EXPRESS.Router();

const USER = require("../models/user.model");

USERROUTES.route("/user/:id").get(function(req, res) {
  USER.findOne({ _id: req.params.id }).then(user => {
    if (user != null) {
      res.status(400).json({
        user: user
      });
    } else {
      res.status(400).json({
        user: null
      });
    }
  });
});

module.exports = USERROUTES;
