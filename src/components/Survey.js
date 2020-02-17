import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";


//import Question from './components/Question';
const AXIOS = require("axios").default;

class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    questionId: 1,
                    question: "What type of activities do you want to experience on this trip?",
                    answer: ''
                },
                {
                    questionId: 2,
                    question: "Which location do you prefer to to explore other than the current location of the trip?",
                    answer: ''
                },
                {
                    questionId: 3,
                    question: "What is type of cuisine are you interested in trying for this trip?",
                    answer: ''
                },
                {
                    questionId: 4,
                    question: "What is your price level in term of $ sign?",
                    answer: ''
                },
                {
                    questionId: 5,
                    question: "Is there anything else you'd like us to know?",
                    answer: ''
                }
            ]
        };
    }

    /* addQuestion(){
        AXIOS.post("http://localhost:4000/survey",{
            this.state.questions}
        })
    } */
}