import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newsBulletinPage state domain
 */

const selectNewsBulletinPageDomain = state =>
  state.newsBulletinPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewsBulletinPage
 */

const makeSelectNewsBulletinPage = () =>
  createSelector(
    selectNewsBulletinPageDomain,
    substate => substate,
  );

export default makeSelectNewsBulletinPage;
export { selectNewsBulletinPageDomain };
