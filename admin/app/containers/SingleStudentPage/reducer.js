/*
 *
 * SingleStudentPage reducer
 *
 */
import produce from 'immer';
import {
  GET_DATA_FAILURE,
  GET_DATA_START,
  GET_DATA_SUCCESS,
} from './constants';

export const initialState = {
  data: {},
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const singleStudentPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_START:
        draft.isLoading = true;
        break;

      case GET_DATA_SUCCESS:
        draft.isLoading = false;
        draft.data = action.payload;
        break;

      case GET_DATA_FAILURE:
        draft.isLoading = false;
        break;
    }
  });

export default singleStudentPageReducer;
