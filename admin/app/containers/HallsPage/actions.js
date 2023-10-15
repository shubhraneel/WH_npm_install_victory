/*
 *
 * HallsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_HALLS_FAILURE,
  GET_HALLS_START,
  GET_HALLS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getHallsStart() {
  return {
    type: GET_HALLS_START,
  };
}

export function getHallsSuccess(data) {
  return {
    type: GET_HALLS_SUCCESS,
    payload: data,
  };
}

export function getHallsFailure(err) {
  return {
    type: GET_HALLS_FAILURE,
    payload: err,
  };
}
