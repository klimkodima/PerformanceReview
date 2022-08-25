import { FC, ReactElement } from 'react';

import StatisticsCircle from './StatisticsCircle';

import { CircleDataType } from '../types';

type StatisticsCircleContainerPropsType = {
  title: string;
  circleData: CircleDataType[];
};

const StatisticsCircleContainer: FC<StatisticsCircleContainerPropsType> = ({
  title,
  circleData
}): ReactElement => {
  const totalTime: number = circleData.reduce((acc: number, a) => {
    return acc + a.value;
  }, 0);

  const filteredData = circleData
    .filter((act) => act.value !== 0)
    .map((activity) => ({
      ...activity,
      value: Math.round((activity.value / totalTime) * 100)
    }));

  const option = {
    title: {
      text: `Team ${title}`,
      left: 'center',
      textStyle: {
        color: '#f5416c',
        fontWeight: '700',
        fontSize: '20px',
        fontFamily: 'sans-serif'
      },
      top: '-5px'
    },
    animation: false,
    labelLine: {
      color: 'black'
    },
    label: {
      show: true,
      color: 'black',
      fontWeight: 500,
      fontSize: '16px',
      formatter: '{b}: {d}%',
      fontFamily: 'sans-serif'
    },
    series: [
      {
        name: 'hello',
        type: 'pie',
        radius: '55%',
        cursor: 'auto',
        data: filteredData,
        labelLine: {
          lineStyle: {
            color: 'black'
          }
        },
        emphasis: {
          disabled: true
        },
        top: '5px'
      }
    ]
  };

  return <StatisticsCircle option={option} />;
};

export default StatisticsCircleContainer;
