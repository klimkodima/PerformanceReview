import { I18nextProvider } from 'react-i18next';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from 'src/store';
import i18n from 'src/i18n';
import { setPresetWorkingHours } from 'src/store/PresetWorkingHours';
import mockPresetWorkingHours from 'src/store/PresetWorkingHours/mockPresetWorkingHours.json';
import PresetWorkingHours from './PresetWorkingHours';
import PresetWorkingHoursEdit from './PresetWorkingHoursEdit';
import PresetWorkingHoursContainer from './PresetWorkingHoursContainer';

beforeEach(() => {
  store.dispatch(setPresetWorkingHours(mockPresetWorkingHours));
});

describe('PresetWorkingHours table tests', () => {
  test('PresetWorkingHours table snapshot', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <PresetWorkingHoursContainer isEditable={false} />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('PresetWorkingHours table has the elements', () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PresetWorkingHours />
        </I18nextProvider>
      </Provider>
    );

    expect(getByRole('table')).toBeInTheDocument();
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(getAllByRole('row')).toHaveLength(3);
  });

  test('PresetWorkingHours table Edit has the elements', () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PresetWorkingHoursEdit />
        </I18nextProvider>
      </Provider>
    );

    expect(getByRole('table')).toBeInTheDocument();
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(getAllByRole('row')).toHaveLength(3);
    expect(getAllByRole('button')).toHaveLength(1);
  });

  test('PresetWorkingHours table enter and exit from edit mode', () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PresetWorkingHoursEdit />
        </I18nextProvider>
      </Provider>
    );

    userEvent.click(getByRole('button', { name: 'Edit Table' }));
    expect(getAllByRole('button')).toHaveLength(5);
    userEvent.click(getByRole('button', { name: 'Cancel' }));
    expect(getAllByRole('button')).toHaveLength(1);
  });

  test('Exit from edit mode if the PresetWorkingHours table is valid', () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PresetWorkingHoursEdit />
        </I18nextProvider>
      </Provider>
    );

    userEvent.click(getByRole('button', { name: 'Edit Table' }));
    const hoursField = getAllByRole('textbox');
    userEvent.clear(hoursField[0]);
    userEvent.type(hoursField[0], '4');
    userEvent.clear(hoursField[1]);
    userEvent.type(hoursField[1], '4');
    userEvent.click(getByRole('button', { name: 'Save' }));
    expect(getAllByRole('button')).toHaveLength(1);
  });

  test('PresetWorkingHours table - validation tests', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByRole, getAllByTestId, getByText } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PresetWorkingHoursEdit />
        </I18nextProvider>
      </Provider>
    );

    userEvent.click(getByRole('button', { name: 'Edit Table' }));
    const hoursField = getAllByRole('textbox');
    userEvent.clear(hoursField[0]);
    userEvent.type(hoursField[0], 'Error');

    const saveBtn = getByRole('button', { name: 'Save' });
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(1);

    userEvent.clear(hoursField[0]);
    userEvent.type(hoursField[0], '0.15');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(1);

    userEvent.clear(hoursField[0]);
    userEvent.type(hoursField[0], '4');

    const addBtn = getByRole('button', { name: 'Add' });
    userEvent.click(addBtn);
    userEvent.click(saveBtn);
    expect(getAllByRole('row')).toHaveLength(4);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(3);

    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    userEvent.click(checkboxes[2]);
    const deleteBtn = getByRole('button', { name: 'Delete' });
    expect(deleteBtn).toHaveProperty('disabled', false);
    userEvent.click(deleteBtn);
    userEvent.click(saveBtn);

    expect(getByText(/The table cannot be empty!/i)).toBeInTheDocument();
    const cancelBtns = getAllByRole('button', { name: 'Cancel' });
    expect(cancelBtns).toHaveLength(2);
    userEvent.click(cancelBtns[1]);
    expect(getAllByRole('button', { name: 'Cancel' })).toHaveLength(1);
  });

  test('PresetWorkingHours table - put data', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByRole, getByText, queryByText } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PresetWorkingHoursEdit />
        </I18nextProvider>
      </Provider>
    );

    userEvent.click(getByRole('button', { name: 'Edit Table' }));
    const textField = getAllByRole('textbox');
    userEvent.clear(textField[0]);
    userEvent.type(textField[0], '10');
    userEvent.click(getByRole('button', { name: 'Save' }));
    expect(
      getByText(
        /The total duration exceeds 8 hours. Are you sure you want to save the table?/i
      )
    ).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: 'Yes' }));
    expect(
      queryByText(
        /The total duration exceeds 8 hours. Are you sure you want to save the table?/i
      )
    ).toBeNull();
  });

  test('PresetWorkingHours table - delete data', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PresetWorkingHoursEdit />
        </I18nextProvider>
      </Provider>
    );

    expect(getAllByRole('row')).toHaveLength(3);
    userEvent.click(getByRole('button', { name: 'Edit Table' }));
    const textField = getAllByRole('textbox');
    userEvent.clear(textField[0]);
    userEvent.type(textField[0], '10');
    const checkboxes = getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    userEvent.click(getByRole('button', { name: 'Delete' }));
    expect(getAllByRole('row')).toHaveLength(2);
    userEvent.click(getByRole('button', { name: 'Save' }));
    userEvent.click(getByRole('button', { name: 'Yes' }));
  });
});
