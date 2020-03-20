const EXPRESS = require("express");
const QUESTIONROUTES = EXPRESS.Router();
const QUESTION = require("../models/question.model");
const TRIP = require("../models/trip.model");
const clientkey = require("../config_yelp").apiKey;
const yelp = require("yelp-fusion");
const client = yelp.client(clientkey);

QUESTIONROUTES.route("/question").post(function(req, res) {
  //QUESTION
  // console.log(req.body)
  let recs = [];
  const Questions = new QUESTION({
    trip_id: req.body.trip_id,
    user_id: req.body.user_id,
    destination: req.body.destination,
    questions: req.body.questions
  });
  Questions.save()
    .then(response => {
      /*  client.search({
                term: 'Coffee',
                location: Questions.destination,
            }).then(resp => { */
      // console.log(resp.jsonBody.businesses[0]);
      //TODO: save data to localStorage
      //let recommendations = []

      // for (let i = 0; i < resp.jsonBody.businesses.length; i++) {
      //     console.log("Name: " + resp.jsonBody.businesses[i].name);
      //     console.log("URL: " + resp.jsonBody.businesses[i].url);
      //     console.log("Price: " + resp.jsonBody.businesses[i].price);
      // }
      //  recs = resp.jsonBody.businesses;
      res.status(200).json({
        saved: true,
        response_message: "Question is saved.",
        recs: recs,
        survey: response
        //   })
      });
      /* .catch(e => {
                console.log(e);
            }); */
    })
    .catch(error => {
      res.status(401).json({
        saved: false,
        response_message: "Error while saving."
      });
    });
});

QUESTIONROUTES.route("/question").get((req, res) => {
  QUESTION.find((err, questions) => {
    if (err) {
      console.log(err);
    } else {
      res.json(questions);
    }
  });
});

QUESTIONROUTES.route("/question/searchlocation").post((req, res) => {
  let b;
  QUESTION.findOne({ trip_id: req.body.trip_id })
    .then(questions => {
      if (questions != null) {
        let term = "";
        if (req.body.search_term.length != 0) {
          term = req.body.search_term;
        }
        client
          .search({
            term: term,
            location: questions.destination
          })
          .then(response => {
            b = response.jsonBody.businesses;

            return TRIP.findOne({ _id: req.body.trip_id });
          })
          .then(res1 => {
            let all_locations = res1.trip_locations;
            for (let i = 0; i < res1.days.length; i++) {
              all_locations = all_locations.concat(res1.days[i]);
            }

            for (let i = 0; i < all_locations.length; i++) {
              for (let j = 0; j < b.length; j++) {
                if (all_locations[i] == undefined) {
                  break;
                }

                if (all_locations[i].id == b[j].id) {
                  b.splice(j, 1);
                  break;
                }
              }
            }

            res.status(200).json({
              questions: questions,
              recs: b,
              user_locations: res1.trip_locations
            });
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        res.status(400).json({
          questions: null,
          recs: [],
          user_locations: []
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

QUESTIONROUTES.route("/question/:id").delete(function(req, res) {
  QUESTION.findOneAndDelete({ _id: req.params.id }).then(question => {
    if (question != null) {
      res.status(200).json({
        response_message: "Survey deleted!",
        question: question
      });
    } else {
      res.status(400).json({
        trip: null
      });
    }
  });
});

module.exports = QUESTIONROUTES;
