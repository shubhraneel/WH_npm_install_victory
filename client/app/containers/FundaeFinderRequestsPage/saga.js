import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getRequestsFailure, getRequestsSuccess } from './actions';
import { GET_REQUESTS_START } from './constants';

// Individual exports for testing

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

export default function* fundaeFinderRequestsPageSaga() {
  yield all([takeLatest(GET_REQUESTS_START, getRequests)]);
}
