import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import globalSettings from 'globalSettings';

import { getEventsFailure, getEventSuccess } from './actions';
import { GET_EVENTS_START } from './constants';

// Individual exports for testing

export function* getEvents(payload) {
  try {
    const { category } = payload.payload;
    const events = yield axios.get(
      `${globalSettings.backendRoute}/events/${category}`,
    );

    yield put(getEventSuccess(events.data.data));
  } catch (err) {
    yield put(getEventsFailure(err));
  }
}

export default function* eventsCategoryPageSaga() {
  yield all([takeLatest(GET_EVENTS_START, getEvents)]);
}
