import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';

import { getDeptsSuccess, getDeptsFailure } from './actions';
import { GET_DEPTS_START } from './constants';

// Individual exports for testing

export function* getDepts() {
  try {
    const depts = yield axios.get(`${globalSettings.backendRoute}/departments`);
    yield put(getDeptsSuccess(depts.data.data));
  } catch (err) {
    yield put(getDeptsFailure(err));
  }
}

export default function* departmentsPageSaga() {
  yield all([takeLatest(GET_DEPTS_START, getDepts)]);
}
