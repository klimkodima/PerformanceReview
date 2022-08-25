import { ReactElement, memo } from 'react';

import './SidebarItem.scss';

type SidebarItemPropsType = {
  name: string;
  isActive: boolean;
  onSettingsTabClick: (name: string) => void;
};

const SidebarItem = memo(
  ({
    name,
    isActive,
    onSettingsTabClick
  }: SidebarItemPropsType): ReactElement => {
    const liStyle = `sidebar-list-item ${isActive ? 'active' : ''}`;

    return (
      <li
        className={liStyle}
        data-testid='sidebar-list-item'
        onClick={() => onSettingsTabClick(name)}
      >
        {name}
      </li>
    );
  }
);

export default SidebarItem;

SidebarItem.displayName = 'SidebarItem';
