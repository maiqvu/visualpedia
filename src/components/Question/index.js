import React from 'react';
import './style.scss';

const Question = (props) => {
  const {question: {question, answers}, showSolution, handleSubmission, seq} = props;
  console.log(answers);
  return (
      <div className="question-pane">
        <h3>{question}</h3>
        <br/>
        {answers.map(
            (a, i) => <Answer answer={a.answer}
                              key={`${seq}-${i}`}
                              tag={i}
                              correct={a.is_correct}
                              showSolution={showSolution}
                              handleSubmission={handleSubmission}
            />,
        )}
      </div>
  );
};

const Answer = (props) => {
  const {answer, tag, correct, showSolution, handleSubmission, checked} = props;
  console.log(correct);
  return (
      <h4 className={`form-check answers`}>
        <input className="form-check-input" type="radio" name="answerRadios"
               id={`answer_${tag}`} value={tag}
               onClick={() => handleSubmission(correct)}
               disabled={showSolution}
        />
        <label className={`form-check-label ${correct && showSolution
            ? 'correct'
            : ''}`} htmlFor={`answer_${tag}`}>
          {answer}
        </label>
      </h4>
  );
};

export default Question;