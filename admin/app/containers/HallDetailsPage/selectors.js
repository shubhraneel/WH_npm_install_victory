import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hallDetailsPage state domain
 */

const selectHallDetailsPageDomain = state =>
  state.hallDetailsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HallDetailsPage
 */

const makeSelectHallDetailsPage = () =>
  createSelector(
    selectHallDetailsPageDomain,
    substate => substate,
  );

export default makeSelectHallDetailsPage;
export { selectHallDetailsPageDomain };
