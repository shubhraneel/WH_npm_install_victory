/* eslint-disable no-param-reassign */
/*
 *
 * AchievementsPage actions
 *
 */

import { uploadMedia } from 'utils/mediaUpload';

import { message } from 'antd';
import {
  DEFAULT_ACTION,
  GET_COUNT_FAILURE,
  GET_COUNT_START,
  GET_COUNT_SUCCESS,
  SET_UPLOAD_PROGRESS,
  START_ACHIEVEMENT_LOADER,
  START_GRIEVANCE_LOADER,
  UPLOAD_ACHIEVEMENT_FAILURE,
  UPLOAD_ACHIEVEMENT_START,
  UPLOAD_ACHIEVEMENT_SUCCESS,
  UPLOAD_GRIEVANCE_FAILURE,
  UPLOAD_GRIEVANCE_START,
  UPLOAD_GRIEVANCE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setUploadProgress(progress) {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: progress,
  };
}

export function uploadAchievementStart(data) {
  return {
    type: UPLOAD_ACHIEVEMENT_START,
    payload: { data },
  };
}

export function uploadAchievementSuccess() {
  message.success('Achievement uploaded!');
  return {
    type: UPLOAD_ACHIEVEMENT_SUCCESS,
  };
}

export function uploadAchievementFailure(err) {
  return {
    type: UPLOAD_ACHIEVEMENT_FAILURE,
    payload: err,
  };
}

export function startAchievementsLoader() {
  return {
    type: START_ACHIEVEMENT_LOADER,
  };
}

export function uploadAchievementAsync(data) {
  return async dispatch => {
    try {
      dispatch(startAchievementsLoader());
      const mediaUrls = await uploadMedia(
        data.media,
        dispatch,
        setUploadProgress,
      );

      delete data.media;
      const achievementData = {
        ...data,
        certificate: mediaUrls[0],
      };

      message.info('Processing media files!', 3);
      dispatch(uploadAchievementStart(achievementData));
      dispatch(setUploadProgress(101));
    } catch (err) {
      dispatch(uploadAchievementFailure(err));
    }
  };
}

export function uploadGrievanceStart(data) {
  return {
    type: UPLOAD_GRIEVANCE_START,
    payload: { data },
  };
}

export function uploadGrievanceSuccess() {
  message.success('Achievement uploaded!');
  return {
    type: UPLOAD_GRIEVANCE_SUCCESS,
  };
}

export function uploadGrievanceFailure(err) {
  return {
    type: UPLOAD_GRIEVANCE_FAILURE,
    payload: err,
  };
}

export function startGrievanceLoader() {
  return {
    type: START_GRIEVANCE_LOADER,
  };
}

export function uploadGrievanceAsync(data) {
  return async dispatch => {
    try {
      dispatch(startGrievanceLoader());
      const mediaUrls = await uploadMedia(
        data.documents,
        dispatch,
        setUploadProgress,
      );

      const grievanceData = {
        ...data,
        documents: mediaUrls,
      };

      message.info('Processing media files!', 3);
      dispatch(uploadGrievanceStart(grievanceData));
      dispatch(setUploadProgress(101));
    } catch (err) {
      dispatch(uploadGrievanceFailure(err));
    }
  };
}

export function getCountStart() {
  return {
    type: GET_COUNT_START,
  };
}

export function getCountSuccess(data) {
  return {
    type: GET_COUNT_SUCCESS,
    payload: data,
  };
}

export function getCountFailure(err) {
  return {
    type: GET_COUNT_FAILURE,
    payload: err,
  };
}
