import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  addStudentsFailrue,
  addStudentsSuccess,
  getStudentsDataFailure,
  getStudentsDataSuccess,
} from './actions';
import { ADD_STUDENTS_START, GET_STUDENTS_DATA_START } from './constants';

// Individual exports for testing
export function* getStudentsData() {
  try {
    const studentsData = yield axios.get(
      `${globalSettings.backendRoute}/users`,
    );
    yield put(getStudentsDataSuccess(studentsData.data.data));
  } catch (err) {
    yield put(getStudentsDataFailure(err));
  }
}

export function* addStudents(payload) {
  try {
    const { data } = payload.payload;
    yield axios.post(`${globalSettings.backendRoute}/add-users`, {
      users: data,
    });

    yield put(addStudentsSuccess());
  } catch (err) {
    yield put(addStudentsFailrue(err));
  }
}

export default function* studentsDataPageSaga() {
  yield all([
    takeLatest(GET_STUDENTS_DATA_START, getStudentsData),
    takeLatest(ADD_STUDENTS_START, addStudents),
  ]);
}
