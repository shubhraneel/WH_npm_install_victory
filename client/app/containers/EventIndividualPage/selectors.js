import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the eventIndividualPage state domain
 */

const selectEventIndividualPageDomain = state =>
  state.eventIndividualPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EventIndividualPage
 */

const makeSelectEventIndividualPage = () =>
  createSelector(
    selectEventIndividualPageDomain,
    substate => substate,
  );

export default makeSelectEventIndividualPage;
export { selectEventIndividualPageDomain };
