/*
 *
 * StudentsPointPage reducer
 *
 */
import produce from 'immer';
import {
  GET_ACADEMIC_RESOURCES_SUCCESS,
  GET_CAREER_RESOURCES_SUCCESS,
} from './constants';

export const initialState = {
  academicResources: undefined,
  careerResorces: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const studentsPointPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ACADEMIC_RESOURCES_SUCCESS:
        draft.academicResources = action.payload;
        break;

      case GET_CAREER_RESOURCES_SUCCESS:
        draft.careerResorces = action.payload;
        break;
    }
  });

export default studentsPointPageReducer;
