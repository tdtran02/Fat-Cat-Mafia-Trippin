const EXPRESS = require("express");
const USERROUTES = EXPRESS.Router();

const USER = require("../models/user.model");

USERROUTES.route("/user/:id").get(function(req, res) {
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

USERROUTES.route("/user/:id").put(function(req, res) {
  console.log(req.body.hi);
  console.log(req.params);

  USER.updateOne(
    { _id: req.params.id },
    { $set: { first_name: req.body.picture } }
  )
    .then(response => {
      res.status(200).json({});
      console.log(response);
    })
    .catch(err => {});
});

module.exports = USERROUTES;
