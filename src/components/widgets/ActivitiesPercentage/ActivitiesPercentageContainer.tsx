import { ReactElement, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import ActivitiesPercentage from './ActivitiesPercentage';
import {
  fetchAuditActivities,
  selectAuditActivities
} from 'src/store/ActivitiesPercentage';
import { selectPickedDate } from 'src/store/DateFilter';
import { createCardData, createPieData } from './helpers';

import { PieOptionType } from './types';

const ActivitiesPercentageContainer = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pickedDate = useSelector(selectPickedDate);
  useEffect(() => {
    dispatch(fetchAuditActivities());
  }, [pickedDate]);

  const { totalTimeSpend, labels } = useSelector(selectAuditActivities);

  const pieData = createPieData(labels);
  const cardData = createCardData(labels, totalTimeSpend);

  const option: PieOptionType = {
    animation: false,
    labelLine: {
      color: 'black'
    },
    label: {
      show: true,
      color: 'black',
      fontWeight: 500,
      fontSize: '1.3rem',
      formatter: '{b}: {d}%'
    },
    series: [
      {
        name: t('activities_percentage.pie_title_text'),
        type: 'pie',
        radius: '57%',
        data: pieData,
        labelLine: {
          lineStyle: {
            color: 'black'
          }
        },
        emphasis: {
          disabled: true
        },
        top: '0'
      }
    ]
  };

  return <ActivitiesPercentage pieData={option} cardData={cardData} />;
};

export default ActivitiesPercentageContainer;
