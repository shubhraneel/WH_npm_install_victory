// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getContactsSuccess, getContactsFailure } from './actions';
import { GET_CONTACTS_START } from './constants';

export function* getContacts() {
  try {
    const contacts = yield axios.get(`${globalSettings.backendRoute}/contacts`);
    yield put(getContactsSuccess(contacts.data.data.contacts));
  } catch (err) {
    yield put(getContactsFailure(err));
  }
}

// Individual exports for testing
export default function* tsgContactsPageSaga() {
  yield all([takeLatest(GET_CONTACTS_START, getContacts)]);
}
