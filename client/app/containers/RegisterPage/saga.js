import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { registerStudentFailure, registerStudentSuccess } from './actions';
import { REGISTER_STUDENT_START } from './constants';

// Individual exports for testing

export function* registerStudent(payload) {
  try {
    const { data } = payload.payload;
    yield axios.put(`${globalSettings.backendRoute}/register`, data);
    yield put(registerStudentSuccess());
  } catch (err) {
    yield put(registerStudentFailure(err));
  }
}

export default function* registerPageSaga() {
  yield all([takeLatest(REGISTER_STUDENT_START, registerStudent)]);
}
