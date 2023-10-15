import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the departmentsPage state domain
 */

const selectDepartmentsPageDomain = state =>
  state.departmentsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DepartmentsPage
 */

const makeSelectDepartmentsPage = () =>
  createSelector(
    selectDepartmentsPageDomain,
    substate => substate,
  );

export default makeSelectDepartmentsPage;
export { selectDepartmentsPageDomain };
