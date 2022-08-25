import { ReactElement } from 'react';

export type SettingsTabsType = {
  name: string;
  component: ReactElement;
  editableComponent: ReactElement;
  isActive: boolean;
};

export type ConstantsTextType = {
  [key: string]: string;
};
