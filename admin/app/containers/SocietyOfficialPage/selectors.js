import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the societyOfficialPage state domain
 */

const selectSocietyOfficialPageDomain = state =>
  state.societyOfficialPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SocietyOfficialPage
 */

const makeSelectSocietyOfficialPage = () =>
  createSelector(
    selectSocietyOfficialPageDomain,
    substate => substate,
  );

export default makeSelectSocietyOfficialPage;
export { selectSocietyOfficialPageDomain };
