/*
 *
 * HallsPage reducer
 *
 */
import produce from 'immer';
import {
  GET_HALLS_FAILURE,
  GET_HALLS_START,
  GET_HALLS_SUCCESS,
} from './constants';

export const initialState = {
  halls: [],
  isHallsLoading: false,
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
    }
  });

export default hallsPageReducer;
