/*
 *
 * BillReimbursementsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_BILLS_FAILURE,
  GET_BILLS_START,
  GET_BILLS_SUCCESS,
  UPDATE_BILL_FAILURE,
  UPDATE_BILL_START,
  UPDATE_BILL_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getBillsStart() {
  return {
    type: GET_BILLS_START,
  };
}

export function getBillsSuccess(data) {
  return {
    type: GET_BILLS_SUCCESS,
    payload: data,
  };
}

export function getBillsFailure(err) {
  return {
    type: GET_BILLS_FAILURE,
    payload: err,
  };
}

export function updateBillStart(id, data) {
  return {
    type: UPDATE_BILL_START,
    payload: { id, data },
  };
}

export function updateBillSuccess(data) {
  return {
    type: UPDATE_BILL_SUCCESS,
    payload: data,
  };
}

export function updateBillFailure(err) {
  return {
    type: UPDATE_BILL_FAILURE,
    payload: err,
  };
}
