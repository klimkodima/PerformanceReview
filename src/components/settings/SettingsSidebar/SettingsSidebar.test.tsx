import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import SettingsSidebar from './SettingsSidebar';
import { initListOfTabs } from '../Settings/SettingsContainer';

describe('SettingsSidebar', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <SettingsSidebar
          listOfTabs={initListOfTabs}
          onSettingsTabClick={() => true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('only first item should be active', () => {
    render(
      <SettingsSidebar
        listOfTabs={initListOfTabs}
        onSettingsTabClick={() => true}
      />
    );
    expect(screen.getAllByTestId('sidebar-list-item')[0]).toHaveClass('active');
    expect(screen.getAllByTestId('sidebar-list-item')[1]).not.toHaveClass(
      'active'
    );
    expect(screen.getAllByTestId('sidebar-list-item')[2]).not.toHaveClass(
      'active'
    );
    expect(screen.getAllByTestId('sidebar-list-item')[3]).not.toHaveClass(
      'active'
    );
  });

  test('renders 4 items', () => {
    render(
      <SettingsSidebar
        listOfTabs={initListOfTabs}
        onSettingsTabClick={() => true}
      />
    );
    expect(screen.getAllByTestId('sidebar-list-item').length).toBe(5);
  });
});
