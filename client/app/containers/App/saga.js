import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { loginStudentFailure, loginStudentSuccess } from './actions';
import { LOGIN_STUDENT_START, LOGIN_STUDENT_WITH_TOKEN } from './constants';

export function* loginStudent(payload) {
  try {
    const { email, otp } = payload.payload;
    const response = yield axios.post(`${globalSettings.backendRoute}/login`, {
      email,
      otp,
    });
    yield put(loginStudentSuccess(response.data));
  } catch (err) {
    yield put(loginStudentFailure(err));
  }
}

export function* loginStudentWithToken(payload) {
  try {
    const { token } = payload.payload;
    const response = yield axios.post(
      `${globalSettings.backendRoute}/login-with-token`,
      {
        token,
      },
    );
    yield put(loginStudentSuccess(response.data));
  } catch (err) {
    yield put(loginStudentFailure(err));
  }
}

export default function* appSaga() {
  yield all([
    takeLatest(LOGIN_STUDENT_START, loginStudent),
    takeLatest(LOGIN_STUDENT_WITH_TOKEN, loginStudentWithToken),
  ]);
}
