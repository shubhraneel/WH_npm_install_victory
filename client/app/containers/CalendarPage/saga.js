import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getEventsFailure, getEventsSuccess } from './actions';
import { GET_EVENTS_START } from './constants';

// Individual exports for testing

export function* getEvents() {
  try {
    const events = yield axios.get(
      `${globalSettings.backendRoute}/society-events`,
    );
    yield put(getEventsSuccess(events.data.data));
  } catch (err) {
    yield put(getEventsFailure(err));
  }
}

export default function* calendarPageSaga() {
  yield all([takeLatest(GET_EVENTS_START, getEvents)]);
}
