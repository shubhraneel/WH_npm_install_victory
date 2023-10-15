/*
 *
 * TsgContactsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_CONTACTS_START,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getContactsStart() {
  return {
    type: GET_CONTACTS_START,
  };
}

export function getContactsSuccess(data) {
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
