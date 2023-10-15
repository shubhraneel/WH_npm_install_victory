import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  getSocietyFailure,
  getSocietySuccess,
  updateDescriptionFailure,
  updateDescriptionSuccess,
} from './actions';
import { GET_SOCIETY_START, UPDATE_DESCRIPTION_START } from './constants';

// Individual exports for testing

export function* getSociety(payload) {
  try {
    const { id } = payload.payload;
    const society = yield axios.get(
      `${globalSettings.backendRoute}/society/${id}`,
    );
    yield put(getSocietySuccess(society.data.data));
  } catch (err) {
    yield put(getSocietyFailure(err));
  }
}

export function* updateDescription(payload) {
  try {
    const { description } = payload.payload;
    const newData = yield axios.post(
      `${globalSettings.backendRoute}/society/change-description`,
      { description },
    );

    yield put(updateDescriptionSuccess(newData.data.data));
  } catch (err) {
    yield put(updateDescriptionFailure(err));
  }
}

export default function* societyOfficialPageSaga() {
  yield all([
    takeLatest(GET_SOCIETY_START, getSociety),
    takeLatest(UPDATE_DESCRIPTION_START, updateDescription),
  ]);
}
