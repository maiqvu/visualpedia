import {AUTH, QUIZ} from './types';
import axios from 'axios';

export const login = (credentials) => (dispatch, getState) => {
  const {email, password} = credentials;
  return axios.post('http://localhost:3000/authenticate'
      , {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        email,
        password,
      })
      .then((res) => {
        dispatch(loginSuccess(res.data));

        localStorage.setItem('auth_token', res.data.auth_token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('email', res.data.email);
      })
      .catch((error) => {
        console.warn(error);
        loginFail();
      });
};

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