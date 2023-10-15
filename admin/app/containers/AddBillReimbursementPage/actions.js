/*
 *
 * AddBillReimbursementPage actions
 *
 */

import { uploadMedia } from 'utils/mediaUpload';

import {
  ADD_REQUEST_FAILURE,
  ADD_REQUEST_START,
  ADD_REQUEST_SUCCESS,
  DEFAULT_ACTION,
  SET_UPLOAD_PROGRESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addRequestStart(data) {
  return {
    type: ADD_REQUEST_START,
    payload: { data },
  };
}

export function addRequestSuccess() {
  return {
    type: ADD_REQUEST_SUCCESS,
  };
}

export function addRequestFailure(err) {
  return {
    type: ADD_REQUEST_FAILURE,
    payload: err,
  };
}

export function setUploadProgress() {
  return {
    type: SET_UPLOAD_PROGRESS,
  };
}

export function addRequestAsync(data) {
  return async dispatch => {
    try {
      const mediaUrls = await uploadMedia(
        [data.image],
        dispatch,
        setUploadProgress,
      );

      // eslint-disable-next-line no-param-reassign
      delete data.image;
      const billData = { ...data, document: mediaUrls[0] };
      dispatch(addRequestStart(billData));
    } catch (err) {
      dispatch(addRequestFailure(err));
    }
  };
}
