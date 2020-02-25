const EXPRESS = require("express");
const QUESTIONROUTES = EXPRESS.Router();
const QUESTION = require("../models/question.model");
const clientkey = require("../config_yelp").apiKey;
const yelp = require('yelp-fusion');
const client = yelp.client(clientkey);

QUESTIONROUTES.route("/question").post(function (req, res) {
    //QUESTION
    // console.log(req.body)
    let recs = [];
    const Questions = new QUESTION({ trip_id: req.body.trip_id, user_id: req.body.user_id, destination: req.body.destination, questions: req.body.questions });
    Questions.save()
        .then(response => {
            /* client.search({
                term: 'Coffee',
                location: Questions.destination,
            }).then(resp => {
                // console.log(resp.jsonBody.businesses[0]);
                //TODO: save data to localStorage
                //let recommendations = []

                // for (let i = 0; i < resp.jsonBody.businesses.length; i++) {
                //     console.log("Name: " + resp.jsonBody.businesses[i].name);
                //     console.log("URL: " + resp.jsonBody.businesses[i].url);
                //     console.log("Price: " + resp.jsonBody.businesses[i].price);
                // }
                recs = resp.jsonBody.businesses;
                res.status(200).json({
                    saved: true,
                    response_message: "Question is saved.",
                    recs: recs
                })

            }).catch(e => {
                console.log(e);
            }); */


        })
        .catch(error => {
            res.status(401).json({
                saved: false,
                response_message: "Error while saving."
            })
        })

});

QUESTIONROUTES.route("/question").get((req, res) => {
    QUESTION.find((err, question) => {
        if (err) {
            console.log(err);
        } else {
            res.json(question);
        }
    })
});

QUESTIONROUTES.route("/question/:id").get((req, res) => {
    QUESTION.findOne({ trip_id: req.params.trip_id })
        .then(questions => {
            if (questions != null) {
                client.search({
                    term: 'Coffee',
                    location: Questions.destination,
                }).then(resp => {
                    // console.log(resp.jsonBody.businesses[0]);
                    //TODO: save data to localStorage
                    //let recommendations = []

                    // for (let i = 0; i < resp.jsonBody.businesses.length; i++) {
                    //     console.log("Name: " + resp.jsonBody.businesses[i].name);
                    //     console.log("URL: " + resp.jsonBody.businesses[i].url);
                    //     console.log("Price: " + resp.jsonBody.businesses[i].price);
                    // }
                    recs = resp.jsonBody.businesses;
                    res.status(200).json({
                        saved: true,
                        response_message: "Question is saved.",
                        recs: recs
                    })

                }).catch(e => {
                    console.log(e);
                });
                res.status(200).json({
                    questions: questions
                });
            } else {
                res.status(400).json({
                    questions: null
                });
            }
        });

});

QUESTIONROUTES.route("/question/:id").delete(function (req, res) {
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
