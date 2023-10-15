import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  getBillsFailure,
  getBillsSuccess,
  updateBillFailure,
  getBillsStart,
} from './actions';
import { GET_BILLS_START, UPDATE_BILL_START } from './constants';

// Individual exports for testing

export function* getBills() {
  try {
    const bills = yield axios.get(
      `${globalSettings.backendRoute}/bill-reimbursements`,
    );
    yield put(getBillsSuccess(bills.data.data));
  } catch (err) {
    yield put(getBillsFailure(err));
  }
}

export function* updateBill(payload) {
  try {
    const { id, data } = payload.payload;
    yield axios.post(
      `${globalSettings.backendRoute}/bill-reimbursement/${id}`,
      { ...data },
    );

    yield put(getBillsStart());
  } catch (err) {
    yield put(updateBillFailure(err));
  }
}

export default function* billReimbursementsPageSaga() {
  yield all([
    takeLatest(GET_BILLS_START, getBills),
    takeLatest(UPDATE_BILL_START, updateBill),
  ]);
}
