import React, { Component } from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import {QuestionData} from './QuestionData';

const AXIOS = require("axios").default;
export class Survey extends Component{


//import Question from './components/Question';

    constructor(props) {
        super(props);
        this.state = {
            userAnswer: null,
            currentQuestion: 0,
            options: [],
            quizEnd: false
          };
    };

    handleChange(e){
        let id = e.target.currentQuestion;
        let input = e.target.value;
        this.setState({userAnswer: input});
        this.saveAnswer(e);
        console.log(id);
        console.log(input);
    }


    saveAnswer(){
       // e.preventDefault();
       const {currentQuestion} = this.state;
       const surveyQuestion = {
          questions: QuestionData[currentQuestion].question,
          options: QuestionData[currentQuestion].options,
          answers: QuestionData[currentQuestion].answer 
        }
      
        console.log(JSON.stringify(surveyQuestion));
        AXIOS.put('http://localhost:4000/question', surveyQuestion)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        
       
    }    
        
          loadSurvey = () => {
            const {currentQuestion} = this.state;
            this.setState(() => {
              return{
                questions: QuestionData[currentQuestion].question,
                options: QuestionData[currentQuestion].options,
                answers: QuestionData[currentQuestion].answer
              }
            })
            this.saveAnswer();
          }
          
          componentDidMount() {
            this.loadSurvey();
          }
    
          nextQuestion = () => {
            
            this.setState({
            
              currentQuestion: this.state.currentQuestion + 1
            });
            
          }
          
          componentDidUpdate(prevProps, prevState){
            const {currentQuestion} = this.state;
            if(this.state.currentQuestion !== prevState.currentQuestion){
              this.setState(() => {
                return{
                  questions: QuestionData[currentQuestion].question,
                  options: QuestionData[currentQuestion].options,
                  answers: QuestionData[currentQuestion].answer
                }
              })
            }
          }
          
    
          setAnswer = answer =>{
            this.setState({
              userAnswer: answer
            })
            console.log(answer)
          }
    
          setFinish = () =>{
            if(this.state.currentQuestion === QuestionData.length - 1){
              this.setState({
                quizEnd: true
              })
            }
          }
    
    render(){
        const {questions, options, currentQuestion, userAnswer, quizEnd} = this.state;
       
        if(quizEnd){
            return(
                <div>
                    <h2>Thanks for taking our Survey!</h2>
                    <Button variant="primary" href="/Home">
                        Home
                    </Button>
                </div>
            )
        }
        return(
            <div className="App">
                <h1>SURVEY</h1>
            <h4>{questions}</h4>
            <span>Questions  {currentQuestion + 1}  out of {QuestionData.length} </span>

            {options.map(option => (
                <p key = {option.id}
                    className={userAnswer===option ? "selected": null} 
                    onClick={()=> this.setAnswer(option)}
                > 
                    {option}
                </p>
            ))}
            
            {currentQuestion < QuestionData.length - 1 &&
                <button 
                    onClick = {this.nextQuestion}
                >Next</button>
            }

            {currentQuestion === QuestionData.length - 1 &&
                <button
                    onClick={this.setFinish}
                >Finish</button>
            }
        </div>     
           
        );
    }
        
   
        
    /* addQuestion(){
        AXIOS.post("http://localhost:4000/survey",{
            this.state.questions}
        })
    } */
}

export default Survey;