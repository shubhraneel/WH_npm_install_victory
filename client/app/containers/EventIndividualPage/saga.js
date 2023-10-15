import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import globalSettings from 'globalSettings';
import { getEventSuccess, getEventFailure } from './actions';
import { GET_EVENT_START } from './constants';

// Individual exports for testing

export function* getEvent(payload) {
  try {
    const { slug } = payload.payload;
    const event = yield axios.get(
      `${globalSettings.backendRoute}/events/individual/${slug}`,
    );

    yield put(getEventSuccess(event.data.data));
  } catch (err) {
    yield put(getEventFailure(err));
  }
}

export default function* eventIndividualPageSaga() {
  yield all([takeLatest(GET_EVENT_START, getEvent)]);
}
