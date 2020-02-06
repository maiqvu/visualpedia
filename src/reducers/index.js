import {combineReducers} from 'redux';
import {AUTH, QUIZ} from '../actions/types';

const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTH.LOGIN_SUCCESS:
      return action.payload;
    case AUTH.LOGIN_FAIL:
      return {error: 'login failed'};
    case AUTH.SIGNUP_FAIL:
      return {error: 'signup failed'};
    case AUTH.LOGOUT:
      return {};
    default:
      return state;
  }
};

const quiz = (state = {}, action) => {
  switch (action.type) {
    case QUIZ.PRE_FETCH_QUESTIONS: {
      return {...state, questions: [], currentQuestion: 0};
    }
    case QUIZ.QUESTIONS_FETCHED:
      return {...state, questions: action.payload, currentQuestion: 0};
    case QUIZ.NEXT_QUESTION:
      if (state.currentQuestion < state.questions.length - 1) {
        return {...state, currentQuestion: state.currentQuestion + 1};
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default combineReducers({auth, quiz});
