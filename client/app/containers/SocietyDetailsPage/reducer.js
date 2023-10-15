/*
 *
 * SocietyDetailsPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_SOCIETIES_START,
  GET_SOCIETIES_FAILURE,
  GET_SOCIETIES_SUCCESS,
  GET_SOCIETY_DETAILS_START,
  GET_SOCIETY_DETAILS_FAILURE,
  GET_SOCIETY_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  societies: [],
  isSocietiesLoading: false,
  currentSociety: null,
  isSocietyDetailsLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const societyDetailsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SOCIETIES_START:
        draft.isSocietiesLoading = true;
        break;

      case GET_SOCIETIES_SUCCESS:
        draft.isSocietiesLoading = false;
        draft.societies = action.payload;
        break;

      case GET_SOCIETIES_FAILURE:
        draft.isSocietiesLoading = false;
        break;

      case GET_SOCIETY_DETAILS_START:
        draft.isSocietyDetailsLoading = true;
        break;

      case GET_SOCIETY_DETAILS_SUCCESS:
        draft.isSocietyDetailsLoading = false;
        draft.currentSociety = action.payload;
        break;

      case GET_SOCIETY_DETAILS_FAILURE:
        draft.isSocietyDetailsLoading = false;
        break;
    }
  });

export default societyDetailsPageReducer;
