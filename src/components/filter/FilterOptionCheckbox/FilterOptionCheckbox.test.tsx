import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import FilterOptionCheckbox from './FilterOptionCheckbox';
import i18n from 'src/i18n';
import store from '../../../store';

describe('FilterOptionCheckbox', () => {
  test('Matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <FilterOptionCheckbox
              name='Alpha'
              checkedItems={['Alpha']}
              group='teams'
              filteredData={[]}
            />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Checkbox renders', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <FilterOptionCheckbox
            name='Alpha'
            checkedItems={['Alpha']}
            group='teams'
            filteredData={[]}
          />
        </I18nextProvider>
      </Provider>
    );
    expect(screen.getByTestId('filter-option-checkbox')).toBeInTheDocument();
  });

  test('shows label name', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <FilterOptionCheckbox
            name='Alpha'
            checkedItems={['Alpha']}
            group='teams'
            filteredData={[]}
          />
        </I18nextProvider>
      </Provider>
    );
    expect(screen.getByText(/Alpha/i)).toBeInTheDocument();
  });

  test('checkbox checked', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <FilterOptionCheckbox
            name='Alpha'
            checkedItems={['Alpha']}
            group='teams'
            filteredData={[]}
          />
        </I18nextProvider>
      </Provider>
    );
    expect(screen.getByTestId('CheckBoxIcon')).toBeInTheDocument();
  });
});
