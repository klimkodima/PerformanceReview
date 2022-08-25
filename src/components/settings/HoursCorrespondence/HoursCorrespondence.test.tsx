import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import HoursCorrespondence from './HoursCorrespondence';
import i18n from 'src/i18n';
import store from 'src/store';

describe('Hours Correspondence table tests', () => {
  test('Hours Correspondence table snapshot', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <HoursCorrespondence />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Hours Correspondence table has the elements', () => {
    const { getByRole, getAllByRole, getAllByAltText } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HoursCorrespondence />
        </I18nextProvider>
      </Provider>
    );

    const table = getByRole('table');
    expect(table).toBeInTheDocument();
    const columnheader = getAllByRole('columnheader');
    expect(columnheader).toHaveLength(5);
    const rowgroup = getAllByRole('row');
    expect(rowgroup).toHaveLength(3);
    const icons = getAllByAltText(/icon/i);
    expect(icons).toHaveLength(2);
  });
});
