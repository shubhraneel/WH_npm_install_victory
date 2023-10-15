import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';

import { getAchievementsFailure, getAchievemntsSuccess } from './actions';
import { GET_ACHIEVEMENT_START } from './constants';

// Individual exports for testing
export function* getAchievements(payload) {
  try {
    const { category } = payload.payload;
    const achievements = yield axios.get(
      `${globalSettings.backendRoute}/achievements/${category}`,
    );

    yield put(getAchievemntsSuccess(achievements.data.data));
  } catch (err) {
    yield put(getAchievementsFailure(err));
  }
}

export default function* singleAchievementPageSaga() {
  yield all([takeLatest(GET_ACHIEVEMENT_START, getAchievements)]);
}
