/*
 *
 * SocietyOfficialPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_SOCIETY_FAILURE,
  GET_SOCIETY_START,
  GET_SOCIETY_SUCCESS,
  UPDATE_DESCRIPTION_FAILURE,
  UPDATE_DESCRIPTION_START,
  UPDATE_DESCRIPTION_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getSocietyStart(id) {
  return {
    type: GET_SOCIETY_START,
    payload: { id },
  };
}

export function getSocietySuccess(data) {
  return {
    type: GET_SOCIETY_SUCCESS,
    payload: data,
  };
}

export function getSocietyFailure(err) {
  return {
    type: GET_SOCIETY_FAILURE,
    payload: err,
  };
}

export function updateDescriptionStart(description) {
  return {
    type: UPDATE_DESCRIPTION_START,
    payload: { description },
  };
}

export function updateDescriptionSuccess(data) {
  return {
    type: UPDATE_DESCRIPTION_SUCCESS,
    payload: data,
  };
}

export function updateDescriptionFailure(err) {
  return {
    type: UPDATE_DESCRIPTION_FAILURE,
    payload: err,
  };
}
