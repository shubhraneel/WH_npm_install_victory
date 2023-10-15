import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the singleStudentPage state domain
 */

const selectSingleStudentPageDomain = state =>
  state.singleStudentPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SingleStudentPage
 */

const makeSelectSingleStudentPage = () =>
  createSelector(
    selectSingleStudentPageDomain,
    substate => substate,
  );

export default makeSelectSingleStudentPage;
export { selectSingleStudentPageDomain };
