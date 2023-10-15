/*
 *
 * QuickLinksPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_QUICKLINKS_START,
  GET_QUICKLINKS_FAILURE,
  GET_QUICKLINKS_SUCCESS,
} from './constants';

export const initialState = {
  quicklinks: [],
  isQuicklinksLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const quickLinksPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_QUICKLINKS_START:
        draft.isQuicklinksLoading = true;
        break;
      
      case GET_QUICKLINKS_SUCCESS:
        draft.isQuicklinksLoading = false;
        draft.quicklinks = action.payload
        break;
      
      case GET_QUICKLINKS_FAILURE:
        draft.isQuicklinksLoading = false;
        break;
    }
  });

export default quickLinksPageReducer;
