import React from 'react';
import './style.scss';

const Question = (props) => {
  const {question, answers, showSolution = false} = props.question;
  console.log(answers);
  return (
      <div className="question-pane">
        <h3>{question}</h3>
        <br/>
        {answers.map((a, i) => <Answer answer={a.answer} key={i} tag={i} correct={a.is_correct} showSolution={showSolution}/>)}
      </div>
  );
};

const Answer = (props) => {
  const {answer, tag, correct} = props;
  return (
      <h4 className="form-check answers ">
        <input className="form-check-input" type="radio" name="answerRadios"
               id={`answer_${tag}`} value={tag} checked/>
        <label className="form-check-label" htmlFor={`answer_${tag}`}>
          {answer}
        </label>
      </h4>
  );
};

export default Question;