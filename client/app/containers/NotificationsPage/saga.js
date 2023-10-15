import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  getNotificationsFailure,
  getNotificationsSuccess,
  resolveRequestFailure,
  resolveRequestSuccess,
} from './actions';
import { GET_NOTIFICATIONS_START, RESOLVE_REQUEST_START } from './constants';
import { removeNewNotification } from '../App/actions';

// Individual exports for testing

export function* getNotifications() {
  try {
    const notifs = yield axios.get(
      `${globalSettings.backendRoute}/notifications`,
    );
    yield put(getNotificationsSuccess(notifs.data.data));
    yield put(removeNewNotification());
  } catch (err) {
    yield put(getNotificationsFailure(err));
  }
}

export function* resolveRequest(payload) {
  try {
    const { requestId, action } = payload.payload;

    yield axios.put(
      `${globalSettings.backendRoute}/${
        action === 'accept' ? 'accept-request' : 'reject-request'
      }/${requestId}`,
    );

    yield put(resolveRequestSuccess());
  } catch (err) {
    yield put(resolveRequestFailure(err));
  }
}

export default function* notificationsPageSaga() {
  yield all([
    takeLatest(GET_NOTIFICATIONS_START, getNotifications),
    takeLatest(RESOLVE_REQUEST_START, resolveRequest),
  ]);
}
