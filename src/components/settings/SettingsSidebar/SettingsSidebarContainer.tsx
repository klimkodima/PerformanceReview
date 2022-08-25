import { FC, ReactElement } from 'react';

import SettingsSidebar from './SettingsSidebar';

import { SettingsTabsType } from '../types';

type SettingsSidebarContainerPropsType = {
  listOfTabs: SettingsTabsType[];
  onSettingsTabClick: (name: string) => void;
};

const SettingsSidebarContainer: FC<SettingsSidebarContainerPropsType> = ({
  listOfTabs,
  onSettingsTabClick
}): ReactElement => (
  <SettingsSidebar
    listOfTabs={listOfTabs}
    onSettingsTabClick={onSettingsTabClick}
  />
);

export default SettingsSidebarContainer;
