import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the feedbackPage state domain
 */

const selectFeedbackPageDomain = state => state.feedbackPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FeedbackPage
 */

const makeSelectFeedbackPage = () =>
  createSelector(
    selectFeedbackPageDomain,
    substate => substate,
  );

export default makeSelectFeedbackPage;
export { selectFeedbackPageDomain };
