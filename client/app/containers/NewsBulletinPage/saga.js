import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import { getNewsFailure, getNewsSuccess } from './actions';
import { GET_NEWS_START } from './constants';

// Individual exports for testing
export function* getNews() {
  try {
    const news = yield axios.get(`${globalSettings.backendRoute}/news`);
    yield put(getNewsSuccess(news.data.data));
  } catch (err) {
    yield put(getNewsFailure(err));
  }
}

export default function* newsBulletinPageSaga() {
  yield all([takeLatest(GET_NEWS_START, getNews)]);
}
