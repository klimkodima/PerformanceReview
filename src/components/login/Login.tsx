import { ChangeEvent, FormEvent, memo, ReactElement } from 'react';

import { t } from 'i18next';
import { Button, TextField } from '@mui/material';

import './Login.scss';

type LoginPropsType = {
  username: string;
  password: string;
  authError: string | null;
  onSignInSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Login = memo(
  ({
    username,
    password,
    authError,
    onSignInSubmit,
    onUsernameChange,
    onPasswordChange
  }: LoginPropsType): ReactElement => (
    <div className='login'>
      <h2 className='login__header'>{t('login.login_title_text')}</h2>
      <form onSubmit={onSignInSubmit} className='login-form'>
        <TextField
          className='login-form__input login-form-input__username'
          type='text'
          value={username}
          onChange={onUsernameChange}
          placeholder='Username'
        />
        <TextField
          className='login-form__input login-form-input__password'
          type='password'
          value={password}
          onChange={onPasswordChange}
          placeholder='Password'
        />
        <Button
          className='login-form__button'
          type='submit'
          variant='contained'
        >
          {t('login.login_button_text')}
        </Button>
        {authError !== null && (
          <div className='login-form__error' data-testid='login-form__error'>
            {authError}
          </div>
        )}
      </form>
    </div>
  )
);

export default Login;

Login.displayName = 'Login';
