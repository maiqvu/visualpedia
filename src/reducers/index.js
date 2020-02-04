import {combineReducers} from 'redux';
import {AUTH, QUIZ} from '../actions/types';

const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTH.LOGIN_SUCCESS:
      return action.payload;
    case AUTH.LOGIN_FAIL:
      return {error: 'login failed'};
    case AUTH.LOGOUT:
      return {};
    default:
      return state;
  }
};

const quiz = (state = {}, action) => {
  switch (action.type) {
    case QUIZ.QUESTIONS_FETCHED:
      return {...state, questions: action.payload, currentQuestion: 0};
    case QUIZ.NEXT_QUESTION:
      return {...state, currentQuestion: state.currentQuestion + 1};
    default:
      return state;
  }
};

export default combineReducers({auth, quiz});
