const EXPRESS = require("express");
const QUESTIONROUTES = EXPRESS.Router();
const QUESTION = require("../models/question.model");

QUESTIONROUTES.route("/question").post(function(req, res) {
    //QUESTION
    console.log(req.body)
    const Questions = new QUESTION({questions: req.body.questions});
    Questions.save()
    .then(response => {
        console.log(response)
        res.status(200).json({
            saved: true,
            response_message: "Question is saved."
        })

    })
    .catch(error => {
        res.status(200).json({
            saved: false,
            response_message: "Error while saving."
        })
    })
  
});

module.exports = QUESTIONROUTES;
