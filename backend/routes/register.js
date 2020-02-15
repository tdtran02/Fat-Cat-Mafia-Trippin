const EXPRESS = require("express");
const REGISTERROUTES = EXPRESS.Router();
const USER = require("../models/user.model");
const FRIEND = require("../models/friend.model");

const BCRYPT = require("bcrypt");
const SALTROUNDS = 10;

REGISTERROUTES.route("/user/register").post(function(req, res) {
  USER.findOne({ email: req.body.email }).then(user => {
    if (user != null) {
      res.status(200).json({
        response: "Email is already linked with an account"
      });
    } else {
      // hash the password
      let HASH = BCRYPT.hashSync(req.body.password, SALTROUNDS);

      let newUser = new USER({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: HASH
      });

      newUser
        .save()
        .then(saved => {
          if (saved != null) {
            let friendObj = new FRIEND({
              owner_id: newUser._id,
              confirmed_friends: [],
              incoming_pending_friends: []
            });
            friendObj
              .save()
              .then(y => {
                res.status(200).json({
                  response: "Registered",
                  registered: true
                });
              })
              .catch(err => {
                console.err(err);
              });
          } else {
            res.status(401).json({
              response: "Register Failed",
              registered: false
            });
          }
        })
        .catch(err => {
          console.error("Error during register");
        });
    }
  });
});

module.exports = REGISTERROUTES;
