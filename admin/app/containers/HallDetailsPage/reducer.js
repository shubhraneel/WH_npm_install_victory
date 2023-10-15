/*
 *
 * HallDetailsPage reducer
 *
 */
import produce from 'immer';
import {
  GET_HALL_FAILURE,
  GET_HALL_START,
  GET_HALL_SUCCESS,
} from './constants';

export const initialState = {
  hall: {},
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const hallDetailsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_HALL_START:
        draft.isLoading = true;
        break;

      case GET_HALL_SUCCESS:
        draft.isLoading = false;
        draft.hall = action.payload;
        break;

      case GET_HALL_FAILURE:
        draft.isLoading = false;
        break;
    }
  });

export default hallDetailsPageReducer;
