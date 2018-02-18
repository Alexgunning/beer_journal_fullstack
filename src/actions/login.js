import axios from 'axios';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const CHECK_LOCAL_TOKEN_SUCCESS = 'CHECK_LOCAL_TOKEN_SUCCESS'
export const CHECK_LOCAL_TOKEN_FAILURE = 'CHECK_LOCAL_TOKEN_FAILURE'
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS'
export const VERIFY_TOKEN_FAILURE = 'VERIFY_TOKEN_FAILURE'
export const VERIFY_TOKEN_REQUEST = 'VERIFY_TOKEN_REQUEST'
export const LOGOUT_USER = 'LOGOUT_USER'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'

function parseJSON(response) {
    return response.data;
}

export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

function get_token(email, password) {
    return axios.post('http://127.0.0.1:5000/login', {
        email,
        password,
    });
}

function create_user(email, password, name) {
    return axios.post('/api/create_user', {
        email,
        password,
        name
    });
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST,
    };
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        // browserHistory.push('/');
    };
}

export function redirectToRoute(route) {
    return () => {
        // browserHistory.push(route);
    };
}

export function loginUser(email, password) {
  return (dispatch) => {
        dispatch(loginUserRequest());
        return get_token(email, password)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.token));
                    // browserHistory.push('/');
                } catch (e) {
                    alert(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure({
                    response: {
                        status: 403,
                        statusText: 'Invalid username or password',
                    },
                }));
            });
    };
}

export function checkTokenRequest() {
    token = localStorage.getItem('token');
    return {
        type: CHECK_LO_TOKEN_REQUEST,
    };
}

export function checkLocalToken(email, password) {
  let token = localStorage.getItem('token');
  if (token != null) {
    return function (dispatch) {
      dispatch(checkLocalTokenSuccess(token));
      return create_user(email, password)
    }
  }
  else {
    return function (dispatch) {
      dispatch(checkLocalTokenFailure());
      return create_user(email, password)
    }
  }
}

export function checkLocalTokenSuccess(token) {
    token = localStorage.getItem('token');
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function checkLocalTokenFailure() {
  return {
    type: CHECK_TOKEN_FAILURE
  };
}


export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST,
  };
}

export function registerUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

export function registerUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function registerUser(email, password) {
  return function (dispatch) {
    dispatch(registerUserRequest());
    return create_user(email, password)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(registerUserSuccess(response.token));
          // browserHistory.push('/main');
        } catch (e) {
          dispatch(registerUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token',
            },
          }));
        }
      })
      .catch(error => {
        dispatch(registerUserFailure({
          response: {
            status: 403,
            statusText: 'User with that email already exists',
          },
        }
        ));
      });
  };
}

