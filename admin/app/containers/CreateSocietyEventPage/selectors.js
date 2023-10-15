import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createSocietyEventPage state domain
 */

const selectCreateSocietyEventPageDomain = state =>
  state.createSocietyEventPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateSocietyEventPage
 */

const makeSelectCreateSocietyEventPage = () =>
  createSelector(
    selectCreateSocietyEventPageDomain,
    substate => substate,
  );

export default makeSelectCreateSocietyEventPage;
export { selectCreateSocietyEventPageDomain };
