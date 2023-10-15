import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getStudentDataFailure, getStudentDataSuccess } from './actions';
import { GET_DATA_START } from './constants';

// Individual exports for testing
export function* getStudentData(payload) {
  try {
    const { id } = payload.payload;
    const student = yield axios.get(
      `${globalSettings.backendRoute}/user/${id}`,
    );

    yield put(getStudentDataSuccess(student.data.data));
  } catch (err) {
    yield put(getStudentDataFailure(err));
  }
}

export default function* singleStudentPageSaga() {
  yield all([takeLatest(GET_DATA_START, getStudentData)]);
}
