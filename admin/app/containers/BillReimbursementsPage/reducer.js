/*
 *
 * BillReimbursementsPage reducer
 *
 */
import produce from 'immer';
import { GET_BILLS_SUCCESS } from './constants';

export const initialState = {
  bills: [],
};

/* eslint-disable default-case, no-param-reassign */
const billReimbursementsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_BILLS_SUCCESS:
        draft.bills = action.payload;
        break;
    }
  });

export default billReimbursementsPageReducer;
