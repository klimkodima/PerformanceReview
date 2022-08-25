import { RootStateType } from './../index';

import { ContentAuditorType } from './types';

export const selectContentAuditor = (
  state: RootStateType
): ContentAuditorType => state.contentAuditor.auditorData;
