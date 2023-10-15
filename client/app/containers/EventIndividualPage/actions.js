/*
 *
 * EventIndividualPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_EVENT_FAILURE,
  GET_EVENT_START,
  GET_EVENT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getEventStart(slug) {
  return {
    type: GET_EVENT_START,
    payload: { slug },
  };
}

export function getEventSuccess(data) {
  return {
    type: GET_EVENT_SUCCESS,
    payload: data,
  };
}

export function getEventFailure(err) {
  return {
    type: GET_EVENT_FAILURE,
    payload: err,
  };
}
