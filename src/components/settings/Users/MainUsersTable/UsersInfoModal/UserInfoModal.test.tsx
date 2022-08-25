import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from 'src/i18n';
import store from 'src/store';
import { setCurrentUserInfo } from 'src/store/Users';
import UserInfoModal from './UserInfoModal';
import UserInfoModalContainer from './UserInfoModalContainer';

const mockUserData = {
  id: 15,
  fullName: 'full name6',
  username: 'username6',
  email: '6email@email',
  enabled: true,
  pending: false,
  roleName: 'AUDITOR',
  teamId: 1,
  teamName: 'X-Rays',
  level: 'JUNIOR',
  avatarUrl: '',
  jiraAccountId: '12866hg',
  worksFrom: '2022-03-26',
  thirdParty: false
};

describe('UserInfoModal test', () => {
  test('UserInfoModal for manager renders correctly', () => {
    const onChangeInput = jest.fn;

    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <UserInfoModal
              isEditable={false}
              onCloseModalClick={() => true}
              currentUserInfo={mockUserData}
              onChangeInput={onChangeInput}
            />
          </Provider>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('UserInfoModalContainer test', () => {
  beforeEach(() => {
    store.dispatch(setCurrentUserInfo(mockUserData));
  });

  test('UserInfoModalContainer for manager renders correctly', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <UserInfoModalContainer
            onCloseModalClick={() => true}
            isEditable={false}
          />
        </Provider>
      </I18nextProvider>
    );
    expect(screen.getByTestId('modal-overlay')).toMatchSnapshot();
  });
});

describe('UserInfoModalContainer editable test', () => {
  beforeEach(() => {
    store.dispatch(setCurrentUserInfo(mockUserData));
  });

  test('UserInfoModalContainer for admin renders correctly', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <UserInfoModalContainer
            onCloseModalClick={() => true}
            isEditable={true}
          />
        </Provider>
      </I18nextProvider>
    );

    expect(screen.getByTestId('modal-overlay')).toMatchSnapshot();
  });

  test('UserInfoModalContainer has elements', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getByTestId, queryByTestId, getAllByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <UserInfoModalContainer
            onCloseModalClick={() => true}
            isEditable={true}
          />
        </Provider>
      </I18nextProvider>
    );

    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    const saveBtn = getByRole('button', { name: 'Save' });
    expect(saveBtn).toBeInTheDocument();
    expect(saveBtn).toHaveProperty('disabled', true);

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    userEvent.clear(input);

    expect(getByTestId('PriorityHighIcon')).toBeInTheDocument();
    expect(saveBtn).toHaveProperty('disabled', false);
    userEvent.type(input, 'full name6');
    expect(queryByTestId('PriorityHighIcon')).toBeNull();
    expect(saveBtn).toHaveProperty('disabled', true);

    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
    expect(checkboxes[0]).not.toBeChecked();
    userEvent.click(checkboxes[0]);
    expect(saveBtn).toHaveProperty('disabled', false);
    expect(checkboxes[0]).toBeChecked();
    userEvent.click(checkboxes[0]);
    expect(saveBtn).toHaveProperty('disabled', true);
  });

  test('UserInfoModalContainer reset password', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByTestId, getAllByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <UserInfoModalContainer
            onCloseModalClick={() => true}
            isEditable={true}
          />
        </Provider>
      </I18nextProvider>
    );

    const resetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    expect(resetPasswordBtn).toHaveProperty('disabled', false);
    userEvent.click(resetPasswordBtn);

    const modals = getAllByTestId('modal-overlay');
    expect(modals).toHaveLength(2);
    const cancelBtns = getAllByRole('button', { name: 'Cancel' });
    expect(cancelBtns).toHaveLength(2);
    userEvent.click(cancelBtns[1]);
    expect(getAllByTestId('modal-overlay')).toHaveLength(1);

    userEvent.click(resetPasswordBtn);
    userEvent.click(getByRole('button', { name: 'Yes' }));
    expect(resetPasswordBtn).toHaveProperty('disabled', true);
  });

  test('UserInfoModalContainer upload photo', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByTestId, getAllByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <UserInfoModalContainer
            onCloseModalClick={() => true}
            isEditable={true}
          />
        </Provider>
      </I18nextProvider>
    );

    const uploadPhotoBtn = getByRole('button', {
      name: 'Upload photo from Jira'
    });
    expect(uploadPhotoBtn).toHaveProperty('disabled', false);
    userEvent.click(uploadPhotoBtn);
    const modals = getAllByTestId('modal-overlay');
    expect(modals).toHaveLength(2);

    const cancelBtns = getAllByRole('button', { name: 'Cancel' });
    expect(cancelBtns).toHaveLength(2);
    userEvent.click(cancelBtns[1]);
    expect(getAllByTestId('modal-overlay')).toHaveLength(1);

    userEvent.click(uploadPhotoBtn);
    userEvent.click(getByRole('button', { name: 'Yes' }));
    expect(uploadPhotoBtn).toHaveProperty('disabled', true);
  });
});
