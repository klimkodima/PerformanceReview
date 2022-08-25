import { takeLatest, put, call } from 'redux-saga/effects';

import { nanoid } from 'nanoid';
import {
  deletePresetWorkingHoursData,
  getPresetWorkingHoursData,
  postPresetWorkingHoursData,
  putPresetWorkingHoursData
} from 'src/api';
import {
  deletePresetWorkingHours,
  fetchPresetWorkingHours,
  postPresetWorkingHours,
  putPresetWorkingHours,
  setPresetWorkingHours
} from './reducer';
import { handleError } from 'src/utils';

import {
  PresetWorkingHoursDataType,
  PresetWorkingHoursInfoType
} from './types';
import { ActionType } from '../types';

function* fetchPresetWorkingHoursData() {
  try {
    const receivedUsersData: PresetWorkingHoursInfoType[] = yield call(
      getPresetWorkingHoursData,
      {}
    );

    const usersData: PresetWorkingHoursDataType[] = receivedUsersData.map(
      (item: PresetWorkingHoursInfoType): PresetWorkingHoursDataType => ({
        id: nanoid(),
        label: { value: item.label, isError: false, errorText: '' },
        time: {
          value: (item.time / 3600).toString(),
          isError: false,
          errorText: ''
        }
      })
    );

    yield put(setPresetWorkingHours(usersData));
  } catch (e) {
    console.log(e);
  }
}

function* postPresetWorkingHoursTableData(
  action: ActionType<PresetWorkingHoursDataType[]>
) {
  try {
    yield call(postPresetWorkingHoursData, action.payload);
    yield call(fetchPresetWorkingHoursData);
  } catch (e) {
    const { message } = handleError(e);
    console.log(message);
  }
}

function* putPresetWorkingHoursTableData(
  action: ActionType<PresetWorkingHoursDataType[]>
) {
  try {
    yield call(putPresetWorkingHoursData, action.payload);
    yield call(fetchPresetWorkingHoursData);
  } catch (e) {
    const { message } = handleError(e);
    console.log(message);
  }
}

function* deletePresetWorkingHoursTableData(action: ActionType<string>) {
  try {
    yield call(deletePresetWorkingHoursData, action.payload);
    yield call(fetchPresetWorkingHoursData);
  } catch (e) {
    const { message } = handleError(e);
    console.log(message);
  }
}

export function* presetWorkingHoursSaga(): Generator {
  yield takeLatest(fetchPresetWorkingHours.type, fetchPresetWorkingHoursData);
  yield takeLatest(
    deletePresetWorkingHours.type,
    deletePresetWorkingHoursTableData
  );
  yield takeLatest(
    postPresetWorkingHours.type,
    postPresetWorkingHoursTableData
  );
  yield takeLatest(putPresetWorkingHours.type, putPresetWorkingHoursTableData);
}
