/*
 *
 * SocietyPage actions
 *
 */

import { uploadMedia } from 'utils/mediaUpload';

import { message } from 'antd';

import {
  ADD_SOCIETY_FAILURE,
  ADD_SOCIETY_START,
  ADD_SOCIETY_SUCCESS,
  DEFAULT_ACTION,
  GET_SOCIETIES_FAILURE,
  GET_SOCIETIES_START,
  GET_SOCIETIES_SUCCESS,
  SET_UPLOAD_PROGRESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getSocititesStart() {
  return {
    type: GET_SOCIETIES_START,
  };
}

export function getSocititesSuccess(data) {
  return {
    type: GET_SOCIETIES_SUCCESS,
    payload: data,
  };
}

export function getSocititesFailure(err) {
  return {
    type: GET_SOCIETIES_FAILURE,
    payload: err,
  };
}

export function setUploadProgress(progress) {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: progress,
  };
}

export function addSocietyAsync(data) {
  return async dispatch => {
    try {
      dispatch(setUploadProgress(5));
      const mediaUrls = await uploadMedia(
        [data.coverImage],
        dispatch,
        setUploadProgress,
      );

      const societyData = {
        ...data,
        coverImage: mediaUrls[0],
      };

      message.info('Processing media files!', 3);
      dispatch(addSocietyStart(societyData));
      dispatch(setUploadProgress(101));
    } catch (err) {
      dispatch(addSocietyFailure(err));
    }
  };
}

export function addSocietyStart(societyData) {
  return {
    type: ADD_SOCIETY_START,
    payload: { societyData },
  };
}

export function addSocietySuccess() {
  return {
    type: ADD_SOCIETY_SUCCESS,
  };
}

export function addSocietyFailure(err) {
  return {
    type: ADD_SOCIETY_FAILURE,
    payload: err,
  };
}
