/*
 *
 * SocietyDetailsPage reducer
 *
 */
import produce from 'immer';
import {
  GET_SOCIETY_FAILURE,
  GET_SOCIETY_START,
  GET_SOCIETY_SUCCESS,
} from './constants';

export const initialState = {
  society: {},
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const societyDetailsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SOCIETY_START:
        draft.isLoading = true;
        break;

      case GET_SOCIETY_SUCCESS:
        draft.isLoading = false;
        draft.society = action.payload;
        break;

      case GET_SOCIETY_FAILURE:
        draft.isLoading = false;
        break;
    }
  });

export default societyDetailsPageReducer;
