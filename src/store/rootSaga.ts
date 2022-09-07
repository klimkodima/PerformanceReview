import { all } from 'redux-saga/effects';

import { appSaga } from './App';
import { activitiesPercentageSaga } from './ActivitiesPercentage';
import {
  hoursCorSaga,
  postHoursCorrespondenceSaga
} from './HoursCorrespondence';
import { tasksCoefficientSaga } from './TasksCoeff';
import { contentAuditorSaga } from './ContentAuditor';
import { AuthSaga } from './Auth';
import { presetWorkingHoursSaga } from './PresetWorkingHours';
import { seniorityBonusesSaga } from './SeniorityBonuses';
import { performanceStatisticSaga } from './PerformanceStatistic';
import { criteriaSaga } from './Criteria';
import { FilterSaga } from './Filter';
import { usersSaga } from './Users';
import { teamsSaga } from './Teams';

export default function* rootSaga(): Generator {
  yield all([
    appSaga(),
    activitiesPercentageSaga(),
    tasksCoefficientSaga(),
    hoursCorSaga(),
    contentAuditorSaga(),
    postHoursCorrespondenceSaga(),
    AuthSaga(),
    performanceStatisticSaga(),
    presetWorkingHoursSaga(),
    seniorityBonusesSaga(),
    criteriaSaga(),
    FilterSaga(),
    usersSaga(),
    teamsSaga()
  ]);
}
