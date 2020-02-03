import {AUTH} from './types';

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