/*
 *
 * CreateSocietyEventPage actions
 *
 */

import { uploadMedia } from 'utils/mediaUpload';

import { message } from 'antd';

import history from 'utils/history';

import {
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_START,
  CREATE_EVENT_SUCCESS,
  DEFAULT_ACTION,
  SET_UPLOAD_PROGRESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createEventStart(data) {
  return {
    type: CREATE_EVENT_START,
    payload: { data },
  };
}

export function createEventSuccess() {
  history.push('/home');
  return {
    type: CREATE_EVENT_SUCCESS,
  };
}

export function createEventFailure(err) {
  return {
    type: CREATE_EVENT_FAILURE,
    payload: err,
  };
}

export function setUploadProgress(progress) {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: progress,
  };
}

export function createEventAsync(data) {
  return async dispatch => {
    try {
      const mediaUrls = await uploadMedia(
        [data.coverImage],
        dispatch,
        setUploadProgress,
      );

      const societyData = {
        ...data,
        eventImage: mediaUrls[0],
      };

      message.info('Processing media files!', 3);
      dispatch(createEventStart(societyData));
      dispatch(setUploadProgress(101));
    } catch (err) {
      dispatch(createEventFailure(err));
    }
  };
}
