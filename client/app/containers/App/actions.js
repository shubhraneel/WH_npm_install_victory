/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import axios from 'axios';

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOGIN_STUDENT_START,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAILURE,
  LOGIN_STUDENT_WITH_TOKEN,
  LOGOUT_STUDENT,
  REMOVE_NOTIF_DOT,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function loginStudentStart(email, otp) {
  return {
    type: LOGIN_STUDENT_START,
    payload: { email, otp },
  };
}

export function loginStudentSuccess(data) {
  const idToken = data.data.token;

  localStorage.setItem('_UFT_', idToken);

  axios.defaults.headers.common.Authorization = `Bearer ${idToken}`;

  return {
    type: LOGIN_STUDENT_SUCCESS,
    payload: { isLoggedIn: true, credentials: data.data.user },
  };
}

export function loginStudentFailure(err) {
  return {
    type: LOGIN_STUDENT_FAILURE,
    payload: err,
  };
}

export function loginStudentWithToken(token) {
  return {
    type: LOGIN_STUDENT_WITH_TOKEN,
    payload: { token },
  };
}

export function logoutStudent() {
  localStorage.removeItem('_UFT_');
  axios.defaults.headers.common.Authorization = undefined;

  return {
    type: LOGOUT_STUDENT,
  };
}

export function removeNewNotification() {
  return {
    type: REMOVE_NOTIF_DOT,
  };
}
