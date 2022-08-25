import { RootStateType } from '../index';

import { PickedDateType } from './types';

export const selectPickedDate = (state: RootStateType): PickedDateType =>
  state.dateFilter.pickedDate;
