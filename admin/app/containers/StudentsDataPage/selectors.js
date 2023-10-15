import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentsDataPage state domain
 */

const selectStudentsDataPageDomain = state =>
  state.studentsDataPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentsDataPage
 */

const makeSelectStudentsDataPage = () =>
  createSelector(
    selectStudentsDataPageDomain,
    substate => substate,
  );

export default makeSelectStudentsDataPage;
export { selectStudentsDataPageDomain };
