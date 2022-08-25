import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import defaultGreenIcon from 'src/assets/img/mark-average-accuracy-green.svg';
import defaultYellowIcon from 'src/assets/img/mark-average-accuracy-yellow.svg';
import defaultRedIcon from 'src/assets/img/mark-average-accuracy-red.svg';

import './AverageAccuracy.scss';

const AverageAccuracy = (): ReactElement => {
  const { t } = useTranslation();
  const percentageValue = 70;

  let iconPath = defaultRedIcon;
  switch (true) {
    case 79 < percentageValue && percentageValue < 101:
      iconPath = defaultGreenIcon;
      break;
    case 26 < percentageValue && percentageValue < 80:
      iconPath = defaultYellowIcon;
      break;
    default:
      iconPath = defaultRedIcon;
  }

  return (
    <div className='widgets-wrapper average-accuracy'>
      <h2>{t('average_accuracy.title')}</h2>
      <div className='average-accuracy__container'>
        <div className='average-accuracy__img-block'>
          <img src={iconPath} alt='average-accuracy' />
          <p>{percentageValue}%</p>
        </div>
      </div>
    </div>
  );
};

export default AverageAccuracy;
