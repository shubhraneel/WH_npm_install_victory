/*
 *
 * TsgContactsPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_CONTACTS_START,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILURE,
} from './constants';

export const initialState = {
  contacts: [],
  isContactsLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const tsgContactsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CONTACTS_START:
        draft.isContactsLoading = true;
        break;

      case GET_CONTACTS_SUCCESS:
        draft.isContactsLoading = false;
        draft.contacts = action.payload;
        break;

      case GET_CONTACTS_FAILURE:
        draft.isContactsLoading = false
        break;
    }
  });

export default tsgContactsPageReducer;
