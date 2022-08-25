import { ReactElement, memo } from 'react';

import { StatisticsCircle } from './StatisticsCircle';

import { StatisticCircleDataType } from './types';

import './TeamActivitiesPercentage.scss';

type TeamActivitiesPercentagePropsType = {
  title: string;
  circleData: StatisticCircleDataType[];
  placeholderText: string;
};

const TeamActivitiesPercentage = memo(
  ({
    title,
    circleData,
    placeholderText
  }: TeamActivitiesPercentagePropsType): ReactElement => (
    <div
      className={
        placeholderText
          ? 'team-activities-percentage placeholder'
          : 'team-activities-percentage'
      }
      id='team-activities-percentage'
    >
      <div>
        <h2 className='team-activities-percentage__title'>{title}</h2>
      </div>
      {placeholderText ? (
        <div className='team-activities-percentage-placeholder'>
          <p>{placeholderText}</p>
        </div>
      ) : (
        <div
          className='circles'
          data-testid='team-activities-percentage-circles'
        >
          <div className='circles__wrapper'>
            {circleData.map(({ title, data }) => (
              <StatisticsCircle key={title} title={title} circleData={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
);

export default TeamActivitiesPercentage;

TeamActivitiesPercentage.displayName = 'TeamActivitiesPercentage';
