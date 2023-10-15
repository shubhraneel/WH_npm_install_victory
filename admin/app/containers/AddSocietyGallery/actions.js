/*
 *
 * AddSocietyGallery actions
 *
 */

import { uploadMedia } from 'utils/mediaUpload';

import { message } from 'antd';
import history from 'utils/history';

import {
  DEFAULT_ACTION,
  UPLOAD_FAILURE,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  SET_UPLOAD_PROGRESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function uploadStart(urls) {
  return {
    type: UPLOAD_START,
    payload: { urls },
  };
}

export function uploadSuccess() {
  history.push('/home');
  return {
    type: UPLOAD_SUCCESS,
  };
}

export function uploadFailure(err) {
  return {
    type: UPLOAD_FAILURE,
    payload: err,
  };
}

export function setUploadProgress(progress) {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: progress,
  };
}

export function uploadAsync(data) {
  return async dispatch => {
    try {
      dispatch(setUploadProgress(true));
      const mediaUrls = await uploadMedia(data, dispatch, setUploadProgress);

      message.info('Processing media files!', 3);
      dispatch(uploadStart(mediaUrls));
    } catch (err) {
      dispatch(uploadFailure(err));
    }
  };
}
