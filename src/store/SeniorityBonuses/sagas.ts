import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createSeniorityBonusesRow,
  deleteSeniorityBonusesRow,
  getBonusesData,
  updateSeniorityBonusesRow
} from 'src/api';
import {
  createNewBonusesRow,
  deleteBonusesRow,
  fetchBonusesData,
  setBonusesData,
  updateBonusesRow
} from './reducer';

import {
  BonusesDataType,
  SeniorityBonusCreateType,
  SeniorityBonusType
} from './types';
import { ActionType } from '../types';

function* fetchBonusesDataWorker() {
  try {
    const receivedBonusesData: SeniorityBonusType[] = yield call(
      getBonusesData,
      {}
    );

    const bonusesData: BonusesDataType[] = receivedBonusesData.map(
      ({ id, bonusPercentage, startInterval }) => ({
        id: id.toString(),
        experience: {
          value: startInterval.toString(),
          isError: false,
          errorText: ''
        },
        bonus: {
          value: bonusPercentage.toString(),
          isError: false,
          errorText: ''
        }
      })
    );

    yield put(setBonusesData(bonusesData));
  } catch (e) {
    console.log(e);
  }
}

function* createNewBonusesRowWorker(action: ActionType<BonusesDataType>) {
  try {
    const createNewRowData = (
      data: BonusesDataType
    ): SeniorityBonusCreateType => {
      return {
        startInterval: Number(data.experience.value),
        bonusPercentage: Number(data.bonus.value)
      };
    };

    yield call(createSeniorityBonusesRow, createNewRowData(action.payload));
    yield call(fetchBonusesDataWorker);
  } catch (e) {
    console.log(e);
  }
}

function* deleteBonusesRowWorker(action: ActionType<string>) {
  try {
    yield call(deleteSeniorityBonusesRow, action.payload);
    yield call(fetchBonusesDataWorker);
  } catch (e) {
    console.log(e);
  }
}

function* updateBonusesRowWorker(action: ActionType<SeniorityBonusType>) {
  try {
    yield call(updateSeniorityBonusesRow, action.payload);
    yield call(fetchBonusesDataWorker);
  } catch (e) {
    console.log(e);
  }
}

export function* seniorityBonusesSaga(): Generator {
  yield takeLatest(fetchBonusesData.type, fetchBonusesDataWorker);
  yield takeLatest(createNewBonusesRow.type, createNewBonusesRowWorker);
  yield takeLatest(deleteBonusesRow.type, deleteBonusesRowWorker);
  yield takeLatest(updateBonusesRow.type, updateBonusesRowWorker);
}
