import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import HoursCorrespondenceEdit from './HoursCorrespondenceEdit';
import i18n from 'src/i18n';
import store from 'src/store';

describe('Hours Correspondence table tests', () => {
  test('Hours Correspondence table snapshot', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <HoursCorrespondenceEdit />
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
          <HoursCorrespondenceEdit />
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

  test('Hours Correspondence Btns Block tests', () => {
    const { getByRole, getAllByRole, queryAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HoursCorrespondenceEdit />
        </I18nextProvider>
      </Provider>
    );

    expect(queryAllByRole('checkbox')).toHaveLength(0);
    expect(queryAllByRole('textbox')).toHaveLength(0);

    const editBtn = getByRole('button', { name: 'Edit Table' });
    userEvent.click(editBtn);
    expect(getAllByRole('button')).toHaveLength(5);

    const deleteBtn = getByRole('button', { name: 'Delete' });
    expect(deleteBtn).toBeDisabled();

    const saveBtn = getByRole('button', { name: 'Save' });
    expect(saveBtn).toBeDisabled();

    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
    userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
    expect(deleteBtn).toHaveProperty('disabled', false);
    userEvent.click(deleteBtn);
    expect(getAllByRole('checkbox')).toHaveLength(1);

    const addBtn = getByRole('button', { name: 'Add' });
    userEvent.click(addBtn);
    expect(getAllByRole('checkbox')).toHaveLength(2);
    expect(saveBtn).toHaveProperty('disabled', false);

    const cancelBtn = getByRole('button', { name: 'Cancel' });
    userEvent.click(cancelBtn);
    expect(getAllByRole('button')).toHaveLength(1);
  });

  test('Exit from  edit mode if the table is valid', () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HoursCorrespondenceEdit />
        </I18nextProvider>
      </Provider>
    );

    const editBtn = getByRole('button', { name: 'Edit Table' });
    userEvent.click(editBtn);

    const statusInput = getAllByRole('textbox');
    userEvent.type(statusInput[0], ' Hello');
    expect(statusInput[0]).toHaveValue('ok Hello');

    const saveBtn = getByRole('button', { name: 'Save' });
    userEvent.click(saveBtn);
    expect(getAllByRole('button')).toHaveLength(1);
  });

  test('Validation tests', () => {
    const { getByRole, getAllByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HoursCorrespondenceEdit />
        </I18nextProvider>
      </Provider>
    );

    const editBtn = getByRole('button', { name: 'Edit Table' });
    userEvent.click(editBtn);
    const addBtn = getByRole('button', { name: 'Add' });
    userEvent.click(addBtn);
    const saveBtn = getByRole('button', { name: 'Save' });
    userEvent.click(saveBtn);

    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(5);
    const statuses = getAllByTestId('status');
    const status = statuses[statuses.length - 1];
    expect(status).toHaveValue('');
    userEvent.type(status, 'OK');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(6);
    userEvent.type(status, ' Hello');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(4);

    const confirmationRates = getAllByTestId('confirmationRate');
    const confirmationRate = confirmationRates[confirmationRates.length - 1];
    userEvent.type(confirmationRate, 'Hello');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(4);
    userEvent.clear(confirmationRate);
    userEvent.type(confirmationRate, '-1');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(4);
    userEvent.clear(confirmationRate);
    userEvent.type(confirmationRate, '101');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(4);
    userEvent.clear(confirmationRate);
    userEvent.type(confirmationRate, '4');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(3);

    const tooltipTexts = getAllByTestId('tooltipText');
    const tooltipText = tooltipTexts[tooltipTexts.length - 1];
    userEvent.type(tooltipText, ' Hello');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(2);

    const gaps = getAllByTestId('gap');
    const gap = gaps[gaps.length - 1];
    userEvent.type(gap, ' Hello');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(2);
    userEvent.clear(gap);
    userEvent.type(gap, '1');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(2);
    userEvent.clear(gap);
    userEvent.type(gap, '1-1');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(2);
    userEvent.clear(gap);
    userEvent.type(gap, '1-0');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(2);
    userEvent.clear(gap);
    userEvent.type(gap, '1-5');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(2);
    const newErrorGap = gaps[gaps.length - 2];
    userEvent.clear(newErrorGap);
    userEvent.type(newErrorGap, '6-50');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(1);
    const maxGapError = gaps[0];
    userEvent.clear(maxGapError);
    userEvent.type(maxGapError, '51-99');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(2);
    userEvent.clear(maxGapError);
    userEvent.type(maxGapError, '51-100');
    userEvent.click(saveBtn);
    expect(getAllByTestId('PriorityHighIcon')).toHaveLength(1);
  });
});
