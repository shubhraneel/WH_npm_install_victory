import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the billReimbursementsPage state domain
 */

const selectBillReimbursementsPageDomain = state =>
  state.billReimbursementsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BillReimbursementsPage
 */

const makeSelectBillReimbursementsPage = () =>
  createSelector(
    selectBillReimbursementsPageDomain,
    substate => substate,
  );

export default makeSelectBillReimbursementsPage;
export { selectBillReimbursementsPageDomain };
