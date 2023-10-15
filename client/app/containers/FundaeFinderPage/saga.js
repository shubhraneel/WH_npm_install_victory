import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  createRequestFailure,
  createRequestSuccess,
  getRequestsFailure,
  getRequestsSuccess,
} from './actions';
import { CREATE_REQUEST_START, GET_REQUESTS_START } from './constants';

// Individual exports for testing

export function* createRequest(payload) {
  try {
    const { requestedTo } = payload.payload;

    yield axios.post(`${globalSettings.backendRoute}/request-contact`, {
      requestedTo,
    });
    yield put(createRequestSuccess());
  } catch (err) {
    yield put(createRequestFailure(err));
  }
}

export function* getRequests() {
  try {
    const requests = yield axios.get(
      `${globalSettings.backendRoute}/fundae-finder`,
    );
    yield put(getRequestsSuccess(requests.data.data));
  } catch (err) {
    yield put(getRequestsFailure(err));
  }
}

export default function* fundaeFinderPageSaga() {
  yield all([
    takeLatest(CREATE_REQUEST_START, createRequest),
    takeLatest(GET_REQUESTS_START, getRequests),
  ]);
}
