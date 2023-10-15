import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fundaeFinderRequestsPage state domain
 */

const selectFundaeFinderRequestsPageDomain = state =>
  state.fundaeFinderRequestsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FundaeFinderRequestsPage
 */

const makeSelectFundaeFinderRequestsPage = () =>
  createSelector(
    selectFundaeFinderRequestsPageDomain,
    substate => substate,
  );

export default makeSelectFundaeFinderRequestsPage;
export { selectFundaeFinderRequestsPageDomain };
