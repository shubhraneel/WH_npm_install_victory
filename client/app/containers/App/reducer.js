/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_START,
  LOGIN_STUDENT_FAILURE,
  LOGOUT_STUDENT,
  REMOVE_NOTIF_DOT,
} from './constants';

// The initial state of the App
export const initialState = {
  isLogginIn: false,
  authData: {
    isLoggedIn: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_STUDENT_START:
        draft.isLogginIn = true;
        break;

      case LOGIN_STUDENT_SUCCESS:
        draft.authData = action.payload;
        draft.isLogginIn = false;
        break;

      case LOGIN_STUDENT_FAILURE:
        draft.isLogginIn = false;
        break;

      case LOGOUT_STUDENT:
        draft.authData = {
          isLoggedIn: false,
        };
        break;

      case REMOVE_NOTIF_DOT:
        draft.authData.credentials.newNotification = false;
        break;
    }
  });

export default appReducer;
