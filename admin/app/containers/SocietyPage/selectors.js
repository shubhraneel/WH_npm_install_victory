import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the societyPage state domain
 */

const selectSocietyPageDomain = state => state.societyPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SocietyPage
 */

const makeSelectSocietyPage = () =>
  createSelector(
    selectSocietyPageDomain,
    substate => substate,
  );

export default makeSelectSocietyPage;
export { selectSocietyPageDomain };
