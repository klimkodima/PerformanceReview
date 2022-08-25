import { useState, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { PerformanceStatisticContainer } from '../PerformanceStatistics';

import './PerformanceStatisticsTeamLead.scss';

const PerformanceStatisticsTeamLead = (): ReactElement => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div className='widgets-wrapper' id='performance-statistics-widget'>
      <h2>{t('performance_statistics.section_header')}</h2>
      <div className='average-levels-box' id='average-levels-box'>
        <p>{t('performance_statistics.sub_section_header')}</p>
        <div className='switch-wrapper'>
          <p>{t('performance_statistics.on')}</p>
          <label>
            <input type='checkbox' onChange={() => setIsCheck(!isCheck)} />
            <span className='switch' />
          </label>
          <p>{t('performance_statistics.off')}</p>
        </div>
      </div>
      <PerformanceStatisticContainer isShowAverage={isCheck} />
    </div>
  );
};

export default PerformanceStatisticsTeamLead;
