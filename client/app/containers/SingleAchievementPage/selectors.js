import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the singleAchievementPage state domain
 */

const selectSingleAchievementPageDomain = state =>
  state.singleAchievementPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SingleAchievementPage
 */

const makeSelectSingleAchievementPage = () =>
  createSelector(
    selectSingleAchievementPageDomain,
    substate => substate,
  );

export default makeSelectSingleAchievementPage;
export { selectSingleAchievementPageDomain };
