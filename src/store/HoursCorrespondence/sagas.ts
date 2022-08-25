import { getHoursCorrespondence, postHoursCorrespondenceData } from 'src/api';
import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchHoursCor, postHoursCor, setHoursCor } from './reducer';
import { HoursCorInputType, HoursCorType } from './types';
import { nanoid } from 'nanoid';
import { ActionType } from '../types';
import { handleError } from 'src/utils';

function* fetchHoursCorrespondence() {
  try {
    const receivedHoursCorrespondence: HoursCorInputType[] = yield call(
      getHoursCorrespondence,
      {}
    );

    const hoursCorrespondence: HoursCorType[] = receivedHoursCorrespondence.map(
      (item: HoursCorInputType): HoursCorType => {
        return {
          id: nanoid(),
          status: { value: item.status, isError: false, errorText: '' },
          icon: { value: item.icon, isError: false, errorText: '' },
          gap: {
            value: `${item.intervalStart}-${item.intervalEnd}`,
            isError: false,
            errorText: ''
          },
          confirmationRate: {
            value: `${item.confirmationRate}`,
            isError: false,
            errorText: ''
          },
          tooltipText: {
            value: item.tooltip,
            isError: false,
            errorText: ''
          }
        };
      }
    );

    yield put(setHoursCor(hoursCorrespondence));
  } catch (e) {
    console.log(e);
  }
}

export function* hoursCorSaga(): Generator {
  yield takeLatest(fetchHoursCor.type, fetchHoursCorrespondence);
}

function* postHoursCorrespondence(data: ActionType<HoursCorInputType[]>) {
  try {
    yield call(postHoursCorrespondenceData, data.payload);
  } catch (e) {
    const { message } = handleError(e);
    console.log(message);
  }
}

export function* postHoursCorrespondenceSaga(): Generator {
  yield takeLatest(postHoursCor.type, postHoursCorrespondence);
}
