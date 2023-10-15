/*
 *
 * NewsBulletinPage reducer
 *
 */
import produce from 'immer';
import {
  GET_NEWS_FAILURE,
  GET_NEWS_START,
  GET_NEWS_SUCCESS,
} from './constants';

export const initialState = {
  news: [],
  isNewsLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const newsBulletinPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_NEWS_START:
        draft.isNewsLoading = true;
        break;

      case GET_NEWS_SUCCESS:
        draft.isNewsLoading = false;
        draft.news = action.payload;
        break;

      case GET_NEWS_FAILURE:
        draft.isNewsLoading = false;
        break;
    }
  });

export default newsBulletinPageReducer;
