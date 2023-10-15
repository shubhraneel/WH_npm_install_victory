import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getHallsFailure, getHallsSuccess } from './actions';
import { GET_HALLS_START } from './constants';

// Individual exports for testing

export function* getHalls() {
  try {
    const halls = yield axios.get(`${globalSettings.backendRoute}/halls`);
    yield put(getHallsSuccess(halls.data.data));
  } catch (err) {
    yield put(getHallsFailure(err));
  }
}

export default function* hallsPageSaga() {
  yield all([takeLatest(GET_HALLS_START, getHalls)]);
}
