import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from 'src/store';
import i18n from 'src/i18n';
import StopSavingDataModal from './StopSavingDataModal';
import mockPendingUsers from '../mockPendingUsers.json';

describe('StopSavingDataModal tests', () => {
  test('StopSavingDataModal snapshot', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const onCloseClick = jest.fn();
    const onSaveClick = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <StopSavingDataModal
            selectedUsers={mockPendingUsers}
            onCloseClick={onCloseClick}
            onSaveClick={onSaveClick}
          />
        </I18nextProvider>
      </Provider>
    );

    expect(getByTestId('modal-overlay')).toMatchSnapshot();
  });
});
