import { takeLatest, put, call, select } from 'redux-saga/effects';

import { getActivitiesPercentage, getTeamActivitiesPercentage } from 'src/api';
import {
  fetchAuditActivities,
  fetchTeamActivities,
  setAuditActivities,
  setTeamActivities
} from './reducer';
import { selectCheckedAuditorsData } from '../Filter';
import { selectPickedDate, PickedDateType } from '../DateFilter';

import { AuditActivitiesType, TeamActivitiesResponseType } from './types';
import { CheckedAuditorsDataType } from '../Filter/types';

function* fetchActivitiesPercentage() {
  try {
    const pickedDate: PickedDateType = yield select(selectPickedDate);
    const checkedAuditors: CheckedAuditorsDataType = yield select(
      selectCheckedAuditorsData
    );

    const activities: AuditActivitiesType = yield call(
      getActivitiesPercentage,
      {
        from: pickedDate.startDate,
        to: pickedDate.finishDate,
        auditorsIds: Object.keys(checkedAuditors)
      }
    );

    yield put(setAuditActivities(activities));
  } catch (e) {
    console.log(e);
  }
}

function* fetchTeamActivitiesPercentage() {
  try {
    const pickedDate: PickedDateType = yield select(selectPickedDate);

    const { activitiesTeam }: TeamActivitiesResponseType = yield call(
      getTeamActivitiesPercentage,
      {
        from: pickedDate.startDate,
        to: pickedDate.finishDate
      }
    );

    yield put(setTeamActivities(activitiesTeam));
  } catch (e) {
    console.log(e);
  }
}

export function* activitiesPercentageSaga(): Generator {
  yield takeLatest(fetchAuditActivities.type, fetchActivitiesPercentage);
  yield takeLatest(fetchTeamActivities.type, fetchTeamActivitiesPercentage);
}
