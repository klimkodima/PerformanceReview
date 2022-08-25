import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import store from 'src/store';
import PresetWorkingHoursModal from './PresetWorkingHoursModal';

describe('UsersTableModal', () => {
  test('Users Table Modal Snapshot', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PresetWorkingHoursModal
            onClose={() => false}
            onSave={() => false}
            isEmptyTable={false}
            modalNotification='Notification text'
          />
        </Provider>
      </I18nextProvider>
    );

    expect(getByTestId('modal-overlay')).toMatchSnapshot();
  });

  test('Users Table renders correctly', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getAllByRole, getByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PresetWorkingHoursModal
            onClose={() => true}
            onSave={() => true}
            isEmptyTable={false}
            modalNotification='Notification text'
          />
        </Provider>
      </I18nextProvider>
    );

    expect(getAllByRole('button')).toHaveLength(2);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('Users empty Table renders correctly', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getAllByRole, getByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PresetWorkingHoursModal
            onClose={() => true}
            onSave={() => true}
            isEmptyTable={true}
            modalNotification='Notification text'
          />
        </Provider>
      </I18nextProvider>
    );

    expect(getAllByRole('button')).toHaveLength(1);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
