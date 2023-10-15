/*
 *
 * SingleAchievementPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ACHIEVEMENT_FAILURE,
  GET_ACHIEVEMENT_START,
  GET_ACHIEVEMENT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAchievementsStart(category) {
  return {
    type: GET_ACHIEVEMENT_START,
    payload: { category },
  };
}

export function getAchievemntsSuccess(data) {
  return {
    type: GET_ACHIEVEMENT_SUCCESS,
    payload: data,
  };
}

export function getAchievementsFailure(err) {
  return {
    type: GET_ACHIEVEMENT_FAILURE,
    payload: err,
  };
}
