/*
 *
 * DepartmentsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_DEPTS_FAILURE,
  GET_DEPTS_START,
  GET_DEPTS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDeptsStart() {
  return {
    type: GET_DEPTS_START,
  };
}

export function getDeptsSuccess(data) {
  return {
    type: GET_DEPTS_SUCCESS,
    payload: data,
  };
}

export function getDeptsFailure(err) {
  return {
    type: GET_DEPTS_FAILURE,
    payload: err,
  };
}
