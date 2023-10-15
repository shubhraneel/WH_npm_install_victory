/*
 *
 * SocietyDetailsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_SOCIETIES_START,
  GET_SOCIETIES_SUCCESS,
  GET_SOCIETIES_FAILURE,
  GET_SOCIETY_DETAILS_SUCCESS,
  GET_SOCIETY_DETAILS_FAILURE,
  GET_SOCIETY_DETAILS_START,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getSocietiesStart() {
  return {
    type: GET_SOCIETIES_START,
  };
}

export function getSocietiesSuccess(data) {
  return {
    type: GET_SOCIETIES_SUCCESS,
    payload: data,
  };
}

export function getSocietiesFailure(err) {
  return {
    type: GET_SOCIETIES_FAILURE,
    payload: err,
  };
}

export function getSocietyDetailsStart(id) {
  return {
    type: GET_SOCIETY_DETAILS_START,
    payload: id,
  };
}

export function getSocietyDetailsSuccess(data) {
  return {
    type: GET_SOCIETY_DETAILS_SUCCESS,
    payload: data,
  };
}

export function getSocietyDetailsFailure(err) {
  return {
    type: GET_SOCIETY_DETAILS_FAILURE,
    payload: err,
  };
}
