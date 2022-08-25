import { memo, ReactElement } from 'react';

import ReactEcharts from 'echarts-for-react';

import { PerfStatOptionType } from './types';

import './PerformanceStatistics.scss';

type PerfStatPropsType = {
  option: PerfStatOptionType;
};

const PerformanceStatistic = memo(
  ({ option }: PerfStatPropsType): ReactElement => (
    <ReactEcharts
      option={option}
      className='performance-statistics'
      notMerge={true}
    />
  )
);

export default PerformanceStatistic;

PerformanceStatistic.displayName = 'PerformanceStatistic';
