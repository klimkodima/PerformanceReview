import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvailableWidgetsType, SettingsPermissionType } from './types';

type initialStateType = {
  availableWidgets: string[];
  settingsPermission: SettingsPermissionType;
};

const initialState: initialStateType = {
  availableWidgets: [],
  settingsPermission: 'NONE'
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAvailableWidgets(
      state: initialStateType,
      action: PayloadAction<AvailableWidgetsType>
    ) {
      state.availableWidgets = action.payload.availableWidgets;
      state.settingsPermission = action.payload.settingsPermission;
    }
  }
});

// Actions
export const fetchAvailableWidgets = createAction('app/fetchAvailableWidgets');
export const { setAvailableWidgets } = appSlice.actions;

const appReducer = appSlice.reducer;
export default appReducer;
