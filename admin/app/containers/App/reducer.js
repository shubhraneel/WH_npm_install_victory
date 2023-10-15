/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

import { LOGIN_SUCCESS, LOGIN_START, LOGIN_FAILURE, LOGOUT } from './constants';

// The initial state of the App
export const initialState = {
  authData: {
    isLoggedIn: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_START:
        draft.isLogginIn = true;
        break;

      case LOGIN_SUCCESS:
        draft.authData = action.payload;
        draft.isLogginIn = false;
        break;

      case LOGIN_FAILURE:
        draft.isLogginIn = false;
        break;

      case LOGOUT:
        draft.authData = {
          isLoggedIn: false,
        };
        break;
    }
  });

export default appReducer;
