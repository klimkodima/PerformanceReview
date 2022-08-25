import { RootStateType } from '../index';

import { BonusesDataType } from './types';

export const selectBonusesData = (state: RootStateType): BonusesDataType[] =>
  state.seniorityBonuses.bonusesData;
