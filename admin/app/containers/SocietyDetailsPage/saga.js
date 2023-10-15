import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getSocietyFailure, getSocietySuccess } from './actions';
import { GET_SOCIETY_START } from './constants';

// Individual exports for testing

export function* getSociety(payload) {
  try {
    const { id } = payload.payload;
    const society = yield axios.get(
      `${globalSettings.backendRoute}/society/${id}`,
    );
    yield put(getSocietySuccess(society.data.data));
  } catch (err) {
    yield put(getSocietyFailure(err));
  }
}

export default function* societyDetailsPageSaga() {
  yield all([takeLatest(GET_SOCIETY_START, getSociety)]);
}
