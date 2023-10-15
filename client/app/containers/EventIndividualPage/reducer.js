/*
 *
 * EventIndividualPage reducer
 *
 */
import produce from 'immer';
import {
  GET_EVENT_FAILURE,
  GET_EVENT_START,
  GET_EVENT_SUCCESS,
} from './constants';

export const initialState = {
  event: {},
  isEventLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const eventIndividualPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_EVENT_START:
        draft.isEventLoading = true;
        break;

      case GET_EVENT_SUCCESS:
        draft.isEventLoading = false;
        draft.event = action.payload;
        break;

      case GET_EVENT_FAILURE:
        draft.isEventLoading = false;
        break;
    }
  });

export default eventIndividualPageReducer;
