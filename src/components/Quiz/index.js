import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import Question from '../Question';
import './style.scss';

class Quiz extends Component {
  state = {
    showSolution: false,
  };

  handleSubmission = ((answerIsCorrect) => {
    this.setState({...this.state, answerIsCorrect});
  });

  handleNext = () => {
    const {nextQuestion} = this.props;
    this.setState({showSolution: false});
    nextQuestion();
  };

  componentDidMount() {
    console.log('Fetching questions...');

    const {authResult: {auth_token}, questionsFetched} = this.props;
    console.log('Token', auth_token);

    axios.get('http://localhost:3000/quiz/20.json', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`,
      },
    }).then((res) => {
      console.log(res);
      questionsFetched(res.data);
    }).catch(console.warn);
  }

  render() {
    const {questions, currentQuestion, nextQuestion} = this.props;

    console.log(questions);
    console.log(currentQuestion);
    return (
        <div className="quiz-pane">
          <span>{currentQuestion}</span>
          <h2>Question #{currentQuestion + 1}</h2>
          {questions && currentQuestion !== undefined &&
          <Question
              question={questions[currentQuestion]}
              showSolution={this.state.showSolution}
              handleSubmission={this.handleSubmission}
          />}
          {
            !this.state.showSolution &&
            <button
                type="button"
                className="btn btn-success float-right"
                onClick={() => this.setState({showSolution: true})}
                disabled={this.state.hasOwnProperty('answerIsCorrect')
                    ? ''
                    : 'disabled'}>
              Submit
            </button>
          }
          {
            this.state.showSolution &&
            <button
                type="button"
                className="btn btn-success float-right"
                onClick={this.handleNext}>
              Next
            </button>
          }
        </div>
    );
  }
}

Quiz.propTypes = {
  authResult: PropTypes.object.isRequired,
  questionsFetched: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authResult: state.auth,
  questions: state.quiz.questions,
  currentQuestion: state.quiz.currentQuestion,
});

export default connect(mapStateToProps, actionCreators)(Quiz);