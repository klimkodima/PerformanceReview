import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/i18n';
import store from 'src/store';
import { SETTINGS_PERMISSION } from 'src/constants';
import { initListOfTabs } from './SettingsContainer';
import Settings from './Settings';

describe('Settings', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Settings
              settingsPermission={SETTINGS_PERMISSION.WRITE}
              listOfTabs={initListOfTabs}
              onSettingsTabClick={() => true}
            />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
