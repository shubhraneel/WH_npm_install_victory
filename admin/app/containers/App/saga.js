import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { loginFailure, loginSuccess } from './actions';
import { LOGIN_START, LOGIN_WITH_TOKEN } from './constants';

export function* loginOfficial(payload) {
  try {
    const { userName, password } = payload.payload;
    const response = yield axios.post(`${globalSettings.backendRoute}/login`, {
      userName,
      password,
    });
    yield put(loginSuccess(response.data));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

export function* loginWithToken(payload) {
  try {
    const { token } = payload.payload;
    const response = yield axios.post(
      `${globalSettings.backendRoute}/login-with-token`,
      {
        token,
      },
    );
    yield put(loginSuccess(response.data));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

export default function* appSaga() {
  yield all([
    takeLatest(LOGIN_START, loginOfficial),
    takeLatest(LOGIN_WITH_TOKEN, loginWithToken),
  ]);
}
