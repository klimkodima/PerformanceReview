import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import SidebarItem from './SidebarItem';

describe('SidebarItem', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <SidebarItem name='Task' onSettingsTabClick={() => true} isActive />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('have active style', () => {
    render(
      <SidebarItem name='Users' onSettingsTabClick={() => true} isActive />
    );
    expect(screen.getByTestId('sidebar-list-item')).toHaveClass('active');
  });

  test('dont have active style', () => {
    render(
      <SidebarItem
        name='Users'
        onSettingsTabClick={() => true}
        isActive={false}
      />
    );
    expect(screen.getByTestId('sidebar-list-item')).not.toHaveClass('active');
  });
});
