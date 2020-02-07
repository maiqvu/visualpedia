import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash/math';
import * as actionCreators from '../../actions';
import Question from '../Question';
import './style.scss';

function Spinner() {
  return <h3 className="spinner-pane">
    <p>Loading...</p>
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    &nbsp;
    <div className="spinner-border text-secondary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    &nbsp;
    <div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    &nbsp;
    <div className="spinner-border text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    &nbsp;
    <div className="spinner-border text-warning" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    &nbsp;
    <div className="spinner-border text-info" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    &nbsp;
    <div className="spinner-border text-light" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </h3>;
}

class Quiz extends Component {
  initialState = {
    showSolution: false,
    submissions: Array(5).fill(null),
    correctCount: 0,
  };

  state = {...this.initialState};

  handleChooseAnswer = ((answerIsCorrect) => {
    const {currentQuestion} = this.props;
    const submissions = [...this.state.submissions];
    submissions[currentQuestion] = answerIsCorrect;
    this.setState({
      ...this.state,
      submissions,
    });
  });

  finished = () => {
    const {questions = [], currentQuestion} = this.props;

    return currentQuestion === questions.length - 1 && this.state.showSolution;
  };

  handleShowSolution = () => {
    this.setState({
      showSolution: true,
      correctCount: _.sum(this.state.submissions.map((a) => a ? 1 : 0)),
    });
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
          {questions.length === 0 && <Spinner/>}
          {questions.length > 0 &&
          <div>
            <span>Correct Rate: {`${this.state.correctCount} / ${questions.length}`}</span>
            <h3>Question #{currentQuestion + 1}</h3>
            {questions && currentQuestion !== undefined &&
            <Question
                question={questions[currentQuestion]}
                showSolution={this.state.showSolution}
                handleChooseAnswer={this.handleChooseAnswer}
                seq={currentQuestion}
            />}
            {
              !this.state.showSolution &&
              <button
                  type="button"
                  className="btn btn-secondary float-right"
                  onClick={this.handleShowSolution}
                  disabled={this.state.submissions[currentQuestion] !== null
                      ? ''
                      : 'disabled'}>
                Submit
              </button>
            }
            {
              this.state.showSolution && currentQuestion < questions.length -
              1 &&
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