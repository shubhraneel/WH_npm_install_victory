/*
 *
 * FundaeFinderPage actions
 *
 */

import {
  CREATE_REQUEST_FAILURE,
  CREATE_REQUEST_START,
  CREATE_REQUEST_SUCCESS,
  DEFAULT_ACTION,
  GET_REQUESTS_FAILURE,
  GET_REQUESTS_START,
  GET_REQUESTS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createRequestStart(requestedTo) {
  return {
    type: CREATE_REQUEST_START,
    payload: { requestedTo },
  };
}

export function createRequestSuccess() {
  return {
    type: CREATE_REQUEST_SUCCESS,
  };
}

export function createRequestFailure(err) {
  return {
    type: CREATE_REQUEST_FAILURE,
    payload: err,
  };
}

export function getRequestsStart() {
  return {
    type: GET_REQUESTS_START,
  };
}

export function getRequestsSuccess(data) {
  return {
    type: GET_REQUESTS_SUCCESS,
    payload: data,
  };
}

export function getRequestsFailure(err) {
  return {
    type: GET_REQUESTS_FAILURE,
    payload: err,
  };
}
