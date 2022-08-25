import { getOrderNumber } from 'src/utils/commonFunctions';

export const getBonusValue = (value: number | string): string => {
  if (typeof value === 'string' && !value.trim().length) {
    return '-';
  }
  if (typeof value === 'number' && (value === 0 || value < 0)) {
    return '-';
  }
  return `${value}%`;
};

export const getDisplayValue = (title: string, value: number): string => {
  switch (title) {
    case 'Total Points':
      return `${value}`;
    case 'Level Position':
      return getOrderNumber(Number(value));
    case 'Seniority Premium':
      return getBonusValue(value);
    default:
      return '';
  }
};
