import { takeLatest, put, call } from 'redux-saga/effects';
import { getTeamsList, createTeam, updateTeam, deleteTeam } from 'src/api';
import {
  fetchTeams,
  createNewTeamRow,
  setTeams,
  updateTeamRow,
  deleteTeamRow
} from './reducer';
import { TeamInputType, TeamType, TeamInfoType } from './types';
import { ActionType } from '../types';
import { handleError } from 'src/utils';

function* fetchTeamsWorker() {
  try {
    const receivedTeams: TeamInfoType[] = yield call(getTeamsList, {});
    const teams: TeamType[] = receivedTeams.map(
      (item: TeamInfoType): TeamType => {
        return {
          id: item.id.toString(),
          teamName: { value: item.teamName, isError: false, errorText: '' },
          teamLeaderName: {
            value: item.teamLeaderName,
            isError: false,
            errorText: ''
          }
        };
      }
    );

    yield put(setTeams(teams));
  } catch (e) {
    console.log(e);
  }
}

function* updateTeamWorker(action: ActionType<TeamType>) {
  try {
    yield call(updateTeam, Number(action.payload.id), {
      teamName: action.payload.teamName,
      teamLeaderName: action.payload.teamLeaderName
    });
    yield call(fetchTeamsWorker);
  } catch (e) {
    const { message } = handleError(e);
    console.log(message);
  }
}

function* createNewTeamWorker(action: ActionType<TeamInputType>) {
  try {
    yield call(createTeam, action.payload);
    yield call(fetchTeamsWorker);
  } catch (e) {
    const { message } = handleError(e);
    console.log(message);
  }
}

function* deleteTeamWorker(action: ActionType<string>) {
  try {
    yield call(deleteTeam, action.payload);
  } catch (e) {
    const { message } = handleError(e);
    console.log(message);
  }
}

export function* teamsSaga(): Generator {
  yield takeLatest(fetchTeams.type, fetchTeamsWorker);
  yield takeLatest(createNewTeamRow.type, createNewTeamWorker);
  yield takeLatest(updateTeamRow.type, updateTeamWorker);
  yield takeLatest(deleteTeamRow.type, deleteTeamWorker);
}
