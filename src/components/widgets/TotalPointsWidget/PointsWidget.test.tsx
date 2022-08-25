import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import store from 'src/store';
import { setCriteria } from 'src/store/Criteria';
import mockCriteria from 'src/store/Criteria/mockCriteria.json';
import PointsWidget from './PointsWidget';

describe('My Connected React-Redux Component', () => {
  store.dispatch(setCriteria(mockCriteria));

  test('Matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <PointsWidget />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders total-points-widget component', () => {
    const { getByTestId, getAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PointsWidget />
        </I18nextProvider>
      </Provider>
    );

    const pointsWidget = getByTestId('widget-point');
    expect(pointsWidget).toBeInTheDocument();
    expect(getAllByRole('heading', { level: 4 })).toHaveLength(3);

    expect(
      pointsWidget.getElementsByClassName('item__point-block point-block')
        .length
    ).toBe(3);

    expect(
      pointsWidget.getElementsByClassName('point-block__text').length
    ).toBe(3);
  });
});
