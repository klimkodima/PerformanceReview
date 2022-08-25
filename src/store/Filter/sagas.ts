import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import { getTeamsList } from 'src/api';
import { ROLE_NAME } from 'src/constants';
import {
  fetchFilterData,
  filterByAuditor,
  filterByTeam,
  setFiltersData,
  setIsShowFilter,
  setTeams
} from './reducer';
import { crateAuditorsData, crateTeamLeadAuditorsData } from './helpers';
import {
  selectCheckedAuditors,
  selectCheckedTeams,
  selectFiltersData
} from './selectors';
import { selectUsers } from '../Users';
import { CurrentUserType, selectCurrentUser } from '../Auth';

import {
  AuditorType,
  FilterDataType,
  TeamsDataResponseType,
  UsersListResponseType
} from './types';

function* setAuditors() {
  try {
    const { roleName }: CurrentUserType = yield select(selectCurrentUser);
    const checkedTeams = yield select(selectCheckedTeams);

    const teamsData: TeamsDataResponseType[] = yield call(getTeamsList, {});
    const usersList: UsersListResponseType[] = yield select(selectUsers);

    yield put(setTeams(teamsData));
    yield put(setFiltersData(crateAuditorsData(usersList, teamsData)));

    if (
      roleName === ROLE_NAME.MANAGER ||
      (roleName === ROLE_NAME.ADMIN && checkedTeams.length === 0)
    ) {
      yield all(teamsData.map(({ teamName }) => put(filterByTeam(teamName))));
    }
  } catch (e) {
    console.log(e);
  }
}

function* setAuditorsForTeamLead() {
  try {
    const usersList: UsersListResponseType[] = yield select(selectUsers);

    yield put(setFiltersData(crateTeamLeadAuditorsData(usersList)));
    yield put(setIsShowFilter(true));

    const auditors: AuditorType[] = yield select(selectFiltersData);
    const checkedAuditors: FilterDataType = yield select(selectCheckedAuditors);

    if (
      checkedAuditors[0] !== auditors[0].teamLeaderName &&
      checkedAuditors.length === 0
    ) {
      yield put(filterByAuditor(auditors[0].teamLeaderName));
    }
  } catch (e) {
    console.log('fetchUsersListForTeamLead', e);
    yield put(setFiltersData([]));
    yield put(setIsShowFilter(false));
  }
}

function* fetchFilterDataWorker() {
  try {
    const { roleName }: CurrentUserType = yield select(selectCurrentUser);
    if (roleName === ROLE_NAME.MANAGER || roleName === ROLE_NAME.ADMIN) {
      yield call(setAuditors);
      yield put(setIsShowFilter(true));
    } else if (roleName === ROLE_NAME.TEAM_LEADER) {
      yield call(setAuditorsForTeamLead);
      yield put(setIsShowFilter(true));
    } else {
      yield put(setFiltersData([]));
      yield put(setIsShowFilter(false));
    }
  } catch (e) {
    console.log('fetchFilterDataWorker', e);
  }
}

export function* FilterSaga(): Generator {
  yield takeLatest(fetchFilterData.type, fetchFilterDataWorker);
}
