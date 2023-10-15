import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  getProfileSuccess,
  getProfileFailure,
  editProfileSuccess,
  editProfileFailure,
} from './actions';
import { GET_PROFILE_START, EDIT_PROFILE_END } from './constants';

// Individual exports for testing

export function* getProfile() {
  try {
    const profile = yield axios.get(
      `${globalSettings.backendRoute}/my-profile`,
    );

    yield put(getProfileSuccess(profile.data.data));
  } catch (err) {
    yield put(getProfileFailure(err));
  }
}

export function* editProfile(payload) {
  try {
    const profile = payload.payload
    const updated_profile = yield axios.put(`${globalSettings.backendRoute}/register`, {
      ...profile
    })

    console.log(updated_profile)
    yield put(editProfileSuccess(updated_profile.data.data))
  } catch (err) {
    yield put(editProfileFailure(err))
  }
}

export default function* profilePageSaga() {
  yield all([takeLatest(GET_PROFILE_START, getProfile), takeLatest(EDIT_PROFILE_END, editProfile)]);
}
