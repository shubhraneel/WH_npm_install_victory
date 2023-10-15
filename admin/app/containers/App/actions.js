import axios from 'axios';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGOUT,
  LOGIN_WITH_TOKEN,
} from './constants';

export function loginStart(userName, password) {
  return {
    type: LOGIN_START,
    payload: { userName, password },
  };
}

export function loginSuccess(data) {
  const idToken = data.data.token;

  localStorage.setItem('_UFT_', idToken);

  axios.defaults.headers.common.Authorization = `Bearer ${idToken}`;

  return {
    type: LOGIN_SUCCESS,
    payload: { isLoggedIn: true, credentials: data.data.official },
  };
}

export function loginFailure(err) {
  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
}

export function logout() {
  localStorage.removeItem('_UFT_');
  axios.defaults.headers.common.Authorization = undefined;

  return {
    type: LOGOUT,
  };
}

export function loginWithToken(token) {
  return {
    type: LOGIN_WITH_TOKEN,
    payload: { token },
  };
}
