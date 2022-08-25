import { ReactElement, memo } from 'react';

import { SidebarItem } from '../SidebarItem';

import { SettingsTabsType } from '../types';

import './SettingsSidebar.scss';

type SettingsSidebarPropsType = {
  listOfTabs: SettingsTabsType[];
  onSettingsTabClick: (name: string) => void;
};

const SettingsSidebar = memo(
  ({
    listOfTabs,
    onSettingsTabClick
  }: SettingsSidebarPropsType): ReactElement => (
    <div className='settings-sidebar sidebar-wrapper'>
      <ul>
        {listOfTabs.map(({ name, isActive }) => (
          <SidebarItem
            key={name}
            name={name}
            isActive={isActive}
            onSettingsTabClick={onSettingsTabClick}
          />
        ))}
      </ul>
    </div>
  )
);

export default SettingsSidebar;

SettingsSidebar.displayName = 'SettingsSidebar';
