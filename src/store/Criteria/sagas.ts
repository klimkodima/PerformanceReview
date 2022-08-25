import { takeLatest, put, call, select } from 'redux-saga/effects';

import { getCriteria } from 'src/api';
import { fetchCriteria, setCriteria } from './reducer';
import { selectPickedDate, PickedDateType } from '../DateFilter';
import { selectCheckedAuditorsData } from '../Filter';

import { CriteriaDataType } from './types';
import { CheckedAuditorsDataType } from '../Filter/types';

function* fetchCriteriaWidget() {
  try {
    const pickedDate: PickedDateType = yield select(selectPickedDate);
    const checkedAuditors: CheckedAuditorsDataType = yield select(
      selectCheckedAuditorsData
    );

    const criteria: CriteriaDataType = yield call(getCriteria, {
      from: pickedDate.startDate,
      to: pickedDate.finishDate,
      auditorsIds: Object.keys(checkedAuditors)
    });

    yield put(setCriteria(criteria));
  } catch (e) {
    console.log(e);
  }
}

export function* criteriaSaga(): Generator {
  yield takeLatest(fetchCriteria.type, fetchCriteriaWidget);
}
