const EXPRESS = require("express");
const POLLSROUTES = EXPRESS.Router();
const POLLS = require("../models/polls.model.js");

// create new poll
POLLSROUTES.route("/polls").post(function (req, res) {
  const polls = new POLLS({
    question: req.body.question,
    trip_id: req.body.trip_id,
    options: req.body.options,
    voted: [],
  });
  polls
    .save()
    .then((x) => {
      return POLLS.find({ trip_id: req.body.trip_id });
    })
    .then((ps) => {
      res.status(200).json({
        polls: ps,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

POLLSROUTES.route("/polls/update").post(function (req, res) {
  POLLS.findOne({ _id: req.body.poll_id })
    .then((p) => {
      for (let i = 0; i < p.options.length; i++) {
        if (req.body.voteAnswer == p.options[i].option) {
          p.options[i].votes++;
        }
      }
      return POLLS.findOneAndUpdate(
        { _id: req.body.poll_id },
        {
          options: p.options,
          $addToSet: {
            voted: { id: req.body.user_id, answer: req.body.voteAnswer },
          },
        },
        { returnOriginal: false }
      );
    })
    .then((new_p) => {
      return POLLS.find({ trip_id: req.body.trip_id });
    })
    .then((ps) => {
      res.status(200).json({
        polls: ps,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

POLLSROUTES.route("/polls/:trip_id").get(function (req, res) {
  POLLS.find({ trip_id: req.params.trip_id })
    .then((ps) => {
      res.status(200).json({
        polls: ps,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = POLLSROUTES;
