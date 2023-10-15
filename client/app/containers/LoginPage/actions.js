/*
 *
 * LoginPage actions
 *
 */

import { message } from 'antd';
import {
  DEFAULT_ACTION,
  REQUEST_OTP_FAILURE,
  REQUEST_OTP_START,
  REQUEST_OTP_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestOtpStart(email) {
  return {
    type: REQUEST_OTP_START,
    payload: { email },
  };
}

export function requestOtpSuccess(data) {
  message.success('OTP has been sent to your email!');
  return {
    type: REQUEST_OTP_SUCCESS,
    payload: data,
  };
}

export function requestOtpFailure(err) {
  message.error(err.message);
  return {
    type: REQUEST_OTP_FAILURE,
    payload: err,
  };
}
