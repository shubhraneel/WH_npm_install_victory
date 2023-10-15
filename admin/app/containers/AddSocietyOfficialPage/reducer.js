/*
 *
 * AddSocietyOfficialPage reducer
 *
 */
import produce from 'immer';
import {
  SEARCH_STUDENT_FAILURE,
  SEARCH_STUDENT_START,
  SEARCH_STUDENT_SUCCESS,
} from './constants';

export const initialState = {
  searchResults: {},
  isSearching: false,
};

/* eslint-disable default-case, no-param-reassign */
const addSocietyOfficialPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_STUDENT_START:
        draft.isSearching = true;
        break;

      case SEARCH_STUDENT_SUCCESS:
        draft.isSearching = false;
        draft.searchResults = action.payload;
        break;

      case SEARCH_STUDENT_FAILURE:
        draft.isSearching = false;
        break;
    }
  });

export default addSocietyOfficialPageReducer;
