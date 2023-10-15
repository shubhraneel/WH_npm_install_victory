/*
 *
 * NewsBulletinPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_NEWS_FAILURE,
  GET_NEWS_START,
  GET_NEWS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getNewsStart() {
  return {
    type: GET_NEWS_START,
  };
}

export function getNewsSuccess(data) {
  return {
    type: GET_NEWS_SUCCESS,
    payload: data,
  };
}

export function getNewsFailure(err) {
  return {
    type: GET_NEWS_FAILURE,
    payload: err,
  };
}
