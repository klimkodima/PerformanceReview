import { I18nextProvider } from 'react-i18next';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';

import store from 'src/store';
import i18n from 'src/i18n';
import { t } from 'i18next';
import { setUsers } from 'src/store/Users';
import { setAvailableWidgets } from 'src/store/App';
import mockUsersData from 'src/store/Users/mockUsers.json';
import MainUsersTable from './MainUsersTable';
import UsersContainer from '../UsersContainer';

beforeEach(() => {
  store.dispatch(setUsers(mockUsersData));
  store.dispatch(
    setAvailableWidgets({
      settingsPermission: 'WRITE',
      availableWidgets: []
    })
  );
});

describe('Main Users table tests', () => {
  test('Main Users table snapshot', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <MainUsersTable />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Users Container has the elements', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <UsersContainer />
        </I18nextProvider>
      </Provider>
    );

    expect(getAllByRole('table')).toHaveLength(2);
    expect(getAllByRole('heading', { level: 2 })).toHaveLength(1);
  });

  test('Main Users table has the elements', () => {
    const { getByRole, getAllByRole, getAllByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MainUsersTable />
        </I18nextProvider>
      </Provider>
    );

    expect(getByRole('table')).toBeInTheDocument();
    expect(getAllByRole('columnheader')).toHaveLength(6);
    expect(getAllByRole('row')).toHaveLength(10);
    expect(getAllByRole('cell')).toHaveLength(54);
    const arrowIcons = getAllByTestId('ArrowDownwardIcon');
    expect(arrowIcons).toHaveLength(3);
    userEvent.click(arrowIcons[0]);
    userEvent.click(arrowIcons[1]);
    userEvent.click(arrowIcons[2]);
  });

  test('Main Users table has search element', () => {
    jest.useFakeTimers();
    const { getByRole, getByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MainUsersTable />
        </I18nextProvider>
      </Provider>
    );

    const searchInput = getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', t('search.placeholder'));
    userEvent.type(searchInput, 'Hello');
    jest.advanceTimersByTime(2000);
    expect(searchInput).toHaveValue('Hello');
    const resetBtn = getByTestId('reset-button');
    expect(resetBtn).toBeInTheDocument();
    userEvent.click(resetBtn);
    expect(searchInput).toHaveValue('');
    jest.clearAllTimers();
  });
});
