import * as actiontypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};
const authLogout = (state, action) => {
  return updateObject(state, {token: null, userId: null});
};

const reducer = (state=initState, action) => {
  switch(action.type) {
    case actiontypes.AUTH_START: return authStart(state, action);
    case actiontypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actiontypes.AUTH_FAIL: return authFail(state, action);
    case actiontypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
};

export default reducer;