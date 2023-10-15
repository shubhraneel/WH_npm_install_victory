import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { createEventFailure, createEventSuccess } from './actions';
import { CREATE_EVENT_START } from './constants';

// Individual exports for testing

export function* createEvent(payload) {
  try {
    const { data } = payload.payload;

    yield axios.post(`${globalSettings.backendRoute}/event/create`, data);

    yield put(createEventSuccess());
  } catch (err) {
    yield put(createEventFailure(err));
  }
}

export default function* createSocietyEventPageSaga() {
  yield all([takeLatest(CREATE_EVENT_START, createEvent)]);
}
