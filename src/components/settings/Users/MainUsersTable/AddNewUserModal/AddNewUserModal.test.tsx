import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/i18n';
import store from 'src/store';
import AddNewUserModal from './AddNewUserModal';
import AddNewUserModalContainer from './AddNewUserModalContainer';

const mockTeams = [
  {
    teamName: 'X-Rays',
    teamLeaderName: 'Tatiana Klimchenya',
    teamId: 1
  },
  {
    teamName: 'Charlie',
    teamLeaderName: 'Anastasya Karman',
    teamId: 2
  },
  {
    teamName: 'Alpha',
    teamLeaderName: 'Bogdana Korniyuk',
    teamId: 3
  }
];

const mockValidation = {
  email: null,
  password: null,
  roleName: null,
  username: null,
  level: null,
  teamName: null
};

const mockFormValues = {
  fullName: '',
  email: '',
  roleName: '',
  password: '',
  username: '',
  thirdParty: false,
  level: '',
  teamName: ''
};

describe('AddNewUserModal test', () => {
  test('renders correctly', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AddNewUserModal
              isShowTeamError={false}
              validation={mockValidation}
              teams={mockTeams}
              isShowLevelAndTeamInputs={false}
              formValues={mockFormValues}
              onInputChange={() => (event) => event.target}
              onSelectChange={() => (event) => event.target}
            />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});

describe('AddNewUserModalContainer test', () => {
  test('renders correctly', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AddNewUserModalContainer onCloseModalClick={() => true} />
        </I18nextProvider>
      </Provider>
    );

    expect(screen.getByTestId('modal-overlay')).toMatchSnapshot();
  });

  test('close modal', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const cancelMock = jest.fn();

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AddNewUserModalContainer onCloseModalClick={cancelMock} />
        </I18nextProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(cancelMock).toBeCalled();
  });

  test('validation works', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AddNewUserModalContainer onCloseModalClick={() => true} />
        </I18nextProvider>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Enter user name');
    const loginInput = screen.getByPlaceholderText('Enter user login');
    const passwordInput = screen.getByPlaceholderText('Enter user password');
    const roleSelect = screen.getByTestId('role-select');
    const saveBtn = screen.getByText('Add User');

    expect(saveBtn).toHaveClass('Mui-disabled');

    fireEvent.change(usernameInput, {
      target: { value: 'user' }
    });

    fireEvent.change(loginInput, {
      target: { value: 'login' }
    });

    fireEvent.change(passwordInput, {
      target: { value: 'pass' }
    });

    fireEvent.change(roleSelect.childNodes[0], {
      target: { value: 'ADMIN' }
    });
    expect(usernameInput).toHaveAttribute('value', 'user');
    expect(loginInput).toHaveAttribute('value', 'login');
    expect(saveBtn).not.toHaveClass('Mui-disabled');

    fireEvent.click(saveBtn);
    expect(saveBtn).toHaveClass('Mui-disabled');
    expect(screen.getAllByTestId('PriorityHighIcon').length).toBe(3);
  });

  test('show two more fields if selected role auditor or team leader', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AddNewUserModalContainer onCloseModalClick={() => true} />
        </I18nextProvider>
      </Provider>
    );

    const roleSelect = screen.getByTestId('role-select');
    expect(screen.getAllByTestId('add-new-user__item').length).toBe(4);

    fireEvent.change(roleSelect.childNodes[0], {
      target: { value: 'AUDITOR' }
    });

    expect(screen.getAllByTestId('add-new-user__item').length).toBe(6);
  });

  test('if validated field entered again, remove error notification', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AddNewUserModalContainer onCloseModalClick={() => true} />
        </I18nextProvider>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Enter user name');
    const loginInput = screen.getByPlaceholderText('Enter user login');
    const passwordInput = screen.getByPlaceholderText('Enter user password');
    const roleSelect = screen.getByTestId('role-select');
    const saveBtn = screen.getByText('Add User');

    expect(saveBtn).toHaveClass('Mui-disabled');

    fireEvent.change(usernameInput, {
      target: { value: 'user' }
    });

    fireEvent.change(loginInput, {
      target: { value: 'login' }
    });

    fireEvent.change(passwordInput, {
      target: { value: 'pass' }
    });

    fireEvent.change(roleSelect.childNodes[0], {
      target: { value: 'ADMIN' }
    });
    expect(usernameInput).toHaveAttribute('value', 'user');
    expect(loginInput).toHaveAttribute('value', 'login');
    expect(saveBtn).not.toHaveClass('Mui-disabled');

    fireEvent.click(saveBtn);
    expect(saveBtn).toHaveClass('Mui-disabled');
    expect(screen.getAllByTestId('PriorityHighIcon').length).toBe(3);

    fireEvent.change(passwordInput, {
      target: { value: 'password' }
    });
    expect(screen.getAllByTestId('PriorityHighIcon').length).toBe(2);

    fireEvent.change(usernameInput, {
      target: { value: 'username1' }
    });
    expect(screen.getAllByTestId('PriorityHighIcon').length).toBe(1);

    fireEvent.change(loginInput, {
      target: { value: 'login@mail.ru' }
    });
    expect(screen.queryAllByTestId('PriorityHighIcon').length).toBe(0);
  });
});
