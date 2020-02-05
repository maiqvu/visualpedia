import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import Question from '../Question';
import './style.scss';

class Quiz extends Component {
  initialState = {
    showSolution: false,
    answerIsCorrect: null,
    correctCount: 0,
  };

  state = {...this.initialState};

  handleSubmission = ((answerIsCorrect) => {
    this.setState({
      ...this.state,
      answerIsCorrect,
      correctCount: answerIsCorrect
          ? this.state.correctCount + 1
          : this.state.correctCount,
    });
  });

  finished = () => {
    const {questions = [], currentQuestion} = this.props;

    return currentQuestion === questions.length - 1 && this.state.showSolution;
  };

  handleNext = () => {
    const {nextQuestion} = this.props;
    this.setState({showSolution: false, answerIsCorrect: null});
    nextQuestion();
  };

  loadQuiz = () => {
    this.setState({...this.initialState});
    
    console.log('Fetching questions...');

    const auth_token = localStorage.getItem('auth_token');

    const {fetchQuestions} = this.props;
    console.log('Token', auth_token);

    fetchQuestions(auth_token);
  };

  componentDidMount() {
    this.loadQuiz();
  }

  render() {
    const {questions = [], currentQuestion, nextQuestion} = this.props;

    console.log(questions);
    console.log(currentQuestion);
    return (
        <div className="quiz-pane">
          <span>Correct Rate: {`${this.state.correctCount} / ${questions.length}`}</span>
          <h3>Question #{currentQuestion + 1}</h3>
          {questions && currentQuestion !== undefined &&
          <Question
              question={questions[currentQuestion]}
              showSolution={this.state.showSolution}
              handleSubmission={this.handleSubmission}
              seq={currentQuestion}
          />}
          {
            !this.state.showSolution &&
            <button
                type="button"
                className="btn btn-secondary float-right"
                onClick={() => this.setState({showSolution: true})}
                disabled={this.state.answerIsCorrect !== null
                    ? ''
                    : 'disabled'}>
              Submit
            </button>
          }
          {
            this.state.showSolution && currentQuestion < questions.length - 1 &&
            <button
                type="button"
                className="btn btn-info float-right"
                onClick={this.handleNext}>
              Next
            </button>
          }
          {
            this.finished() &&
            <>
              <div className="alert alert-success" role="alert">
                <h3>You
                  answered {`${this.state.correctCount}`} question{this.state.correctCount >
                  1 ? 's' : ''} correctly out of {questions.length}.</h3>
              </div>
              <button
                  type="button"
                  className="btn btn-info float-right"
                  onClick={this.loadQuiz}>
                Play again
              </button>
            </>

          }
        </div>
    );
  }
}

Quiz.propTypes = {
  authResult: PropTypes.object.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authResult: state.auth,
  questions: state.quiz.questions,
  currentQuestion: state.quiz.currentQuestion,
});

export default connect(mapStateToProps, actionCreators)(Quiz);