import { RootStateType } from '../index';
import { HoursCorType } from './types';

export const selectHoursCorrespondence = (
  state: RootStateType
): HoursCorType[] => state.hoursCorrespondenceTable.hoursCorrespondence;
