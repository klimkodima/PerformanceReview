import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import store from 'src/store';
import i18n from 'src/i18n';
import LoginContainer from './LoginContainer';
import Login from './Login';

describe('LoginContainer', () => {
  test('Matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <LoginContainer />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('inputs callbacks works', () => {
    const container = render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    );

    const usernameInput = container.getByPlaceholderText(
      'Username'
    ) as HTMLInputElement;
    const passwordInput = container.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;

    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput.value).toBe('');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.value).toBe('');

    fireEvent.change(usernameInput, {
      target: { value: 'root' }
    });

    fireEvent.change(passwordInput, {
      target: { value: 'pass' }
    });

    expect(usernameInput.value).toBe('root');
    expect(passwordInput.value).toBe('pass');
  });
});

describe('Login', () => {
  test('Matches snapshot', () => {
    render(
      <Login
        authError={null}
        password=''
        username=''
        onPasswordChange={() => true}
        onUsernameChange={() => true}
        onSignInSubmit={() => true}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  test('must show error', () => {
    render(
      <Login
        authError={'error'}
        password=''
        username=''
        onPasswordChange={() => true}
        onUsernameChange={() => true}
        onSignInSubmit={() => true}
      />
    );

    expect(screen.getByTestId('login-form__error')).toHaveTextContent('error');
  });
});
