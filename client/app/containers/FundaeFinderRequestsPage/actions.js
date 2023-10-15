/*
 *
 * FundaeFinderRequestsPage actions
 *
 */

import {
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
