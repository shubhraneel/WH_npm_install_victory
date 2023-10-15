/*
 *
 * DepartmentsPage reducer
 *
 */
import produce from 'immer';
import {
  GET_DEPTS_FAILURE,
  GET_DEPTS_START,
  GET_DEPTS_SUCCESS,
} from './constants';

export const initialState = {
  depts: [],
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const departmentsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DEPTS_START:
        draft.isLoading = true;
        break;

      case GET_DEPTS_SUCCESS:
        draft.isLoading = false;
        draft.depts = action.payload;
        break;

      case GET_DEPTS_FAILURE:
        draft.isLoading = false;
        break;
    }
  });

export default departmentsPageReducer;
