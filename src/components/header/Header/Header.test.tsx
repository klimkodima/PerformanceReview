import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import store from 'src/store';
import i18n from 'src/i18n';
import { SETTINGS_PERMISSION } from 'src/constants';
import Header from './Header';
import HeaderContainer from './HeaderContainer';

describe('Header', () => {
  test("don't show settings icon on audit level", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Header
            onLogoutClick={() => true}
            isAuth={true}
            onTimingClick={() => true}
            settingsPermission={SETTINGS_PERMISSION.NONE}
            onSettingsClick={() => true}
            onLogoClick={() => true}
          />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('show settings icon on admin level', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Header
          onLogoutClick={() => true}
          isAuth={true}
          onTimingClick={() => true}
          settingsPermission={SETTINGS_PERMISSION.WRITE}
          onSettingsClick={() => true}
          onLogoClick={() => true}
        />
      </I18nextProvider>
    );
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });

  test('show settings icon on manager level', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Header
          onLogoutClick={() => true}
          isAuth={true}
          onTimingClick={() => true}
          settingsPermission={SETTINGS_PERMISSION.READ}
          onSettingsClick={() => true}
          onLogoClick={() => true}
        />
      </I18nextProvider>
    );
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });

  test('correct logo text', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Header
          onLogoutClick={() => true}
          isAuth={true}
          onTimingClick={() => true}
          settingsPermission={SETTINGS_PERMISSION.WRITE}
          onSettingsClick={() => true}
          onLogoClick={() => true}
        />
      </I18nextProvider>
    );
    expect(screen.getByText('PERFORMANCE REVIEW')).toBeInTheDocument();
  });

  test('dont show icons if user unauthorized', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Header
          onLogoutClick={() => true}
          isAuth={false}
          onTimingClick={() => true}
          settingsPermission={SETTINGS_PERMISSION.READ}
          onSettingsClick={() => true}
          onLogoClick={() => true}
        />
      </I18nextProvider>
    );
    expect(screen.queryByTestId('settings-icon')).toBeNull();
    expect(screen.queryByTestId('logout-icon')).toBeNull();
  });
});

describe('HeaderContainer', () => {
  test('Matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <HeaderContainer
              onSettingsClick={() => true}
              onTimingClick={() => true}
            />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
