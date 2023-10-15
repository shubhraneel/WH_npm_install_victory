import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getHallFailure, getHallSuccess } from './actions';
import { GET_HALL_START } from './constants';

// Individual exports for testing

export function* getHall(payload) {
  try {
    const { id } = payload.payload;
    const hall = yield axios.get(`${globalSettings.backendRoute}/hall/${id}`);

    yield put(getHallSuccess(hall.data.data));
  } catch (err) {
    yield put(getHallFailure(err));
  }
}

export default function* hallDetailsPageSaga() {
  yield all([takeLatest(GET_HALL_START, getHall)]);
}
