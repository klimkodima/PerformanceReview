import { I18nextProvider } from 'react-i18next';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';

import store from 'src/store';
import i18n from 'src/i18n';
import { setUsers } from 'src/store/Users';
import { setAvailableWidgets } from 'src/store/App';
import mockUsersData from 'src/store/Users/mockUsers.json';
import PendingUsersTable from './PendingUsersTable';

beforeEach(() => {
  store.dispatch(setUsers(mockUsersData));
  store.dispatch(
    setAvailableWidgets({
      settingsPermission: 'WRITE',
      availableWidgets: []
    })
  );
});

describe('Pending Users table tests', () => {
  test('Pending Users table snapshot', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <PendingUsersTable />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Pending Users table has the elements', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PendingUsersTable />
        </I18nextProvider>
      </Provider>
    );

    expect(getByRole('table')).toBeInTheDocument();
    expect(getAllByRole('columnheader')).toHaveLength(6);
    expect(getAllByRole('row')).toHaveLength(3);

    const activateUsersBtn = getByRole('button', { name: 'Activate Users' });
    expect(activateUsersBtn).toBeInTheDocument();
    expect(activateUsersBtn).toHaveProperty('disabled', true);
    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    expect(activateUsersBtn).toHaveProperty('disabled', false);
    userEvent.click(activateUsersBtn);
    expect(getAllByRole('heading', { level: 2 })).toHaveLength(2);
    expect(getAllByRole('row')).toHaveLength(5);
    expect(getAllByRole('button')).toHaveLength(4);

    userEvent.click(getByRole('button', { name: 'Cancel' }));
    expect(getAllByRole('row')).toHaveLength(3);
    expect(activateUsersBtn).toHaveProperty('disabled', true);
  });

  test('Pending Users Modal activate users', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByRole, getAllByTestId, queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PendingUsersTable />
        </I18nextProvider>
      </Provider>
    );

    const activateUsersBtn = getByRole('button', { name: 'Activate Users' });
    const checkboxes = getAllByRole('checkbox');
    userEvent.click(checkboxes[1]);
    userEvent.click(activateUsersBtn);

    expect(getAllByRole('row')).toHaveLength(4);
    const modalCheckboxes = getAllByTestId('pending-users-modal-checkbox');
    expect(modalCheckboxes).toHaveLength(1);

    const modalActivateBtn = getAllByRole('button', {
      name: 'Activate Users'
    });
    expect(modalActivateBtn).toHaveLength(2);
    const selects = getAllByTestId('pending-users-modal-select');
    expect(selects).toHaveLength(1);
    expect(modalActivateBtn[1]).toHaveProperty('disabled', false);
    userEvent.click(modalCheckboxes[0]);
    userEvent.click(modalActivateBtn[0]);
    expect(getAllByRole('row')).toHaveLength(3);
    expect(queryByTestId('modal-overlay')).toBeNull();
  });

  test('Pending Users Modal stop saving data for users', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByRole, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PendingUsersTable />
        </I18nextProvider>
      </Provider>
    );

    const stopSavingBtn = getByRole('button', {
      name: 'Stop saving data for Users'
    });
    expect(stopSavingBtn).toHaveProperty('disabled', true);
    const checkboxes = getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    expect(stopSavingBtn).toHaveProperty('disabled', true);
    userEvent.click(checkboxes[1]);
    expect(stopSavingBtn).toHaveProperty('disabled', false);
    userEvent.click(stopSavingBtn);
    expect(getByTestId('modal-overlay')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: 'Yes' }));
    expect(queryByTestId('modal-overlay')).toBeNull();
  });

  test('Pending Users Modal is closing', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByRole, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PendingUsersTable />
        </I18nextProvider>
      </Provider>
    );

    const stopSavingBtn = getByRole('button', {
      name: 'Stop saving data for Users'
    });
    const checkboxes = getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    userEvent.click(stopSavingBtn);

    expect(getByTestId('modal-overlay')).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: 'Cancel' }));
    expect(queryByTestId('modal-overlay')).toBeNull();
  });
});
