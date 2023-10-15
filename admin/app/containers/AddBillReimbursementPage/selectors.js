import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addBillReimbursementPage state domain
 */

const selectAddBillReimbursementPageDomain = state =>
  state.addBillReimbursementPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddBillReimbursementPage
 */

const makeSelectAddBillReimbursementPage = () =>
  createSelector(
    selectAddBillReimbursementPageDomain,
    substate => substate,
  );

export default makeSelectAddBillReimbursementPage;
export { selectAddBillReimbursementPageDomain };
