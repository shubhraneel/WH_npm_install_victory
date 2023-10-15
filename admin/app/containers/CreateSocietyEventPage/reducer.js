/*
 *
 * CreateSocietyEventPage reducer
 *
 */
import produce from 'immer';
import {
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_START,
  CREATE_EVENT_SUCCESS,
} from './constants';

export const initialState = {
  isCreating: false,
};

/* eslint-disable default-case, no-param-reassign */
const createSocietyEventPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_EVENT_START:
        draft.isCreating = true;
        break;

      case CREATE_EVENT_SUCCESS:
        draft.isCreating = false;
        break;

      case CREATE_EVENT_FAILURE:
        draft.isCreating = false;
        break;
    }
  });

export default createSocietyEventPageReducer;
