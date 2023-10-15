import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the facultyContactsPage state domain
 */

const selectFacultyContactsPageDomain = state =>
  state.facultyContactsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FacultyContactsPage
 */

const makeSelectFacultyContactsPage = () =>
  createSelector(
    selectFacultyContactsPageDomain,
    substate => substate,
  );

export default makeSelectFacultyContactsPage;
export { selectFacultyContactsPageDomain };
