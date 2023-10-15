// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, all, put } from 'redux-saga/effects';
import axios from 'axios';
import globalSettings from 'globalSettings';

import { GET_CONTACTS_START, GET_DEPARTMENTS_START } from './constants';
import {
  getContactsSuccess,
  getContactsFailure,
  getDepartmentsSuccess,
  getDepartmentsFailure,
} from './actions';

export function* getDepartments() {
  try {
    const faculties = yield axios.get(
      `${globalSettings.backendRoute}/faculties`,
    );
    const payload = {
      departments: faculties.data.data.departments,
      contacts: faculties.data.data.populate,
    };
    yield put(getDepartmentsSuccess(payload));
  } catch (err) {
    yield put(getDepartmentsFailure(err));
  }
}

export function* getContacts(payload) {
  try {
    const id = payload.payload;
    const contacts = yield axios.get(
      `${globalSettings.backendRoute}/faculty/${id}`,
    );
    yield put(getContactsSuccess(contacts.data.data));
  } catch (err) {
    yield put(getContactsFailure(err));
  }
}

// Individual exports for testing
export default function* facultyContactsPageSaga() {
  yield all([
    takeLatest(GET_CONTACTS_START, getContacts),
    takeLatest(GET_DEPARTMENTS_START, getDepartments),
  ]);
}
