import { FC, ReactElement } from 'react';

import { ACTIVITIES_PERCENTAGE_TITLE } from './constants';
import { Pie } from './Pie';
import { Card } from './Card';

import { PieOptionType, CardActivityType } from './types';

import './ActivitiesPercentage.scss';

type ActivityPropsType = {
  pieData: PieOptionType;
  cardData: CardActivityType;
};

const ActivitiesPercentage: FC<ActivityPropsType> = ({
  pieData,
  cardData
}): ReactElement => (
  <div className=' widgets-wrapper' id='activities-percentage-widget'>
    <h2>{ACTIVITIES_PERCENTAGE_TITLE}</h2>
    <div className='section-activities-content'>
      <Pie pieData={pieData} />
      <Card cardData={cardData} />
    </div>
  </div>
);

export default ActivitiesPercentage;
