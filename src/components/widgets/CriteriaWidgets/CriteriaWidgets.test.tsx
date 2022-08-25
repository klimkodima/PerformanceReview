import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import store from 'src/store';
import { setCriteria } from 'src/store/Criteria';
import mockCriteria from 'src/store/Criteria/mockCriteria.json';
import CriteriaWidgets from './CriteriaWidgets';

describe('Criteria widget container tests', () => {
  store.dispatch(setCriteria(mockCriteria));

  test('Criteria widget snapshot', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <CriteriaWidgets />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  test('Criteria widgets component rendered', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <CriteriaWidgets />
        </I18nextProvider>
      </Provider>
    );

    const container = getByTestId('criteria-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('criteria-container');
  });

  test('Criteria widgets component has 4 items', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <CriteriaWidgets />
        </I18nextProvider>
      </Provider>
    );

    expect(getAllByTestId('criteria-item')).toHaveLength(4);
    const itemTitles = getAllByTestId('criteria-item-title');
    expect(itemTitles).toHaveLength(4);
    expect(itemTitles[0]).toContainHTML('Average Performance');
    expect(itemTitles[1]).toContainHTML('Average Validity');
    expect(itemTitles[2]).toContainHTML('Hours Correspondence');
    expect(itemTitles[3]).toContainHTML('Support/Audits Hours');
  });
});

describe('Criteria widget item statistics tests', () => {
  store.dispatch(setCriteria(mockCriteria));

  test('Criteria widgets item statistic rendered', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <CriteriaWidgets />
        </I18nextProvider>
      </Provider>
    );

    const itemStatistics = getAllByTestId('criteria-item-statistic');
    expect(itemStatistics).toHaveLength(4);
    expect(itemStatistics[0]).toContainHTML('50 units/h');
    expect(itemStatistics[1]).toContainHTML('100%');
    expect(itemStatistics[2]).toContainHTML('100%');
    expect(itemStatistics[3]).toContainHTML('2h');
  });
});

describe('Criteria widget item smile/tooltip test', () => {
  store.dispatch(setCriteria(mockCriteria));

  test('Criteria widgets item smile rendered', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <CriteriaWidgets />
        </I18nextProvider>
      </Provider>
    );

    const itemSmile = getByTestId('criteria-item-smile');
    expect(itemSmile).toBeInTheDocument();
    const itemTool = getByTestId('criteria-item-tooltip');
    expect(itemSmile).toContainElement(itemTool);
  });
});
