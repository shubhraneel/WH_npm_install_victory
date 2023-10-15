/*
 *
 * SingleStudentPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_DATA_FAILURE,
  GET_DATA_START,
  GET_DATA_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getStudentDataStart(id) {
  return {
    type: GET_DATA_START,
    payload: { id },
  };
}

export function getStudentDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    payload: data,
  };
}

export function getStudentDataFailure(err) {
  return {
    type: GET_DATA_FAILURE,
    payload: err,
  };
}
