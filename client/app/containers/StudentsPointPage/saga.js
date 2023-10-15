import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import globalSettings from 'globalSettings';
import {
  getAcademicResourcesFailure,
  getAcademicResourcesSuccess,
  getCareerResourcesFailure,
  getCareerResourcesSuccess,
} from './actions';
import {
  GET_ACADEMIC_RESOURCES_START,
  GET_CAREER_RESOURCES_START,
} from './constants';

// Individual exports for testing
export function* getAcademicResources(payload) {
  try {
    const { dept } = payload.payload;
    const resources = yield axios.post(
      `${globalSettings.backendRoute}/academic`,
      {
        department: dept,
      },
    );

    yield put(getAcademicResourcesSuccess(resources.data.data));
  } catch (err) {
    yield put(getAcademicResourcesFailure(err));
  }
}

export function* getCareerResources() {
  try {
    const resorces = yield axios.post(`${globalSettings.backendRoute}/career`);

    yield put(getCareerResourcesSuccess(resorces.data.data));
  } catch (err) {
    yield put(getCareerResourcesFailure(err));
  }
}

export default function* studentsPointPageSaga() {
  yield all([
    takeLatest(GET_ACADEMIC_RESOURCES_START, getAcademicResources),
    takeLatest(GET_CAREER_RESOURCES_START, getCareerResources),
  ]);
}
