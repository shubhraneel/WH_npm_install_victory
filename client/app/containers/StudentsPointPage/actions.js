/*
 *
 * StudentsPointPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ACADEMIC_RESOURCES_FAILURE,
  GET_ACADEMIC_RESOURCES_START,
  GET_ACADEMIC_RESOURCES_SUCCESS,
  GET_CAREER_RESOURCES_FAILURE,
  GET_CAREER_RESOURCES_START,
  GET_CAREER_RESOURCES_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAcademicResourcesStart(dept) {
  return {
    type: GET_ACADEMIC_RESOURCES_START,
    payload: { dept },
  };
}

export function getAcademicResourcesSuccess(data) {
  return {
    type: GET_ACADEMIC_RESOURCES_SUCCESS,
    payload: data,
  };
}

export function getAcademicResourcesFailure(err) {
  return {
    type: GET_ACADEMIC_RESOURCES_FAILURE,
    payload: err,
  };
}

export function getCareerResourcesStart() {
  return {
    type: GET_CAREER_RESOURCES_START,
  };
}

export function getCareerResourcesSuccess(data) {
  return {
    type: GET_CAREER_RESOURCES_SUCCESS,
    payload: data,
  };
}

export function getCareerResourcesFailure(err) {
  return {
    type: GET_CAREER_RESOURCES_FAILURE,
    payload: err,
  };
}
