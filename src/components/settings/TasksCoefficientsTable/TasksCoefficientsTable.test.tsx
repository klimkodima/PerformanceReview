import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import { SETTINGS_PERMISSION } from 'src/constants';
import store from 'src/store';
import { TasksCoefficientsTable, TasksCoefficientsRow } from './index';

const group = {
  websiteGroupName: 'Reviews',
  taskCoefficientDtos: [
    {
      taskTypeName: 'PHONE',
      initialCoefficient: 1,
      reauditCoefficient: 1
    }
  ],
  websiteCoefficientDtos: [
    {
      websiteName: 'yelp.com',
      taskCoefficientDtos: [
        {
          taskTypeName: 'PHONE',
          initialCoefficient: 5
        }
      ]
    }
  ]
};

describe('Tasks coefficients table tests', () => {
  test('Tasks coefficients table  has the elements', () => {
    const { getByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <TasksCoefficientsTable />
        </Provider>
      </I18nextProvider>
    );
    const table = getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('Tasks coefficients row  hasn`t accordion and edit buttons', () => {
    const group = {
      websiteGroupName: 'Reviews',
      taskCoefficientDtos: [
        {
          taskTypeName: 'PHONE',
          initialCoefficient: 1,
          reauditCoefficient: 1
        }
      ],
      websiteCoefficientDtos: []
    };
    const { queryByLabelText } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <TasksCoefficientsRow
            settingsPermission={SETTINGS_PERMISSION.READ}
            group={group}
          />
        </Provider>
      </I18nextProvider>
    );

    expect(queryByLabelText(/expand row/i)).toBeNull();
    expect(queryByLabelText(/edit/i)).toBeNull();
  });

  test('Tasks coefficients row  has accordion and edit buttons', () => {
    const group = {
      websiteGroupName: 'Reviews',
      taskCoefficientDtos: [
        {
          taskTypeName: 'PHONE',
          initialCoefficient: 1,
          reauditCoefficient: 1
        }
      ],
      websiteCoefficientDtos: [
        {
          websiteName: 'yelp.com',
          taskCoefficientDtos: [
            {
              taskTypeName: 'PHONE',
              initialCoefficient: 5
            }
          ]
        }
      ]
    };

    const { getByLabelText, getAllByLabelText } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <TasksCoefficientsRow
            settingsPermission={SETTINGS_PERMISSION.WRITE}
            group={group}
          />
        </Provider>
      </I18nextProvider>
    );

    const accordionButton = getByLabelText(/expand row/i);
    expect(accordionButton).toBeInTheDocument();
    expect(getAllByLabelText(/edit/i)).toHaveLength(2);
    userEvent.click(accordionButton);
    expect(getAllByLabelText(/edit/i)).toHaveLength(4);
  });
});

describe('Tasks coefficients table render values', () => {
  test('render websiteCoefficients for website', () => {
    const group = {
      websiteGroupName: 'Reviews',
      taskCoefficientDtos: [
        {
          taskTypeName: 'PHONE',
          initialCoefficient: 1,
          reauditCoefficient: 1
        }
      ],
      websiteCoefficientDtos: [
        {
          websiteName: 'yelp.com',
          taskCoefficientDtos: [
            {
              taskTypeName: 'PHONE',
              initialCoefficient: 5
            }
          ]
        }
      ]
    };
    const { getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <TasksCoefficientsRow
          settingsPermission={SETTINGS_PERMISSION.WRITE}
          group={group}
        />
      </Provider>
    );

    userEvent.click(getByLabelText(/expand row/i));
    const elementInit = getByTestId(/initial PHONE/i);
    const elementReaudit = getByTestId(/reaudit PHONE/i);
    expect(elementInit).toHaveTextContent('5');
    expect(elementReaudit).toHaveTextContent('1');
  });

  test('open modal when edit initial icon clicked', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <TasksCoefficientsRow
          settingsPermission={SETTINGS_PERMISSION.WRITE}
          group={group}
        />
      </Provider>
    );

    const accordionButton = screen.getByLabelText(/expand row/i);
    userEvent.click(accordionButton);
    fireEvent.click(screen.getByTestId('edit-handle-initial'));
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });

  test('open modal when edit reaudit icon clicked', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <TasksCoefficientsRow
          settingsPermission={SETTINGS_PERMISSION.WRITE}
          group={group}
        />
      </Provider>
    );

    const accordionButton = screen.getByLabelText(/expand row/i);
    userEvent.click(accordionButton);
    fireEvent.click(screen.getByTestId('edit-handle-reaudit'));
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });

  test('open modal when edit initial group icon clicked', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <TasksCoefficientsRow
          settingsPermission={SETTINGS_PERMISSION.WRITE}
          group={group}
        />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('edit-handle-initial-group'));
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });

  test('open modal when edit reaudit group icon clicked', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <TasksCoefficientsRow
          settingsPermission={SETTINGS_PERMISSION.WRITE}
          group={group}
        />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('edit-handle-reaudit-group'));
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });

  test('open close works', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <TasksCoefficientsRow
          settingsPermission={SETTINGS_PERMISSION.WRITE}
          group={group}
        />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('edit-handle-reaudit-group'));
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cancel-edit-modal-button'));
    expect(root).toBeEmptyDOMElement();
  });
});
