/*
 *
 * AchievementsPage reducer
 *
 */
import produce from 'immer';
import {
  GET_COUNT_SUCCESS,
  START_ACHIEVEMENT_LOADER,
  START_GRIEVANCE_LOADER,
  UPLOAD_ACHIEVEMENT_FAILURE,
  UPLOAD_ACHIEVEMENT_SUCCESS,
  UPLOAD_GRIEVANCE_FAILURE,
  UPLOAD_GRIEVANCE_SUCCESS,
} from './constants';

export const initialState = {
  isAchievementUploading: false,
  isGrievanceUploading: false,
  count: {
    SocialAndCulture: 0,
    SportsAndGames: 0,
    StudentWelfare: 0,
    Technology: 0,
  },
  userData: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const achievementsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_ACHIEVEMENT_LOADER:
        draft.isAchievementUploading = true;
        break;

      case UPLOAD_ACHIEVEMENT_SUCCESS:
        draft.isAchievementUploading = false;
        break;

      case UPLOAD_ACHIEVEMENT_FAILURE:
        draft.isAchievementUploading = false;
        break;

      case START_GRIEVANCE_LOADER:
        draft.isGrievanceUploading = true;
        break;

      case UPLOAD_GRIEVANCE_SUCCESS:
        draft.isGrievanceUploading = false;
        break;

      case UPLOAD_GRIEVANCE_FAILURE:
        draft.isGrievanceUploading = false;
        break;

      case GET_COUNT_SUCCESS:
        draft.count = action.payload.count;
        draft.userData = action.payload.user;
        break;
    }
  });

export default achievementsPageReducer;
