import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import store from 'src/store';
import i18n from 'src/i18n';
import DateFilterSection from './DateFilterSection';

describe('DateFilterSection', () => {
  test('Matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <DateFilterSection />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
