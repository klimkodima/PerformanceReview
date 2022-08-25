import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loginUser, selectAuthError, setAuthError } from 'src/store/Auth';
import Login from './Login';

const LoginContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    dispatch(setAuthError(null));
  }, []);

  const handleSignInSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(setAuthError(null));
    dispatch(loginUser({ username, password }));
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.currentTarget.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Login
      authError={authError}
      username={username}
      password={password}
      onSignInSubmit={handleSignInSubmit}
      onUsernameChange={handleUsernameChange}
      onPasswordChange={handlePasswordChange}
    />
  );
};

export default LoginContainer;
