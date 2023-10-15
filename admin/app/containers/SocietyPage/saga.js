import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  addSocietyFailure,
  addSocietySuccess,
  getSocititesFailure,
  getSocititesStart,
  getSocititesSuccess,
} from './actions';
import { ADD_SOCIETY_START, GET_SOCIETIES_START } from './constants';

// Individual exports for testing

export function* getSocieties() {
  try {
    const societies = yield axios.get(
      `${globalSettings.backendRoute}/societies`,
    );
    yield put(getSocititesSuccess(societies.data.data));
  } catch (err) {
    yield put(getSocititesFailure(err));
  }
}

export function* addSociety(payload) {
  try {
    const { societyData } = payload.payload;
    yield axios.post(`${globalSettings.backendRoute}/add-society`, {
      society: societyData,
    });

    yield put(addSocietySuccess());
    yield put(getSocititesStart());
  } catch (err) {
    yield put(addSocietyFailure(err));
  }
}

export default function* societyPageSaga() {
  yield all([
    takeLatest(GET_SOCIETIES_START, getSocieties),
    takeLatest(ADD_SOCIETY_START, addSociety),
  ]);
}
