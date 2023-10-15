import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the eventsCategoryPage state domain
 */

const selectEventsCategoryPageDomain = state =>
  state.eventsCategoryPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EventsCategoryPage
 */

const makeSelectEventsCategoryPage = () =>
  createSelector(
    selectEventsCategoryPageDomain,
    substate => substate,
  );

export default makeSelectEventsCategoryPage;
export { selectEventsCategoryPageDomain };
