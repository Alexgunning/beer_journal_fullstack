// import jwtDecode from 'jwt-decode';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from '../actions/login';

const initialState = {
    token: null,
    email: null,
    isAuthenticated: false,
    isAuthenticating: false,
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
    [LOGIN_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null,
        }),
    [LOGIN_USER_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token,
            name: payload.name,
            email: payload.email,
            statusText: 'You have been successfully logged in.',
        }),
    [LOGIN_USER_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            name: null,
            email: null,
            statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
        }),
    [LOGOUT_USER]: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            email: null,
            name: null,
            statusText: 'You have been successfully logged out.',
        }),
    [REGISTER_USER_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            isRegistering: false,
            token: payload.token,
            name: payload.name,
            email: payload.email,
            registerStatusText: 'You have been successfully logged in.',
        }),
    [REGISTER_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isRegistering: true,
        }),
    [REGISTER_USER_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            token: null,
            email: null,
            registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
        }),
});
