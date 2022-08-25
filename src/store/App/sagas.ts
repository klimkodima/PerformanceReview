import { takeLatest, put, select, call } from 'redux-saga/effects';

import { getAvailableWidgets } from 'src/api';
import { fetchAvailableWidgets, setAvailableWidgets } from './reducer';
import { PickedDateType, selectPickedDate } from '../DateFilter';
import { selectCheckedAuditorsData } from '../Filter';

import { CheckedAuditorsDataType } from '../Filter/types';
import { AvailableWidgetsType } from './types';

function* fetchAvailableWidgetsWorker() {
  try {
    const pickedDate: PickedDateType = yield select(selectPickedDate);
    const checkedAuditors: CheckedAuditorsDataType = yield select(
      selectCheckedAuditorsData
    );

    const availableWidgets: AvailableWidgetsType = yield call(
      getAvailableWidgets,
      {
        from: pickedDate.startDate,
        to: pickedDate.finishDate,
        auditorsIds: Object.keys(checkedAuditors)
      }
    );

    yield put(setAvailableWidgets(availableWidgets));
  } catch (e) {
    console.log(e);
  }
}

export function* appSaga(): Generator {
  yield takeLatest(fetchAvailableWidgets.type, fetchAvailableWidgetsWorker);
}
