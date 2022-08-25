import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/i18n';
import store from 'src/store';
import FilterList from './FilterList';
import { mockTeamFilter, FILTERS_NAMES } from '../data';

describe('FilterList', () => {
  test('filter name shows', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <FilterList
            title={FILTERS_NAMES.TEAM}
            filter={mockTeamFilter}
            filteredData={[]}
            checkedItems={[]}
            onAddFilterClick={() => true}
            closeDrawer={() => false}
            isOpen={true}
          />
        </I18nextProvider>
      </Provider>
    );
    expect(screen.getByText(/TEAM/i)).toBeInTheDocument();
  });

  test('Matches snapshot', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <FilterList
            title={FILTERS_NAMES.TEAM}
            filter={mockTeamFilter}
            filteredData={[]}
            checkedItems={[]}
            onAddFilterClick={() => true}
            closeDrawer={() => false}
            isOpen={true}
          />
        </I18nextProvider>
      </Provider>
    );
    expect(screen.getByTestId('filter-list-test')).toMatchSnapshot();
  });
});
