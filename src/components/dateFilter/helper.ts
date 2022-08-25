import { DateObject } from 'react-multi-date-picker';

import { setValueHandler } from './types';

export const setDatePeriod = (value: number, setValue: setValueHandler): void =>
  setValue([new DateObject().subtract(value, 'days'), new DateObject()]);

export const padTo2Digits = (num: number): string =>
  num.toString().padStart(2, '0');

export const formatDate = (date: Date): string =>
  [
    date.getFullYear(),
    padTo2Digits(+date.getMonth() + 1),
    padTo2Digits(+date.getDate())
  ].join('-');
