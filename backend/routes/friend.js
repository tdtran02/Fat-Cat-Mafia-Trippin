const EXPRESS = require("express");
const FRIENDROUTES = EXPRESS.Router();
const FRIEND = require("../models/friend.model");
const USER = require("../models/user.model");

// get list of friends for the user based on user id
FRIENDROUTES.route("/friend/:id").get(function(req, res) {
  FRIEND.findOne({ owner_id: req.params.id })
    .then(x => {
      // if no table for this user, create empty one
      if (x == null) {
        let friendObj = new FRIEND({
          owner_id: req.params.id,
          confirmed_friends: [],
          incoming_pending_friends: []
        });
        friendObj.save().then(y => {
          res.status(200).json({
            friend: friendObj,
            pending_friend_requests: [],
            confirmed_friends: []
          });
        });
      } else {
        let incoming;
        USER.find({ _id: { $in: x.incoming_pending_friends } })
          .then(y => {
            incoming = y;
            return USER.find({ _id: { $in: x.confirmed_friends } });
          })
          .then(z => {
            res.status(200).json({
              friend: x,
              pending_friend_requests: incoming,
              confirmed_friends: z
            });
          })
          .catch(err => {
            res.status(200).json({
              friend: null,
              pending_friend_requests: [],
              confirmed_friends: []
            });
          });
      }
    })
    .catch(err => {
      console.error(err);
    });
});

// add a
FRIENDROUTES.route("/friend/add").post(function(req, res) {
  USER.findOne({ email: req.body.adding_friend }).then(user => {
    // found the user, let add
    if (user != null) {
      // the user that is adding adds the id to his outgoing_pending_friends lsit
      FRIEND.findOneAndUpdate(
        { owner_id: req.body.user_id },
        { $addToSet: { outgoing_pending_friends: user._id.toString() } }
      )
        .then(y => {
          // add to requested friend's list
          return FRIEND.findOneAndUpdate(
            { owner_id: user._id.toString() },
            { $addToSet: { incoming_pending_friends: req.body.user_id } }
          );
        })
        .then(x => {
          res.status(200).json({
            added: true,
            respond_message: "Friend request sent!"
          });
        })
        .catch(err => {
          res.status(200).json({
            added: false,
            respond_message: "Friend request sent failed"
          });
        });
    } else {
      res.status(200).json({
        added: false,
        respond_message: "User doesn't exist, not able to add"
      });
    }
  });
});

// accept a friend request
FRIENDROUTES.route("/friend/accept").post(function(req, res) {
  console.log(req.body);
  // remove friend from incoming_pending_friends and add to confirmed_friends
  let cuser;
  FRIEND.findOneAndUpdate(
    { owner_id: req.body.user_id },
    {
      $pull: {
        incoming_pending_friends: { $in: [req.body.adding_friend] }
      },
      $addToSet: { confirmed_friends: req.body.adding_friend }
    },
    {
      returnOriginal: false
    }
  )
    .then(cuser1 => {
      cuser = cuser1;
      return FRIEND.findOneAndUpdate(
        { owner_id: req.body.adding_friend },
        {
          $pull: { outgoing_pending_friends: { $in: [req.body.user_id] } },
          $addToSet: { confirmed_friends: req.body.user_id }
        }
      );
    })
    .then(x => {
      let incoming;
      USER.find({ _id: { $in: cuser.incoming_pending_friends } })
        .then(y => {
          incoming = y;
          return USER.find({ _id: { $in: cuser.confirmed_friends } });
        })
        .then(z => {
          res.status(200).json({
            confirmed: true,
            respond_message: "Accepted friend request!",
            friend: cuser,
            pending_friend_requests: incoming,
            confirmed_friends: z
          });
        })
        .catch(err => {
          res.status(200).json({
            confirmed: false,
            respond_message: "Error during accepting friend request",
            friend: null,
            pending_friend_requests: [],
            confirmed_friends: []
          });
        });
    })
    .catch(err => {
      res.status(200).json({
        confirmed: false,
        respond_message: "Error during accepting friend request",
        friend: null,
        pending_friend_requests: [],
        confirmed_friends: []
      });
    });
});

module.exports = FRIENDROUTES;
