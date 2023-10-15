/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_OTP_FAILURE,
  REQUEST_OTP_START,
  REQUEST_OTP_SUCCESS,
} from './constants';

export const initialState = {
  isOtpSending: false,
  err: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_OTP_START:
        draft.isOtpSending = true;
        draft.err = undefined;
        break;

      case REQUEST_OTP_SUCCESS:
        draft.isOtpSending = false;
        break;

      case REQUEST_OTP_FAILURE:
        draft.isOtpSending = false;
        draft.err = action.payload;
        break;
    }
  });

export default loginPageReducer;
