import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { CardActivityType } from '../types';

type CardProps = {
  cardData: CardActivityType;
};

const CardView: FC<CardProps> = ({ cardData }): ReactElement => {
  const { t } = useTranslation();
  return (
    <div className='card'>
      <div className='card-row'>
        <label data-testid='totalTimeLabel' className='card-label'>
          {t('activities_percentage.total_time_text')}:
        </label>
        <span data-testid='totalTime' className='card-value'>
          {String(cardData.totalTimeSpend)}h
        </span>
      </div>
      {cardData.labels.map(({ name, value }) => (
        <div key={name} className='card-row'>
          <label className='card-label'>{name}:</label>
          <span className='card-value'>{value}h</span>
        </div>
      ))}
    </div>
  );
};

export default CardView;
