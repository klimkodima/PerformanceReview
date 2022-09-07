import { combineReducers } from 'redux';

import { appReducer } from './App';
import { filterReducer } from './Filter';
import { hoursCorrespondenceReducer } from './HoursCorrespondence';
import { tasksCoeffTableReducer } from './TasksCoeff';
import { activitiesPercentageReducer } from './ActivitiesPercentage';
import { dateFilterReducer } from './DateFilter';
import contentAuditorReducer from './ContentAuditor/reducer';
import { authReducer } from './Auth';
import { presetWorkingHoursReducer } from './PresetWorkingHours';
import { seniorityBonusesReducer } from './SeniorityBonuses';
import { performanceStatisticReducer } from './PerformanceStatistic';
import { criteriaReducer } from './Criteria';
import { usersReducer } from './Users';
import { teamsReducer } from './Teams';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  filter: filterReducer,
  activitiesPercentage: activitiesPercentageReducer,
  dateFilter: dateFilterReducer,
  hoursCorrespondenceTable: hoursCorrespondenceReducer,
  tasksCoefficient: tasksCoeffTableReducer,
  contentAuditor: contentAuditorReducer,
  seniorityBonuses: seniorityBonusesReducer,
  performanceStatistic: performanceStatisticReducer,
  presetWorkingHoursTable: presetWorkingHoursReducer,
  criteria: criteriaReducer,
  users: usersReducer,
  teams: teamsReducer
});

export default rootReducer;
