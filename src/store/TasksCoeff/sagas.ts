import { takeLatest, select, call, put } from 'redux-saga/effects';

import {
  getTaskCoefficientsData,
  getTaskTypesData,
  getWebsitesData,
  updateTaskCoefficients
} from 'src/api';
import {
  fetchTaskCoefficientsData,
  setTaskCoefficientsData,
  setTaskTypesData,
  setWebsitesData,
  updateTaskCoefficient
} from './reducer';
import {
  selectEditFormValues,
  selectTaskTypesData,
  selectWebsitesData
} from './selectors';

import {
  EditFormValuesType,
  TaskCoefficientsDataType,
  TaskTypeDataType,
  WebsitesType
} from './types';

function* updateTaskCoefficientsWorker() {
  const editFormValues: EditFormValuesType = yield select(selectEditFormValues);

  yield call(updateTaskCoefficients, editFormValues);

  const taskCoefficientsData: TaskCoefficientsDataType[] = yield call(
    getTaskCoefficientsData,
    {}
  );

  yield put(setTaskCoefficientsData(taskCoefficientsData));
}

function* fetchTaskCoefficientsDataWorker() {
  try {
    const taskTypes: TaskTypeDataType[] = yield select(selectTaskTypesData);
    const websitestData: WebsitesType[] = yield select(selectWebsitesData);

    const taskCoefficientsData: TaskCoefficientsDataType[] = yield call(
      getTaskCoefficientsData,
      {}
    );

    yield put(setTaskCoefficientsData(taskCoefficientsData));

    if (!taskTypes.length) {
      yield call(fetchTaskTypesWorker);
    }

    if (!websitestData.length) {
      yield call(fetchWebsitesDataWorker);
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchTaskTypesWorker() {
  try {
    const taskTypesData: TaskTypeDataType[] = yield call(getTaskTypesData, {});

    yield put(setTaskTypesData(taskTypesData));
  } catch (e) {
    console.log(e);
  }
}

function* fetchWebsitesDataWorker() {
  try {
    const websitesData: WebsitesType[] = yield call(getWebsitesData, {});

    yield put(setWebsitesData(websitesData));
  } catch (e) {
    console.log(e);
  }
}

export function* tasksCoefficientSaga(): Generator {
  yield takeLatest(updateTaskCoefficient.type, updateTaskCoefficientsWorker);
  yield takeLatest(
    fetchTaskCoefficientsData.type,
    fetchTaskCoefficientsDataWorker
  );
}
