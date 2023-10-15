import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { addRequestFailure, addRequestSuccess } from './actions';
import { ADD_REQUEST_START } from './constants';

// Individual exports for testing

export function* addRequest(payload) {
  try {
    const { data } = payload.payload;
    yield axios.post(
      `${globalSettings.backendRoute}/society/add-bill-reimbursement`,
      { data },
    );

    yield put(addRequestSuccess());
  } catch (err) {
    yield put(addRequestFailure(err));
  }
}

export default function* addBillReimbursementPageSaga() {
  yield all([takeLatest(ADD_REQUEST_START, addRequest)]);
}
