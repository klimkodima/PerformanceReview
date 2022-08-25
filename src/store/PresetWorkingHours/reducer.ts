import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import presetWorkingHours from './mockPresetWorkingHours.json';

import {
  PresetWorkingHoursDataType,
  PresetWorkingHoursInfoType
} from './types';

type initialStateType = {
  presetWorkingHoursTable: PresetWorkingHoursDataType[];
};

const initialState: initialStateType = {
  presetWorkingHoursTable: presetWorkingHours
};

const slice = createSlice({
  name: 'PresetWorkingHours',
  initialState,
  reducers: {
    setPresetWorkingHours(
      state,
      action: PayloadAction<PresetWorkingHoursDataType[]>
    ) {
      state.presetWorkingHoursTable = action.payload;
    }
  }
});

export const fetchPresetWorkingHours = createAction(
  'PresetWorkingHours/fetchPresetWorkingHours'
);
export const postPresetWorkingHours = createAction<PresetWorkingHoursInfoType>(
  'PresetWorkingHours/postPresetWorkingHours'
);
export const putPresetWorkingHours = createAction<PresetWorkingHoursInfoType>(
  'PresetWorkingHours/putPresetWorkingHours'
);
export const deletePresetWorkingHours = createAction<string>(
  'PresetWorkingHours/deletePresetWorkingHours'
);

export const { setPresetWorkingHours } = slice.actions;

const presetWorkingHoursReducer = slice.reducer;
export default presetWorkingHoursReducer;
