/*
 *
 * StudentsDataPage actions
 *
 */

import {
  ADD_STUDENTS_FAILURE,
  ADD_STUDENTS_START,
  ADD_STUDENTS_SUCCESS,
  DEFAULT_ACTION,
  GET_STUDENTS_DATA_FAILURE,
  GET_STUDENTS_DATA_START,
  GET_STUDENTS_DATA_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getStudentsDataStart() {
  return {
    type: GET_STUDENTS_DATA_START,
  };
}

export function getStudentsDataSuccess(data) {
  return {
    type: GET_STUDENTS_DATA_SUCCESS,
    payload: data,
  };
}

export function getStudentsDataFailure(err) {
  return {
    type: GET_STUDENTS_DATA_FAILURE,
    payload: err,
  };
}

export function addStudentsStart(data) {
  return {
    type: ADD_STUDENTS_START,
    payload: { data },
  };
}

export function addStudentsSuccess() {
  return {
    type: ADD_STUDENTS_SUCCESS,
  };
}

export function addStudentsFailrue(err) {
  return {
    type: ADD_STUDENTS_FAILURE,
    payload: err,
  };
}
