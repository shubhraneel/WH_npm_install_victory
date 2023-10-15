import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hallsPage state domain
 */

const selectHallsPageDomain = state => state.hallsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HallsPage
 */

const makeSelectHallsPage = () =>
  createSelector(
    selectHallsPageDomain,
    substate => substate,
  );

export default makeSelectHallsPage;
export { selectHallsPageDomain };
