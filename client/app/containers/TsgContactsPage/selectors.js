import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tsgContactsPage state domain
 */

const selectTsgContactsPageDomain = state =>
  state.tsgContactsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TsgContactsPage
 */

const makeSelectTsgContactsPage = () =>
  createSelector(
    selectTsgContactsPageDomain,
    substate => substate,
  );

export default makeSelectTsgContactsPage;
export { selectTsgContactsPageDomain };
