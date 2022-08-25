import renderer from 'react-test-renderer';

import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import store from 'src/store';
import AverageAccuracy from './AverageAccuracy';

describe('Render AverageAccuracy', () => {
  test('AverageAccuracy snapshot', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AverageAccuracy />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('AverageAccuracy has elements', () => {
    const { getByRole, getByAltText } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AverageAccuracy />
        </Provider>
      </I18nextProvider>
    );

    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(getByAltText(/average-accuracy/i)).toBeInTheDocument();
  });
});
