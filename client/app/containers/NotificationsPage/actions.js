/*
 *
 * NotificationsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  RESOLVE_REQUEST_FAILURE,
  RESOLVE_REQUEST_START,
  RESOLVE_REQUEST_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getNotificationsStart() {
  return {
    type: GET_NOTIFICATIONS_START,
  };
}

export function getNotificationsSuccess(data) {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: data,
  };
}

export function getNotificationsFailure(err) {
  return {
    type: GET_NOTIFICATIONS_FAILURE,
    payload: err,
  };
}

export function resolveRequestStart(requestId, action) {
  return {
    type: RESOLVE_REQUEST_START,
    payload: { requestId, action },
  };
}

export function resolveRequestSuccess() {
  return {
    type: RESOLVE_REQUEST_SUCCESS,
  };
}

export function resolveRequestFailure(err) {
  return {
    type: RESOLVE_REQUEST_FAILURE,
    payload: err,
  };
}
