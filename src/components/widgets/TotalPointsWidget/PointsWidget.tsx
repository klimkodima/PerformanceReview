import { ReactElement, useEffect } from 'react';

import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import { selectPickedDate } from 'src/store/DateFilter';
import { fetchCriteria, selectCriteria } from 'src/store/Criteria';
import PointsItem from './PointsItem';
import { getDisplayValue } from './helpers/functions';

import { PersonPointItemType } from './types';

import './PointsWidget.scss';

const PointsWidget = (): ReactElement => {
  const dispatch = useDispatch();
  const pickedDate = useSelector(selectPickedDate);
  const pointsData = useSelector(selectCriteria);

  const { totalPoints, levelPosition, seniorityBonus } = pointsData;
  const personPoints: PersonPointItemType[] = [
    {
      title: t('points_widget.totalPoints'),
      value: totalPoints,
      isShowInfoIcon: true,
      infoText: t('points_widget.totalPoints_info_text')
    },
    {
      title: t('points_widget.levelPosition'),
      value: levelPosition,
      isShowInfoIcon: false,
      infoText: ''
    },
    {
      title: t('points_widget.seniorityBonus'),
      value: seniorityBonus,
      isShowInfoIcon: false,
      infoText: ''
    }
  ];

  useEffect(() => {
    dispatch(fetchCriteria());
  }, [pickedDate]);

  return (
    <div className='widget-point' data-testid='widget-point' id='widget-point'>
      {personPoints.map(
        ({ title, value, isShowInfoIcon, infoText }: PersonPointItemType) => (
          <PointsItem
            key={title}
            classesOuterDiv='widget-point__item item'
            classesHeader='item__header'
            classesInnerDiv='item__point-block point-block'
            classesText='point-block__text'
            headerText={title}
            pointText={getDisplayValue(title, value)}
            isShowInfoIcon={isShowInfoIcon}
            infoText={infoText}
          />
        )
      )}
    </div>
  );
};

export default PointsWidget;
