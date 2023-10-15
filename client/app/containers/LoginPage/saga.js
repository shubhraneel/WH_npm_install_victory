import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { requestOtpFailure, requestOtpSuccess } from './actions';
import { REQUEST_OTP_START } from './constants';

// Individual exports for testing
export function* requestOtp(payload) {
  try {
    const { email } = payload.payload;
    const otpData = yield axios.post(
      `${globalSettings.backendRoute}/otp-generate`,
      { email },
    );
    yield put(requestOtpSuccess(otpData.data));
  } catch (err) {
    yield put(requestOtpFailure(err.response.data));
  }
}

export default function* loginPageSaga() {
  yield all([takeLatest(REQUEST_OTP_START, requestOtp)]);
}
