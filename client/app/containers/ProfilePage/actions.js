/*
 *
 * ProfilePage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_PROFILE_FAILURE,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  EDIT_PROFILE_START,
  EDIT_PROFILE_END,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  CHANGE_PROFILE_DETAILS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getProfileStart() {
  return {
    type: GET_PROFILE_START,
  };
}

export function getProfileSuccess(data) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: data,
  };
}

export function getProfileFailure(err) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: err,
  };
}

export function editProfileStart() {
  return {
    type: EDIT_PROFILE_START,
  };
}

export function editProfileEnd(data) {
  return {
    type: EDIT_PROFILE_END,
    payload: data,
  };
}

export function editProfileSuccess(data) {
  return {
    type: EDIT_PROFILE_SUCCESS,
    payload: data,
  };
}

export function editProfileFailure(err) {
  return {
    type: EDIT_PROFILE_FAILURE,
    payload: err,
  };
}

export function changeProfileDetails(data) {
  console.log("changeProfileDetails", data.target.value);
  return {
    type: CHANGE_PROFILE_DETAILS,
    payload: data,
  };
}
