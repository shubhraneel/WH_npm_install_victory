import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentsPointPage state domain
 */

const selectStudentsPointPageDomain = state =>
  state.studentsPointPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentsPointPage
 */

const makeSelectStudentsPointPage = () =>
  createSelector(
    selectStudentsPointPageDomain,
    substate => substate,
  );

export default makeSelectStudentsPointPage;
export { selectStudentsPointPageDomain };
