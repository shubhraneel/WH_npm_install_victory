/*
 *
 * SingleAchievementPage reducer
 *
 */
import produce from 'immer';
import {
  GET_ACHIEVEMENT_FAILURE,
  GET_ACHIEVEMENT_START,
  GET_ACHIEVEMENT_SUCCESS,
} from './constants';

export const initialState = {
  isLoading: false,
  achievements: [],
};

/* eslint-disable default-case, no-param-reassign */
const singleAchievementPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ACHIEVEMENT_START:
        draft.isLoading = true;
        break;

      case GET_ACHIEVEMENT_SUCCESS:
        draft.isLoading = false;
        draft.achievements = action.payload;
        break;

      case GET_ACHIEVEMENT_FAILURE:
        draft.isLoading = false;
        draft.achievements = [];
        break;
    }
  });

export default singleAchievementPageReducer;
