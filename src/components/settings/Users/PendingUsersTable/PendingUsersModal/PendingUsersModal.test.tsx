import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from 'src/store';
import i18n from 'src/i18n';
import PendingUsersModal from './PendingUsersModal';
import mockPendingUsers from '../mockPendingUsers.json';

const mockSelectedPendingUsersInfo = [
  {
    id: 5,
    thirdParty: false,
    role: ''
  },
  {
    id: 6,
    thirdParty: false,
    role: ''
  }
];

describe('PendingUsersModal tests', () => {
  test('PendingUsersModal snapshot', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const setUsersSelectedInfo = jest.fn();
    const onCloseClick = jest.fn();
    const onSaveClick = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PendingUsersModal
            setUsersSelectedInfo={setUsersSelectedInfo}
            selectedUsers={mockPendingUsers}
            usersSelectedInfo={mockSelectedPendingUsersInfo}
            onCloseClick={onCloseClick}
            onSaveClick={onSaveClick}
            isDisabledSendBtn={true}
          />
        </I18nextProvider>
      </Provider>
    );

    expect(getByTestId('modal-overlay')).toMatchSnapshot();
  });
});
