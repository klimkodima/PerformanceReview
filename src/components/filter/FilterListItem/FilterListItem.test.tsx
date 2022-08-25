import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import store from 'src/store';
import i18n from 'src/i18n';
import FilterListItem from './FilterListItem';

describe('FilterListItem', () => {
  test('Matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <FilterListItem
              name='Alpha'
              group='TEAM'
              isNotAvailableToFilterBy={false}
            />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correct name', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <FilterListItem
            name='Alpha'
            group='TEAM'
            isNotAvailableToFilterBy={false}
          />
        </I18nextProvider>
      </Provider>
    );
    expect(screen.getByText(/Alpha/)).toBeInTheDocument();
  });

  test('if item not available for filter should be lower opacity', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <FilterListItem
            name='Alpha'
            group='TEAM'
            isNotAvailableToFilterBy={true}
          />
        </I18nextProvider>
      </Provider>
    );
    expect(screen.getByText(/Alpha/)).toBeInTheDocument();
    expect(screen.getByTestId('filter-list-item__filter-name')).toHaveClass(
      'filter-list-item__filter-name filter-list-item__unavailable-item'
    );
  });
});
