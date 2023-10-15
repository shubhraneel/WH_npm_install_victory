import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import globalSettings from 'globalSettings';
import {
  getCountFailure,
  getCountSuccess,
  uploadAchievementFailure,
  uploadAchievementSuccess,
  uploadGrievanceFailure,
  uploadGrievanceSuccess,
} from './actions';
import {
  GET_COUNT_START,
  UPLOAD_ACHIEVEMENT_START,
  UPLOAD_GRIEVANCE_START,
} from './constants';

// Individual exports for testing
export function* uploadAchievement(payload) {
  try {
    const { data } = payload.payload;
    yield axios.post(`${globalSettings.backendRoute}/add-achievement`, {
      ...data,
    });

    yield put(uploadAchievementSuccess());
  } catch (err) {
    yield put(uploadAchievementFailure(err));
  }
}

export function* uploadGrievance(payload) {
  try {
    const { data } = payload.payload;
    yield axios.post(`${globalSettings.backendRoute}/grievance`, {
      ...data,
    });

    yield put(uploadGrievanceSuccess());
  } catch (err) {
    yield put(uploadGrievanceFailure(err));
  }
}

export function* getCount() {
  try {
    const achievements = yield axios.get(
      `${globalSettings.backendRoute}/achievements`,
    );
    yield put(getCountSuccess(achievements.data.data));
  } catch (err) {
    yield put(getCountFailure(err));
  }
}

export default function* achievementsPageSaga() {
  yield all([
    takeLatest(UPLOAD_ACHIEVEMENT_START, uploadAchievement),
    takeLatest(UPLOAD_GRIEVANCE_START, uploadGrievance),
    takeLatest(GET_COUNT_START, getCount),
  ]);
}
