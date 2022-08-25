import { ReactElement, useCallback, useState } from 'react';

import { t } from 'i18next';

import { selectSettingsPermission } from 'src/store/App';
import Settings from './Settings';
import { TasksCoefficientsTable } from '../TasksCoefficientsTable';
import {
  HoursCorrespondence,
  HoursCorrespondenceEdit
} from '../HoursCorrespondence';
import { SeniorityBonuses, SeniorityBonusesEdit } from '../SeniorityBonuses';
import {
  PresetWorkingHours,
  PresetWorkingHoursEdit
} from '../PresetWorkingHours';
import { UsersContainer } from '../Users';

import { SettingsTabsType } from '../types';
import { useSelector } from 'react-redux';

export const initListOfTabs: SettingsTabsType[] = [
  {
    name: t('settings.tasks_title'),
    component: <TasksCoefficientsTable />,
    editableComponent: <TasksCoefficientsTable />,
    isActive: false
  },
  {
    name: t('settings.hours_title'),
    component: <HoursCorrespondence />,
    editableComponent: <HoursCorrespondenceEdit />,
    isActive: false
  },
  {
    name: t('settings.preset_working_hours_title'),
    component: <PresetWorkingHours />,
    editableComponent: <PresetWorkingHoursEdit />,
    isActive: false
  },
  {
    name: t('settings.seniority_bonuses_title'),
    component: <SeniorityBonuses />,
    editableComponent: <SeniorityBonusesEdit />,
    isActive: false
  },
  {
    name: t('settings.users_title'),
    component: <UsersContainer />,
    editableComponent: <UsersContainer />,
    isActive: false
  }
];

const SettingsContainer = (): ReactElement => {
  const settingsPermission = useSelector(selectSettingsPermission);

  const [listOfTabs, setListOfTabs] =
    useState<SettingsTabsType[]>(initListOfTabs);

  const handleSettingsTabClick = useCallback((name: string) => {
    setListOfTabs(
      listOfTabs.map((tab) =>
        tab.name === name
          ? { ...tab, isActive: true }
          : { ...tab, isActive: false }
      )
    );
  }, []);

  return (
    <Settings
      settingsPermission={settingsPermission}
      listOfTabs={listOfTabs}
      onSettingsTabClick={handleSettingsTabClick}
    />
  );
};

export default SettingsContainer;
