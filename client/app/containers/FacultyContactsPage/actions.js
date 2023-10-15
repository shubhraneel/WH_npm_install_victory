/*
 *
 * FacultyContactsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_DEPARTMENTS_START,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAILURE,
  GET_CONTACTS_START,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDepartmentsStart() {
  return {
    type: GET_DEPARTMENTS_START,
  };
}

export function getDepartmentsSuccess(data) {
  console.log(data);
  return {
    type: GET_DEPARTMENTS_SUCCESS,
    payload: data,
  };
}

export function getDepartmentsFailure(err) {
  return {
    type: GET_DEPARTMENTS_FAILURE,
    payload: err,
  };
}

export function getContactsStart(id) {
  return {
    type: GET_CONTACTS_START,
    payload: id,
  };
}

export function getContactsSuccess(data) {
  console.log(data);
  return {
    type: GET_CONTACTS_SUCCESS,
    payload: data,
  };
}

export function getContactsFailure(err) {
  return {
    type: GET_CONTACTS_FAILURE,
    payload: err,
  };
}
