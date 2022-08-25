import { RootStateType } from '../index';

import { PerfStatType } from './types';

export const selectPerformanceStatistic = (
  state: RootStateType
): PerfStatType[] => state.performanceStatistic.PerformanceStatistic;
