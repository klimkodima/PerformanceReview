import { Dispatch, SetStateAction } from 'react';

import type { Value } from 'react-multi-date-picker';

export type dateFilterValueType = Value;

export type setValueHandler = Dispatch<SetStateAction<Value>>;

export type AsideButtonsGroupType = {
  classes: string;
  setValue: setValueHandler;
  position: string;
};
