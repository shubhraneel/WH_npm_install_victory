/*
 *
 * FacultyContactsPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_DEPARTMENTS_START,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAILURE,
  GET_CONTACTS_START,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILURE,
} from './constants';

export const initialState = {
  departments: [],
  isDepartmentsLoading: false,
  contacts: null,
  isContactsLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const facultyContactsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DEPARTMENTS_START:
        draft.isDepartmentsLoading = true;
        draft.isContactsLoading = true;
        break;
      
      case GET_DEPARTMENTS_SUCCESS:
        draft.departments = action.payload.departments;
        draft.contacts = action.payload.contacts;
        draft.isContactsLoading = false
        draft.isDepartmentsLoading = false;
        break;

      case GET_DEPARTMENTS_FAILURE:
        draft.isDepartmentsLoading = false;
        draft.isContactsLoading = false;
        break;

      case GET_CONTACTS_START:
        draft.isContactsLoading = true;
        break;

      case GET_CONTACTS_SUCCESS:
        draft.isContactsLoading = false;
        draft.contacts = action.payload;
        break;

      case GET_CONTACTS_FAILURE:
        draft.isContactsLoading = false;
        break;
    }
  });

export default facultyContactsPageReducer;
