import {AUTH, QUIZ} from './types';

export const loginSuccess = (payload) => ({
  type: AUTH.LOGIN_SUCCESS,
  payload,
});

export const loginFail = () => ({
  type: AUTH.LOGIN_FAIL,
});

export const logout = () => ({
  type: AUTH.LOGOUT,
});

export const questionsFetched = (payload) => ({
  type: QUIZ.QUESTIONS_FETCHED,
  payload
});

export const nextQuestion = () => ({
  type: QUIZ.NEXT_QUESTION,
});