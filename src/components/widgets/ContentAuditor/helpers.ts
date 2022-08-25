import { t } from 'i18next';

import 'src/i18n';

import { inputDataType, outputDataType } from './types';
import { createFormattedLevel } from 'src/utils/commonFunctions';

const getDatePostfix = (date: number, datePeriod: string): string => {
  if (date < 2) {
    return `${date} ${datePeriod}`;
  }

  return `${date} ${datePeriod}s`;
};

const getFullExperiencePeriod = (numberOfMonths: number): string => {
  const countMonths = numberOfMonths % 12;
  const countYears = Math.trunc(numberOfMonths / 12);
  if (countMonths) {
    return `${getDatePostfix(
      countYears,
      t('content_auditor.year')
    )} ${getDatePostfix(countMonths, t('content_auditor.month'))}`;
  } else {
    return `${getDatePostfix(countYears, t('content_auditor.year'))}`;
  }
};

export const getExperience = (numberOfMonths: number): string => {
  if (numberOfMonths < 2) {
    return `${numberOfMonths} ${t('content_auditor.month')}`;
  } else if (numberOfMonths > 12) {
    return getFullExperiencePeriod(numberOfMonths);
  } else {
    return `${numberOfMonths} ${t('content_auditor.month')}s`;
  }
};

export const getOutputData = ({
  key,
  value
}: inputDataType): outputDataType => {
  switch (key) {
    case t('content_auditor.full_name'):
      return { label: t('content_auditor.name'), text: `${value}`, order: 0 };
    case t('content_auditor.level'):
      return {
        label: t('content_auditor.current_level'),
        text: `${createFormattedLevel(value as string)}`,
        order: 2
      };
    case t('content_auditor.team_lead_name'):
      return {
        label: t('content_auditor.team_lead'),
        text: `${value}`,
        order: 3
      };
    case t('content_auditor.experience_in_month'):
      return {
        label: t('content_auditor.experience'),
        text: `${getExperience(value as number)}`,
        order: 4
      };
    case t('content_auditor.team_name'):
      return {
        label: t('content_auditor.team'),
        text: `${value}`,
        order: 1
      };
    default:
      return { label: '', text: '', order: 0 };
  }
};
