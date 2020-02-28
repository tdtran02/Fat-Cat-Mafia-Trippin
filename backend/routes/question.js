const EXPRESS = require("express");
const QUESTIONROUTES = EXPRESS.Router();
const QUESTION = require("../models/question.model");
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
      console.log(res);
      res.json(questions);
    }
  });
});

QUESTIONROUTES.route("/question/:id").get((req, res) => {
  QUESTION.findOne({ trip_id: req.params.id })
    .then(questions => {
      console.log(questions);
      if (questions != null) {
        //  console.log(questions.destination);
        client
          .search({
            term: "coffee",
            location: questions.destination
          })
          .then(response => {
            //  console.log(response.jsonBody.businesses);
            res.status(200).json({
              questions: questions,
              recs: response.jsonBody.businesses
            });
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        res.status(400).json({
          questions: null
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
