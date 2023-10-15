import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the societyDetailsPage state domain
 */

const selectSocietyDetailsPageDomain = state =>
  state.societyDetailsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SocietyDetailsPage
 */

const makeSelectSocietyDetailsPage = () =>
  createSelector(
    selectSocietyDetailsPageDomain,
    substate => substate,
  );

export default makeSelectSocietyDetailsPage;
export { selectSocietyDetailsPageDomain };
