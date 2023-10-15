/*
 *
 * HallsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_HALLS_START,
  GET_HALLS_SUCCESS,
  GET_HALLS_FAILURE,
  CHANGE_HALL_START,
  CHANGE_HALL_SUCCESS,
  CHANGE_HALL_FAILURE,
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

export function changeHallStart(id) {
  return {
    type: CHANGE_HALL_START,
    payload: id,
  };
}

export function changeHallSuccess(data) {
  return {
    type: CHANGE_HALL_SUCCESS,
    payload: data,
  };
}

export function changeHallFailure(err) {
  return {
    type: CHANGE_HALL_FAILURE,
    payload: err,
  };
}
