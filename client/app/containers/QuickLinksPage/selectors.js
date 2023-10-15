import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the quickLinksPage state domain
 */

const selectQuickLinksPageDomain = state =>
  state.quickLinksPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by QuickLinksPage
 */

const makeSelectQuickLinksPage = () =>
  createSelector(
    selectQuickLinksPageDomain,
    substate => substate,
  );

export default makeSelectQuickLinksPage;
export { selectQuickLinksPageDomain };
