/*
 *
 * CalendarPage reducer
 *
 */
import produce from 'immer';
import {
  GET_EVENTS_FAILURE,
  GET_EVENTS_START,
  GET_EVENTS_SUCCESS,
} from './constants';

export const initialState = {
  isEventsLoading: false,
  events: [],
};

/* eslint-disable default-case, no-param-reassign */
const calendarPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_EVENTS_START:
        draft.isEventsLoading = true;
        break;

      case GET_EVENTS_SUCCESS:
        draft.isEventsLoading = false;
        draft.events = action.payload.events;
        break;

      case GET_EVENTS_FAILURE:
        draft.isEventsLoading = false;
        break;
    }
  });

export default calendarPageReducer;
