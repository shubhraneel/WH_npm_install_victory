import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the societyPointPage state domain
 */

const selectSocietyPointPageDomain = state =>
  state.societyPointPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SocietyPointPage
 */

const makeSelectSocietyPointPage = () =>
  createSelector(
    selectSocietyPointPageDomain,
    substate => substate,
  );

export default makeSelectSocietyPointPage;
export { selectSocietyPointPageDomain };
