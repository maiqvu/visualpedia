import {AUTH, QUIZ} from './types';
import axios from 'axios';

const host = (env) => env === 'production'
    ? 'https://visualpedia-backend.herokuapp.com'
    : 'http://localhost:3000';

export const login = (credentials) => (dispatch, getState) => {
  const {email, password} = credentials;

  return axios.post(`${host(process.env.NODE_ENV)}/authenticate`
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

        return Promise.resolve();
      })
      .catch((error) => {
        console.warn(error);
        dispatch(loginFail());
        return Promise.reject(error);
      });
};

export const signup = (userInfo) => (dispatch, getState) => {
  const {name, email, password, passwordConfirmation} = userInfo;

  return axios.post(`${host(process.env.NODE_ENV)}/users.json`
      , {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        user: {
          name, email, password, password_confirmation: passwordConfirmation,
        },
      })
      .then(() => {
        dispatch(login({email, password}));
      })
      .catch((error) => {
        console.warn(error);
      });

};

export const preFetchQuestions = () => ({
  type: QUIZ.PRE_FETCH_QUESTIONS,
});

export const fetchQuestions = (auth_token) => (dispatch, getState) => {
  dispatch(preFetchQuestions());
  axios.get(`${host(process.env.NODE_ENV)}/quiz/5.json`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`,
    },
  }).then((res) => {
    console.log(res);
    // setTimeout(() => {dispatch(questionsFetched(res.data))}, 1000);
    dispatch(questionsFetched(res.data));
  }).catch(console.warn);
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
  payload,
});

export const nextQuestion = () => ({
  type: QUIZ.NEXT_QUESTION,
});