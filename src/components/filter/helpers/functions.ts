import { AuditorType } from 'src/store/Filter';
import { CheckArrayFunction, SearchFunction } from '../types';

export const isDisabled: CheckArrayFunction = (resultArray, value) =>
  Array.isArray(resultArray) && resultArray.length
    ? !resultArray.includes(value)
    : false;

export const isChecked: CheckArrayFunction = (resultArray, value) =>
  Array.isArray(resultArray) && resultArray.length
    ? resultArray.includes(value)
    : false;

export const getAuditors: SearchFunction = (searchedArray, dataObject) => {
  if (searchedArray.length) {
    return searchedArray;
  }
  return dataObject
    .map((item: AuditorType) => {
      if (item.roleName === 'AUDITOR') return item.name;
    })
    .filter(Boolean);
};
