/*
 *
 * NotificationsPage reducer
 *
 */
import produce from 'immer';
import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
} from './constants';

export const initialState = {
  notifications: {},
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const notificationsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_NOTIFICATIONS_START:
        draft.isLoading = true;
        break;

      case GET_NOTIFICATIONS_SUCCESS:
        draft.isLoading = false;
        draft.notifications = action.payload;
        break;

      case GET_NOTIFICATIONS_FAILURE:
        draft.isLoading = false;
        break;
    }
  });

export default notificationsPageReducer;
