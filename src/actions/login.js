import axios from 'axios';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const CHECK_LOCAL_TOKEN_SUCCESS = 'CHECK_LOCAL_TOKEN_SUCCESS'
export const CHECK_LOCAL_TOKEN_FAILURE = 'CHECK_LOCAL_TOKEN_FAILURE'
export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS'
export const CHECK_TOKEN_FAILURE = 'CHECK_TOKEN_FAILURE'
export const CHECK_TOKEN_REQUEST = 'CHECK_TOKEN_REQUEST'
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

function login(email, password) {
  return axios.post('http://127.0.0.1:5000/login', {
    email,
    password,
  });
}

function checkTokenCall(token) {
  var config = {
    headers: {'Authorization':token}
  };

  return axios.get('http://127.0.0.1:5000/checkToken', config);
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
    return login(email, password)
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

export function checkToken(token) {
  return (dispatch) => {
    dispatch(checkTokenRequest(token));
    return checkTokenCall(token)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(checkTokenSuccess(response.token));
          // browserHistory.push('/');
        } catch (e) {
          alert(e);
          dispatch(checkTokenFailure({
            response: {
              status: 403,
              statusText: 'Invalid token',
            },
          }));
        }
      }).catch(error => {
        dispatch(checkTokenFailure({
          response: {
            status: 403,
            statustext: 'token invaild',
          },
        }
        ));
      });
  };
}

export function checkLocalToken() {
  let token = localStorage.getItem('token');
  if (token != null) {
    return function (dispatch) {
      dispatch(checkLocalTokenSuccess(token));
      return dispatch(checkToken(token))
    }
  }
  else {
    return function (dispatch) {
      dispatch(checkLocalTokenFailure());
    }
  }
}

export function checkLocalTokenSuccess(token) {
  return {
    type: CHECK_LOCAL_TOKEN_SUCCESS,
    payload: {
      token,
    },
  };
}

export function checkLocalTokenFailure() {
  return {
    type: CHECK_LOCAL_TOKEN_FAILURE
  };
}

export function checkTokenRequest() {
  return {
    type: CHECK_TOKEN_REQUEST,
  };
}

export function checkTokenSuccess(token) {
  //TODO keep or remove im torn
  // localStorage.setItem('token', token);
  return {
    type: CHECK_TOKEN_SUCCESS,
    payload: {
      token,
    },
  };
}

export function checkTokenFailure(error) {
  return {
    type: CHECK_TOKEN_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
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
    // dispatch(registerUserRequest());
    // return create_user(email, password)
    //   .then(parseJSON)
    //   .then(response => {
    //     try {
    //       dispatch(registerUserSuccess(response.token));
    //       // browserHistory.push('/main');
    //     } catch (e) {
    //       dispatch(registerUserFailure({
    //         response: {
    //           status: 403,
    //           statusText: 'Invalid token',
    //         },
    //       }));
    //     }
    //   })
    //   .catch(error => {
    //     dispatch(registeruserfailure({
    //       response: {
    //         status: 403,
    //         statustext: 'user with that email already exists',
    //       },
    //     }
    //     ));
    //   });
  };
}

