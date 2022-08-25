import { RootStateType } from '../index';
import { SettingsPermissionType } from './types';

export const selectAvailableWidgets = (state: RootStateType): string[] =>
  state.app.availableWidgets;

export const selectSettingsPermission = (
  state: RootStateType
): SettingsPermissionType => state.app.settingsPermission;
