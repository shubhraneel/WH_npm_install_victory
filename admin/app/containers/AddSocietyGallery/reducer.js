/*
 *
 * AddSocietyGallery reducer
 *
 */
import produce from 'immer';
import { SET_UPLOAD_PROGRESS } from './constants';

export const initialState = {
  progress: false,
};

/* eslint-disable default-case, no-param-reassign */
const addSocietyGalleryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_UPLOAD_PROGRESS:
        draft.progress = action.payload;
        break;
    }
  });

export default addSocietyGalleryReducer;
