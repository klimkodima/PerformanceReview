import { RootStateType } from '../index';

import { AuditActivitiesType, TeamActivitiesPercentageType } from './types';

export const selectAuditActivities = (
  state: RootStateType
): AuditActivitiesType => state.activitiesPercentage.auditActivities;

export const selectTeamActivities = (
  state: RootStateType
): TeamActivitiesPercentageType[] => state.activitiesPercentage.teamActivities;
