/*
 *
 * HallsPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_HALLS_START,
  GET_HALLS_SUCCESS,
  GET_HALLS_FAILURE,
  CHANGE_HALL_START,
  CHANGE_HALL_SUCCESS,
  CHANGE_HALL_FAILURE,
} from './constants';

export const initialState = {
  halls: {},
  isHallsLoading: false,
  currentHall: null,
  isChangeHallLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const hallsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_HALLS_START:
        draft.isHallsLoading = true;
        break;

      case GET_HALLS_SUCCESS:
        draft.isHallsLoading = false;
        draft.halls = action.payload;
        break;

      case GET_HALLS_FAILURE:
        draft.isHallsLoading = false;
        break;

      case CHANGE_HALL_START:
        draft.isChangeHallLoading = true;
        break;

      case CHANGE_HALL_SUCCESS:
        draft.isChangeHallLoading = false;
        draft.currentHall = action.payload;
        break;

      case CHANGE_HALL_FAILURE:
        draft.isChangeHallLoading = false;
        break;
    }
  });

export default hallsPageReducer;
