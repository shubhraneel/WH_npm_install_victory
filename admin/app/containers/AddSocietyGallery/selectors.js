import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addSocietyGallery state domain
 */

const selectAddSocietyGalleryDomain = state =>
  state.addSocietyGallery || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddSocietyGallery
 */

const makeSelectAddSocietyGallery = () =>
  createSelector(
    selectAddSocietyGalleryDomain,
    substate => substate,
  );

export default makeSelectAddSocietyGallery;
export { selectAddSocietyGalleryDomain };
