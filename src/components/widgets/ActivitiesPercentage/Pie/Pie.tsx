import { FC, ReactElement } from 'react';

import ReactEcharts from 'echarts-for-react';

import { PieOptionType } from '../types';

type PieProps = {
  pieData: PieOptionType;
};

const Pie: FC<PieProps> = ({ pieData }): ReactElement => (
  <ReactEcharts
    data-testid='Pie'
    style={{ height: '420px' }}
    option={pieData}
    className='pie-chart'
    lazyUpdate={true}
  />
);
export default Pie;
