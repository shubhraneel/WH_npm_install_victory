import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the quickInfoPage state domain
 */

const selectQuickInfoPageDomain = state => state.quickInfoPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by QuickInfoPage
 */

const makeSelectQuickInfoPage = () =>
  createSelector(
    selectQuickInfoPageDomain,
    substate => substate,
  );

export default makeSelectQuickInfoPage;
export { selectQuickInfoPageDomain };
