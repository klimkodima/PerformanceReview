import { FC, useEffect, useState, ReactElement, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { t } from 'i18next';

import { selectPickedDate } from 'src/store/DateFilter';
import {
  fetchPerformanceStatistic,
  selectPerformanceStatistic
} from 'src/store/PerformanceStatistic';
import { selectCheckedAuditorsData } from 'src/store/Filter';
import PerformanceStatistic from './PerformanceStatistic';
import { getAllDates, getAllPoints, getSubtitle } from './helpers';

import { PerfStatOptionType, UserPointsType } from './types';

type PerfStatAveragePropsType = {
  isShowAverage?: boolean;
};

const PerformanceStatisticContainer: FC<PerfStatAveragePropsType> = ({
  isShowAverage
}): ReactElement => {
  const dispatch = useDispatch();
  const performanceStatisticData = useSelector(selectPerformanceStatistic);
  const checkedAuditors = useSelector(selectCheckedAuditorsData);
  const pickedDate = useSelector(selectPickedDate);

  useEffect(() => {
    dispatch(fetchPerformanceStatistic());
  }, [pickedDate, checkedAuditors]);

  const subtitle = getSubtitle(
    performanceStatisticData[0]?.from,
    performanceStatisticData[0]?.to
  );

  const usersPoints = performanceStatisticData[0]?.usersPointsDots?.length;
  const isPoints = !isEmpty(performanceStatisticData);

  let dataAPI = useMemo(
    (): UserPointsType[] =>
      getAllPoints(performanceStatisticData, checkedAuditors),
    [usersPoints, pickedDate, isPoints]
  );

  const dataX = getAllDates(performanceStatisticData);

  if (dataAPI.length > 40) {
    dataAPI = dataAPI.slice(0, 40);
  }

  const option: PerfStatOptionType = {
    animation: false,
    legend: {
      show: true,
      height: '23%',
      data: [],
      orient: 'vertical',
      lineStyle: 'none',
      textStyle: {
        color: 'inherit',
        fontFamily: 'sans-serif'
      },
      bottom: 'left',
      left: '2%',
      top: 'bottom'
    },
    grid: {
      left: '1%',
      right: '2%',
      bottom: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dataX,
      label: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'dotted',
          color: 'grey'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      name: `Points/${subtitle}`,
      nameTextStyle: {
        color: '#263238',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        padding: [0, 0, 0, 20]
      }
    },
    series: []
  };

  const [dataValue, setDataValue] = useState<UserPointsType[]>(dataAPI);

  useEffect(() => {
    if (isShowAverage) {
      const newDataAPI = dataAPI.filter(
        ({ name }) => !name.includes(t('performance_statistics.average'))
      );
      setDataValue(newDataAPI);
    } else {
      setDataValue(dataAPI);
    }
  }, [isShowAverage]);

  useEffect(() => {
    setDataValue(dataAPI);
  }, [pickedDate, usersPoints, isPoints]);

  if (!isEmpty(dataValue)) {
    dataValue.map(({ name, data }: UserPointsType): void => {
      if (Array.isArray(data) && !isEmpty(data)) {
        option.series.push({
          name: name,
          data: data,
          type: 'line',
          lineStyle: {
            type: name.includes(t('performance_statistics.average'))
              ? 'dotted'
              : 'line'
          },
          symbol: 'none'
        });
        option.legend.data.push(name);
      }
    });
  }

  return <PerformanceStatistic option={option} />;
};

export default PerformanceStatisticContainer;
