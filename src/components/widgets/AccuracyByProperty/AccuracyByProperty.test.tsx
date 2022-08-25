import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';
import { t } from 'i18next';

import { Provider } from 'react-redux';

import store from 'src/store';
import AccuracyByProperty from './AccuracyByProperty';

describe('Render AccuracyByProperty', () => {
  it('AverageAccuracy has elements', () => {
    const { getByRole, getAllByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AccuracyByProperty />
        </Provider>
      </I18nextProvider>
    );

    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(getByRole('table')).toBeInTheDocument();
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(getAllByRole('row')).toHaveLength(5);
  });

  it('AverageAccuracy, search by property', () => {
    const { getByRole, getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AccuracyByProperty />
        </Provider>
      </I18nextProvider>
    );

    const searchInput = getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute(
      'placeholder',
      t('accuracy_by_property.search_placeholder')
    );
    userEvent.type(searchInput, 'Resort');
    const resetBtn = getByTestId('reset-button');
    expect(resetBtn).toBeInTheDocument();
    userEvent.click(resetBtn);
    expect(searchInput).toHaveValue('');
  });
});
