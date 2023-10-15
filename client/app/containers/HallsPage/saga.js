// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  getHallsSuccess,
  getHallsFailure,
  changeHallSuccess,
  changeHallFailure,
} from './actions';
import { GET_HALLS_START, CHANGE_HALL_START } from './constants';

// Individual exports for testing
export function* getHalls() {
  try {
    const halls = yield axios.get(`${globalSettings.backendRoute}/halls`);
    yield put(getHallsSuccess(halls.data.data));
  } catch (err) {
    yield put(getHallsFailure(err));
  }
}

export function* changeHall(payload) {
  try {
    const id = payload.payload;
    const hall = yield axios.get(`${globalSettings.backendRoute}/hall/${id}`);
    yield put(changeHallSuccess(hall.data.data));
  } catch (err) {
    yield put(changeHallFailure(err));
  }
}

export default function* hallsPageSaga() {
  yield all([
    takeLatest(GET_HALLS_START, getHalls),
    takeLatest(CHANGE_HALL_START, changeHall),
  ]);
}
