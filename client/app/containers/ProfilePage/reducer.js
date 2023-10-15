/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  EDIT_PROFILE_END,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_START,
  EDIT_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  CHANGE_PROFILE_DETAILS,
} from './constants';

export const initialState = {
  profile: {},
  isLoading: false,
  editProfile: false,
  submitProfile: {},
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILE_START:
        draft.isLoading = true;
        break;

      case GET_PROFILE_SUCCESS:
        draft.isLoading = false;
        draft.profile = action.payload;
        draft.submitProfile = action.payload;
        break;

      case GET_PROFILE_FAILURE:
        draft.isLoading = false;
        break;

      case EDIT_PROFILE_START:
        draft.editProfile = true;
        break;

      case EDIT_PROFILE_END:
        draft.editProfile = false;
        draft.isLoading = true;
        break;

      case EDIT_PROFILE_SUCCESS:
        draft.profile = action.payload;
        draft.isLoading = false;
        break;

      case EDIT_PROFILE_FAILURE:
        draft.isLoading = false;
        break;

      case CHANGE_PROFILE_DETAILS:
        draft.submitProfile = {
          ...draft.submitProfile,
          [action.payload.target.name]: action.payload.target.value,
        };
        break;
    }
  });

export default profilePageReducer;
