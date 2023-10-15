/*
 *
 * AddSocietyOfficialPage actions
 *
 */

import {
  ADD_OFFICIAL_FAILURE,
  ADD_OFFICIAL_START,
  ADD_OFFICIAL_SUCCESS,
  DEFAULT_ACTION,
  SEARCH_STUDENT_FAILURE,
  SEARCH_STUDENT_START,
  SEARCH_STUDENT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function searchStudentStart(rollNo, role) {
  return {
    type: SEARCH_STUDENT_START,
    payload: { rollNo, role },
  };
}

export function searchStudentSuccess(data) {
  return {
    type: SEARCH_STUDENT_SUCCESS,
    payload: data,
  };
}

export function searchStudentFailure(err) {
  return {
    type: SEARCH_STUDENT_FAILURE,
    payload: err,
  };
}

export function addOfficialsStart(data) {
  return {
    type: ADD_OFFICIAL_START,
    payload: { data },
  };
}

export function addOfficialSuccess(data) {
  return {
    type: ADD_OFFICIAL_SUCCESS,
    payload: data,
  };
}

export function addOfficialFailure(err) {
  return {
    type: ADD_OFFICIAL_FAILURE,
    payload: err,
  };
}
