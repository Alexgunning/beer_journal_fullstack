// import jwtDecode from 'jwt-decode';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  CHECK_LOCAL_TOKEN_SUCCESS,
  CHECK_LOCAL_TOKEN_FAILURE,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
  CHECK_TOKEN_REQUEST,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from '../actions/login';

const initialState = {
  token: null,
  email: null,
  name: null,
  isAuthenticated: false,
  isAuthenticating: false,
  authenticationAttempted: false,
  statusText: null,
  isRegistering: false,
  isRegistered: false,
  registerStatusText: null,
};

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];


    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export default createReducer(initialState, {
  [CHECK_LOCAL_TOKEN_FAILURE]: (state) =>
  Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: false,
    authenticationAttempted: true,
    statusText: null,
  }),
  [CHECK_LOCAL_TOKEN_SUCCESS]: (state, payload) =>
  Object.assign({}, state, {
    isAuthenticating: true,
    isAuthenticated: false,
    authenticationAttempted: true,
    token: payload.token
  }),
  [CHECK_TOKEN_REQUEST]: (state) =>
  Object.assign({}, state, {
    isAuthenticating: true,
    isAuthenticated: false,
    authenticationAttempted: true,
  }),
  [CHECK_TOKEN_SUCCESS]: (state, payload) =>
  Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: true,
    authenticationAttempted: true,
    token: payload.token,
    name: payload.name,
    email: payload.email,
    statusText: null
  }),
  [CHECK_TOKEN_FAILURE]: (state, payload) =>
  Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: false,
    authenticationAttempted: true,
    token: null,
    name: null,
    email: null,
    statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,

  }),
  [LOGIN_USER_REQUEST]: (state) =>
  Object.assign({}, state, {
    isAuthenticating: true,
    authenticationAttempted: true,
    statusText: null,
  }),
  [LOGIN_USER_SUCCESS]: (state, payload) =>
  Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: true,
    authenticationAttempted: true,
    token: payload.token,
    name: payload.name,
    email: payload.email,
    statusText: 'You have been successfully logged in.',
  }),
  [LOGIN_USER_FAILURE]: (state, payload) =>
  Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: false,
    authenticationAttempted: true,
    token: null,
    name: null,
    email: null,
    statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
  }),
  [LOGOUT_USER]: (state) =>
  Object.assign({}, state, {
    isAuthenticated: false,
    authenticationAttempted: true,
    token: null,
    email: null,
    name: null,
    statusText: 'You have been successfully logged out.',
  }),
  [REGISTER_USER_SUCCESS]: (state, payload) =>
  Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: true,
    authenticationAttempted: true,
    isRegistering: false,
    token: payload.token,
    name: payload.name,
    email: payload.email,
    registerStatusText: 'You have been successfully logged in.',
  }),
  [REGISTER_USER_REQUEST]: (state) =>
  Object.assign({}, state, {
    isRegistering: true,
    authenticationAttempted: true,
  }),
  [REGISTER_USER_FAILURE]: (state, payload) =>
  Object.assign({}, state, {
    isAuthenticated: false,
    authenticationAttempted: true,
    token: null,
    token: null,
    email: null,
    registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
  }),
});
