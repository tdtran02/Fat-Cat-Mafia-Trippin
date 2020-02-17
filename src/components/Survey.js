import React, { Component } from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

<<<<<<< HEAD
export class Survey extends Component{
=======

//import Question from './components/Question';
const AXIOS = require("axios").default;

class Survey extends React.Component {
>>>>>>> 7835166bf1a579f50d3f5ee70d4ffb95a650376d
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
                    question: "What is your price level in term of ($-$$$$) sign?",
                    answer: ''
                },
                {
                    questionId: 5,
                    question: "Is there anything else you'd like us to know?",
                    answer: ''
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

    handleChange(e){
        let id = e.target.questionId;
        let input = e.target.value;
        this.setState({answer: input});
        this.saveAnswer(e);
        console.log(id);
        console.log(input);
    }

<<<<<<< HEAD
    

    saveAnswer(e){
        e.preventDefault();
        
        AXIOS.put('http://localhost:4000/question', this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        
       
    }

    
    render(){
        return(
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" value='./images/TRIPPIN.png'>
        <img className="logo"src={require("./images/TRIPPIN.png")} width="50px" height="50px"/>SURVEY
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='question'>
            <p>
                <div>{this.state.questions.map((question, i) => (<div key={question.questionId}>
                <div>{question.questionId}. {question.question}</div>
                <div><input type='text' placeholder='Enter answer' value={this.state.questions.answer} onChange={this.handleChange}/></div>
                </div>))}
                </div>
            </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={this.props.onHide}>Done</Button>
      </Modal.Footer>
    </Modal>
        );
    }
=======
    /* addQuestion(){
        AXIOS.post("http://localhost:4000/survey",{
            this.state.questions}
        })
    } */
>>>>>>> 7835166bf1a579f50d3f5ee70d4ffb95a650376d
}