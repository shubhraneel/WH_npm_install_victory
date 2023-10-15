import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { setUploadProgress, uploadFailure, uploadSuccess } from './actions';
import { UPLOAD_START } from './constants';

// Individual exports for testing

export function* addImages(payload) {
  try {
    const { urls } = payload.payload;
    yield axios.post(`${globalSettings.backendRoute}/society/add-image`, {
      urls,
    });

    yield put(uploadSuccess());
    yield put(setUploadProgress(false));
  } catch (err) {
    yield put(uploadFailure(err));
    yield put(setUploadProgress(false));
  }
}

export default function* addSocietyGallerySaga() {
  yield all([takeLatest(UPLOAD_START, addImages)]);
}
