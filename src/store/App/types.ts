export type AvailableWidgetsType = {
  availableWidgets: string[];
  settingsPermission: SettingsPermissionType;
};

export type SettingsPermissionType = 'READ' | 'WRITE' | 'NONE';
