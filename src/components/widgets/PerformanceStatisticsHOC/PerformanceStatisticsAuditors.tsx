import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { PerformanceStatisticContainer } from '../PerformanceStatistics';

import './PerformanceStatisticsTeamLead.scss';

const PerformanceStatisticsAuditors = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div
      className='widgets-wrapper widget-perf-stat-audit'
      id='performance-statistics-widget'
    >
      <h2>{t('performance_statistics.section_header')}</h2>
      <PerformanceStatisticContainer />
    </div>
  );
};

export default PerformanceStatisticsAuditors;
