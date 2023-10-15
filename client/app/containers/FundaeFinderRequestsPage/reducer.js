/*
 *
 * FundaeFinderRequestsPage reducer
 *
 */
import produce from 'immer';
import {
  GET_REQUESTS_START,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAILURE,
} from './constants';

export const initialState = {
  requests: [],
  isRequestsLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const fundaeFinderRequestsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_REQUESTS_START:
        draft.isRequestsLoading = true;
        break;

      case GET_REQUESTS_SUCCESS:
        draft.requests = action.payload;
        draft.isRequestsLoading = false;
        break;

      case GET_REQUESTS_FAILURE:
        draft.isRequestsLoading = false;
        break;
    }
  });

export default fundaeFinderRequestsPageReducer;
