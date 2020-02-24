import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {QuestionData} from './QuestionData';

export class Question extends Component {
  state = {
    answer: null,
    currentQuestion: 0,
    options: [],
    quizEnd: false
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
      }
      
      componentDidMount() {
        this.loadSurvey();
      }

      nextQuestion = () => {
        this.setState({
          currentQuestion: this.state.currentQuestion + 1
        })
        
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
      }

      setFinish = () =>{
        if(this.state.currentQuestion === QuestionData.length - 1){
          this.setState({
            quizEnd: true
          })
        }
      }
      

      render(){
        const {questions, options, currentQuestion, userAnswer} = this.state;
        
        return (
          <div className="App">
            <h3>{questions}</h3>
            <span>{'Questions'} ${currentQuestion + 1} {' out of'} ${QuestionData.length + 1} </span>
              {options.map(option => (
                <p
                  key = {option.id}
                  className={'ui floating message options ${userAnswer === option ? "selected" : null'} 
                  onClick={() => this.setAnswer(option)}
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
        )
      }
  }
  
  /* working block
  handleSubmit(event) {
    this.setState({ answer: event.target.value });
  }

  handleChange(e) {
    this.setState({});
  }
  render() {
    return (
      <div className="question">
        <p>{this.props.survey.questionId}</p>
        <p>{this.props.survey.question}</p>
        <input text="text" answer="answer" onChange={this.handleChange} />
      </div>
    )
  }
}
*/
/*
function Question(props) {
  return (
    <h2 className="question">{props.content}</h2>
  );
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};
*/

export default Question;