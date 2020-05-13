import React from 'react';
import PropTypes from 'prop-types';
import "../styles/SurveyQuiz.css";


function AnswerOption(props) {

  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={props.content === props.answer}
        id={props.content}
        value={props.content}
        disabled={props.answer}
        onChange={props.selected}
      />
      <label className="radioCustomLabel" htmlFor={props.content}>
        {props.content}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  content: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  selected: PropTypes.func.isRequired
};

export default AnswerOption;