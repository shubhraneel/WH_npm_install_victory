/*
 *
 * HallDetailsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_HALL_FAILURE,
  GET_HALL_START,
  GET_HALL_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getHallStart(id) {
  return {
    type: GET_HALL_START,
    payload: { id },
  };
}

export function getHallSuccess(data) {
  return {
    type: GET_HALL_SUCCESS,
    payload: data,
  };
}

export function getHallFailure(err) {
  return {
    type: GET_HALL_FAILURE,
    payload: err,
  };
}
