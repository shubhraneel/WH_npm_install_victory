import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  addOfficialFailure,
  addOfficialSuccess,
  searchStudentFailure,
  searchStudentSuccess,
} from './actions';
import { ADD_OFFICIAL_START, SEARCH_STUDENT_START } from './constants';

// Individual exports for testing

export function* searchStudent(payload) {
  try {
    const { rollNo, role } = payload.payload;
    const student = yield axios.get(
      `${globalSettings.backendRoute}/student/${rollNo}`,
    );
    yield put(
      searchStudentSuccess({
        ...student.data.data,
        roleMetadata: { position: role },
      }),
    );
  } catch (err) {
    yield put(searchStudentFailure(err));
  }
}

export function* addOfficial(payload) {
  try {
    const { data } = payload.payload;

    const response = yield axios.post(
      `${globalSettings.backendRoute}/create-official`,
      { data },
    );

    yield put(addOfficialSuccess(response.data.data));
  } catch (err) {
    yield put(addOfficialFailure(err));
  }
}

export default function* addSocietyOfficialPageSaga() {
  yield all([
    takeLatest(SEARCH_STUDENT_START, searchStudent),
    takeLatest(ADD_OFFICIAL_START, addOfficial),
  ]);
}
