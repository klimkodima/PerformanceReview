import { RootStateType } from '../index';

import { CriteriaDataType } from './types';

export const selectCriteria = (state: RootStateType): CriteriaDataType =>
  state.criteria.criteria;
