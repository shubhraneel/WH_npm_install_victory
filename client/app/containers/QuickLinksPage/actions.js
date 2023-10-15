/*
 *
 * QuickLinksPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_QUICKLINKS_START,
  GET_QUICKLINKS_SUCCESS,
  GET_QUICKLINKS_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getQuicklinksStart() {
  return {
    type: GET_QUICKLINKS_START,
  };
}

export function getQuicklinksSuccess(data) {
  return {
    type: GET_QUICKLINKS_SUCCESS,
    payload: data,
  };
}

export function getQuicklinksFailure(err) {
  return {
    type: GET_QUICKLINKS_FAILURE,
    payload: err,
  };
}
