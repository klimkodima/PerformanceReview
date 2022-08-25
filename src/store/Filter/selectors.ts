import { RootStateType } from '../index';
import {
  AuditorType,
  CheckedAuditorsDataType,
  FilterDataType,
  TeamsDataResponseType
} from './types';

export const selectCheckedTeams = (state: RootStateType): FilterDataType =>
  state.filter.checkedTeams;

export const selectFilteredTeams = (state: RootStateType): FilterDataType =>
  state.filter.filteredTeams;

export const selectCheckedAuditors = (state: RootStateType): FilterDataType =>
  state.filter.checkedAuditors;

export const selectCheckedAuditorsData = (
  state: RootStateType
): CheckedAuditorsDataType => state.filter.checkedAuditorsData;

export const selectFiltersData = (state: RootStateType): AuditorType[] =>
  state.filter.data;

export const selectIsDisabledReset = (state: RootStateType): boolean =>
  state.filter.isDisabledReset;

export const selectTeamsData = (
  state: RootStateType
): TeamsDataResponseType[] => state.filter.teams;
