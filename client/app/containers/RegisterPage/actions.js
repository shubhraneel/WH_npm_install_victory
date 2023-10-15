/*
 *
 * RegisterPage actions
 *
 */

import { message } from 'antd';
import { uploadMedia } from 'utils/mediaUpload';
import {
  DEFAULT_ACTION,
  REGISTER_STUDENT_FAILURE,
  REGISTER_STUDENT_START,
  REGISTER_STUDENT_SUCCESS,
  SET_UPLOAD_PROGRESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function registerStudentStart(data) {
  return {
    type: REGISTER_STUDENT_START,
    payload: { data },
  };
}

export function registerStudentSuccess() {
  window.location.reload();
  return {
    type: REGISTER_STUDENT_SUCCESS,
  };
}

export function registerStudentFailure(err) {
  return {
    type: REGISTER_STUDENT_FAILURE,
    payload: err,
  };
}

export function uploadAchievementAsync(data, coverImageChanged) {
  return async dispatch => {
    try {
      if (!coverImageChanged) {
        dispatch(registerStudentStart(data));
        return;
      }

      message.info('Uploading your image.');
      const mediaUrls = await uploadMedia(
        [data.coverImage],
        dispatch,
        setUploadProgress,
      );

      // eslint-disable-next-line no-param-reassign
      delete data.coverImage;

      const profileData = {
        ...data,
        profilePic: mediaUrls[0],
      };

      dispatch(registerStudentStart(profileData));
      dispatch(setUploadProgress(101));
    } catch (err) {
      dispatch(registerStudentFailure(err));
    }
  };
}

export function setUploadProgress(progress) {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: progress,
  };
}
