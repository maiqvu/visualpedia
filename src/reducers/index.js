import { combineReducers } from 'redux';
import { AUTH } from '../actions/types';

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

export default combineReducers({ auth });
