// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getQuicklinksSuccess, getQuicklinksFailure } from './actions';
import { GET_QUICKLINKS_START } from './constants';

// Individual exports for testing
export function* getQuicklinks() {
  try {
    const quicklinks = yield axios.get(
      `${globalSettings.backendRoute}/quicklinks`,
    );
    yield put(getQuicklinksSuccess(quicklinks.data.data));
  } catch (err) {
    yield put(getQuicklinksFailure(err));
  }
}

export default function* quickLinksPageSaga() {
  yield all([takeLatest(GET_QUICKLINKS_START, getQuicklinks)]);
}
