import { takeLatest, put, call, select } from 'redux-saga/effects';

import { getContentAuditor } from 'src/api';
import { setContentAuditor, fetchContentAuditor } from './reducer';
import { selectPickedDate, PickedDateType } from '../DateFilter';
import { selectCheckedAuditorsData } from '../Filter';

import { ContentAuditorType } from './types';
import { CheckedAuditorsDataType } from '../Filter/types';

function* fetchContentAuditorData() {
  try {
    const pickedDate: PickedDateType = yield select(selectPickedDate);
    const checkedAuditors: CheckedAuditorsDataType = yield select(
      selectCheckedAuditorsData
    );

    const contentAuditor: ContentAuditorType = yield call(getContentAuditor, {
      from: pickedDate.startDate,
      to: pickedDate.finishDate,
      auditorsIds: Object.keys(checkedAuditors)
    });

    yield put(setContentAuditor(contentAuditor));
  } catch (e) {
    console.log(e);
  }
}

export function* contentAuditorSaga(): Generator {
  yield takeLatest(fetchContentAuditor.type, fetchContentAuditorData);
}
