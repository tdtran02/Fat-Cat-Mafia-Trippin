const EXPRESS = require("express");
const SPENDINGROUTES = EXPRESS.Router();
const SPENDING = require("../models/spending.model");

SPENDINGROUTES.post("/spending/add", function(req, res) {
  const s = new SPENDING({
    trip_id: req.body.trip_id,
    name: req.body.itemname,
    amount: req.body.itemamount
  });

  s.save()
    .then(r => {
      return SPENDING.find({ trip_id: req.body.trip_id });
    })
    .then(r1 => {
      //   console.log(r1);
      res.status(200).json({
        spendings: r1
      });
    })
    .catch(err => {
      console.error(err);
    });
});

SPENDINGROUTES.post("/spending/delete", function(req, res) {
  SPENDING.findByIdAndDelete(req.body.itemid)
    .then(r => {
      return SPENDING.find({ trip_id: req.body.trip_id });
    })
    .then(r1 => {
      res.status(200).json({
        spendings: r1
      });
    });
});

SPENDINGROUTES.get("/spending/:trip_id", function(req, res) {
  SPENDING.find({ trip_id: req.params.trip_id })
    .then(r => {
      res.status(200).json({
        spendings: r
      });
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = SPENDINGROUTES;
