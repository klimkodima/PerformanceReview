import { I18nextProvider } from 'react-i18next';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import store from 'src/store';
import i18n from 'src/i18n';
import { setBonusesData } from 'src/store/SeniorityBonuses';
import { SeniorityBonusesEdit } from './index';
import { mockBonusesData } from './data';
import SeniorityBonusesContainer from './SeniorityBonusesContainer';

beforeEach(() => {
  store.dispatch(setBonusesData(mockBonusesData));
});

describe('Seniority bonuses container tests', () => {
  test('Seniority bonuses snapshot', () => {
    const component = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <SeniorityBonusesEdit />
          </Provider>
        </I18nextProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  test('Seniority bonuses component rendered', () => {
    const { getByRole, getAllByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <SeniorityBonusesEdit />
        </Provider>
      </I18nextProvider>
    );

    expect(getByRole('table')).toBeInTheDocument();
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(getAllByRole('row')).toHaveLength(5);
    expect(getAllByRole('cell')).toHaveLength(8);
  });
});

describe('Seniority bonuses container tests without edit button', () => {
  test('Seniority bonuses container component rendered', () => {
    const { getByRole, getAllByRole, queryByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <SeniorityBonusesContainer isEditable={false} />
        </Provider>
      </I18nextProvider>
    );

    expect(getByRole('table')).toBeInTheDocument();
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(getAllByRole('row')).toHaveLength(5);
    expect(getAllByRole('cell')).toHaveLength(8);
    expect(queryByRole('button')).toBeNull();
  });
});

describe('Seniority bonuses table edit button and checkbox tests', () => {
  test('Seniority bonuses table edit button and checkbox click test', () => {
    const { getByRole, getAllByRole, queryAllByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <SeniorityBonusesEdit />
        </Provider>
      </I18nextProvider>
    );

    expect(queryAllByRole('checkbox')).toHaveLength(0);
    userEvent.click(getByRole('button', { name: 'Edit Table' }));

    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4);
    expect(getAllByRole('textbox')).toHaveLength(8);

    userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
  });

  test('must change row', () => {
    const { getAllByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <SeniorityBonusesContainer isEditable={true} />
        </Provider>
      </I18nextProvider>
    );

    const editBtn = screen.getByRole('button', { name: 'Edit Table' });
    userEvent.click(editBtn);

    const textBoxes = getAllByRole('textbox');

    expect(textBoxes[0]).toHaveValue('12');
    userEvent.clear(textBoxes[0]);
    userEvent.type(textBoxes[0], '1');
    expect(textBoxes[0]).toHaveValue('1');

    expect(textBoxes[1]).toHaveValue('10');
    userEvent.clear(textBoxes[1]);
    userEvent.type(textBoxes[1], '5');
    expect(textBoxes[1]).toHaveValue('5');
  });
});
