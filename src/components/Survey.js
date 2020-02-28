import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

const AXIOS = require("axios").default;
export class Survey extends Component {
  //import Question from './components/Question';

  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          questionId: 1,
          question:
            "What type of activities do you want to experience on this trip?",
          answer: ""
        },
        {
          questionId: 2,
          question:
            "Which location do you prefer to to explore other than the current location of the trip?",
          answer: ""
        },
        {
          questionId: 3,
          question:
            "What is type of cuisine are you interested in trying for this trip?",
          answer: ""
        },
        {
          questionId: 4,
          question: "What is your price level in term of ($-$$$$) sign?",
          answer: ""
        },
        {
          questionId: 5,
          question: "Is there anything else you'd like us to know?",
          answer: ""
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);

    /* AXIOS.create({
             baseURL: 'http://localhost:4000/trip/survery'});
 
         AXIOS.post('http://localhost:4000/trip/survey', this.state)
             .then(response => {
                 console.log(response)
             })
             .catch(error => {
                 console.log(error)
             })
         */
  }

  handleChange(e) {
    let id = e.target.questionId;
    let input = e.target.value;
    this.setState({});
    this.saveAnswer(e);
    console.log(this.state);
  }

  saveAnswer(e) {
    e.preventDefault();
  }

  handleSubmit() {
    let answers = {
      trip_id: JSON.parse(localStorage.getItem("trip"))._id,
      user_id: JSON.parse(localStorage.getItem("user"))._id,
      destination: JSON.parse(localStorage.getItem("trip")).destination,
      questions: [
        {
          questionId: 1,
          question:
            "What type of activities do you want to experience on this trip?",
          answer: document.getElementById("answer1").value
        },
        {
          questionId: 2,
          question:
            "Which location do you prefer to to explore other than the current location of the trip?",
          answer: document.getElementById("answer2").value
        },
        {
          questionId: 3,
          question:
            "What is type of cuisine are you interested in trying for this trip?",
          answer: document.getElementById("answer3").value
        },
        {
          questionId: 4,
          question: "What is your price level in term of ($-$$$$) sign?",
          answer: document.getElementById("answer4").value
        },
        {
          questionId: 5,
          question: "Is there anything else you'd like us to know?",
          answer: document.getElementById("answer5").value
        }
      ]
    };
    AXIOS.post("http://localhost:4000/question", answers)
      .then(response => {
        console.log(response.data);
        console.log(response.data.recs);
        let tripGET = JSON.parse(localStorage.getItem("trip"));
        let tripPUSH = {
          trip_locations: response.data.recs,
          _id: tripGET._id,
          owner_id: JSON.parse(localStorage.getItem("user"))._id,
          trip_name: tripGET.trip_name,
          destination: tripGET.destination,
          start_date: tripGET.start_date,
          end_date: tripGET.end_date,
          __v: 0
        };
        console.log(response.data.survey);
        localStorage.setItem("survey", JSON.stringify(response.data.survey));
        console.log(JSON.parse(localStorage.getItem("trip"))._id);
        window.location =
          "/trip/" + JSON.parse(localStorage.getItem("trip"))._id;
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            value="./images/TRIPPIN.png"
          >
            <img
              className="logo"
              src={require("./images/TRIPPIN.png")}
              width="50px"
              height="50px"
            />
            SURVEY
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="question">
            <form onSubmit={this.handleSubmit}>
              {/* <div>{this.state.questions.map((question, i) => (<div key={question.questionId}>
                                <div>{question.questionId}. {question.question}</div>
                                <div><input type='text' placeholder='Enter answer' value={this.state.questions[i].answer} onChange={this.handleChange} /></div>
                            </div>))} */}
              <div>
                <div>
                  What type of activities do you want to experience on this
                  trip?
                </div>
                <input id="answer1" type="text"></input>
              </div>
              <div>
                <div>
                  Which location do you prefer to to explore other than the
                  current location of the trip?
                </div>
                <input id="answer2" type="text"></input>
              </div>
              <div>
                <div>
                  What is type of cuisine are you interested in trying for this
                  trip?
                </div>
                <input id="answer3" type="text"></input>
              </div>
              <div>
                <div>What is your price level in term of ($-$$$$) sign?</div>
                <input id="answer4" type="text"></input>
              </div>
              <div>
                <div>Is there anything else you'd like us to know?</div>
                <input id="answer5" type="text"></input>
              </div>
              {/*  </div> */}
              <ButtonToolbar>
                <Button onClick={this.handleSubmit}>SAVE</Button>
              </ButtonToolbar>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.onHide}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  /* addQuestion(){
        AXIOS.post("http://localhost:4000/survey",{
            this.state.questions}
        })
    } */
}
