import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fundaeFinderPage state domain
 */

const selectFundaeFinderPageDomain = state =>
  state.fundaeFinderPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FundaeFinderPage
 */

const makeSelectFundaeFinderPage = () =>
  createSelector(
    selectFundaeFinderPageDomain,
    substate => substate,
  );

export default makeSelectFundaeFinderPage;
export { selectFundaeFinderPageDomain };
