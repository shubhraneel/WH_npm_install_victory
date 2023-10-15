import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addSocietyOfficialPage state domain
 */

const selectAddSocietyOfficialPageDomain = state =>
  state.addSocietyOfficialPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddSocietyOfficialPage
 */

const makeSelectAddSocietyOfficialPage = () =>
  createSelector(
    selectAddSocietyOfficialPageDomain,
    substate => substate,
  );

export default makeSelectAddSocietyOfficialPage;
export { selectAddSocietyOfficialPageDomain };
