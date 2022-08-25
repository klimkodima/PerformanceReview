import { ReactElement, memo } from 'react';

import { SETTINGS_PERMISSION } from 'src/constants';
import { SettingsSidebar } from '../SettingsSidebar';

import { SettingsPermissionType } from 'src/store/App';
import { SettingsTabsType } from '../types';

type SettingsPropsType = {
  listOfTabs: SettingsTabsType[];
  onSettingsTabClick: (name: string) => void;
  settingsPermission: SettingsPermissionType;
};

const Settings = memo(
  ({
    listOfTabs,
    onSettingsTabClick,
    settingsPermission
  }: SettingsPropsType): ReactElement => (
    <>
      <SettingsSidebar
        listOfTabs={listOfTabs}
        onSettingsTabClick={onSettingsTabClick}
      />
      {listOfTabs
        .filter(({ isActive }) => isActive)
        .map(({ name, component, editableComponent }) => (
          <div key={name} className='settings-container'>
            <h2>{name}</h2>
            {settingsPermission === SETTINGS_PERMISSION.WRITE
              ? editableComponent
              : component}
          </div>
        ))}
    </>
  )
);

export default Settings;

Settings.displayName = 'Settings';
