/*
 *
 * SocietyPage reducer
 *
 */
import produce from 'immer';
import {
  GET_SOCIETIES_FAILURE,
  GET_SOCIETIES_START,
  GET_SOCIETIES_SUCCESS,
  SET_UPLOAD_PROGRESS,
} from './constants';

export const initialState = {
  societies: [],
  isLoading: false,
  uploadProgress: 0,
};

/* eslint-disable default-case, no-param-reassign */
const societyPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SOCIETIES_START:
        draft.isLoading = true;
        break;

      case GET_SOCIETIES_SUCCESS:
        draft.isLoading = false;
        draft.societies = action.payload;
        draft.uploadProgress = 0;
        break;

      case GET_SOCIETIES_FAILURE:
        draft.isLoading = false;
        draft.uploadProgress = 0;
        break;

      case SET_UPLOAD_PROGRESS:
        draft.uploadProgress = action.payload;
        break;
    }
  });

export default societyPageReducer;
