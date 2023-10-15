/*
 *
 * StudentsDataPage reducer
 *
 */
import produce from 'immer';
import {
  GET_STUDENTS_DATA_FAILURE,
  GET_STUDENTS_DATA_START,
  GET_STUDENTS_DATA_SUCCESS,
} from './constants';

export const initialState = {
  studentsData: [],
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const studentsDataPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_STUDENTS_DATA_START:
        draft.isLoading = true;
        break;

      case GET_STUDENTS_DATA_SUCCESS:
        draft.isLoading = false;
        draft.studentsData = action.payload;
        break;

      case GET_STUDENTS_DATA_FAILURE:
        draft.isLoading = false;
        break;
    }
  });

export default studentsDataPageReducer;
