import { t } from 'i18next';
import { isEmpty } from 'lodash';

import { CheckedAuditorsDataType } from 'src/store/Filter/types';
import {
  PerfStatOmitType,
  PerfStatType
} from 'src/store/PerformanceStatistic/types';
import { UserPointsType } from './types';

export const getAllDates = (
  performanceStatisticData: PerfStatType[]
): string[] =>
  performanceStatisticData.map(({ from }) => from.slice(5).replace(/-/g, '.'));

export const getAllPoints = (
  performanceStatisticData: PerfStatType[],
  checkedAuditors: CheckedAuditorsDataType
): UserPointsType[] => {
  const dataAPI: UserPointsType[] = [
    {
      name: t('performance_statistics.average_senior_auditor'),
      data: []
    },
    {
      name: t('performance_statistics.average_middle_auditor'),
      data: []
    },
    {
      name: t('performance_statistics.average_junior_auditor'),
      data: []
    }
  ];

  if (!isEmpty(checkedAuditors)) {
    for (const key in checkedAuditors) {
      dataAPI.push({ name: checkedAuditors[key].name, data: [] });
    }
  }

  if (
    isEmpty(checkedAuditors) &&
    performanceStatisticData[0]?.usersPointsDots
  ) {
    dataAPI.push({
      name: performanceStatisticData[0].usersPointsDots[0].userName,
      data: []
    });
  }

  performanceStatisticData.forEach(
    ({
      juniorsPoints,
      middlesPoints,
      seniorsPoints,
      usersPointsDots
    }: PerfStatOmitType) => {
      for (const key of dataAPI) {
        if (
          key.name.includes(t('performance_statistics.average_junior_auditor'))
        ) {
          key.data.push(juniorsPoints);
        } else if (
          key.name.includes(t('performance_statistics.average_middle_auditor'))
        ) {
          key.data.push(middlesPoints);
        } else if (
          key.name.includes(t('performance_statistics.average_senior_auditor'))
        ) {
          key.data.push(seniorsPoints);
        }
        if (usersPointsDots) {
          for (const userInfo of usersPointsDots) {
            if (key.name === userInfo.userName) {
              key.data.push(userInfo.userPoints);
            }
          }
        }
      }
    }
  );

  return dataAPI;
};

export const getSubtitle = (from: string, to: string): string => {
  const date1 = new Date(from);
  const date2 = new Date(to);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);

  if (diffInDays === 0) return t('performance_statistics.day');
  if (diffInDays === 6) return t('performance_statistics.week');
  if (diffInDays === 29) return t('performance_statistics.month');
  return t('performance_statistics.year');
};
