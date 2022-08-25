import { takeLatest, put, call, select } from 'redux-saga/effects';

import { getPerformanceStatistic } from 'src/api';
import { fetchPerformanceStatistic, setPerformanceStatistic } from './reducer';
import { selectPickedDate } from '../DateFilter';
import { selectCheckedAuditorsData } from '../Filter';

import { PerfStatDataType } from './types';
import { PickedDateType } from '../DateFilter/types';
import { CheckedAuditorsDataType } from '../Filter/types';

function* fetchPerformanceStatisticData() {
  try {
    const pickedDate: PickedDateType = yield select(selectPickedDate);
    const checkedAuditors: CheckedAuditorsDataType = yield select(
      selectCheckedAuditorsData
    );

    const auditorsIds = Object.keys(checkedAuditors);

    const receivedPerformanceStatisticData: PerfStatDataType = yield call(
      getPerformanceStatistic,
      {
        from: pickedDate.startDate,
        to: pickedDate.finishDate,
        auditorsIds
      }
    );

    yield put(setPerformanceStatistic(receivedPerformanceStatisticData.points));
  } catch (e) {
    console.log(e);
  }
}

export function* performanceStatisticSaga(): Generator {
  yield takeLatest(
    fetchPerformanceStatistic.type,
    fetchPerformanceStatisticData
  );
}
