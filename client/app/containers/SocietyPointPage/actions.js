/*
 *
 * SocietyPointPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_EVENTS_FAILURE,
  GET_EVENTS_START,
  GET_EVENTS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getEventsStart() {
  return {
    type: GET_EVENTS_START,
  };
}

export function getEventsSuccess(data) {
  return {
    type: GET_EVENTS_SUCCESS,
    payload: data,
  };
}

export function getEventsFailure(err) {
  return {
    type: GET_EVENTS_FAILURE,
    payload: err,
  };
}
