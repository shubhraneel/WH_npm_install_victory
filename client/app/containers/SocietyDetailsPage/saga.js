// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, put, all } from 'redux-saga/effects';
import axios from 'axios';
import globalSettings from 'globalSettings';

import {
  getSocietiesSuccess,
  getSocietiesFailure,
  getSocietyDetailsSuccess,
  getSocietyDetailsFailure,
} from './actions';

import { GET_SOCIETIES_START, GET_SOCIETY_DETAILS_START } from './constants';

export function* getSocieties() {
  try {
    const societies = yield axios.get(
      `${globalSettings.backendRoute}/societies`,
    );
    yield put(getSocietiesSuccess(societies.data.data.societies));
  } catch (err) {
    yield put(getSocietiesFailure(err));
  }
}

export function* getSocietyDetails(payload) {
  try {
    const id = payload.payload;
    const societyDetails = yield axios.get(
      `${globalSettings.backendRoute}/society/${id}`,
    );
    yield put(getSocietyDetailsSuccess(societyDetails.data.data));
  } catch (err) {
    yield put(getSocietyDetailsFailure(err));
  }
}

// Individual exports for testing
export default function* societyDetailsPageSaga() {
  yield all([
    takeLatest(GET_SOCIETIES_START, getSocieties),
    takeLatest(GET_SOCIETY_DETAILS_START, getSocietyDetails),
  ]);
}
