import { RootStateType } from '../index';
import { PresetWorkingHoursDataType } from './types';

export const selectPresetWorkingHours = (
  state: RootStateType
): PresetWorkingHoursDataType[] =>
  state.presetWorkingHoursTable.presetWorkingHoursTable;
